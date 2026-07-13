export const toolsResources = [
  {
    id: 'prompt-framework',
    name: '商业视觉 Prompt 结构',
    desc: '把目标、主体、场景、视觉变量与限制条件整理成可复用的提示词框架。',
    link: '/knowledge/resources/mj-prompt',
    category: '方法模板',
    status: 'published',
    accessType: '在线阅读'
  },
  {
    id: 'project-review-checklist',
    name: 'AI 项目复盘清单',
    desc: '用目标、变量、筛选、交付和沉淀五个维度检查一次 AI 视觉项目。',
    link: '/knowledge/resources/notion',
    category: '检查清单',
    status: 'published',
    accessType: '在线阅读'
  },
  {
    id: 'brand-visual-brief-template',
    name: '品牌视觉 Brief 模板',
    desc: '用目标、受众、场景、品牌限制与交付规格建立统一项目输入。',
    link: null,
    category: '项目模板',
    status: 'planned',
    accessType: '即将开放'
  },
  {
    id: 'generation-result-selection-sheet',
    name: '生成结果筛选表',
    desc: '从事实准确、品牌一致、信息清晰和制作成本四个维度记录筛选结果。',
    link: null,
    category: '评估表格',
    status: 'planned',
    accessType: '即将开放'
  },
  {
    id: 'commercial-image-acceptance-checklist',
    name: '商业图片验收清单',
    desc: '在交付前检查产品细节、构图安全区、渠道尺寸与版权风险。',
    link: null,
    category: '检查清单',
    status: 'planned',
    accessType: '即将开放'
  },
  {
    id: 'project-asset-naming-guide',
    name: '项目资产命名规范',
    desc: '统一项目、版本、渠道和状态字段，让团队能够快速定位最终资产。',
    link: null,
    category: '管理规范',
    status: 'planned',
    accessType: '即将开放'
  }
]

export const publishedResources = toolsResources.filter((item) => item.status === 'published')
export const resourceCardItems = toolsResources.filter((item) => ['published', 'planned'].includes(item.status))
