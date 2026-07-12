import { defineConfig } from 'vitepress'

const siteVersion = process.env.SITE_VERSION || process.env.GITHUB_SHA || 'local'
const siteOrigin = 'https://liulicc.cn'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "韩福利 | AI 实践与知识系统",
  description: "记录 AI 商业视觉案例、可复用工作流、方法洞察与经过验证的知识资产",
  cleanUrls: true,
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
    // 侧边栏配置
    sidebar: {
      '/portfolio/': [
        {
          text: '案例',
          items: [
            { text: '案例总览', link: '/portfolio/' },
            { text: '专业医疗产品电商视觉系统', link: '/portfolio/ecommerce-visual' },
            { text: '德国水处理展会视觉体系', link: '/portfolio/exhibition-visual' }
          ]
        }
      ],
      '/resources/': [
        {
          text: '资源库',
          items: [
            { text: '资源总览', link: '/resources/' },
            { text: '商业视觉 Prompt 结构', link: '/resources/mj-prompt' },
            { text: 'AI 项目复盘清单', link: '/resources/notion' }
          ]
        }
      ]
    }
  }
})
