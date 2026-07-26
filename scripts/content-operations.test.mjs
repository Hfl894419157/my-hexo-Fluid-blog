import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'
import { latestPublished, normalizeHomeSelections, resolveSelections, resolveVisibleSelections } from '../.shared/contentClient.js'
import { getPageClass, isManagedContentPath, normalizeContentData, normalizePortfolioGalleryLayout } from '../.shared/contentSchema.mjs'
import { collectContentRedirects, parseRenameLog, resolveRenameChains } from './lib/content-history.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const collectionNames = ['cases', 'workflows', 'learning_entries', 'method_entries', 'resource_entries']
const flattenContent = (entries = []) => entries.flatMap((entry) => entry.type === 'group' ? flattenContent(entry.items || []) : [entry])

test('五个内容集合开放文件名、重命名和删除，并使用稳定 contentId', async () => {
  const config = yaml.load(await readFile(path.join(repoRoot, '.pages.yml'), 'utf8'))
  const entries = flattenContent(config.content || [])
  const collections = entries.filter((entry) => collectionNames.includes(entry.name))
  assert.equal(collections.length, collectionNames.length)

  for (const collection of collections) {
    if (collection.name !== 'cases') {
      assert.equal(collection.filename.field, true, `${collection.name} 应显示文件名`)
    } else {
      assert.ok(typeof collection.filename === 'string' || collection.filename.field === true, `${collection.name} 应配置文件名模板`)
    }
    assert.deepEqual(collection.operations, { create: true, rename: true, delete: true })
    assert.ok(collection.fields.some((field) => field.name === 'contentId' && field.component === 'content_id'))
    const duplicateAction = collection.actions.find((action) => action.name === 'duplicate-content')
    assert.equal(duplicateAction.workflow, 'duplicate-content.yml')
    assert.equal(duplicateAction.scope, 'entry')
  }

  const homepage = entries.find((entry) => entry.name === 'homepage')
  const referenceFields = [
    homepage.fields.find((field) => field.name === 'featuredCases'),
    homepage.fields.find((field) => field.name === 'featuredWorkflows'),
    ...homepage.fields.find((field) => field.name === 'knowledge').fields
  ]
  assert.ok(referenceFields.every((field) => field.options.value === '{fields.contentId}'))
})

test('Pages CMS 使用知识库与站点管理分组，并提供 FAQ、关于页、个人资料和 PDF 媒体', async () => {
  const config = yaml.load(await readFile(path.join(repoRoot, '.pages.yml'), 'utf8'))
  const groups = (config.content || []).filter((entry) => entry.type === 'group')
  assert.ok(groups.some((entry) => entry.name === 'knowledge_content'))
  assert.ok(groups.some((entry) => entry.name === 'site_management'))
  const entries = flattenContent(config.content || [])
  assert.ok(entries.some((entry) => entry.name === 'faq' && entry.path === '.shared/content/faq.json'))
  assert.ok(entries.some((entry) => entry.name === 'profile' && entry.path === '.shared/content/profile.json'))
  assert.ok(entries.some((entry) => entry.name === 'about_page' && entry.path === '.shared/content/aboutPage.json'))
  assert.ok(!entries.some((entry) => entry.name === 'about_cards'))
  assert.ok((config.media || []).some((entry) => entry.name === 'documents' && entry.extensions.includes('pdf')))
})

test('关于我页面的首页摘要、首屏、能力、交付流程和职业履历均由后台数据驱动', async () => {
  const aboutPage = JSON.parse(await readFile(path.join(repoRoot, '.shared/content/aboutPage.json'), 'utf8'))
  const source = await readFile(path.join(repoRoot, 'components/AboutPage.vue'), 'utf8')
  const homeSource = await readFile(path.join(repoRoot, 'components/home/HomeAboutSection.vue'), 'utf8')

  assert.equal(aboutPage.home.highlights.length, 3)
  assert.ok(aboutPage.workbench.capabilities.length > 0)
  assert.ok(aboutPage.delivery.stages.length > 0)
  assert.equal(aboutPage.resume.experience.length, 2)
  assert.ok(aboutPage.resume.skills.length > 0)
  assert.deepEqual(Object.keys(aboutPage.resume.labels), [
    'experience',
    'project',
    'education',
    'recognition',
    'contact',
    'portfolio',
    'download'
  ])
  assert.deepEqual(aboutPage.resume.metrics.map((item) => item.icon), ['experience', 'content', 'delivery'])
  assert.match(source, /aboutPage\.workbench\?\.capabilities/)
  assert.match(source, /aboutPage\.delivery\?\.stages/)
  assert.match(source, /aboutPage\.resume/)
  assert.match(source, /resume\.labels\.experience/)
  assert.match(source, /resume\.labels\.download/)
  assert.match(source, /data-testid="resume-section"/)
  assert.match(source, /v-if="profile\.resumePdf"/)
  assert.doesNotMatch(source, /CAREER PROFILE|RECENT EXPERIENCE|SELECTED PROJECT|CAPABILITY MAP/)
  assert.match(homeSource, /aboutPage\.home/)
})

test('首页配置缺少空字段时自动补齐', () => {
  assert.deepEqual(normalizeHomeSelections({ featuredWorkflows: ['workflow-id'] }), {
    featuredCases: [],
    featuredWorkflows: ['workflow-id'],
    knowledge: { learning: [], methods: [], resources: [] }
  })
})

test('首页选择同时兼容 contentId、旧 sourcePath 和工作流筹备卡', () => {
  const item = {
    contentId: '3b346090-470d-48a6-aba6-c9b910769816',
    sourcePath: 'aigc/example.md',
    status: 'published'
  }
  const planned = {
    contentId: '9a9cf592-d2e1-4b31-ac10-91008cf9565e',
    sourcePath: 'aigc/workflow-placeholder.md',
    status: 'planned'
  }
  assert.deepEqual(resolveSelections([item], [item.contentId]), [item])
  assert.deepEqual(resolveSelections([item], [item.sourcePath]), [item])
  assert.deepEqual(resolveSelections([planned], [planned.contentId]), [])
  assert.deepEqual(resolveVisibleSelections([item, planned], [item.contentId, planned.contentId]), [item, planned])
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
  assert.deepEqual(normalized.project, { role: '', year: '', client: '', services: [], outcome: '' })
  assert.equal(normalized.resourceMeta.type, 'other')
  assert.equal(normalized.resourceMeta.access, 'contact')
})

test('知识库最近更新只返回最多六篇已发布内容并按更新时间倒序', () => {
  const items = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    status: index === 7 ? 'draft' : 'published',
    updatedAt: `2026-07-${String(index + 1).padStart(2, '0')}`,
    createdAt: '2026-01-01'
  }))
  assert.deepEqual(latestPublished(items, 6).map((item) => item.id), [6, 5, 4, 3, 2, 1])
})

test('FAQ 首版包含三组各四题，并接入搜索锚点与 FAQPage 结构化数据', async () => {
  const faq = JSON.parse(await readFile(path.join(repoRoot, '.shared/content/faq.json'), 'utf8'))
  const published = faq.items.filter((item) => item.published !== false)
  assert.equal(published.length, 12)
  for (const category of ['cooperation', 'resources', 'site']) {
    assert.equal(published.filter((item) => item.category === category).length, 4)
  }
  const searchSource = await readFile(path.join(repoRoot, '.vitepress/search.data.mjs'), 'utf8')
  const pageSearchSource = await readFile(path.join(repoRoot, 'components/PageSearch.vue'), 'utf8')
  const configSource = await readFile(path.join(repoRoot, '.vitepress/config.mts'), 'utf8')
  assert.match(searchSource, /normalizeSearchUrl\(page\.url\) === '\/faq'/)
  assert.match(searchSource, /frontmatter\?\.publishing\?\.status \|\| frontmatter\?\.status \|\| 'published'/)
  assert.match(searchSource, /anchor: item\.id/)
  assert.match(pageSearchSource, /target: heading && !titleMatches/)
  assert.match(pageSearchSource, /:href="withBase\(result\.target \|\| result\.url\)"/)
  assert.match(configSource, /'@type': 'FAQPage'/)
})

test('全局页面标题使用 Liuli AI Lab 且公开页面元数据不包含真实姓名', async () => {
  const configSource = await readFile(path.join(repoRoot, '.vitepress/config.mts'), 'utf8')
  const resumeSource = await readFile(path.join(repoRoot, 'resume.md'), 'utf8')
  assert.match(configSource, /title: 'Liuli AI Lab'/)
  assert.match(configSource, /titleTemplate: ':title · Liuli AI Lab'/)
  assert.doesNotMatch(configSource, /韩福利/)
  assert.match(resumeSource, /title: 关于我/)
  assert.doesNotMatch(resumeSource, /关于韩福利/)
})

test('客服二维码预先挂载并使用 eager 响应式图片', async () => {
  const source = await readFile(path.join(repoRoot, 'components/FloatingActions.vue'), 'utf8')
  assert.match(source, /v-show="contactOpen"/)
  assert.equal((source.match(/\s+eager\s*\n/g) || []).length, 2)
  assert.doesNotMatch(source, /v-if="contactOpen"/)
})

test('作品资料和资源获取方式按新结构归一化', () => {
  const project = normalizeContentData({
    project: { role: '视觉设计', year: 2026, client: '示例品牌', services: ['策略', '设计'], outcome: '完成交付' }
  }, 'portfolio/example.md')
  assert.deepEqual(project.project, { role: '视觉设计', year: '2026', client: '示例品牌', services: ['策略', '设计'], outcome: '完成交付' })

  const resource = normalizeContentData({
    resourceMeta: { type: 'software', access: 'official', platform: 'Adobe', licenseNote: '请使用正版' }
  }, 'knowledge/resources/example.md')
  assert.deepEqual(resource.resourceMeta, { type: 'software', access: 'official', platform: 'Adobe', licenseNote: '请使用正版' })
})

test('栏目 index 页面不会被误判为受管详情页', () => {
  assert.equal(isManagedContentPath('portfolio/index.md'), false)
  assert.equal(isManagedContentPath('aigc/index.md'), false)
  assert.equal(getPageClass('portfolio/index.md'), '')
  assert.equal(isManagedContentPath('portfolio/example.md'), true)
  assert.equal(getPageClass('portfolio/example.md'), 'page-case-detail')
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

test('Pages CMS 提供九宫格焦点、首页覆盖图和高保真 HTML Source 切换', async () => {
  const config = yaml.load(await readFile(path.join(repoRoot, '.pages.yml'), 'utf8'))
  const cover = config.components.content_cover
  const focalPoint = cover.fields.find((field) => field.name === 'focalPoint')
  const homeOverride = cover.fields.find((field) => field.name === 'homeOverrideSrc')
  const richText = config.components.content_blocks.blocks
    .find((block) => block.name === 'richText')
    .fields.find((field) => field.name === 'html')

  assert.equal(focalPoint.default, 'center')
  assert.equal(focalPoint.options.values.length, 9)
  assert.equal(homeOverride.type, 'image')
  assert.deepEqual(richText.options, {
    format: 'html',
    switcher: true,
    media: 'images',
    path: 'public/images/uploads/imported',
    rename: 'random'
  })
})

test('作品集后台统一使用单一富文本编辑器', async () => {
  const config = yaml.load(await readFile(path.join(repoRoot, '.pages.yml'), 'utf8'))
  const entries = flattenContent(config.content || [])
  const cases = entries.find((entry) => entry.name === 'cases')
  const contentField = cases.fields.find((field) => field.name === 'content' || field.name === 'contentBlocks')
  assert.ok(contentField, '作品集应包含作品内容字段')
  if (contentField.name === 'content') {
    assert.equal(contentField.type, 'rich-text')
    assert.equal(contentField.options.switcher, true)
  }
})

test('作品图片布局未知时安全回退为自动', () => {
  assert.equal(normalizePortfolioGalleryLayout('full'), 'full')
  assert.equal(normalizePortfolioGalleryLayout('unexpected'), 'auto')

  const normalized = normalizeContentData({
    contentBlocks: [{
      type: 'gallery',
      items: [
        { src: '/images/a.jpg', layout: 'half' },
        { src: '/images/b.jpg', layout: 'unexpected' }
      ]
    }]
  }, 'portfolio/example.md')
  assert.deepEqual(normalized.contentBlocks[0].items.map((item) => item.layout), ['half', 'auto'])
})

test('作品图片拖动后的数组顺序在归一化过程中保持不变', () => {
  const draggedOrder = [
    { id: '1c3c66e2-a0e6-45f6-914f-9006e447e596', src: '/images/c.jpg', alt: '第三张', layout: 'full' },
    { id: '6eed1203-b287-48bd-a0a9-94303fa2eb1d', src: '/images/a.jpg', alt: '第一张', layout: 'third' },
    { id: '0d696df3-90f7-4f6e-8563-9a6e8d94392b', src: '/images/b.jpg', alt: '第二张', layout: 'half' }
  ]
  const normalized = normalizeContentData({
    contentBlocks: [{ type: 'gallery', items: draggedOrder }]
  }, 'portfolio/example.md')

  assert.deepEqual(
    normalized.contentBlocks[0].items.map((item) => item.id),
    draggedOrder.map((item) => item.id)
  )
})

test('作品图片组启用兼容现有数据结构的批量上传', async () => {
  const config = yaml.load(await readFile(path.join(repoRoot, '.pages.yml'), 'utf8'))
  const cases = config.content.find((entry) => entry.name === 'cases')
  const contentField = cases.fields.find((field) => field.name === 'contentBlocks')
  const blocks = config.components[contentField.component]
  const gallery = blocks.blocks.find((block) => block.name === 'gallery')
  const items = gallery.fields.find((field) => field.name === 'items')

  assert.equal(items.type, 'object')
  assert.equal(items.list.batch, true)
  assert.deepEqual(
    items.fields.map((field) => field.name),
    ['id', 'src', 'alt', 'caption']
  )
})

test('索引页只移除指定页面的顶部介绍与页内搜索', async () => {
  const [overview, portfolio, workflows, blog, resources, knowledge, header] = await Promise.all([
    readFile(path.join(repoRoot, 'components/OverviewPage.vue'), 'utf8'),
    readFile(path.join(repoRoot, 'portfolio/PortfolioList.vue'), 'utf8'),
    readFile(path.join(repoRoot, 'aigc/AigcList.vue'), 'utf8'),
    readFile(path.join(repoRoot, 'blog/BlogList.vue'), 'utf8'),
    readFile(path.join(repoRoot, 'resources/ResourcesList.vue'), 'utf8'),
    readFile(path.join(repoRoot, 'components/KnowledgeHub.vue'), 'utf8'),
    readFile(path.join(repoRoot, 'components/SiteHeader.vue'), 'utf8')
  ])

  assert.match(overview, /v-if="showHero"/)
  assert.match(portfolio, /:show-hero="false"/)
  assert.match(workflows, /:show-hero="false"/)
  assert.doesNotMatch(blog, /show-hero/)
  assert.doesNotMatch(resources, /show-hero/)
  assert.doesNotMatch(knowledge, /PageHero|PageSearch/)
  assert.match(header, /<SiteSearch/)
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
