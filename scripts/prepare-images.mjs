import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

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

const createWebp = async ({ buffer, extension, outputPath, sourceUrl, width }) => {
  let pipeline = sharp(buffer).rotate().resize({
    width,
    withoutEnlargement: true,
    fit: 'inside'
  })

  if (losslessUrls.has(sourceUrl)) {
    pipeline = pipeline.webp({ lossless: true, effort: 6 })
  } else if (extension === '.png') {
    pipeline = pipeline.webp({ nearLossless: true, quality: 88, effort: 6 })
  } else {
    pipeline = pipeline.webp({ quality: 82, effort: 6, smartSubsample: true })
  }

  await pipeline.toFile(outputPath)
}

await rm(generatedRoot, { recursive: true, force: true })
await mkdir(generatedRoot, { recursive: true })
await mkdir(path.dirname(manifestPath), { recursive: true })

const imageFiles = (await listRasterImages(publicRoot)).sort((a, b) => a.localeCompare(b, 'zh-CN'))
const images = {}
let variantCount = 0
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
    variants: []
  }

  if ((metadata.pages || 1) > 1) {
    entry.skipped = 'animated'
    images[sourceUrl] = entry
    continue
  }

  const widths = [...new Set([
    ...targetWidths.filter((width) => width < sourceWidth),
    sourceWidth
  ])].sort((a, b) => a - b)
  const outputDirectory = path.join(generatedRoot, hash)
  await mkdir(outputDirectory, { recursive: true })

  for (const width of widths) {
    const outputPath = path.join(outputDirectory, `${width}.webp`)
    await createWebp({ buffer, extension, outputPath, sourceUrl, width })
    const outputInfo = await stat(outputPath)
    const height = Math.round(sourceHeight * (width / sourceWidth))
    entry.variants.push({
      src: `/_generated/images/${hash}/${width}.webp`,
      width,
      height,
      bytes: outputInfo.size
    })
    variantCount += 1
    generatedBytes += outputInfo.size
  }

  images[sourceUrl] = entry
}

const manifest = {
  version: 1,
  widths: targetWidths,
  images
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

console.log(`图片处理完成：${imageFiles.length} 张原图，${variantCount} 个 WebP 变体，${(generatedBytes / 1024 / 1024).toFixed(2)} MB 构建产物`)
