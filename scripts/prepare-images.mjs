import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { loadContentCatalog } from '../.shared/contentCatalog.mjs'
import {
  getCropBox,
  imageProfileDefinitions,
  normalizeFocalPoint
} from '../.shared/imageProfiles.mjs'

const projectRoot = process.cwd()
const publicRoot = path.join(projectRoot, 'public')
const generatedRoot = path.join(publicRoot, '_generated', 'images')
const manifestPath = path.join(projectRoot, '.vitepress', 'cache', 'image-manifest.json')
const rasterExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp'])
const targetWidths = [320, 480, 760, 1080]
const losslessUrls = new Set([
  '/wechat.png',
  '/qq.png',
  '/images/brand/liuli-mark.png'
])

const toPosix = (value) => value.split(path.sep).join('/')

const normalizeLocalImageUrl = (value) => {
  const source = String(value || '').split(/[?#]/, 1)[0]
  if (!source.startsWith('/')) return ''
  try {
    return decodeURI(source).normalize('NFC')
  } catch {
    return source.normalize('NFC')
  }
}

const listRasterImages = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name === '_generated') continue
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await listRasterImages(absolutePath))
      continue
    }
    if (rasterExtensions.has(path.extname(entry.name).toLowerCase())) files.push(absolutePath)
  }

  return files
}

const orientedSize = (metadata) => {
  const swapsAxes = [5, 6, 7, 8].includes(metadata.orientation)
  return {
    width: swapsAxes ? metadata.height : metadata.width,
    height: swapsAxes ? metadata.width : metadata.height
  }
}

const collectProfileRequests = () => {
  const requests = new Map()
  const add = (source, profile, focalPoint) => {
    const sourceUrl = normalizeLocalImageUrl(source)
    if (!sourceUrl || !imageProfileDefinitions[profile]) return
    const key = `${profile}:${normalizeFocalPoint(focalPoint)}`
    const profileRequests = requests.get(sourceUrl) || new Map()
    profileRequests.set(key, { profile, focalPoint: normalizeFocalPoint(focalPoint) })
    requests.set(sourceUrl, profileRequests)
  }

  for (const item of loadContentCatalog().all) {
    add(item.cover, 'card', item.coverFocalPoint)
    const homeSource = item.homeOverrideSrc || item.cover
    add(homeSource, 'homeDesktop', item.coverFocalPoint)
    add(homeSource, 'homeMobile', item.coverFocalPoint)
  }

  return requests
}

const outputWidths = (widths, maximumWidth) => {
  const cappedWidth = Math.min(maximumWidth, widths.at(-1))
  return [...new Set([
    ...widths.filter((width) => width < cappedWidth),
    cappedWidth
  ])].sort((a, b) => a - b)
}

const createVariant = async ({
  buffer,
  crop,
  extension,
  format,
  height,
  outputPath,
  sourceUrl,
  width
}) => {
  let pipeline = sharp(buffer).rotate()
  if (crop) pipeline = pipeline.extract(crop).resize({ width, height, fit: 'fill' })
  else pipeline = pipeline.resize({ width, withoutEnlargement: true, fit: 'inside' })

  if (format === 'avif') {
    pipeline = losslessUrls.has(sourceUrl)
      ? pipeline.avif({ lossless: true, effort: 4 })
      : pipeline.avif({ quality: extension === '.png' ? 68 : 58, effort: 4 })
  } else if (losslessUrls.has(sourceUrl)) {
    pipeline = pipeline.webp({ lossless: true, effort: 6 })
  } else if (extension === '.png') {
    pipeline = pipeline.webp({ nearLossless: true, quality: 88, effort: 6 })
  } else {
    pipeline = pipeline.webp({ quality: 82, effort: 6, smartSubsample: true })
  }

  return pipeline.toFile(outputPath)
}

const buildVariantSet = async ({
  buffer,
  crop = null,
  extension,
  hash,
  outputDirectory,
  outputPrefix = '',
  sourceHeight,
  sourceUrl,
  sourceWidth,
  widths
}) => {
  const availableWidth = crop?.width || sourceWidth
  const aspect = crop ? crop.width / crop.height : sourceWidth / sourceHeight
  const selectedWidths = outputWidths(widths, availableWidth)
  const variants = []
  const avifVariants = []

  for (const width of selectedWidths) {
    const height = Math.max(1, Math.round(width / aspect))
    for (const format of ['webp', 'avif']) {
      if (format === 'avif' && losslessUrls.has(sourceUrl)) continue
      const filename = `${outputPrefix}${width}.${format}`
      const outputPath = path.join(outputDirectory, filename)
      const generated = await createVariant({ buffer, crop, extension, format, height, outputPath, sourceUrl, width })
      const outputInfo = await stat(outputPath)
      const variant = {
        src: `/_generated/images/${hash}/${filename}`,
        width: generated.width,
        height: generated.height,
        bytes: outputInfo.size
      }
      if (format === 'avif') avifVariants.push(variant)
      else variants.push(variant)
    }
  }

  return { variants, avifVariants }
}

await rm(generatedRoot, { recursive: true, force: true })
await mkdir(generatedRoot, { recursive: true })
await mkdir(path.dirname(manifestPath), { recursive: true })

const profileRequests = collectProfileRequests()
const imageFiles = (await listRasterImages(publicRoot)).sort((a, b) => a.localeCompare(b, 'zh-CN'))
const images = {}
let webpVariantCount = 0
let avifVariantCount = 0
let generatedBytes = 0

for (const absolutePath of imageFiles) {
  const relativePath = toPosix(path.relative(publicRoot, absolutePath)).normalize('NFC')
  const sourceUrl = `/${relativePath}`
  const extension = path.extname(absolutePath).toLowerCase()
  const buffer = await readFile(absolutePath)
  const metadata = await sharp(buffer, { animated: true }).metadata()
  const { width: sourceWidth, height: sourceHeight } = orientedSize(metadata)

  if (!sourceWidth || !sourceHeight) {
    throw new Error(`无法读取图片尺寸：${relativePath}`)
  }

  const sourceInfo = await stat(absolutePath)
  const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 16)
  const entry = {
    src: sourceUrl,
    width: sourceWidth,
    height: sourceHeight,
    bytes: sourceInfo.size,
    format: metadata.format,
    variants: [],
    avifVariants: [],
    profiles: {}
  }
  if (losslessUrls.has(sourceUrl)) entry.avifSkipped = 'lossless-source'

  if ((metadata.pages || 1) > 1) {
    entry.skipped = 'animated'
    images[sourceUrl] = entry
    continue
  }

  const outputDirectory = path.join(generatedRoot, hash)
  await mkdir(outputDirectory, { recursive: true })

  const original = await buildVariantSet({
    buffer,
    extension,
    hash,
    outputDirectory,
    sourceHeight,
    sourceUrl,
    sourceWidth,
    widths: targetWidths
  })
  entry.variants = original.variants
  entry.avifVariants = original.avifVariants
  entry.profiles.original = {
    width: sourceWidth,
    height: sourceHeight,
    variants: original.variants,
    avifVariants: original.avifVariants
  }

  for (const request of profileRequests.get(sourceUrl)?.values() || []) {
    const definition = imageProfileDefinitions[request.profile]
    const crop = getCropBox(sourceWidth, sourceHeight, definition.aspect, request.focalPoint)
    const profileSet = await buildVariantSet({
      buffer,
      crop,
      extension,
      hash,
      outputDirectory,
      outputPrefix: `${request.profile}-${request.focalPoint}-`,
      sourceHeight,
      sourceUrl,
      sourceWidth,
      widths: definition.widths
    })
    const largest = profileSet.variants.at(-1)
    entry.profiles[request.profile] ||= {}
    entry.profiles[request.profile][request.focalPoint] = {
      width: largest?.width || crop.width,
      height: largest?.height || crop.height,
      aspect: definition.aspect,
      variants: profileSet.variants,
      avifVariants: profileSet.avifVariants
    }
  }

  const allProfileSets = Object.entries(entry.profiles)
    .flatMap(([profile, value]) => profile === 'original' ? [value] : Object.values(value))
  for (const set of allProfileSets) {
    webpVariantCount += set.variants?.length || 0
    avifVariantCount += set.avifVariants?.length || 0
    generatedBytes += [...(set.variants || []), ...(set.avifVariants || [])]
      .reduce((sum, variant) => sum + variant.bytes, 0)
  }

  images[sourceUrl] = entry
}

const manifest = {
  version: 2,
  widths: targetWidths,
  formats: ['avif', 'webp', 'original'],
  profiles: imageProfileDefinitions,
  images
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

console.log(`图片处理完成：${imageFiles.length} 张原图，${webpVariantCount} 个 WebP、${avifVariantCount} 个 AVIF 变体，${(generatedBytes / 1024 / 1024).toFixed(2)} MB 构建产物`)
