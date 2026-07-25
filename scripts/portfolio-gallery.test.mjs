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
