import { createContentLoader } from 'vitepress'

const sectionLabels = [
  { prefix: '/portfolio/', label: '案例' },
  { prefix: '/aigc/', label: '工作流' },
  { prefix: '/knowledge/', label: '行业观察' },
  { prefix: '/resources/', label: '工具资源' },
  { prefix: '/blog/', label: '设计方法' },
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
      .map((page) => {
        const src = stripFrontmatter(page.src || '')
        const title = getTitle(src, page.frontmatter)
        const headings = getHeadings(src)
        const text = stripMarkdown(src)

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
