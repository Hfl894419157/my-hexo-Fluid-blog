import { normalizeFocalPoint } from './imageProfiles.mjs'
import { richHtmlSearchText } from './richHtml.mjs'

export const portfolioGalleryLayouts = ['auto', 'third', 'half', 'two-thirds', 'full']
const portfolioGalleryLayoutSet = new Set(portfolioGalleryLayouts)

export const normalizePortfolioGalleryLayout = (value = 'auto') =>
  portfolioGalleryLayoutSet.has(String(value)) ? String(value) : 'auto'

const normalizeContentBlocks = (blocks = []) => blocks.map((block) => {
  if (block?.type === 'richText') {
    const html = String(block.html || '')
    const legacyMarkdown = String(block.legacyMarkdown || block.markdown || '')
    return {
      ...block,
      format: html || block.format === 'html' ? 'html' : 'markdown',
      html,
      legacyMarkdown
    }
  }
  if (block?.type !== 'gallery') return block
  return {
    ...block,
    items: Array.isArray(block.items)
      ? block.items.map((item, idx) => ({
        ...item,
        id: item.id || `fallback-id-${idx}-${String(item.src || '').slice(-15)}`,
        layout: normalizePortfolioGalleryLayout(item?.layout)
      }))
      : []
  }
})

const managedPatterns = [
  /^portfolio\/(?!index\.md$)[^/]+\.md$/,
  /^aigc\/(?!index\.md$)[^/]+\.md$/,
  /^knowledge\/(?:learning-observation|methods|resources)\/[^/]+\.md$/
]

export const isManagedContentPath = (sourcePath = '') =>
  managedPatterns.some((pattern) => pattern.test(String(sourcePath).replace(/\\/g, '/')))

export const getPageClass = (sourcePath = '') => {
  const normalized = String(sourcePath).replace(/\\/g, '/')
  if (/^portfolio\/(?!index\.md$)[^/]+\.md$/.test(normalized)) return 'page-case-detail'
  if (/^aigc\/(?!index\.md$)[^/]+\.md$/.test(normalized)) return 'page-workflow-detail'
  if (/^knowledge\/(?:learning-observation|methods)\/[^/]+\.md$/.test(normalized)) return 'page-article-detail'
  if (/^knowledge\/resources\/[^/]+\.md$/.test(normalized)) return 'page-resource-detail'
  return ''
}

export const normalizeContentData = (frontmatter = {}, sourcePath = '') => {
  const meta = frontmatter.meta || {}
  const publishing = frontmatter.publishing || {}
  const cover = frontmatter.cover && typeof frontmatter.cover === 'object' ? frontmatter.cover : {}
  const seo = frontmatter.seo || {}
  const project = frontmatter.project && typeof frontmatter.project === 'object' ? frontmatter.project : {}
  const resourceMeta = frontmatter.resourceMeta && typeof frontmatter.resourceMeta === 'object' ? frontmatter.resourceMeta : {}
  const blocks = normalizeContentBlocks(Array.isArray(frontmatter.contentBlocks) ? frontmatter.contentBlocks : [])
  const resourceTypes = new Set(['software', 'ai-tool', 'plugin', 'prompt', 'template', 'asset', 'document', 'other'])
  const accessTypes = new Set(['official', 'cloud', 'contact'])
  const inferredAccess = blocks.some((block) => block?.type === 'download')
    ? 'cloud'
    : blocks.some((block) => block?.type === 'externalLink') ? 'official' : 'contact'

  return {
    contentId: String(frontmatter.contentId || ''),
    title: String(meta.title || frontmatter.title || ''),
    description: String(meta.description || frontmatter.description || ''),
    tags: Array.isArray(meta.tags) ? meta.tags.map(String) : Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
    createdAt: publishing.createdAt || frontmatter.createdAt || '',
    status: String(publishing.status || frontmatter.status || 'draft'),
    verificationStatus: String(publishing.verificationStatus || frontmatter.verificationStatus || ''),
    showInRecentUpdates: publishing.showInRecentUpdates ?? frontmatter.showInRecentUpdates ?? true,
    cover: String(cover.src || (typeof frontmatter.cover === 'string' ? frontmatter.cover : '')),
    coverAlt: String(cover.alt || frontmatter.coverAlt || meta.title || frontmatter.title || ''),
    coverFocalPoint: normalizeFocalPoint(cover.focalPoint),
    homeOverrideSrc: String(cover.homeOverrideSrc || ''),
    seoTitle: String(seo.title || meta.title || frontmatter.title || ''),
    seoDescription: String(seo.description || meta.description || frontmatter.description || ''),
    contentBlocks: blocks,
    project: {
      role: String(project.role || ''),
      year: String(project.year || ''),
      client: String(project.client || ''),
      services: Array.isArray(project.services) ? project.services.map(String).filter(Boolean) : [],
      outcome: String(project.outcome || '')
    },
    resourceMeta: {
      type: resourceTypes.has(String(resourceMeta.type)) ? String(resourceMeta.type) : 'other',
      access: accessTypes.has(String(resourceMeta.access)) ? String(resourceMeta.access) : inferredAccess,
      platform: String(resourceMeta.platform || ''),
      licenseNote: String(resourceMeta.licenseNote || '')
    },
    pageClass: getPageClass(sourcePath)
  }
}

export const blockSearchText = (block = {}) => {
  if (block.type === 'richText') {
    return block.html
      ? richHtmlSearchText(block.html)
      : String(block.legacyMarkdown || block.markdown || '')
  }
  if (block.type === 'image') return [block.alt, block.caption].filter(Boolean).join(' ')
  if (block.type === 'gallery') {
    return (block.items || []).flatMap((item) => [item.alt, item.caption]).filter(Boolean).join(' ')
  }
  return [block.title, block.summary, block.name, block.platform, block.format, block.size]
    .filter(Boolean)
    .join(' ')
}

export const contentBlocksMarkdown = (blocks = []) =>
  blocks.map((block) => blockSearchText(block)).filter(Boolean).join('\n\n')
