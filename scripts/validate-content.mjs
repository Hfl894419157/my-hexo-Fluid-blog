import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import { loadContentCatalog, loadHomeSelections, repoRoot } from '../.shared/contentCatalog.mjs'

const allowedStatuses = new Set(['draft', 'planned', 'published', 'archived'])
const allowedBlockTypes = new Set(['richText', 'image', 'gallery', 'video', 'download', 'externalLink'])
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const filenamePattern = /^[a-z0-9-]+\.md$/
const legacyKeys = ['title', 'description', 'slug', 'createdAt', 'status', 'verificationStatus', 'showInRecentUpdates', 'tags', 'coverAlt', 'pageClass']
const catalog = loadContentCatalog()
const selections = loadHomeSelections()
const errors = []
const warnings = []

const requireValue = (condition, message) => {
  if (!condition) errors.push(message)
}

const checkImage = (sourcePath, label, value) => {
  if (!value || /^(?:https?:)?\/\//i.test(value) || /^(?:data|blob):/i.test(value)) return
  requireValue(String(value).startsWith('/'), `${sourcePath}: ${label} 必须是站点绝对路径或外部 URL`)
  if (!String(value).startsWith('/')) return
  const imagePath = path.join(repoRoot, 'public', String(value).replace(/^\//, ''))
  requireValue(existsSync(imagePath), `${sourcePath}: ${label} 找不到图片 ${value}`)
}

for (const item of catalog.all) {
  const absolutePath = path.join(repoRoot, item.sourcePath)
  const parsed = matter(readFileSync(absolutePath, 'utf8'))
  const data = parsed.data || {}
  const prefix = item.sourcePath

  requireValue(filenamePattern.test(path.basename(item.sourcePath)), `${prefix}: 文件名只能包含小写英文、数字和短横线`)
  for (const key of legacyKeys) {
    requireValue(!Object.hasOwn(data, key), `${prefix}: 不再允许旧字段 ${key}`)
  }
  requireValue(data.meta && typeof data.meta === 'object', `${prefix}: 缺少 meta`)
  requireValue(data.publishing && typeof data.publishing === 'object', `${prefix}: 缺少 publishing`)
  requireValue(data.cover && typeof data.cover === 'object', `${prefix}: 缺少 cover`)
  requireValue(data.seo && typeof data.seo === 'object', `${prefix}: 缺少 seo`)
  requireValue(Array.isArray(data.contentBlocks), `${prefix}: contentBlocks 必须是数组`)
  requireValue(item.title, `${prefix}: 缺少 meta.title`)
  requireValue(item.desc, `${prefix}: 缺少 meta.description`)
  requireValue(allowedStatuses.has(item.status), `${prefix}: publishing.status 必须是 draft / planned / published / archived`)
  requireValue(item.createdAt !== '2099-12-31', `${prefix}: 缺少 publishing.createdAt`)
  if (!item.tags.length) warnings.push(`${prefix}: 建议至少填写一个 meta.tags`)
  if (item.status === 'published') requireValue(data.contentBlocks?.length > 0, `${prefix}: 已发布内容至少需要一个内容模块`)

  checkImage(prefix, 'cover.src', data.cover?.src)
  if (data.cover?.src) requireValue(String(data.cover?.alt || '').trim(), `${prefix}: 使用封面时必须填写 cover.alt`)

  const seenIds = new Set()
  for (const [index, block] of (data.contentBlocks || []).entries()) {
    const label = `${prefix}: contentBlocks[${index}]`
    requireValue(allowedBlockTypes.has(block?.type), `${label} 模块类型无效`)
    requireValue(uuidPattern.test(String(block?.id || '')), `${label} 缺少有效 UUID v4`)
    requireValue(!seenIds.has(block?.id), `${label} UUID 重复`)
    seenIds.add(block?.id)

    if (block?.type === 'richText') {
      requireValue(String(block.markdown || '').trim(), `${label} richText.markdown 不能为空`)
      requireValue(!/<img\b[^>]*\bsrc=["']\//i.test(block.markdown || ''), `${label} 不允许直接输出本地 <img>`)
      for (const match of String(block.markdown || '').matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
        checkImage(prefix, `${label} Markdown 图片`, match[1])
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

const byPath = new Map(catalog.all.map((item) => [item.sourcePath, item]))
const checkSelected = (label, paths, max = Infinity, accepts = () => true) => {
  if (paths.length > max) errors.push(`${label}: 最多选择 ${max} 条，当前 ${paths.length} 条`)
  const seenPaths = new Set()
  for (const selectedPath of paths) {
    if (seenPaths.has(selectedPath)) {
      errors.push(`${label}: ${selectedPath} 被重复选择`)
      continue
    }
    seenPaths.add(selectedPath)
    const item = byPath.get(selectedPath)
    if (!item) errors.push(`${label}: 找不到 ${selectedPath}`)
    else if (item.status !== 'published') errors.push(`${label}: ${selectedPath} 尚未发布`)
    else if (!accepts(item)) errors.push(`${label}: ${selectedPath} 不属于该栏目`)
  }
}

checkSelected('首页案例精选', selections.featuredCases || [], Infinity, (item) => item.kind === 'case')
checkSelected('首页工作流精选', selections.featuredWorkflows || [], 3, (item) => item.kind === 'workflow')
checkSelected('首页学习与观察', selections.knowledge?.learning || [], 3, (item) => item.sections.includes('learning-observation'))
checkSelected('首页方法体系', selections.knowledge?.methods || [], 3, (item) => item.sections.includes('methods'))
checkSelected('首页资源库', selections.knowledge?.resources || [], 3, (item) => item.kind === 'resource')

for (const file of ['aboutCards.json', 'knowledgeHubCards.json']) {
  const source = JSON.parse(readFileSync(path.join(repoRoot, '.shared', 'content', file), 'utf8'))
  requireValue(Array.isArray(source.items), `${file}: items 必须是数组`)
}

try {
  const config = yaml.load(readFileSync(path.join(repoRoot, '.pages.yml'), 'utf8'))
  requireValue(config?.settings?.content?.merge === true, '.pages.yml: 必须保留 settings.content.merge')
  requireValue(config?.components?.content_blocks?.type === 'block', '.pages.yml: content_blocks 必须使用 block 字段')
  requireValue(config?.components?.content_blocks?.blockKey === 'type', '.pages.yml: content_blocks.blockKey 必须为 type')
  requireValue(config?.components?.enrichment_state?.hidden === true, '.pages.yml: 识别记录必须在后台隐藏')
  const collections = (config?.content || []).filter((entry) => entry.type === 'collection')
  const collectionNames = new Set(collections.map((entry) => entry.name))
  for (const name of ['cases', 'workflows', 'learning_entries', 'method_entries', 'resource_entries']) {
    requireValue(collectionNames.has(name), `.pages.yml: 缺少集合 ${name}`)
    const collection = collections.find((entry) => entry.name === name)
    const action = collection?.actions?.find((entry) => entry.name === 'enrich-content')
    requireValue(action?.scope === 'entry' && action?.workflow === 'enrich-content.yml' && action?.ref === 'current', `.pages.yml: ${name} 缺少条目级识别 Action`)
  }
  requireValue(existsSync(path.join(repoRoot, '.github', 'workflows', 'enrich-content.yml')), '缺少识别工作流 enrich-content.yml')
} catch (error) {
  errors.push(`.pages.yml 无法解析：${error.message}`)
}

for (const warning of warnings) console.warn(`WARN ${warning}`)
for (const error of errors) console.error(`ERROR ${error}`)
if (errors.length) process.exit(1)
console.log(`内容检查通过：${catalog.all.length} 条详情，${catalog.all.reduce((sum, item) => sum + (matter(readFileSync(path.join(repoRoot, item.sourcePath), 'utf8')).data.contentBlocks?.length || 0), 0)} 个模块，${warnings.length} 条提醒。`)
