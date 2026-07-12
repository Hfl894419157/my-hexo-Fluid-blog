export const toolsResources = [
  {
    id: 'prompt-framework',
    name: '商业视觉 Prompt 结构',
    desc: '把目标、主体、场景、视觉变量与限制条件整理成可复用的提示词框架。',
    cover: '/aigc-3.jpg',
    heroMedia: '/aigc-3.jpg',
    alt: '蓝紫色数字粒子视觉，代表可复用的提示词结构与变量系统',
    caption: '资源预览：商业视觉 Prompt 的目标、变量与限制结构。',
    aspectRatio: '4 / 3',
    mediaType: 'image',
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
    cover: '/aigc-2.jpg',
    heroMedia: '/aigc-2.jpg',
    alt: '电路结构的 AI 视觉，代表项目复盘与数字资产整理',
    caption: '资源预览：从目标到资产沉淀的项目检查路径。',
    aspectRatio: '4 / 3',
    mediaType: 'image',
    link: '/resources/notion',
    category: '检查清单',
    status: 'published',
    featured: true,
    accessType: '在线阅读',
    sourceUrl: '/resources/notion',
    license: '可复制并按项目调整',
    verifiedAt: '2026-07-11',
    relatedIds: ['commercial-visual-system', 'exhibition-visual']
  }
]

export const publishedResources = toolsResources.filter((item) => item.status === 'published')
export const allResources = toolsResources
