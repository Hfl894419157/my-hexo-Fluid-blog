import { readFileSync } from 'node:fs'
import { createMarkdownRenderer, defineConfig } from 'vitepress'
import { loadContentCatalog } from '../.shared/contentCatalog.mjs'
import { contentBlocksMarkdown, isManagedContentPath, normalizeContentData } from '../.shared/contentSchema.mjs'
import { configureInlineFormatting, configureManagedHtmlPolicy } from '../.shared/markdownFormatting.mjs'
import { configureResponsiveMarkdownImages } from '../.shared/markdownImages.mjs'
import { renderRichHtml } from '../.shared/richHtml.mjs'

const siteVersion = process.env.SITE_VERSION || process.env.GITHUB_SHA || 'local'
const siteOrigin = 'https://liulicc.cn'
const imageManifest = JSON.parse(readFileSync(new URL('./cache/image-manifest.json', import.meta.url), 'utf8'))
const faqData = JSON.parse(readFileSync(new URL('../.shared/content/faq.json', import.meta.url), 'utf8'))
const contentCatalog = loadContentCatalog()
const unpublishedContentPaths = contentCatalog.all
  .filter((item) => item.status !== 'published')
  .map((item) => item.sourcePath)
const sidebarEntries = (items) => items
  .filter((item) => item.status === 'published')
  .map((item) => ({ text: item.title, link: item.url }))
const contentMarkdown = await createMarkdownRenderer(process.cwd(), {
  html: true,
  linkify: true,
  headers: true,
  defaultHighlightLang: 'text',
  codeCopyButtonTitle: '复制代码',
  config(md) {
    configureManagedHtmlPolicy(md)
    configureInlineFormatting(md)
    configureResponsiveMarkdownImages(md, imageManifest)
  }
})

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
  const env = { headingCounts: new Map(), contentImageIndex: 0, managedContent: true }
  return blocks.map((block) => {
    if (block.type === 'richText') {
      const html = block.html
        ? renderRichHtml(block.html, imageManifest, env)
        : contentMarkdown.render(String(block.legacyMarkdown || block.markdown || ''), env)
      return { ...block, html }
    }
    if (block.type === 'image') {
      const eager = env.contentImageIndex === 0
      if (block.src) env.contentImageIndex += 1
      return { ...block, eager }
    }
    if (block.type === 'gallery') {
      return {
        ...block,
        items: (block.items || []).map((item) => {
          const eager = env.contentImageIndex === 0
          if (item.src) env.contentImageIndex += 1
          return { ...item, eager }
        })
      }
    }
    return block
  })
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Liuli AI Lab',
  titleTemplate: ':title · Liuli AI Lab',
  description: "记录 AI 商业视觉作品、可复用工作流、研究方法与经过验证的工具资源",
  cleanUrls: true,
  srcExclude: [
    'design-qa.md',
    'CONTENT-MANAGEMENT.md',
    'public/images/uploads/README.md',
    ...unpublishedContentPaths
  ],
  markdown: {
    html: true,
    headers: true,
    defaultHighlightLang: 'text',
    codeCopyButtonTitle: '复制代码',
    config(md) {
      configureManagedHtmlPolicy(md)
      configureInlineFormatting(md)
      configureResponsiveMarkdownImages(md, imageManifest)
    }
  },
  lastUpdated: true,
  sitemap: {
    hostname: siteOrigin
  },
  head: [
    ['link', {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/images/brand/liuli-favicon-32.png'
    }],
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

    if (normalizedPath === 'faq.md') {
      const entities = faqData.items
        .filter((item) => item.published !== false)
        .map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer }
        }))
      pageData.frontmatter.head ??= []
      pageData.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: entities })
      ])
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
          text: '作品集',
          items: [
            { text: '作品总览', link: '/portfolio/' },
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
          text: '研究笔记',
          items: [
            { text: '栏目总览', link: '/knowledge/learning-observation' },
            ...sidebarEntries(contentCatalog.learning)
          ]
        }
      ],
      '/knowledge/methods/': [
        {
          text: '方法指南',
          items: [
            { text: '栏目总览', link: '/knowledge/methods' },
            ...sidebarEntries(contentCatalog.methods)
          ]
        }
      ],
      '/knowledge/resources/': [
        {
          text: '工具与资源',
          items: [
            { text: '工具与资源总览', link: '/knowledge/resources' },
            ...sidebarEntries(contentCatalog.resources)
          ]
        }
      ]
    }
  }
})
