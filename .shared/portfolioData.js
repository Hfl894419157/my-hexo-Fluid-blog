export const portfolioWorks = [
  {
    id: 'ecommerce-visual',
    title: '专业医疗产品电商视觉系统',
    titleEn: 'ECOMMERCE VISUAL SYSTEM',
    category: '商业视觉',
    desc: '从竞品调研、3D 产品表达，到详情页信息层级与上线复盘。',
    cover: '/aigc-2.jpg',
    heroMedia: '/aigc-2.jpg',
    alt: '深色背景中的 AI 电路视觉，用于展示数字化商业视觉方向',
    caption: '项目公开内容已脱敏；画面作为数字化产品表达方向示意。',
    aspectRatio: '4 / 3',
    mediaType: 'image',
    gallery: ['/aigc-2.jpg', '/aigc-3.jpg'],
    link: '/portfolio/ecommerce-visual',
    status: 'published',
    featured: true,
    tags: ['电商视觉', '3D 渲染', '转化设计'],
    relatedIds: ['commercial-visual-system', 'prompt-framework']
  },
  {
    id: 'exhibition-visual',
    title: '德国水处理展会视觉体系',
    titleEn: 'EXHIBITION VISUAL SYSTEM',
    category: '品牌与展会',
    desc: '从主视觉、展位到宣传资料的跨媒介统一与远程落地协作。',
    cover: '/aigc-3.jpg',
    heroMedia: '/aigc-3.jpg',
    alt: '蓝紫色粒子球体视觉，用于表现跨媒介品牌系统与空间延展',
    caption: '展会项目中的公开画面采用方向示意，实际业务资料已脱敏。',
    aspectRatio: '3 / 4',
    mediaType: 'image',
    gallery: ['/aigc-3.jpg', '/aigc-2.jpg'],
    link: '/portfolio/exhibition-visual',
    status: 'published',
    featured: true,
    tags: ['展会视觉', '品牌系统', '跨团队交付'],
    relatedIds: ['commercial-visual-system', 'project-review-checklist']
  }
]

export const publishedPortfolioWorks = portfolioWorks.filter((item) => item.status === 'published')
export const allPortfolioWorks = portfolioWorks
