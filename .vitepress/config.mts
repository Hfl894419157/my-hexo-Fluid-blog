import { defineConfig } from 'vitepress'
import react from '@vitejs/plugin-react'
import { navItems, socialLinks } from '../.shared/siteNavigation.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "韩福利 | AI 实践与知识系统",
  description: "记录 AI 商业视觉案例、可复用工作流、方法洞察与经过验证的知识资产",
  vite: {
    plugins: [react()]
  },
  themeConfig: {
    // 搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          '/': {
            placeholder: '搜索全站内容',
            translations: {
              button: { text: '搜索' },
              modal: {
                noResultsText: '未找到匹配结果',
                resetButtonTitle: '清除查询',
                footer: {
                  selectText: '选择',
                  navigateText: '跳转',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    // 顶部导航栏配置
    nav: navItems,

    // 侧边栏配置
    sidebar: {
      '/portfolio/': [
        {
          text: '案例库',
          items: [
            { text: '案例总览', link: '/portfolio/' },
            { text: '品牌视觉设计系统', link: '/portfolio/brand-design' },
            { text: '3D 建筑可视化', link: '/portfolio/3d-viz' },
            { text: '移动端应用设计', link: '/portfolio/mobile-app' }
          ]
        }
      ],
      '/resources/': [
        {
          text: '资源库',
          items: [
            { text: '资源总览', link: '/resources/' },
            { text: 'Midjourney Prompt', link: '/resources/mj-prompt' },
            { text: 'Stable Diffusion LoRA', link: '/resources/lora' },
            { text: '3D Glass Icons', link: '/resources/icons' },
            { text: 'Figma AI UI Kit', link: '/resources/uikit' },
            { text: 'Notion Template', link: '/resources/notion' },
            { text: 'Design E-Book', link: '/resources/ebook' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: socialLinks.map(({ icon, link, svg }) => ({
      icon: icon === 'github' || icon === 'youtube' ? icon : { svg },
      link
    }))
  }
})
