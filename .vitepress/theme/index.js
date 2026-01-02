// 正确导入Vue的h函数（不是R！）
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

export default {
  ...DefaultTheme,
  Layout() {
    const DefaultLayout = DefaultTheme.Layout
    // 所有创建元素的地方，用h替代R
    return () =>
      h(DefaultLayout, null, {
        'nav-bar-content-after': () => [
          h(
            'button',
            {
              class: 'vp-nav-bar-action',
              onclick: () => window.open('https://www.bilibili.com', '_blank'),
              title: '我的B站主页'
            },
            h('span', { class: 'vp-icon' }, 'B站')
          ),
          h(
            'button',
            {
              class: 'vp-nav-bar-action',
              onclick: () => window.open('https://weibo.com', '_blank'),
              title: '我的微博主页'
            },
            h('span', { class: 'vp-icon' }, '微博')
          )
        ]
      })
  }
}