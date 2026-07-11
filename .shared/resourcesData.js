export const toolsResources = [
  {
    id: 'prompt-framework',
    name: '商业视觉 Prompt 结构',
    desc: '把目标、主体、场景、视觉变量与限制条件整理成可复用的提示词框架。',
    link: '/resources/mj-prompt',
    category: '方法模板',
    status: 'published',
    featured: true,
    accessType: '在线阅读',
    sourceUrl: '/resources/mj-prompt',
    license: '署名后可用于个人与商业项目',
    verifiedAt: '2026-07-11',
    relatedIds: ['commercial-visual-system', 'aigc-workflow-system']
  },
  {
    id: 'project-review-checklist',
    name: 'AI 项目复盘清单',
    desc: '用目标、变量、筛选、交付和沉淀五个维度检查一次 AI 视觉项目。',
    link: '/resources/notion',
    category: '检查清单',
    status: 'published',
    featured: true,
    accessType: '在线阅读',
    sourceUrl: '/resources/notion',
    license: '可复制并按项目调整',
    verifiedAt: '2026-07-11',
    relatedIds: ['commercial-visual-system', 'exhibition-visual']
  },
  { id: 'lora', name: 'Stable Diffusion LoRA', desc: '资源来源与授权仍在核实。', link: '/resources/lora', category: 'AI 模型', status: 'draft' },
  { id: 'icons', name: '3D Glass Icons', desc: '资源文件与授权仍在核实。', link: '/resources/icons', category: '设计资源', status: 'draft' },
  { id: 'uikit', name: 'Figma AI UI Kit', desc: '资源文件与授权仍在核实。', link: '/resources/uikit', category: 'UI 组件', status: 'draft' },
  { id: 'ebook', name: 'AIGC 设计白皮书', desc: '下载文件与内容仍在整理。', link: '/resources/ebook', category: '学习资源', status: 'draft' }
]

export const publishedResources = toolsResources.filter((item) => item.status === 'published')
