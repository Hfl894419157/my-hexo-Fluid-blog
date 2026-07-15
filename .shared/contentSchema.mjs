const managedPatterns = [
  /^portfolio\/[^/]+\.md$/,
  /^aigc\/[^/]+\.md$/,
  /^knowledge\/(?:learning-observation|methods|resources)\/[^/]+\.md$/
]

export const isManagedContentPath = (sourcePath = '') =>
  managedPatterns.some((pattern) => pattern.test(String(sourcePath).replace(/\\/g, '/')))

export const getPageClass = (sourcePath = '') => {
  const normalized = String(sourcePath).replace(/\\/g, '/')
  if (/^portfolio\/[^/]+\.md$/.test(normalized)) return 'page-case-detail'
  if (/^aigc\/[^/]+\.md$/.test(normalized)) return 'page-workflow-detail'
  if (/^knowledge\/(?:learning-observation|methods)\/[^/]+\.md$/.test(normalized)) return 'page-article-detail'
  if (/^knowledge\/resources\/[^/]+\.md$/.test(normalized)) return 'page-resource-detail'
  return ''
}

export const normalizeContentData = (frontmatter = {}, sourcePath = '') => {
  const meta = frontmatter.meta || {}
  const publishing = frontmatter.publishing || {}
  const cover = frontmatter.cover && typeof frontmatter.cover === 'object' ? frontmatter.cover : {}
  const seo = frontmatter.seo || {}

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
    seoTitle: String(seo.title || meta.title || frontmatter.title || ''),
    seoDescription: String(seo.description || meta.description || frontmatter.description || ''),
    contentBlocks: Array.isArray(frontmatter.contentBlocks) ? frontmatter.contentBlocks : [],
    pageClass: getPageClass(sourcePath)
  }
}

export const blockSearchText = (block = {}) => {
  if (block.type === 'richText') return String(block.markdown || '')
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
