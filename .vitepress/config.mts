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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})