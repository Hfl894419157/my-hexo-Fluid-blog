export const aigcWorks = [
  {
    id: 'commercial-visual-system',
    title: 'AI 商业视觉生产系统',
    category: '需求拆解 · 生成控制 · 人工判断 · 资产沉淀',
    desc: '把 AI 生成从零散试错整理为可复用、可复盘的五阶段流程。',
    link: '/aigc/commercial-visual-system',
    status: 'published',
    featured: true,
    tags: ['商业视觉', '工作流', '资产管理'],
    relatedIds: ['ecommerce-visual', 'prompt-framework', 'project-review-checklist']
  },
  { id: 'avatar-workflow', title: 'AI 人像一致性流程', category: 'Stable Diffusion · LoRA', link: '/aigc/avatar-workflow', status: 'draft' },
  { id: 'space-concept', title: '空间概念快速提案', category: 'Midjourney · 参考图控制', link: '/aigc/space-concept', status: 'draft' },
  { id: 'icon-asset', title: '3D 图标资产生成', category: '风格规范 · 批量生成', link: '/aigc/icon-asset', status: 'draft' },
  { id: 'style-scene', title: '风格化场景视觉', category: '风格系统 · 场景控制', link: '/aigc/style-scene', status: 'draft' },
  { id: 'product-render', title: 'AI 产品图精修', category: '局部重绘 · 商业交付', link: '/aigc/product-render', status: 'draft' },
  { id: 'batch-assets', title: '内容素材批量生产', category: '批处理 · 命名管理', link: '/aigc/batch-assets', status: 'draft' }
]

export const publishedAigcWorks = aigcWorks.filter((item) => item.status === 'published')
