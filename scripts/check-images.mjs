import { access, readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import sharp from 'sharp'
import { loadContentCatalog } from '../.shared/contentCatalog.mjs'
import { imageProfileDefinitions, normalizeFocalPoint } from '../.shared/imageProfiles.mjs'
import { richHtmlImageSources } from '../.shared/richHtml.mjs'

const projectRoot = process.cwd()
const publicRoot = path.join(projectRoot, 'public')
const distRoot = path.join(projectRoot, '.vitepress', 'dist')
const manifestPath = path.join(projectRoot, '.vitepress', 'cache', 'image-manifest.json')
const articlePath = path.join(projectRoot, 'aigc', 'ai-product-image-batch-workflow.md')
const articleHtmlPath = path.join(distRoot, 'aigc', 'ai-product-image-batch-workflow.html')
const rasterExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp'])

const toPosix = (value) => value.split(path.sep).join('/')
const assert = (condition, message) => {
  if (!condition) throw new Error(message)
}

const normalizeLocalImageUrl = (value) => {
  const source = String(value || '').split(/[?#]/, 1)[0]
  if (!source.startsWith('/')) return ''
  try {
    return decodeURI(source).normalize('NFC')
  } catch {
    return source.normalize('NFC')
  }
}

const listFiles = async (directory, extensions = null) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.name === '_generated') continue
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await listFiles(absolutePath, extensions))
    else if (!extensions || extensions.has(path.extname(entry.name).toLowerCase())) files.push(absolutePath)
  }
  return files
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
const sourceFiles = await listFiles(publicRoot, rasterExtensions)
assert(manifest.version === 2, `图片清单版本异常：${manifest.version}`)
assert(manifest.formats?.includes('avif') && manifest.formats?.includes('webp'), '图片清单缺少 AVIF/WebP 格式声明')

let checkedVariants = 0
let checkedProfiles = 0

const assertVariantSet = async (entry, set, label, expectedAspect = null) => {
  assert(set?.variants?.length > 0, `${label} 没有 WebP 变体`)
  assert(set?.avifVariants?.length > 0 || entry.avifSkipped === 'lossless-source' || entry.skipped === 'animated', `${label} 没有 AVIF 变体`)

  for (const [format, variants] of [['webp', set.variants || []], ['avif', set.avifVariants || []]]) {
    for (const variant of variants) {
      assert(variant.width <= 1080, `${label} 变体宽度超过 1080px：${variant.src}`)
      const publicVariant = path.join(publicRoot, variant.src.replace(/^\//, ''))
      const distVariant = path.join(distRoot, variant.src.replace(/^\//, ''))
      await access(publicVariant)
      await access(distVariant)
      const metadata = await sharp(publicVariant).metadata()
      const actualFormat = metadata.format === 'heif' ? 'avif' : metadata.format
      assert(actualFormat === format, `${label} 格式错误：${variant.src}`)
      assert(metadata.width === variant.width, `${label} 宽度不符：${variant.src}`)
      assert(metadata.height === variant.height, `${label} 高度不符：${variant.src}`)
      if (expectedAspect) {
        assert(Math.abs(metadata.width / metadata.height - expectedAspect) < 0.006, `${label} 比例不符：${variant.src}`)
      }
      checkedVariants += 1
    }
  }
}

for (const sourcePath of sourceFiles) {
  const sourceUrl = `/${toPosix(path.relative(publicRoot, sourcePath)).normalize('NFC')}`
  const entry = manifest.images[sourceUrl]
  assert(entry, `图片清单缺少原图：${sourceUrl}`)
  assert(entry.width > 0 && entry.height > 0, `图片尺寸无效：${sourceUrl}`)
  if (entry.skipped === 'animated') continue
  await assertVariantSet(entry, entry.profiles?.original || entry, `${sourceUrl} original`)

  for (const [profileName, focalSets] of Object.entries(entry.profiles || {})) {
    if (profileName === 'original') continue
    const definition = imageProfileDefinitions[profileName]
    assert(definition, `未知图片 profile：${profileName}`)
    for (const [focalPoint, set] of Object.entries(focalSets)) {
      assert(normalizeFocalPoint(focalPoint) === focalPoint, `未知封面焦点：${focalPoint}`)
      await assertVariantSet(entry, set, `${sourceUrl} ${profileName}:${focalPoint}`, definition.aspect)
      checkedProfiles += 1
    }
  }
}

for (const item of loadContentCatalog().all) {
  if (!item.cover) continue
  const focalPoint = normalizeFocalPoint(item.coverFocalPoint)
  const cardEntry = manifest.images[normalizeLocalImageUrl(item.cover)]
  assert(cardEntry?.profiles?.card?.[focalPoint], `内容列表封面缺少 card:${focalPoint}：${item.sourcePath}`)
  const homeSource = normalizeLocalImageUrl(item.homeOverrideSrc || item.cover)
  const homeEntry = manifest.images[homeSource]
  assert(homeEntry?.profiles?.homeDesktop?.[focalPoint], `首页封面缺少 homeDesktop:${focalPoint}：${item.sourcePath}`)
  assert(homeEntry?.profiles?.homeMobile?.[focalPoint], `首页封面缺少 homeMobile:${focalPoint}：${item.sourcePath}`)
}

const article = await readFile(articlePath, 'utf8')
const articleData = matter(article).data
const articleImageUrls = []
for (const block of articleData.contentBlocks || []) {
  if (block.type === 'image' && block.src) articleImageUrls.push(block.src)
  if (block.type === 'gallery') articleImageUrls.push(...(block.items || []).map((item) => item.src).filter(Boolean))
  if (block.type === 'richText') {
    if (block.html) articleImageUrls.push(...richHtmlImageSources(block.html))
    else articleImageUrls.push(...[...String(block.legacyMarkdown || block.markdown || '').matchAll(/!\[[^\]]*\]\((\/images\/uploads\/[^)\s]+)\)/g)].map((match) => match[1]))
  }
}
assert(articleImageUrls.length === 14, `问题文章正文图片数量异常：${articleImageUrls.length}`)

const chooseVariant = (entry, targetWidth) => entry.avifVariants.find((variant) => variant.width >= targetWidth) || entry.avifVariants.at(-1)
let originalBytes = 0
let mobileBytes = 0
let desktopBytes = 0

for (const sourceUrl of articleImageUrls) {
  const entry = manifest.images[sourceUrl]
  assert(entry, `问题文章图片未进入清单：${sourceUrl}`)
  originalBytes += entry.bytes
  mobileBytes += chooseVariant(entry, 480).bytes
  desktopBytes += chooseVariant(entry, 760).bytes
}

assert(desktopBytes < originalBytes, '桌面 AVIF 总流量未低于原图')

const articleHtml = await readFile(articleHtmlPath, 'utf8')
const bodyImageTags = [...articleHtml.matchAll(/<img[^>]+src="(\/images\/uploads\/[^"]+)"[^>]*>/g)].map((match) => match[0])
assert(bodyImageTags.length === articleImageUrls.length, `构建后的正文图片数量异常：${bodyImageTags.length}`)
for (const [index, tag] of bodyImageTags.entries()) {
  assert(new RegExp(`loading="${index === 0 ? 'eager' : 'lazy'}"`).test(tag), `正文图片加载优先级错误：${tag}`)
  assert(new RegExp(`fetchpriority="${index === 0 ? 'high' : 'auto'}"`).test(tag), `正文图片 fetchpriority 错误：${tag}`)
  assert(/decoding="async"/.test(tag), `正文图片未异步解码：${tag}`)
  assert(/width="\d+"/.test(tag) && /height="\d+"/.test(tag), `正文图片缺少固有尺寸：${tag}`)
}

let lastImagePosition = -1
for (const sourceUrl of articleImageUrls) {
  const position = articleHtml.indexOf(`src="${sourceUrl}"`, lastImagePosition + 1)
  assert(position > lastImagePosition, `构建后的图片顺序异常：${sourceUrl}`)
  lastImagePosition = position
}

const contentPictureCount = (articleHtml.match(/<picture\b[^>]*class="[^"]*\bresponsive-image--content\b[^"]*"/g) || []).length
const avifSourceCount = (articleHtml.match(/<source[^>]+type="image\/avif"[^>]+srcset=/g) || []).length
const webpSourceCount = (articleHtml.match(/<source[^>]+type="image\/webp"[^>]+srcset=/g) || []).length
assert(contentPictureCount >= articleImageUrls.length, `正文响应式 picture 数量异常：${contentPictureCount}`)
assert(avifSourceCount >= articleImageUrls.length, `AVIF source 数量异常：${avifSourceCount}`)
assert(webpSourceCount >= articleImageUrls.length, `WebP source 数量异常：${webpSourceCount}`)

const generatedFiles = await listFiles(path.join(publicRoot, '_generated'))
const generatedSize = (await Promise.all(generatedFiles.map(async (file) => (await stat(file)).size))).reduce((sum, size) => sum + size, 0)
const generatedFontsCss = await readFile(path.join(publicRoot, '_generated', 'fonts', 'fonts.css'), 'utf8')
const builtFontsCss = await readFile(path.join(distRoot, '_generated', 'fonts', 'fonts.css'), 'utf8')
const criticalCssFiles = await listFiles(path.join(distRoot, 'assets'), new Set(['.css']))
const criticalCss = (await Promise.all(criticalCssFiles.map((file) => readFile(file, 'utf8')))).join('\n')
const generatedFontFaceCount = (generatedFontsCss.match(/@font-face/g) || []).length
assert(generatedFontFaceCount >= 200, `延迟字体声明数量异常：${generatedFontFaceCount}`)
assert(builtFontsCss === generatedFontsCss, '部署产物中的延迟字体样式与构建源不一致')
assert(!criticalCss.includes('font-family:Noto Sans SC Variable') && !criticalCss.includes("font-family:'Noto Sans SC Variable'"), 'Noto Sans 字体声明仍混入关键 CSS')
assert(!criticalCss.includes('font-family:Noto Serif SC Variable') && !criticalCss.includes("font-family:'Noto Serif SC Variable'"), 'Noto Serif 字体声明仍混入关键 CSS')

console.log(JSON.stringify({
  sourceImages: sourceFiles.length,
  generatedFiles: generatedFiles.length,
  checkedVariants,
  checkedProfiles,
  generatedArtifactMB: Number((generatedSize / 1024 / 1024).toFixed(2)),
  deferredFontFaces: generatedFontFaceCount,
  criticalCssKB: Number((criticalCss.length / 1024).toFixed(1)),
  article: {
    images: articleImageUrls.length,
    originalMB: Number((originalBytes / 1024 / 1024).toFixed(2)),
    mobile480AvifMB: Number((mobileBytes / 1024 / 1024).toFixed(2)),
    desktop760AvifMB: Number((desktopBytes / 1024 / 1024).toFixed(2))
  }
}, null, 2))
