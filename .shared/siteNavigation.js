export const navItems = [
  { text: '首页', link: '/' },
  { text: '作品集', link: '/portfolio/' },
  { text: '工作流', link: '/aigc/' },
  {
    text: '知识库',
    link: '/knowledge/',
    children: [
      { text: '研究笔记', description: '观察、测试与结论', link: '/knowledge/learning-observation' },
      { text: '方法指南', description: '标准、步骤与检查表', link: '/knowledge/methods' },
      { text: '工具与资源', description: '软件、模板与下载', link: '/knowledge/resources' }
    ]
  },
  { text: '关于我', link: '/resume' }
]

export const socialLinks = [
  {
    name: 'GitHub',
    icon: 'github',
    link: 'https://github.com/han-yujie',
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.18c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A10.93 10.93 0 0 1 12 6.07c.98 0 1.95.13 2.87.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.19c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>'
  },
  {
    name: 'YouTube',
    icon: 'youtube',
    link: 'https://www.youtube.com/@yujie1992',
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 7.2a3.02 3.02 0 0 0-2.12-2.14C19.5 4.56 12 4.56 12 4.56s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 7.2 31.48 31.48 0 0 0 0 12a31.48 31.48 0 0 0 .5 4.8 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.48 31.48 0 0 0 24 12a31.48 31.48 0 0 0-.5-4.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z"/></svg>'
  },
  {
    name: '抖音',
    link: 'https://www.douyin.com/',
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.59 6.69a4.79 4.79 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 1 1-2.02-2.77V9.4a6.33 6.33 0 1 0 5.47 6.27V8.69a8.18 8.18 0 0 0 4.77 1.52V6.79c-.34 0-.68-.03-1-.1Z"/></svg>'
  },
  {
    name: '小红书',
    link: 'https://www.xiaohongshu.com/',
    svg: '<svg viewBox="0 0 48 24" aria-hidden="true"><path fill="currentColor" d="M5.14 16.42c.9.76 1.95 1.14 3.17 1.14 1.01 0 1.79-.28 2.34-.84.55-.56.83-1.35.83-2.36V4.78h2.84v9.61c0 1.84-.53 3.27-1.6 4.29-1.07 1.02-2.55 1.53-4.43 1.53-1.92 0-3.53-.58-4.84-1.74l1.69-2.05Zm16.09-4.96h-4.52V8.91h11.9v2.55h-4.48v8.43h-2.9v-8.43Zm10.09-2.55h2.82v1.67c.78-1.29 1.93-1.94 3.45-1.94 1.33 0 2.37.42 3.12 1.27.75.84 1.13 2 1.13 3.47v6.51h-2.9v-6.17c0-.84-.18-1.47-.54-1.89-.36-.43-.9-.64-1.61-.64-.79 0-1.42.28-1.87.85-.46.57-.69 1.35-.69 2.36v5.49h-2.91V8.91Z"/></svg>'
  }
]

export const siteFooterGroups = [
  {
    title: '探索',
    links: [
      { text: '作品集', link: '/portfolio/' },
      { text: '工作流', link: '/aigc/' },
      { text: '知识库', link: '/knowledge/' }
    ]
  },
  {
    title: '知识',
    links: [
      { text: '研究笔记', link: '/knowledge/learning-observation' },
      { text: '方法指南', link: '/knowledge/methods' },
      { text: '工具与资源', link: '/knowledge/resources' }
    ]
  },
  {
    title: '关于',
    links: [
      { text: '关于我', link: '/resume' },
      { text: '常见问题', link: '/faq' },
      { text: '邮件合作', link: 'mailto:1442855983@qq.com' }
    ]
  }
]
