export const aigcWorks = [
  {
    id: 'commercial-visual-system',
    title: 'AI 商业视觉生产系统',
    category: '需求拆解 · 生成控制 · 人工判断 · 资产沉淀',
    desc: '把 AI 生成从零散试错整理为可复用、可复盘的五阶段流程。',
    cover: '/aigc-2.jpg',
    heroMedia: '/aigc-2.jpg',
    alt: '发光的 AI 电路字样，代表商业视觉工作流中的数字生产环节',
    caption: '五阶段工作流：输入、拆解、生成、判断与沉淀。',
    aspectRatio: '16 / 10',
    mediaType: 'image',
    gallery: ['/aigc-2.jpg', '/aigc-3.jpg'],
    link: '/aigc/commercial-visual-system',
    status: 'published',
    featured: true,
    tags: ['商业视觉', '工作流', '资产管理'],
    relatedIds: ['ecommerce-visual', 'prompt-framework', 'project-review-checklist']
  }
]

export const publishedAigcWorks = aigcWorks.filter((item) => item.status === 'published')
export const allAigcWorks = aigcWorks
