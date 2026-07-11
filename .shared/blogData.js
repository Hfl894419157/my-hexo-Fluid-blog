export const blogPosts = [
  {
    id: 'ai-designer-positioning',
    title: 'AI 冲击下，设计师网站应该展示什么',
    summary: '从作品陈列转向案例证据、工作流与可复用知识，让个人网站真正形成专业影响力。',
    type: '定位观察',
    publishedAt: '2026-07-11',
    tags: ['个人品牌', '内容架构', 'AI 设计'],
    link: '/blog/ai-designer-positioning',
    status: 'published',
    featured: true,
    relatedIds: ['commercial-visual-system', 'ecommerce-visual']
  },
  {
    id: 'aigc-workflow-system',
    title: '从提示词到交付：AIGC 工作流如何沉淀',
    summary: '把需求、变量、生成、人工判断和复盘连成可复用的生产系统。',
    type: '方法论',
    publishedAt: '2026-07-08',
    tags: ['AIGC', '工作流', '资产沉淀'],
    link: '/blog/aigc-workflow-system',
    status: 'published',
    featured: true,
    relatedIds: ['commercial-visual-system', 'prompt-framework']
  },
  {
    id: 'personal-resource-library',
    title: '个人资源库比普通博客更重要',
    summary: '真正有价值的不是收藏数量，而是资源是否被验证、分类并重新进入项目。',
    type: '知识系统',
    publishedAt: '2026-07-05',
    tags: ['知识管理', '资源库', '复用'],
    link: '/blog/personal-resource-library',
    status: 'published',
    featured: true,
    relatedIds: ['project-review-checklist', 'prompt-framework']
  }
]

export const publishedBlogPosts = blogPosts.filter((item) => item.status === 'published')
