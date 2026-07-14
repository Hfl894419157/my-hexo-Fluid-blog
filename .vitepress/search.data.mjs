import { createContentLoader } from 'vitepress'
import { contentBlocksMarkdown, normalizeContentData } from '../.shared/contentSchema.mjs'

const sectionLabels = [
  { prefix: '/portfolio/', label: '案例' },
  { prefix: '/aigc/', label: '工作流' },
  { prefix: '/knowledge/learning-observation', label: '学习与观察' },
  { prefix: '/knowledge/methods', label: '方法体系' },
  { prefix: '/knowledge/resources', label: '资源库' },
  { prefix: '/knowledge/', label: '知识库' },
  { prefix: '/resume', label: '关于' },
  { prefix: '/', label: '首页' }
]

const stripFrontmatter = (src) => src.replace(/^---[\s\S]*?---\s*/, '')

const stripMarkdown = (src) =>
  src
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<script setup>[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_`~|:-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const slugify = (text) =>
  encodeURIComponent(
    text
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
  )

const getTitle = (src, frontmatter) => {
  if (frontmatter?.title) return String(frontmatter.title)
  const heading = src.match(/^#\s+(.+)$/m)
  return heading ? heading[1].trim() : 'Untitled'
}

const getHeadings = (src) =>
  Array.from(src.matchAll(/^(#{2,3})\s+(.+)$/gm))
    .map((match) => {
      const text = match[2].replace(/#+$/, '').trim()
      return {
        text,
        anchor: slugify(text),
        level: match[1].length
      }
    })
    .filter((heading) => heading.text && heading.anchor)

const getSection = (url) => {
  const match = sectionLabels.find((item) => url.startsWith(item.prefix))
  return match?.label || 'Site'
}

export default createContentLoader('**/*.md', {
  includeSrc: true,
  transform(data) {
    return data
      .filter((page) => page.url && page.src)
      .filter((page) => page.url !== '/design-qa')
      .filter((page) => !page.url.startsWith('/blog/') && !page.url.startsWith('/resources/'))
      .filter((page) => !['draft', 'planned', 'archived'].includes(normalizeContentData(page.frontmatter, page.url).status))
      .filter((page) => page.frontmatter?.search !== false)
      .map((page) => {
        const src = stripFrontmatter(page.src || '')
        const normalized = normalizeContentData(page.frontmatter, page.url)
        const blockMarkdown = contentBlocksMarkdown(normalized.contentBlocks)
        const searchableSource = [src, blockMarkdown].filter(Boolean).join('\n\n')
        const title = normalized.title || getTitle(src, page.frontmatter)
        const headings = getHeadings(searchableSource)
        const text = [normalized.description, stripMarkdown(searchableSource)].filter(Boolean).join(' ')

        return {
          title,
          url: page.url,
          section: getSection(page.url),
          text,
          headings,
          searchable: [title, ...headings.map((heading) => heading.text), text].join(' ')
        }
      })
  }
})
