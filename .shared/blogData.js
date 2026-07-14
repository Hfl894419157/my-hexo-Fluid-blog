export const blogPosts = [
  {
    id: 'ai-designer-positioning',
    title: 'AI 冲击下 设计师网站应该展示什么',
    summary: '从作品陈列转向案例证据、工作流与可复用知识，让个人网站真正形成专业影响力。',
    type: '定位观察',
    sections: ['learning-observation'],
    tags: ['个人品牌', '内容架构', 'AI 设计'],
    link: '/knowledge/learning-observation/ai-designer-positioning',
    status: 'published'
  },
  {
    id: 'aigc-workflow-system',
    title: '从提示词到交付：AIGC 工作流如何沉淀',
    summary: '把需求、变量、生成、人工判断和复盘连成可复用的生产系统。',
    type: '方法论',
    sections: ['learning-observation', 'methods'],
    tags: ['AIGC', '工作流', '资产沉淀'],
    link: '/knowledge/learning-observation/aigc-workflow-system',
    status: 'published'
  },
  {
    id: 'personal-resource-library',
    title: '个人资源库比普通博客更重要',
    summary: '真正有价值的不是收藏数量，而是资源是否被验证、分类并重新进入项目。',
    type: '知识系统',
    sections: ['learning-observation'],
    tags: ['知识管理', '资源库', '复用'],
    link: '/knowledge/learning-observation/personal-resource-library',
    status: 'published'
  },
  {
    id: 'ai-visual-tool-update-observation',
    title: 'AI 视觉工具更新观察',
    summary: '记录模型、平台与生成能力变化，并判断哪些更新真正影响商业设计。',
    type: '行业观察',
    sections: ['learning-observation'],
    tags: ['AI 工具', '行业趋势', '能力测试'],
    link: null,
    status: 'planned'
  },
  {
    id: 'commercial-design-model-boundaries',
    title: '商业设计中的模型能力边界',
    summary: '区分模型擅长的方向扩展与仍需人工把关的产品事实和品牌风险。',
    type: '实践观察',
    sections: ['learning-observation'],
    tags: ['模型能力', '商业设计', '人工判断'],
    link: null,
    status: 'planned'
  },
  {
    id: 'experiment-record-to-stable-judgment',
    title: '从实验记录到稳定判断',
    summary: '把零散测试整理成可比较的变量、结果与结论，逐步形成判断依据。',
    type: '学习记录',
    sections: ['learning-observation'],
    tags: ['实验记录', '变量比较', '判断沉淀'],
    link: null,
    status: 'planned'
  },
  {
    id: 'commercial-visual-requirement-breakdown',
    title: '商业视觉需求拆解',
    summary: '从业务目标、目标受众、使用场景和交付限制建立可执行的视觉任务。',
    type: '方法论',
    sections: ['methods'],
    tags: ['需求拆解', '业务目标', '执行标准'],
    link: null,
    status: 'planned'
  },
  {
    id: 'generation-direction-scoring',
    title: '生成方向筛选评分',
    summary: '用品牌匹配、信息清晰、差异化和落地成本筛选生成方向。',
    type: '方法论',
    sections: ['methods'],
    tags: ['方向筛选', '评分标准', '方案判断'],
    link: null,
    status: 'planned'
  },
  {
    id: 'brand-consistency-check',
    title: '品牌一致性检查',
    summary: '将视觉语言、产品事实与传播语气整理为交付前检查项。',
    type: '方法论',
    sections: ['methods'],
    tags: ['品牌系统', '检查清单', '质量控制'],
    link: null,
    status: 'planned'
  },
  {
    id: 'iterative-refinement-version-management',
    title: '多轮精修版本管理',
    summary: '明确版本目标、修改依据和保留结果，避免精修过程失去方向。',
    type: '方法论',
    sections: ['methods'],
    tags: ['版本管理', '精修流程', '协作记录'],
    link: null,
    status: 'planned'
  },
  {
    id: 'project-review-asset-deposition',
    title: '项目复盘与资产沉淀',
    summary: '在交付后整理有效结构、失败方向和复用条件，让项目经验持续累积。',
    type: '方法论',
    sections: ['methods'],
    tags: ['项目复盘', '资产沉淀', '知识复用'],
    link: null,
    status: 'planned'
  }
]

export const publishedBlogPosts = blogPosts.filter((item) => item.status === 'published')
export const blogCardItems = blogPosts.filter((item) => ['published', 'planned'].includes(item.status))
