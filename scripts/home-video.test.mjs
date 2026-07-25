import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import yaml from 'js-yaml'
import {
  buildBilibiliEmbedUrl,
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

test('播放器地址支持静音自动播放并且不泄露原始参数', () => {
  const embed = buildBilibiliEmbedUrl(
    'https://www.bilibili.com/video/BV1xx411c7mD?spm_id_from=333',
    { autoplay: true, muted: true }
  )
  const url = new URL(embed)
  assert.equal(url.origin, 'https://player.bilibili.com')
  assert.equal(url.searchParams.get('bvid'), 'BV1xx411c7mD')
  assert.equal(url.searchParams.get('danmaku'), '0')
  assert.equal(url.searchParams.get('autoplay'), '1')
  assert.equal(url.searchParams.get('muted'), '1')
  assert.equal(url.searchParams.has('spm_id_from'), false)
})

test('用户点击播放时可以生成非静音的本页播放器地址', () => {
  const embed = buildBilibiliEmbedUrl(
    'https://www.bilibili.com/video/BV1xx411c7mD',
    { autoplay: true, muted: false }
  )
  const url = new URL(embed)
  assert.equal(url.searchParams.get('autoplay'), '1')
  assert.equal(url.searchParams.get('muted'), '0')
})

test('首页播放器原位加载并按视口、设备与用户偏好控制自动播放', () => {
  assert.match(showcaseSource, /ref="stage"/)
  assert.match(showcaseSource, /v-if="iframeSrc"/)
  assert.match(showcaseSource, /new IntersectionObserver/)
  assert.match(showcaseSource, /intersectionRatio >= 0\.5/)
  assert.match(showcaseSource, /intersectionRatio < 0\.25/)
  assert.match(showcaseSource, /stageVisibilityRatio < 0\.5/)
  assert.match(showcaseSource, /startPlayback\(\{ muted: true, mode: 'auto' \}\)/)
  assert.match(showcaseSource, /desktopQuery\?\.matches/)
  assert.match(showcaseSource, /!reducedMotionQuery\?\.matches/)
  assert.match(showcaseSource, /!connection\?\.saveData/)
  assert.doesNotMatch(showcaseSource, /<dialog/)
  assert.doesNotMatch(showcaseSource, /前往哔哩哔哩观看/)
})

test('单条视频使用紧凑入口，多条视频继续使用动态列数', () => {
  assert.match(showcaseSource, /'video-list--single': cases\.length === 1/)
  assert.match(showcaseSource, /--video-card-columns/)
  assert.match(showcaseSource, /\.video-list--single\s*\{[\s\S]*?minmax\(0, 320px\)/)
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
