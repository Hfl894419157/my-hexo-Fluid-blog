export const aigcWorks = [
  {
    id: 'commercial-visual-system',
    title: 'AI 商业视觉生产系统',
    category: '生产系统',
    desc: '从需求、变量到人工判断的全链路工作流搭建。',
    challenge: '将 AI 的概率性生成规范化，转化为商业级可控、高复用的交付流程。',
    role: '工作流架构搭建、核心变量判定规则设计及可视化开发',
    deliverables: '五阶段协同指南、12项人机纠偏清单及结构化 Prompt 变量地图',
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
