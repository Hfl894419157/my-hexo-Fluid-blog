import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'
import { normalizeHomeSelections, resolveSelections } from '../.shared/contentClient.js'
import { normalizeContentData } from '../.shared/contentSchema.mjs'
import { collectContentRedirects, parseRenameLog, resolveRenameChains } from './lib/content-history.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const collectionNames = ['cases', 'workflows', 'learning_entries', 'method_entries', 'resource_entries']

test('五个内容集合开放文件名、重命名和删除，并使用稳定 contentId', async () => {
  const config = yaml.load(await readFile(path.join(repoRoot, '.pages.yml'), 'utf8'))
  const collections = (config.content || []).filter((entry) => collectionNames.includes(entry.name))
  assert.equal(collections.length, collectionNames.length)

  for (const collection of collections) {
    assert.equal(collection.filename.field, true, `${collection.name} 应显示文件名`)
    assert.deepEqual(collection.operations, { create: true, rename: true, delete: true })
    assert.ok(collection.fields.some((field) => field.name === 'contentId' && field.component === 'content_id'))
  }

  const homepage = config.content.find((entry) => entry.name === 'homepage')
  const referenceFields = [
    homepage.fields.find((field) => field.name === 'featuredCases'),
    homepage.fields.find((field) => field.name === 'featuredWorkflows'),
    ...homepage.fields.find((field) => field.name === 'knowledge').fields
  ]
  assert.ok(referenceFields.every((field) => field.options.value === '{fields.contentId}'))
})

test('首页配置缺少空字段时自动补齐', () => {
  assert.deepEqual(normalizeHomeSelections({ featuredWorkflows: ['workflow-id'] }), {
    featuredCases: [],
    featuredWorkflows: ['workflow-id'],
    knowledge: { learning: [], methods: [], resources: [] }
  })
})

test('首页选择同时兼容 contentId 和旧 sourcePath', () => {
  const item = {
    contentId: '3b346090-470d-48a6-aba6-c9b910769816',
    sourcePath: 'aigc/example.md',
    status: 'published'
  }
  assert.deepEqual(resolveSelections([item], [item.contentId]), [item])
  assert.deepEqual(resolveSelections([item], [item.sourcePath]), [item])
})

test('封面、SEO 和标签留空时使用安全回退', () => {
  const normalized = normalizeContentData({
    contentId: '3b346090-470d-48a6-aba6-c9b910769816',
    meta: { title: '示例标题', description: '示例摘要' },
    publishing: { createdAt: '2026-07-15', status: 'published' },
    contentBlocks: [{ type: 'richText', markdown: '正文' }]
  }, 'aigc/example.md')
  assert.equal(normalized.cover, '')
  assert.equal(normalized.coverAlt, '示例标题')
  assert.equal(normalized.coverFocalPoint, 'center')
  assert.equal(normalized.homeOverrideSrc, '')
  assert.equal(normalized.seoTitle, '示例标题')
  assert.equal(normalized.seoDescription, '示例摘要')
  assert.deepEqual(normalized.tags, [])
})

test('封面焦点和首页覆盖图按新结构归一化', () => {
  const normalized = normalizeContentData({
    meta: { title: '封面测试' },
    cover: {
      src: '/images/uploads/master.jpg',
      alt: '主体产品',
      focalPoint: 'top-right',
      homeOverrideSrc: '/images/uploads/home.jpg'
    }
  }, 'portfolio/example.md')

  assert.equal(normalized.cover, '/images/uploads/master.jpg')
  assert.equal(normalized.coverAlt, '主体产品')
  assert.equal(normalized.coverFocalPoint, 'top-right')
  assert.equal(normalized.homeOverrideSrc, '/images/uploads/home.jpg')
})

test('Pages CMS 提供九宫格焦点、首页覆盖图和 Markdown Source 切换', async () => {
  const config = yaml.load(await readFile(path.join(repoRoot, '.pages.yml'), 'utf8'))
  const cover = config.components.content_cover
  const focalPoint = cover.fields.find((field) => field.name === 'focalPoint')
  const homeOverride = cover.fields.find((field) => field.name === 'homeOverrideSrc')
  const richText = config.components.content_blocks.blocks
    .find((block) => block.name === 'richText')
    .fields.find((field) => field.name === 'markdown')

  assert.equal(focalPoint.default, 'center')
  assert.equal(focalPoint.options.values.length, 9)
  assert.equal(homeOverride.type, 'image')
  assert.deepEqual(richText.options, { format: 'markdown', switcher: true, media: 'images' })
})

test('重命名历史可以串联到最终地址', () => {
  const renames = parseRenameLog([
    'R100\taigc/old-name.md\taigc/middle-name.md',
    'R100\taigc/middle-name.md\taigc/final-name.md'
  ].join('\n'))
  assert.equal(resolveRenameChains(renames).get('aigc/old-name.md'), 'aigc/final-name.md')
})

test('删除目标停止跳转，旧文件名被重新占用时不覆盖新页面', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'content-redirects-'))
  const logOutput = [
    'R100\taigc/deleted-old.md\taigc/deleted-target.md',
    'R100\taigc/reused-old.md\taigc/current-target.md',
    'R100\taigc/valid-old.md\taigc/current-target.md'
  ].join('\n')

  try {
    mkdirSync(path.join(root, 'aigc'), { recursive: true })
    writeFileSync(path.join(root, 'aigc', 'current-target.md'), 'target', 'utf8')
    writeFileSync(path.join(root, 'aigc', 'reused-old.md'), 'new article', 'utf8')
    assert.deepEqual(collectContentRedirects({ root, logOutput }), [{
      fromSourcePath: 'aigc/valid-old.md',
      toSourcePath: 'aigc/current-target.md',
      fromUrl: '/aigc/valid-old',
      toUrl: '/aigc/current-target'
    }])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
