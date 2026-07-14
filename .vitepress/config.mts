import { readFileSync } from 'node:fs'
import { defineConfig } from 'vitepress'
import { loadContentCatalog } from '../.shared/contentCatalog.mjs'

const siteVersion = process.env.SITE_VERSION || process.env.GITHUB_SHA || 'local'
const siteOrigin = 'https://liulicc.cn'
const imageManifest = JSON.parse(readFileSync(new URL('./cache/image-manifest.json', import.meta.url), 'utf8'))
const articleImageSizes = '(max-width: 640px) calc(100vw - 32px), 760px'
const contentCatalog = loadContentCatalog()
const unpublishedContentPaths = contentCatalog.all
  .filter((item) => item.status !== 'published')
  .map((item) => item.sourcePath)
const sidebarEntries = (items) => items
  .filter((item) => item.status === 'published')
  .map((item) => ({ text: item.title, link: item.url }))
const escapeAttribute = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
const normalizeImageKey = (src) => {
  const pathOnly = String(src || '').split(/[?#]/, 1)[0]
  if (!pathOnly.startsWith('/')) return null
  try {
    return decodeURI(pathOnly).normalize('NFC')
  } catch {
    return pathOnly.normalize('NFC')
  }
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
      const defaultImageRenderer = md.renderer.rules.image
        || ((tokens, index, options, env, renderer) => renderer.renderToken(tokens, index, options))

      md.renderer.rules.image = (tokens, index, options, env, renderer) => {
        const token = tokens[index]
        const source = token.attrGet('src') || ''
        const key = normalizeImageKey(source)
        const entry = key ? imageManifest.images?.[key] : null

        token.attrSet('loading', 'lazy')
        token.attrSet('decoding', 'async')
        token.attrSet('fetchpriority', 'auto')
        if (entry?.width && entry?.height) {
          token.attrSet('width', String(entry.width))
          token.attrSet('height', String(entry.height))
        }

        const imageHtml = defaultImageRenderer(tokens, index, options, env, renderer)
        if (!entry?.variants?.length) return imageHtml

        const srcset = entry.variants
          .map((variant) => `${variant.src} ${variant.width}w`)
          .join(', ')

        return `<picture class="responsive-image responsive-image--content"><source type="image/webp" srcset="${escapeAttribute(srcset)}" sizes="${escapeAttribute(articleImageSizes)}">${imageHtml}</picture>`
      }
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
    if (/^portfolio\/[^/]+\.md$/.test(normalizedPath)) pageData.frontmatter.pageClass = 'page-case-detail'
    if (/^aigc\/[^/]+\.md$/.test(normalizedPath)) pageData.frontmatter.pageClass = 'page-workflow-detail'
    if (/^knowledge\/(learning-observation|methods)\/[^/]+\.md$/.test(normalizedPath)) pageData.frontmatter.pageClass = 'page-article-detail'
    if (/^knowledge\/resources\/[^/]+\.md$/.test(normalizedPath)) pageData.frontmatter.pageClass = 'page-resource-detail'

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
