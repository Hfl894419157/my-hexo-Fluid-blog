import { access, readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import sharp from 'sharp'

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

for (const sourcePath of sourceFiles) {
  const sourceUrl = `/${toPosix(path.relative(publicRoot, sourcePath)).normalize('NFC')}`
  const entry = manifest.images[sourceUrl]
  assert(entry, `图片清单缺少原图：${sourceUrl}`)
  assert(entry.width > 0 && entry.height > 0, `图片尺寸无效：${sourceUrl}`)
  if (entry.skipped === 'animated') continue
  assert(entry.variants.length > 0, `图片没有 WebP 变体：${sourceUrl}`)

  for (const variant of entry.variants) {
    assert(variant.width <= entry.width, `图片被放大：${variant.src}`)
    const publicVariant = path.join(publicRoot, variant.src.replace(/^\//, ''))
    const distVariant = path.join(distRoot, variant.src.replace(/^\//, ''))
    await access(publicVariant)
    await access(distVariant)
    const metadata = await sharp(publicVariant).metadata()
    assert(metadata.format === 'webp', `变体不是 WebP：${variant.src}`)
    assert(metadata.width === variant.width, `变体宽度不符：${variant.src}`)
  }
}

const article = await readFile(articlePath, 'utf8')
const articleData = matter(article).data
const articleImageUrls = []
for (const block of articleData.contentBlocks || []) {
  if (block.type === 'image' && block.src) articleImageUrls.push(block.src)
  if (block.type === 'gallery') articleImageUrls.push(...(block.items || []).map((item) => item.src).filter(Boolean))
  if (block.type === 'richText') {
    articleImageUrls.push(...[...String(block.markdown || '').matchAll(/!\[[^\]]*\]\((\/images\/uploads\/[^)\s]+)\)/g)].map((match) => match[1]))
  }
}
assert(articleImageUrls.length === 14, `问题文章正文图片数量异常：${articleImageUrls.length}`)

const chooseVariant = (entry, targetWidth) => entry.variants.find((variant) => variant.width >= targetWidth) || entry.variants.at(-1)
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

assert(desktopBytes < originalBytes, '桌面 WebP 总流量未低于原图')

const articleHtml = await readFile(articleHtmlPath, 'utf8')
const bodyImageTags = [...articleHtml.matchAll(/<img[^>]+src="(\/images\/uploads\/[^"]+)"[^>]*>/g)].map((match) => match[0])
assert(bodyImageTags.length === articleImageUrls.length, `构建后的正文图片数量异常：${bodyImageTags.length}`)
for (const tag of bodyImageTags) {
  assert(/loading="lazy"/.test(tag), `正文图片未懒加载：${tag}`)
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
const webpSourceCount = (articleHtml.match(/<source[^>]+type="image\/webp"[^>]+srcset=/g) || []).length
assert(contentPictureCount >= articleImageUrls.length, `正文响应式 picture 数量异常：${contentPictureCount}`)
assert(webpSourceCount >= articleImageUrls.length, `WebP source 数量异常：${webpSourceCount}`)

const generatedFiles = await listFiles(path.join(publicRoot, '_generated'))
const generatedSize = (await Promise.all(generatedFiles.map(async (file) => (await stat(file)).size))).reduce((sum, size) => sum + size, 0)

console.log(JSON.stringify({
  sourceImages: sourceFiles.length,
  generatedVariants: generatedFiles.length,
  generatedArtifactMB: Number((generatedSize / 1024 / 1024).toFixed(2)),
  article: {
    images: articleImageUrls.length,
    originalMB: Number((originalBytes / 1024 / 1024).toFixed(2)),
    mobile480MB: Number((mobileBytes / 1024 / 1024).toFixed(2)),
    desktop760MB: Number((desktopBytes / 1024 / 1024).toFixed(2))
  }
}, null, 2))
