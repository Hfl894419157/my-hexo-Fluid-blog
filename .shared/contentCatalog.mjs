import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { normalizeHomeSelections } from './contentClient.js'
import { normalizeContentData } from './contentSchema.mjs'

const sharedDir = path.dirname(fileURLToPath(import.meta.url))
export const repoRoot = path.resolve(sharedDir, '..')

export const contentRoots = [
  { directory: 'portfolio', kind: 'case' },
  { directory: 'aigc', kind: 'workflow' },
  { directory: 'knowledge/learning-observation', kind: 'knowledge' },
  { directory: 'knowledge/methods', kind: 'knowledge' },
  { directory: 'knowledge/resources', kind: 'resource' }
]

export const publicStatuses = new Set(['planned', 'published'])
export const publishedStatus = 'published'

const toPosix = (value) => value.replace(/\\/g, '/')

const toDateText = (value, fallback = '') => {
  if (!value) return fallback
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10)
  }
  return String(value).slice(0, 10)
}

const toDateTimeText = (value, fallback = '') => {
  if (!value) return fallback
  if (value instanceof Date && !Number.isNaN(value.valueOf())) return value.toISOString()
  const text = String(value)
  return Number.isNaN(Date.parse(text)) ? fallback : text
}

const toDateTimeLabel = (value) => String(value || '').replace('T', ' ').slice(0, 16)

const readMarkdownFiles = (directory) => {
  const absoluteDirectory = path.join(repoRoot, directory)
  if (!existsSync(absoluteDirectory)) return []

  return readdirSync(absoluteDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md')
    .map((entry) => path.join(absoluteDirectory, entry.name))
}

const discoverFiles = () => contentRoots.flatMap(({ directory }) => readMarkdownFiles(directory))

const isManagedContentFile = (absolutePath) => {
  const sourcePath = toPosix(path.relative(repoRoot, absolutePath))
  return contentRoots.some(({ directory }) => {
    const prefix = `${directory}/`
    return sourcePath.startsWith(prefix) && !sourcePath.slice(prefix.length).includes('/')
  }) && path.basename(sourcePath) !== 'index.md'
}

const kindFromPath = (sourcePath) => {
  const match = contentRoots.find(({ directory }) => sourcePath.startsWith(`${directory}/`))
  return match?.kind || 'knowledge'
}

const urlFromPath = (sourcePath) => `/${sourcePath.replace(/\.md$/, '')}`

const sectionDefaults = (sourcePath, kind) => {
  if (kind === 'resource') return ['resources']
  if (sourcePath.startsWith('knowledge/methods/')) return ['methods']
  if (sourcePath.startsWith('knowledge/learning-observation/')) return ['learning-observation']
  return []
}

const getGitUpdatedAt = (sourcePath, fallback) => {
  try {
    const output = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', sourcePath],
      { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim()
    if (output) return output
  } catch {
    // New local files have no Git history yet; the deterministic fallback is used.
  }
  return fallback
}

const getTypeLabel = (kind, sections, frontmatter) => {
  if (frontmatter.type) return String(frontmatter.type)
  if (kind === 'case') return '作品集'
  if (kind === 'workflow') return '工作流'
  if (kind === 'resource') return '工具与资源'
  if (sections.includes('methods')) return '方法指南'
  return '研究笔记'
}

const resourceTypeLabels = {
  software: '软件',
  'ai-tool': 'AI 工具',
  plugin: '插件',
  prompt: 'Prompt',
  template: '模板',
  asset: '素材',
  document: '文档',
  other: '其他'
}

const resourceAccessLabels = {
  official: '访问官网',
  cloud: '网盘下载',
  contact: '联系获取'
}

const getImageFilename = (kind, id) => {
  if (kind === 'case') return `case-${id}-cover.jpg`
  if (kind === 'workflow') return `workflow-${id}-cover.jpg`
  if (kind === 'resource') return `resource-${id}-cover.jpg`
  return `article-${id}-cover.jpg`
}

const getImageSubject = (kind, title) => {
  if (kind === 'case') return `${title}的项目主视觉或最终成果`
  if (kind === 'workflow') return `${title}的流程总览图或关键节点图`
  if (kind === 'resource') return `${title}的资源预览图`
  return `${title}的文章头图`
}

const normalizeEntry = (absolutePath) => {
  const sourcePath = toPosix(path.relative(repoRoot, absolutePath))
  const raw = readFileSync(absolutePath, 'utf8')
  const parsed = matter(raw)
  const frontmatter = parsed.data || {}
  const normalized = normalizeContentData(frontmatter, sourcePath)
  const kind = kindFromPath(sourcePath)
  const id = path.basename(sourcePath, '.md')
  const url = urlFromPath(sourcePath)
  const status = normalized.status
  const defaultSections = sectionDefaults(sourcePath, kind)
  const sections = Array.isArray(frontmatter.sections)
    ? frontmatter.sections.map(String)
    : defaultSections
  const createdAt = toDateText(normalized.createdAt, '2099-12-31')
  const fileFallback = toDateTimeText(frontmatter.updatedAt, statSync(absolutePath).mtime.toISOString())
  const updatedAt = getGitUpdatedAt(sourcePath, fileFallback)
  const title = normalized.title || id
  const description = normalized.description
  const tags = normalized.tags
  const isPublished = status === publishedStatus

  return {
    id,
    contentId: normalized.contentId,
    slug: id,
    sourcePath,
    url,
    link: isPublished ? url : null,
    kind,
    sections,
    type: getTypeLabel(kind, sections, frontmatter),
    title,
    desc: description,
    summary: description,
    status,
    createdAt,
    updatedAt,
    updatedAtLabel: toDateTimeLabel(updatedAt),
    verificationStatus: normalized.verificationStatus || (isPublished ? '已整理' : '筹备中'),
    showInRecentUpdates: normalized.showInRecentUpdates !== false,
    tags,
    cover: normalized.cover,
    coverAlt: normalized.coverAlt || title,
    coverFocalPoint: normalized.coverFocalPoint,
    homeOverrideSrc: normalized.homeOverrideSrc,
    homeCover: normalized.homeOverrideSrc || normalized.cover,
    image: normalized.cover,
    imageSubject: getImageSubject(kind, title),
    imageFilename: getImageFilename(kind, id),
    project: normalized.project,
    resourceMeta: normalized.resourceMeta,
    resourceTypeLabel: resourceTypeLabels[normalized.resourceMeta.type] || resourceTypeLabels.other,
    resourceAccessLabel: resourceAccessLabels[normalized.resourceMeta.access] || resourceAccessLabels.contact,
    cta: kind === 'case' ? '查看作品' : kind === 'workflow' ? '进入工作流' : kind === 'resource' ? '查看资源' : '阅读全文'
  }
}

const compareCreated = (left, right) => {
  const byDate = left.createdAt.localeCompare(right.createdAt)
  return byDate || left.sourcePath.localeCompare(right.sourcePath)
}

export const loadContentCatalog = ({ files } = {}) => {
  const absoluteFiles = (files?.length ? files : discoverFiles())
    .map((file) => path.resolve(file))
    .filter((file) => existsSync(file) && isManagedContentFile(file))

  const all = absoluteFiles.map(normalizeEntry).sort(compareCreated)
  const cases = all.filter((item) => item.kind === 'case')
  const workflows = all.filter((item) => item.kind === 'workflow')
  const knowledge = all.filter((item) => item.kind === 'knowledge')
  const resources = all.filter((item) => item.kind === 'resource')
  const learning = knowledge.filter((item) => item.sections.includes('learning-observation'))
  const methods = knowledge.filter((item) => item.sections.includes('methods'))
  const recent = all
    .filter((item) => item.status === publishedStatus && item.showInRecentUpdates)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt) || right.createdAt.localeCompare(left.createdAt))
    .slice(0, 6)

  return { all, cases, workflows, knowledge, resources, learning, methods, recent }
}

export const loadHomeSelections = () => {
  const file = path.join(sharedDir, 'content', 'home.json')
  return normalizeHomeSelections(JSON.parse(readFileSync(file, 'utf8')))
}
