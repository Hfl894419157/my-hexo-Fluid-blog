export const portfolioWorks = [
  {
    id: 'ecommerce-visual',
    title: '专业医疗产品电商视觉系统',
    desc: '从竞品调研、3D 产品表达，到详情页信息层级与上线复盘。',
    link: '/portfolio/ecommerce-visual',
    status: 'published',
    featured: true,
    tags: ['电商视觉', '3D 渲染', '转化设计']
  },
  {
    id: 'exhibition-visual',
    title: '德国水处理展会视觉体系',
    desc: '从主视觉、展位到宣传资料的跨媒介统一与远程落地协作。',
    link: '/portfolio/exhibition-visual',
    status: 'published',
    featured: true,
    tags: ['展会视觉', '品牌系统', '跨团队交付']
  },
  {
    id: 'ai-product-launch-visual',
    title: 'AI 产品发布主视觉',
    desc: '围绕新品核心卖点规划发布主画面、渠道延展与阶段传播素材。',
    link: null,
    status: 'planned',
    featured: false,
    tags: ['产品发布', '主视觉', '整合传播']
  },
  {
    id: 'industrial-product-3d-detail',
    title: '工业产品 3D 详情页',
    desc: '用结构拆解、材质渲染与场景演示建立工业产品的可信表达。',
    link: null,
    status: 'planned',
    featured: false,
    tags: ['工业产品', '3D 渲染', '详情页']
  },
  {
    id: 'brand-social-visual-system',
    title: '品牌社交媒体视觉系统',
    desc: '建立适配多平台内容节奏的封面、栏目与活动视觉模板。',
    link: null,
    status: 'planned',
    featured: false,
    tags: ['社交媒体', '品牌系统', '模板化']
  },
  {
    id: 'cross-border-ecommerce-localization',
    title: '跨境电商素材本地化',
    desc: '针对不同市场调整信息层级、使用场景与转化表达。',
    link: null,
    status: 'planned',
    featured: false,
    tags: ['跨境电商', '本地化', '转化设计']
  }
]

export const publishedPortfolioWorks = portfolioWorks.filter((item) => item.status === 'published')
export const portfolioCardItems = portfolioWorks.filter((item) => ['published', 'planned'].includes(item.status))
