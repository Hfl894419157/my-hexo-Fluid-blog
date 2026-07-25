import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import yaml from 'js-yaml'
import {
  buildBilibiliEmbedUrl,
  extractBilibiliId,
  normalizeHomeVideoCases
} from '../.shared/videoClient.js'

const videoContent = JSON.parse(
  readFileSync(new URL('../.shared/content/videos.json', import.meta.url), 'utf8')
)

test('首页视频配置使用后台可编辑的数据结构', () => {
  assert.ok(Array.isArray(videoContent.items))
  assert.ok(videoContent.items.length <= 4)
  assert.equal(new Set(videoContent.items.map((item) => item.id)).size, videoContent.items.length)

  for (const item of videoContent.items) {
    assert.deepEqual(
      Object.keys(item),
      ['id', 'published', 'title', 'category', 'description', 'poster', 'url', 'duration']
    )
    assert.equal(typeof item.published, 'boolean')
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

test('播放器地址关闭弹幕后可以安全销毁并且不泄露原始参数', () => {
  const embed = buildBilibiliEmbedUrl('https://www.bilibili.com/video/BV1xx411c7mD?spm_id_from=333')
  const url = new URL(embed)
  assert.equal(url.origin, 'https://player.bilibili.com')
  assert.equal(url.searchParams.get('bvid'), 'BV1xx411c7mD')
  assert.equal(url.searchParams.get('danmaku'), '0')
  assert.equal(url.searchParams.get('autoplay'), '1')
  assert.equal(url.searchParams.has('spm_id_from'), false)
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
