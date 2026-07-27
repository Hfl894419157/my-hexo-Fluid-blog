import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import yaml from 'js-yaml'
import {
  extractBilibiliId,
  normalizeHomeVideoCases,
  normalizeHomeVideoPlaceholderCases
} from '../.shared/videoClient.js'

const videoContent = JSON.parse(
  readFileSync(new URL('../.shared/content/videos.json', import.meta.url), 'utf8')
)
const showcaseSource = readFileSync(
  new URL('../components/home/HomeVideoShowcase.vue', import.meta.url),
  'utf8'
)

test('首页视频配置使用后台可编辑的数据结构并允许省略未配置的链接', () => {
  assert.ok(Array.isArray(videoContent.items))
  assert.ok(videoContent.items.length <= 4)
  assert.equal(new Set(videoContent.items.map((item) => item.id)).size, videoContent.items.length)

  const requiredFields = ['id', 'published', 'title', 'category', 'description', 'poster', 'duration']
  const allowedFields = new Set([...requiredFields, 'url'])

  for (const item of videoContent.items) {
    assert.deepEqual(
      Object.keys(item).filter((key) => key !== 'url'),
      requiredFields
    )
    assert.ok(Object.keys(item).every((key) => allowedFields.has(key)))
    assert.equal(typeof item.published, 'boolean')
    if (Object.hasOwn(item, 'url')) assert.equal(typeof item.url, 'string')
    assert.match(item.poster, /^\//)
    assert.equal(Object.hasOwn(item, 'featuredOrder'), false)
    assert.equal(Object.hasOwn(item, 'videoUrl'), false)
  }
})

test('B 站链接只提取可信域名中的 BV 编号', () => {
  assert.equal(extractBilibiliId('BV1xx411c7mD'), 'BV1xx411c7mD')
  assert.equal(extractBilibiliId('https://www.bilibili.com/video/BV1xx411c7mD?p=1'), 'BV1xx411c7mD')
  assert.equal(extractBilibiliId('https://m.bilibili.com/video/BV1xx411c7mD'), 'BV1xx411c7mD')
  assert.equal(extractBilibiliId('https://b23.tv/BV1xx411c7mD'), 'BV1xx411c7mD')
  assert.equal(extractBilibiliId('https://example.com/video/BV1xx411c7mD'), '')
  assert.equal(extractBilibiliId('https://b23.tv/short-code'), '')
})

test('首页视频统一使用海报与 B 站外链，不嵌入受限播放器', () => {
  assert.match(showcaseSource, /:href="activeCase\.url"/)
  assert.match(showcaseSource, /target="_blank"/)
  assert.match(showcaseSource, /rel="noopener noreferrer"/)
  assert.doesNotMatch(showcaseSource, /<iframe/)
  assert.doesNotMatch(showcaseSource, /buildBilibiliEmbedUrl/)
  assert.doesNotMatch(showcaseSource, /IntersectionObserver/)
  assert.doesNotMatch(showcaseSource, /在哔哩哔哩打开/)
})

test('单条视频隐藏缩略列表，多条视频按数组顺序提供完整切换列表', () => {
  assert.match(showcaseSource, /v-if="cases\.length > 1"[\s\S]*?ref="videoList"/)
  assert.match(showcaseSource, /ref="videoList"/)
  assert.match(showcaseSource, /v-for="\(item, index\) in cases"/)
  assert.match(showcaseSource, /const activeIndex = ref\(0\)/)
  assert.match(showcaseSource, /@click="selectCase\(index\)"/)
  assert.match(showcaseSource, /const listMaxWidth = computed/)
  assert.match(showcaseSource, /--video-card-columns/)
  assert.match(showcaseSource, /--video-list-max-width/)
  assert.match(showcaseSource, /width: min\(var\(--video-list-max-width\), 100%\)/)
})

test('视频模块使用明确的次级标题层级且不显示装饰眉题和数字索引', () => {
  assert.doesNotMatch(showcaseSource, /video-showcase__eyebrow/)
  assert.doesNotMatch(showcaseSource, /video-showcase__index/)
  assert.match(showcaseSource, /\.video-showcase__head[\s\S]*?text-align: center/)
  assert.match(showcaseSource, /font-size: clamp\(30px, 3vw, 36px\)/)
  assert.match(showcaseSource, /\.video-stage__copy h4[\s\S]*?font-size: clamp\(24px, 2\.4vw, 30px\)/)
})

test('视频舞台使用全站统一边框且不使用深色外投影', () => {
  assert.match(showcaseSource, /border: 1px solid var\(--border-soft\)/)
  assert.match(showcaseSource, /border-radius: var\(--radius-card\)/)
  assert.match(showcaseSource, /background: var\(--bg-card\)/)
  assert.doesNotMatch(showcaseSource, /box-shadow: 0 16px 44px/)
  assert.doesNotMatch(showcaseSource, /background: #0f0d0b/)
})

test('视频主封面和缩略图使用响应式图片并继续懒加载', () => {
  assert.match(showcaseSource, /import ResponsiveImage from '\.\.\/ResponsiveImage\.vue'/)
  assert.match(showcaseSource, /profile="homeCase"/)
  assert.match(showcaseSource, /sizes="\(max-width: 899px\) 100vw, 960px"/)
  assert.match(showcaseSource, /profile="card"/)
  assert.match(showcaseSource, /sizes="\(max-width: 899px\) 76vw, 300px"/)
})

test('首页只保留已发布、完整且有效的前四条视频', () => {
  const valid = {
    id: 'video-1',
    published: true,
    title: '视频案例',
    category: '动态视觉',
    description: '完整说明',
    poster: '/images/uploads/video.jpg',
    url: 'https://www.bilibili.com/video/BV1xx411c7mD',
    duration: '00:36'
  }
  const cases = normalizeHomeVideoCases([
    { ...valid, published: false },
    { ...valid, id: 'video-2' },
    { ...valid, id: 'video-3' },
    { ...valid, id: 'video-4' },
    { ...valid, id: 'video-5' },
    { ...valid, id: 'video-6' },
    { ...valid, id: 'missing-category', category: '' },
    { ...valid, id: 'invalid', url: 'https://example.com/video/BV1xx411c7mD' }
  ])
  assert.deepEqual(cases.map((item) => item.id), ['video-2', 'video-3', 'video-4', 'video-5'])
})

test('没有正式视频时可以使用资料完整的草稿生成公开占位案例', () => {
  const placeholders = normalizeHomeVideoPlaceholderCases([
    {
      id: 'draft-1',
      published: false,
      title: '占位案例',
      category: '三维渲染视频',
      description: '用于展示首页视频版式。',
      poster: '/images/uploads/video.jpg',
      url: '',
      duration: '00:36'
    },
    {
      id: 'draft-2',
      published: false,
      title: '',
      category: 'AI 制作视频',
      description: '标题缺失时不展示。',
      poster: '/images/uploads/video-2.jpg',
      url: '',
      duration: ''
    }
  ])

  assert.deepEqual(placeholders.map((item) => item.id), ['draft-1'])
  assert.equal(placeholders[0].url, '')
  assert.equal(placeholders[0].bvid, '')
})

test('Pages CMS 提供首页视频案例管理入口和完整字段', () => {
  const config = yaml.load(readFileSync(new URL('../.pages.yml', import.meta.url), 'utf8'))
  const siteManagement = config.content.find((entry) => entry.name === 'site_management')
  const videos = siteManagement.items.find((entry) => entry.name === 'home_videos')
  const items = videos.fields.find((field) => field.name === 'items')
  const fieldNames = items.fields.map((field) => field.name)

  assert.equal(videos.path, '.shared/content/videos.json')
  assert.equal(items.list.max, 4)
  assert.deepEqual(
    fieldNames,
    ['id', 'published', 'title', 'category', 'description', 'poster', 'url', 'duration']
  )
})
