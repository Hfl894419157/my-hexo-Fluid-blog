import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        // 新增：配置本地搜索范围，确保搜集全站内容
        locales: {
          '/': {
            placeholder: '搜索全站内容',
            translations: {
              button: {
                text: '搜索'
              },
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
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '作品集', link: '/markdown-examples' },
      { text: 'AIGC', link: '/markdown-examples' },
      // 改动：创作资源从单一菜单改为带下拉子菜单
      {
        text: '创作资源',
        items: [
          { text: '3D建模', link: '/markdown-examples' }, // 暂用现有链接，后续可替换为对应页面
          { text: '视频剪辑', link: '/markdown-examples' },
          { text: '平面工具', link: '/markdown-examples' },
          { text: '网站搭建', link: '/markdown-examples' }
        ]
      },
      { text: '博客', link: '/markdown-examples' },
      { text: '随记', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'youtube', link: 'https://www.youtube.com/@yujie1992' },
      { 
        icon: {
          // 抖音图标（黑色音符）
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001-.002-.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/></svg>'
        }, 
        link: 'https://www.douyin.com/你的抖音主页'
      },
      { 
        icon: {
          // 【修改】小红书图标（统一为单一线条风格，抽象化的“书”图形）
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 4H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><path d="M9 4v16"/><path d="M15 8h.01"/></svg>'
        }, 
        link: 'https://www.xiaohongshu.com/你的小红书主页'
      }
    ]
  }
})