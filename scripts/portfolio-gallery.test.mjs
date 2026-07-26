import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const gallerySource = readFileSync(
  new URL('../components/PortfolioGallery.vue', import.meta.url),
  'utf8'
)
const contentBlocksSource = readFileSync(
  new URL('../components/ContentBlocks.vue', import.meta.url),
  'utf8'
)
const lightboxSource = readFileSync(
  new URL('../components/ContentLightbox.vue', import.meta.url),
  'utf8'
)
const featuredCasesSource = readFileSync(
  new URL('../components/home/HomeFeaturedCases.vue', import.meta.url),
  'utf8'
)

test('作品详情图库从图片固有尺寸自动识别方向', () => {
  assert.match(gallerySource, /naturalWidth/)
  assert.match(gallerySource, /naturalHeight/)
  assert.match(gallerySource, /resolveResponsiveImage\(item\.src\)/)
  assert.doesNotMatch(gallerySource, /item\.layout/)
})

test('作品详情图库保留顺序并将相邻竖图配对', () => {
  assert.match(gallerySource, /while \(i < props\.items\.length\)/)
  assert.match(gallerySource, /orientationFor\(next, i \+ 1\) === 'portrait'/)
  assert.match(gallerySource, /class: hasPortraitPair \? 'row-portrait-pair' : 'row-portrait-single'/)
  assert.match(gallerySource, /i \+= hasPortraitPair \? 2 : 1/)
})

test('横图整行、落单竖图居中且移动端统一单列', () => {
  assert.match(gallerySource, /\.pf-row\.row-landscape[\s\S]*?width: 100%/)
  assert.match(gallerySource, /\.pf-row\.row-portrait-single \.pf-figure[\s\S]*?width: min\(68%, 520px\)/)
  assert.match(gallerySource, /@media \(max-width: 640px\)[\s\S]*?flex-direction: column/)
  assert.match(gallerySource, /\.pf-row\.row-portrait-single \.pf-figure \{ width: 100%; \}/)
})

test('作品详情页的 gallery block 统一复用 PortfolioGallery', () => {
  assert.match(contentBlocksSource, /variant === 'portfolio'/)
  assert.match(contentBlocksSource, /<PortfolioGallery/)
  assert.match(contentBlocksSource, /:items="block\.items"/)
})

test('正文图片、独立图片与图片组统一进入可键盘操作的灯箱预览', () => {
  assert.match(contentBlocksSource, /\.content-block--rich img/)
  assert.match(contentBlocksSource, /\.content-block--image img/)
  assert.match(contentBlocksSource, /\.content-block--gallery img/)
  assert.match(contentBlocksSource, /\.pf-gallery img/)
  assert.match(contentBlocksSource, /setAttribute\('tabindex', '0'\)/)
  assert.match(contentBlocksSource, /event\.key !== 'Enter' && event\.key !== ' '/)
  assert.match(contentBlocksSource, /<ContentLightbox/)
})

test('灯箱提供关闭、前后切换、焦点恢复和移动端适配', () => {
  assert.match(lightboxSource, /role="dialog"/)
  assert.match(lightboxSource, /aria-modal="true"/)
  assert.match(lightboxSource, /event\.key === 'Escape'/)
  assert.match(lightboxSource, /event\.key === 'ArrowLeft'/)
  assert.match(lightboxSource, /event\.key === 'ArrowRight'/)
  assert.match(lightboxSource, /event\.key === 'Tab'/)
  assert.match(lightboxSource, /closeButton\.value\?\.focus\(\)/)
  assert.match(lightboxSource, /body\.classList\.toggle\('content-lightbox-open'/)
  assert.match(lightboxSource, /@media \(max-width: 640px\)/)
  assert.match(contentBlocksSource, /previewTrigger\?\.focus\(\)/)
})

test('首页精选作品与视频舞台只保留轻量外投影', () => {
  assert.match(featuredCasesSource, /box-shadow: 0 16px 44px color-mix\(in srgb, var\(--text-main\) 7%, transparent\)/)
  assert.doesNotMatch(featuredCasesSource, /0 28px 80px/)
})
