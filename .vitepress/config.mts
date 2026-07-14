import { readFileSync } from 'node:fs'
import MarkdownIt from 'markdown-it'
import { defineConfig } from 'vitepress'
import { loadContentCatalog } from '../.shared/contentCatalog.mjs'
import { contentBlocksMarkdown, isManagedContentPath, normalizeContentData } from '../.shared/contentSchema.mjs'
import { configureResponsiveMarkdownImages } from '../.shared/markdownImages.mjs'

const siteVersion = process.env.SITE_VERSION || process.env.GITHUB_SHA || 'local'
const siteOrigin = 'https://liulicc.cn'
const imageManifest = JSON.parse(readFileSync(new URL('./cache/image-manifest.json', import.meta.url), 'utf8'))
const contentCatalog = loadContentCatalog()
const unpublishedContentPaths = contentCatalog.all
  .filter((item) => item.status !== 'published')
  .map((item) => item.sourcePath)
const sidebarEntries = (items) => items
  .filter((item) => item.status === 'published')
  .map((item) => ({ text: item.title, link: item.url }))
const contentMarkdown = new MarkdownIt({ html: false, linkify: true })
configureResponsiveMarkdownImages(contentMarkdown, imageManifest)

const slugifyHeading = (value) => String(value || '')
  .trim()
  .toLowerCase()
  .replace(/<[^>]+>/g, '')
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .replace(/\s+/g, '-')

const defaultHeadingOpen = contentMarkdown.renderer.rules.heading_open
  || ((tokens, index, options, env, renderer) => renderer.renderToken(tokens, index, options))

contentMarkdown.renderer.rules.heading_open = (tokens, index, options, env, renderer) => {
  const token = tokens[index]
  const title = tokens[index + 1]?.content || ''
  const base = slugifyHeading(title) || 'section'
  env.headingCounts ||= new Map()
  const count = env.headingCounts.get(base) || 0
  env.headingCounts.set(base, count + 1)
  token.attrSet('id', count ? `${base}-${count + 1}` : base)
  return defaultHeadingOpen(tokens, index, options, env, renderer)
}

const renderContentBlocks = (blocks) => {
  const env = { headingCounts: new Map() }
  return blocks.map((block) => block.type === 'richText'
    ? { ...block, html: contentMarkdown.render(String(block.markdown || ''), env) }
    : block)
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "韩福利 | AI 实践与知识系统",
  description: "记录 AI 商业视觉案例、可复用工作流、方法洞察与经过验证的知识资产",
  cleanUrls: true,
  srcExclude: [
    'design-qa.md',
    'CONTENT-MANAGEMENT.md',
    'public/images/uploads/README.md',
    ...unpublishedContentPaths
  ],
  markdown: {
    config(md) {
      configureResponsiveMarkdownImages(md, imageManifest)
    }
  },
  lastUpdated: true,
  sitemap: {
    hostname: siteOrigin
  },
  head: [
    ['meta', { name: 'site-version', content: siteVersion }],
    ['meta', {
      name: 'robots',
      content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    }]
  ],
  transformPageData(pageData) {
    const normalizedPath = pageData.relativePath.replace(/\\/g, '/')
    if (isManagedContentPath(normalizedPath)) {
      const normalized = normalizeContentData(pageData.frontmatter, normalizedPath)
      Object.assign(pageData.frontmatter, normalized)
      pageData.frontmatter.contentBlocksRendered = renderContentBlocks(normalized.contentBlocks)
      pageData.frontmatter.modularContent = true
      pageData.title = normalized.title
      pageData.description = normalized.seoDescription || normalized.description
      const searchableMarkdown = contentBlocksMarkdown(normalized.contentBlocks)
      pageData.frontmatter.contentSearchText = searchableMarkdown
    }

    const canonicalPath = pageData.relativePath
      .replace(/\\/g, '/')
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const canonicalUrl = new URL(canonicalPath, `${siteOrigin}/`).toString()

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ])
  },
  themeConfig: {
    sidebarMenuLabel: '栏目菜单',
    returnToTopLabel: '返回顶部',
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    lastUpdatedText: '最后更新',
    sidebar: {
      '/portfolio/': [
        {
          text: '案例',
          items: [
            { text: '案例总览', link: '/portfolio/' },
            ...sidebarEntries(contentCatalog.cases)
          ]
        }
      ],
      '/aigc/': [
        {
          text: '工作流',
          items: [
            { text: '工作流总览', link: '/aigc/' },
            ...sidebarEntries(contentCatalog.workflows)
          ]
        }
      ],
      '/knowledge/learning-observation/': [
        {
          text: '学习与观察',
          items: [
            { text: '栏目总览', link: '/knowledge/learning-observation' },
            ...sidebarEntries(contentCatalog.learning)
          ]
        }
      ],
      '/knowledge/methods/': [
        {
          text: '方法体系',
          items: [
            { text: '栏目总览', link: '/knowledge/methods' },
            ...sidebarEntries(contentCatalog.methods)
          ]
        }
      ],
      '/knowledge/resources/': [
        {
          text: '资源库',
          items: [
            { text: '资源总览', link: '/knowledge/resources' },
            ...sidebarEntries(contentCatalog.resources)
          ]
        }
      ]
    }
  }
})
