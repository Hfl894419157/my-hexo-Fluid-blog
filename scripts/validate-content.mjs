import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import { loadContentCatalog, loadHomeSelections, repoRoot } from '../.shared/contentCatalog.mjs'
import { portfolioGalleryLayouts } from '../.shared/contentSchema.mjs'
import { richHtmlImages, sanitizeRichHtml } from '../.shared/richHtml.mjs'
import { extractBilibiliId } from '../.shared/videoClient.js'

const allowedStatuses = new Set(['draft', 'planned', 'published', 'archived'])
const allowedBlockTypes = new Set(['richText', 'image', 'gallery', 'video', 'download', 'externalLink'])
const allowedResourceTypes = new Set(['software', 'ai-tool', 'plugin', 'prompt', 'template', 'asset', 'document', 'other'])
const allowedResourceAccess = new Set(['official', 'cloud', 'contact'])
const allowedPortfolioGalleryLayouts = new Set(portfolioGalleryLayouts)
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const filenamePattern = /^[a-z0-9-]+\.md$/
const legacyKeys = ['title', 'description', 'slug', 'createdAt', 'status', 'verificationStatus', 'showInRecentUpdates', 'tags', 'coverAlt', 'pageClass']
const catalog = loadContentCatalog()
const selections = loadHomeSelections()
const homeVideos = JSON.parse(readFileSync(path.join(repoRoot, '.shared', 'content', 'videos.json'), 'utf8'))
const errors = []
const warnings = []
const seenContentIds = new Map()
const flattenContent = (entries = []) => entries.flatMap((entry) => entry.type === 'group' ? flattenContent(entry.items || []) : [entry])

const requireValue = (condition, message) => {
  if (!condition) errors.push(message)
}

const checkImage = (sourcePath, label, value) => {
  if (!value || /^(?:https?:)?\/\//i.test(value) || /^(?:data|blob):/i.test(value)) return
  requireValue(String(value).startsWith('/'), `${sourcePath}: ${label} 必须是站点绝对路径或外部 URL`)
  if (!String(value).startsWith('/')) return
  let decodedValue = String(value)
  try {
    decodedValue = decodeURIComponent(decodedValue)
  } catch (e) {
    // 忽略解码错误
  }
  const imagePath = path.join(repoRoot, 'public', decodedValue.replace(/^\//, ''))
  if (!existsSync(imagePath)) {
    warnings.push(`${sourcePath}: ${label} 找不到图片 ${value}`)
  }
}


for (const item of catalog.all) {
  const absolutePath = path.join(repoRoot, item.sourcePath)
  const parsed = matter(readFileSync(absolutePath, 'utf8'))
  const data = parsed.data || {}
  const prefix = item.sourcePath

  requireValue(filenamePattern.test(path.basename(item.sourcePath)), `${prefix}: 文件名只能包含小写英文、数字、短横线，并以 .md 结尾`)
  for (const key of legacyKeys) {
    requireValue(!Object.hasOwn(data, key), `${prefix}: 不再允许旧字段 ${key}`)
  }
  requireValue(data.meta && typeof data.meta === 'object', `${prefix}: 缺少 meta`)
  requireValue(data.publishing && typeof data.publishing === 'object', `${prefix}: 缺少 publishing`)
  requireValue(!data.cover || typeof data.cover === 'object', `${prefix}: cover 必须是对象`)
  requireValue(!data.seo || typeof data.seo === 'object', `${prefix}: seo 必须是对象`)
  requireValue(Boolean(data.content) || Array.isArray(data.contentBlocks), `${prefix}: 必须包含 content 正文或 contentBlocks 数组`)
  requireValue(uuidPattern.test(String(data.contentId || '')), `${prefix}: 缺少有效 contentId UUID v4`)
  if (uuidPattern.test(String(data.contentId || ''))) {
    const duplicatePath = seenContentIds.get(data.contentId)
    requireValue(!duplicatePath, `${prefix}: contentId 与 ${duplicatePath} 重复`)
    seenContentIds.set(data.contentId, prefix)
  }
  requireValue(item.title, `${prefix}: 缺少 meta.title`)
  requireValue(item.desc, `${prefix}: 缺少 meta.description`)
  requireValue(allowedStatuses.has(item.status), `${prefix}: publishing.status 必须是 draft / planned / published / archived`)
  requireValue(item.createdAt !== '2099-12-31', `${prefix}: 缺少 publishing.createdAt`)
  if (!item.tags.length) warnings.push(`${prefix}: 建议至少填写一个 meta.tags`)
  const hasContent = Boolean(data.content) || (Array.isArray(data.contentBlocks) && data.contentBlocks.length > 0)
  if (item.status === 'published') requireValue(hasContent, `${prefix}: 已发布内容至少需要包含作品内容或内容模块`)
  if (item.kind === 'case' && item.status === 'published') {
    let portfolioImageCount = (data.contentBlocks || []).reduce((count, block) => {
      if (block?.type === 'image' && block.src) return count + 1
      if (block?.type === 'gallery') return count + (block.items || []).filter((image) => image?.src).length
      return count
    }, 0)
    if (data.content && typeof data.content === 'string') {
      portfolioImageCount += richHtmlImages(data.content).length
    }
    requireValue(String(data.cover?.src || '').trim(), `${prefix}: 已发布作品必须设置卡片封面`)
    requireValue(portfolioImageCount > 0, `${prefix}: 已发布作品至少需要一张作品图片`)
  }

  if (item.kind === 'resource' && data.resourceMeta) {
    requireValue(allowedResourceTypes.has(String(data.resourceMeta.type || '')), `${prefix}: resourceMeta.type 无效`)
    requireValue(allowedResourceAccess.has(String(data.resourceMeta.access || '')), `${prefix}: resourceMeta.access 无效`)
  }

  checkImage(prefix, 'cover.src', data.cover?.src)
  if (data.cover?.src && !String(data.cover?.alt || '').trim()) {
    warnings.push(`${prefix}: cover.alt 为空，将自动使用文章标题`)
  }

  const seenIds = new Set()
  for (const [index, block] of (data.contentBlocks || []).entries()) {
    const label = `${prefix}: contentBlocks[${index}]`
    requireValue(allowedBlockTypes.has(block?.type), `${label} 模块类型无效`)
    requireValue(uuidPattern.test(String(block?.id || '')), `${label} 缺少有效 UUID v4`)
    requireValue(!seenIds.has(block?.id), `${label} UUID 重复`)
    seenIds.add(block?.id)

    if (block?.type === 'richText') {
      const html = String(block.html || '')
      const legacyMarkdown = String(block.legacyMarkdown || block.markdown || '')
      requireValue(html.trim() || legacyMarkdown.trim(), `${label} richText 正文不能为空`)
      if (html.trim()) {
        requireValue(block.format === 'html', `${label} 使用 html 时 format 必须为 html`)
        requireValue(!/<(?:script|style|iframe)\b/i.test(html), `${label} 不允许 script / style / iframe`)
        requireValue(!/\son[a-z]+\s*=/i.test(html), `${label} 不允许 HTML 事件属性`)
        requireValue(!/javascript\s*:/i.test(html), `${label} 不允许 javascript: 链接`)
        requireValue(!/(?:position\s*:\s*(?:fixed|absolute)|margin(?:-[a-z]+)?\s*:\s*-)/i.test(html), `${label} 不允许固定定位或负边距`)
        requireValue(sanitizeRichHtml(html).trim().length > 0, `${label} HTML 清洗后不能为空`)
        for (const [imageIndex, image] of richHtmlImages(html).entries()) {
          const imageLabel = `${label} HTML 图片[${imageIndex}]`
          requireValue(image.src.startsWith('/images/uploads/'), `${imageLabel} 必须归档到 /images/uploads/`)
          if (!String(image.alt || '').trim()) {
            warnings.push(`${imageLabel} alt 为空`)
          }
          checkImage(prefix, imageLabel, image.src)
        }
      } else {
        requireValue(!/<img\b[^>]*\bsrc=["']\//i.test(legacyMarkdown), `${label} 旧 Markdown 不允许直接输出本地 <img>`)
        for (const match of legacyMarkdown.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
          checkImage(prefix, `${label} Markdown 图片`, match[1])
        }
      }
    }
    if (block?.type === 'image') {
      requireValue(block.src, `${label} image.src 不能为空`)
      requireValue(String(block.alt || '').trim(), `${label} image.alt 不能为空`)
      checkImage(prefix, `${label}.src`, block.src)
    }
    if (block?.type === 'gallery') {
      requireValue(Array.isArray(block.items) && block.items.length > 0, `${label} gallery.items 不能为空`)
      for (const [itemIndex, image] of (block.items || []).entries()) {
        requireValue(image.src, `${label}.items[${itemIndex}].src 不能为空`)
        requireValue(String(image.alt || '').trim(), `${label}.items[${itemIndex}].alt 不能为空`)
        checkImage(prefix, `${label}.items[${itemIndex}].src`, image.src)
        if (item.kind === 'case') {
          if (image.id) {
            requireValue(uuidPattern.test(String(image.id)), `${label}.items[${itemIndex}].id 必须是 UUID v4`)
            requireValue(!seenIds.has(image.id), `${label}.items[${itemIndex}].id UUID 重复`)
            seenIds.add(image.id)
          } else {
            warnings.push(`${label}.items[${itemIndex}].id 缺失，将自动使用 fallback-id`)
          }
          requireValue(
            allowedPortfolioGalleryLayouts.has(String(image.layout || 'auto')),
            `${label}.items[${itemIndex}].layout 必须是 auto / third / half / two-thirds / full`
          )
        }
      }
    }
    if (block?.type === 'video') {
      checkImage(prefix, `${label}.platformCover`, block.platformCover)
      checkImage(prefix, `${label}.customCover`, block.customCover)
    }
    if (block?.type === 'download') {
      checkImage(prefix, `${label}.platformCover`, block.platformCover)
      checkImage(prefix, `${label}.customCover`, block.customCover)
    }
    if (block?.type === 'externalLink') checkImage(prefix, `${label}.cover`, block.cover)
  }
}

const duplicateUrls = catalog.all.filter((item, index, items) => items.findIndex((candidate) => candidate.url === item.url) !== index)
for (const item of duplicateUrls) errors.push(`${item.sourcePath}: 地址 ${item.url} 重复`)

const bySelectionValue = new Map()
for (const item of catalog.all) {
  if (item.contentId) bySelectionValue.set(item.contentId, item)
  bySelectionValue.set(item.sourcePath, item)
}

const checkSelected = (label, values, max = Infinity, accepts = () => true, statuses = ['published']) => {
  if (values.length > max) errors.push(`${label}: 最多选择 ${max} 条，当前 ${values.length} 条`)
  const seenValues = new Set()
  for (const selectedValue of values) {
    if (seenValues.has(selectedValue)) {
      errors.push(`${label}: ${selectedValue} 被重复选择`)
      continue
    }
    seenValues.add(selectedValue)
    const item = bySelectionValue.get(selectedValue)
    if (!item) warnings.push(`${label}: 已忽略不存在或已删除的引用 ${selectedValue}`)
    else if (!statuses.includes(item.status)) errors.push(`${label}: ${item.sourcePath} 当前状态不可用于首页精选`)
    else if (!accepts(item)) errors.push(`${label}: ${item.sourcePath} 不属于该栏目`)
  }
}

checkSelected('首页作品精选', selections.featuredCases || [], 2, (item) => item.kind === 'case')
checkSelected('首页工作流精选', selections.featuredWorkflows || [], 3, (item) => item.kind === 'workflow', ['published', 'planned'])
checkSelected('首页研究笔记', selections.knowledge?.learning || [], 3, (item) => item.sections.includes('learning-observation'))
checkSelected('首页方法指南', selections.knowledge?.methods || [], 3, (item) => item.sections.includes('methods'))
checkSelected('首页工具与资源', selections.knowledge?.resources || [], 3, (item) => item.kind === 'resource')

requireValue(Array.isArray(homeVideos.items), 'videos.json: items 必须是数组')
requireValue((homeVideos.items || []).length <= 4, 'videos.json: 首页视频最多 4 条')
const homeVideoIds = new Set()
const allowedHomeVideoCategories = new Set(['三维渲染视频', 'AI 制作视频', '品牌视觉视频', '其他动态视觉'])
for (const [index, item] of (homeVideos.items || []).entries()) {
  const label = `videos.json: items[${index}]`
  requireValue(uuidPattern.test(String(item.id || '')), `${label}.id 必须是 UUID v4`)
  requireValue(!homeVideoIds.has(item.id), `${label}.id 重复`)
  homeVideoIds.add(item.id)
  requireValue(typeof item.published === 'boolean', `${label}.published 必须是布尔值`)
  requireValue(String(item.title || '').trim(), `${label}.title 不能为空`)
  requireValue(allowedHomeVideoCategories.has(String(item.category || '')), `${label}.category 无效`)
  requireValue(String(item.description || '').trim(), `${label}.description 不能为空`)
  requireValue(String(item.poster || '').trim(), `${label}.poster 不能为空`)
  checkImage('videos.json', `${label}.poster`, item.poster)
  if (item.published) {
    requireValue(Boolean(extractBilibiliId(item.url)), `${label}.url 必须是包含 BV 编号的 B 站视频链接`)
  } else if (item.url && !extractBilibiliId(item.url)) {
    warnings.push(`${label}.url 暂无法识别，发布前请替换为包含 BV 编号的完整链接`)
  }
}

const knowledgeHubCards = JSON.parse(readFileSync(path.join(repoRoot, '.shared', 'content', 'knowledgeHubCards.json'), 'utf8'))
requireValue(Array.isArray(knowledgeHubCards.items), 'knowledgeHubCards.json: items 必须是数组')

const aboutPage = JSON.parse(readFileSync(path.join(repoRoot, '.shared', 'content', 'aboutPage.json'), 'utf8'))
const aboutIconNames = new Set(['palette', 'cube', 'camera', 'flow', 'video', 'web'])
requireValue(String(aboutPage.home?.title || '').trim(), 'aboutPage.json: home.title 不能为空')
requireValue(String(aboutPage.home?.description || '').trim(), 'aboutPage.json: home.description 不能为空')
requireValue(Array.isArray(aboutPage.home?.highlights) && aboutPage.home.highlights.length === 3, 'aboutPage.json: home.highlights 必须正好 3 条')
requireValue(String(aboutPage.hero?.greeting || '').trim(), 'aboutPage.json: hero.greeting 不能为空')
requireValue(String(aboutPage.hero?.title || '').trim(), 'aboutPage.json: hero.title 不能为空')
requireValue(String(aboutPage.hero?.description || '').trim(), 'aboutPage.json: hero.description 不能为空')
requireValue(String(aboutPage.hero?.portrait || '').trim(), 'aboutPage.json: hero.portrait 不能为空')
checkImage('aboutPage.json', 'hero.portrait', aboutPage.hero?.portrait)
const aboutCapabilities = aboutPage.workbench?.capabilities || []
requireValue(Array.isArray(aboutCapabilities) && aboutCapabilities.length > 0, 'aboutPage.json: workbench.capabilities 不能为空')
const aboutCapabilityIds = new Set()
for (const [index, item] of aboutCapabilities.entries()) {
  const label = `aboutPage.json: workbench.capabilities[${index}]`
  requireValue(String(item.id || '').trim(), `${label}.id 不能为空`)
  requireValue(!aboutCapabilityIds.has(item.id), `${label}.id 重复`)
  aboutCapabilityIds.add(item.id)
  requireValue(String(item.title || '').trim(), `${label}.title 不能为空`)
  requireValue(aboutIconNames.has(item.icon), `${label}.icon 无效`)
  requireValue(Array.isArray(item.process) && item.process.length > 0, `${label}.process 不能为空`)
}
const aboutDeliveryStages = aboutPage.delivery?.stages || []
requireValue(Array.isArray(aboutDeliveryStages) && aboutDeliveryStages.length > 0, 'aboutPage.json: delivery.stages 不能为空')
for (const [stageIndex, stage] of aboutDeliveryStages.entries()) {
  const label = `aboutPage.json: delivery.stages[${stageIndex}]`
  requireValue(String(stage.title || '').trim(), `${label}.title 不能为空`)
  requireValue(Array.isArray(stage.items) && stage.items.length > 0, `${label}.items 不能为空`)
  for (const [itemIndex, item] of (stage.items || []).entries()) {
    requireValue(aboutIconNames.has(item.icon), `${label}.items[${itemIndex}].icon 无效`)
  }
}

const faq = JSON.parse(readFileSync(path.join(repoRoot, '.shared', 'content', 'faq.json'), 'utf8'))
requireValue(Array.isArray(faq.items) && faq.items.length > 0, 'faq.json: items 必须是非空数组')
const faqIds = new Set()
for (const [index, item] of (faq.items || []).entries()) {
  requireValue(uuidPattern.test(String(item.id || '')), `faq.json: items[${index}].id 必须是 UUID v4`)
  requireValue(!faqIds.has(item.id), `faq.json: items[${index}].id 重复`)
  faqIds.add(item.id)
  requireValue(['cooperation', 'resources', 'site'].includes(item.category), `faq.json: items[${index}].category 无效`)
  requireValue(String(item.question || '').trim(), `faq.json: items[${index}].question 不能为空`)
  requireValue(String(item.answer || '').trim(), `faq.json: items[${index}].answer 不能为空`)
}

const profile = JSON.parse(readFileSync(path.join(repoRoot, '.shared', 'content', 'profile.json'), 'utf8'))
requireValue(String(profile.name || '').trim(), 'profile.json: name 不能为空')
requireValue(String(profile.role || '').trim(), 'profile.json: role 不能为空')
requireValue(String(profile.intro || '').trim(), 'profile.json: intro 不能为空')
requireValue(Number.isFinite(profile.yearsValue) && profile.yearsValue >= 0, 'profile.json: yearsValue 必须是非负数字')
requireValue(String(profile.yearsLabel || '').trim(), 'profile.json: yearsLabel 不能为空')
if (profile.avatar) checkImage('profile.json', 'avatar', profile.avatar)
if (profile.resumePdf) {
  const pdfPath = path.join(repoRoot, 'public', String(profile.resumePdf).replace(/^\//, ''))
  if (!existsSync(pdfPath)) {
    warnings.push(`profile.json: 找不到简历 ${profile.resumePdf}`)
  }
}


try {
  const config = yaml.load(readFileSync(path.join(repoRoot, '.pages.yml'), 'utf8'))
  requireValue(config?.settings?.content?.merge === true, '.pages.yml: 必须保留 settings.content.merge')
  requireValue(config?.components?.content_blocks?.type === 'block', '.pages.yml: content_blocks 必须使用 block 字段')
  requireValue(config?.components?.content_blocks?.blockKey === 'type', '.pages.yml: content_blocks.blockKey 必须为 type')
  requireValue(config?.components?.portfolio_content_blocks?.type === 'block', '.pages.yml: portfolio_content_blocks 必须使用 block 字段')
  requireValue(config?.components?.portfolio_content_blocks?.blockKey === 'type', '.pages.yml: portfolio_content_blocks.blockKey 必须为 type')
  requireValue(config?.components?.enrichment_state?.hidden === true, '.pages.yml: 识别记录必须在后台隐藏')
  requireValue(config?.components?.content_id?.type === 'uuid', '.pages.yml: content_id 必须使用 uuid 字段')
  requireValue(config?.components?.content_id?.hidden === true, '.pages.yml: content_id 必须在后台隐藏')
  const contentEntries = flattenContent(config?.content || [])
  const collections = contentEntries.filter((entry) => entry.type === 'collection')
  const collectionNames = new Set(collections.map((entry) => entry.name))
  for (const name of ['cases', 'workflows', 'learning_entries', 'method_entries', 'resource_entries']) {
    requireValue(collectionNames.has(name), `.pages.yml: 缺少集合 ${name}`)
    const collection = collections.find((entry) => entry.name === name)
    if (name !== 'cases') {
      requireValue(collection?.filename?.field === true, `.pages.yml: ${name} 必须在编辑页显示文件名`)
    }
    requireValue(collection?.operations?.create === true, `.pages.yml: ${name} 必须允许新建`)
    requireValue(collection?.operations?.rename === true, `.pages.yml: ${name} 必须允许重命名`)
    requireValue(collection?.operations?.delete === true, `.pages.yml: ${name} 必须允许删除`)
    requireValue(collection?.fields?.some((field) => field?.name === 'contentId' && field?.component === 'content_id'), `.pages.yml: ${name} 缺少隐藏 contentId`)
    const action = collection?.actions?.find((entry) => entry.name === 'enrich-content')
    requireValue(action?.scope === 'entry' && action?.workflow === 'enrich-content.yml' && action?.ref === 'current', `.pages.yml: ${name} 缺少条目级识别 Action`)
    const duplicateAction = collection?.actions?.find((entry) => entry.name === 'duplicate-content')
    requireValue(duplicateAction?.scope === 'entry' && duplicateAction?.workflow === 'duplicate-content.yml' && duplicateAction?.ref === 'current', `.pages.yml: ${name} 缺少复制为新草稿 Action`)
  }
  const homepage = contentEntries.find((entry) => entry.name === 'homepage')
  const homeVideosEntry = contentEntries.find((entry) => entry.name === 'home_videos')
  const aboutPageEntry = contentEntries.find((entry) => entry.name === 'about_page')
  const cases = contentEntries.find((entry) => entry.name === 'cases')
  requireValue(
    cases?.fields?.some((field) => (field.name === 'content' && field.type === 'rich-text') || field.name === 'contentBlocks'),
    '.pages.yml: 作品集必须配置 unified content 富文本或 contentBlocks'
  )
  const referenceFields = [
    homepage?.fields?.find((field) => field.name === 'featuredCases'),
    homepage?.fields?.find((field) => field.name === 'featuredWorkflows'),
    ...((homepage?.fields?.find((field) => field.name === 'knowledge')?.fields) || [])
  ]
  for (const field of referenceFields) {
    requireValue(field?.options?.value === '{fields.contentId}', `.pages.yml: 首页引用 ${field?.name || '未知字段'} 必须保存 contentId`)
  }
  requireValue(existsSync(path.join(repoRoot, '.github', 'workflows', 'enrich-content.yml')), '缺少识别工作流 enrich-content.yml')
  requireValue(existsSync(path.join(repoRoot, '.github', 'workflows', 'duplicate-content.yml')), '缺少复制工作流 duplicate-content.yml')
  requireValue(contentEntries.some((entry) => entry.name === 'faq'), '.pages.yml: 缺少 FAQ 管理文件')
  requireValue(contentEntries.some((entry) => entry.name === 'profile'), '.pages.yml: 缺少个人资料管理文件')
  requireValue(aboutPageEntry?.path === '.shared/content/aboutPage.json', '.pages.yml: 缺少关于我页面管理文件')
  requireValue(homeVideosEntry?.path === '.shared/content/videos.json', '.pages.yml: 缺少首页视频案例管理文件')
  const homeVideoItemsField = homeVideosEntry?.fields?.find((field) => field.name === 'items')
  requireValue(homeVideoItemsField?.list?.max === 4, '.pages.yml: 首页视频案例最多必须限制为 4 条')
  for (const name of ['id', 'published', 'title', 'category', 'description', 'poster', 'url', 'duration']) {
    requireValue(homeVideoItemsField?.fields?.some((field) => field.name === name), `.pages.yml: 首页视频案例缺少字段 ${name}`)
  }
} catch (error) {
  errors.push(`.pages.yml 无法解析：${error.message}`)
}

for (const warning of warnings) console.warn(`WARN ${warning}`)
for (const error of errors) console.error(`ERROR ${error}`)
if (errors.length) process.exit(1)
console.log(`内容检查通过：${catalog.all.length} 条详情，${catalog.all.reduce((sum, item) => sum + (matter(readFileSync(path.join(repoRoot, item.sourcePath), 'utf8')).data.contentBlocks?.length || 0), 0)} 个模块，${warnings.length} 条提醒。`)
