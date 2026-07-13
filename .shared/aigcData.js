export const aigcWorks = [
  {
    id: 'commercial-visual-system',
    title: 'AI 商业视觉生产系统',
    desc: '从需求、变量到人工判断的全链路工作流搭建。',
    link: '/aigc/commercial-visual-system',
    status: 'published',
    tags: ['商业视觉', '工作流', '资产管理']
  },
  {
    id: 'ecommerce-detail-page-workflow',
    title: '电商详情页生产流程',
    desc: '从需求拆解、结构规划到画面生成与上线复盘的完整路径。',
    link: null,
    status: 'planned',
    tags: ['电商视觉', '信息结构', '交付流程']
  },
  {
    id: 'exhibition-visual-extension-workflow',
    title: '展会主视觉延展流程',
    desc: '把核心概念稳定延展到展位、画册、海报与线上传播素材。',
    link: null,
    status: 'planned',
    tags: ['展会视觉', '多媒介', '一致性']
  },
  {
    id: 'ai-product-image-batch-workflow',
    title: 'AI 产品图批量生成流程',
    desc: '统一产品事实、镜头变量和筛选标准，提升批量出图稳定性。',
    link: null,
    status: 'planned',
    tags: ['产品图', '批量生成', '变量控制']
  },
  {
    id: 'brand-consistency-review-workflow',
    title: '品牌一致性审核流程',
    desc: '把色彩、构图、字体和品牌语气转化为可执行的审核清单。',
    link: null,
    status: 'planned',
    tags: ['品牌审核', '人工判断', '质量控制']
  },
  {
    id: 'project-review-asset-archive',
    title: '项目复盘与资产归档流程',
    desc: '将有效结构、失败方向与交付规范重新沉淀为可复用资产。',
    link: null,
    status: 'planned',
    tags: ['项目复盘', '资产归档', '知识复用']
  }
]

export const publishedAigcWorks = aigcWorks.filter((item) => item.status === 'published')
export const aigcCardItems = aigcWorks.filter((item) => ['published', 'planned'].includes(item.status))
