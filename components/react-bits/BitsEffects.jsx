import React from 'react'
import './bits-effects.css'

const copy = {
  'home-hero': {
    kicker: 'Interactive System',
    title: 'AI design assets',
    body: '从案例、流程、资源到方法论，把设计能力变成可交互的访问路径。',
    labels: ['Cases', 'Workflow', 'Resources', 'Proof']
  },
  'resume-profile': {
    kicker: 'Capability Map',
    title: '设计判断 × AI 执行',
    body: '把视觉经验、内容组织和生成工具整合成稳定的项目交付能力。',
    labels: ['视觉判断', '生成控制', '内容结构', '交付复盘']
  },
  'case-showcase': {
    kicker: 'Case Motion',
    title: '项目图与成果卡片',
    body: '给案例总览增加轻量视觉层，让访客更快识别项目类型和成果价值。',
    labels: ['主图', '场景', '转化', '交付']
  },
  'workflow-flow': {
    kicker: 'Workflow Flow',
    title: '从需求到交付',
    body: '用动效表达拆需求、定风格、批生成、精修和交付的连续关系。',
    labels: ['Brief', 'Style', 'Generate', 'Refine', 'Ship']
  },
  'resource-micro': {
    kicker: 'Resource Micro',
    title: '资源查找更轻',
    body: '保留内容页效率，只在关键入口增加轻量悬停与节奏感。',
    labels: ['Prompt', 'LoRA', 'Icons', 'Kit']
  },
  'article-accent': {
    kicker: 'Reading Accent',
    title: '重点观点提示',
    body: '博客正文保持安静，只在开头或观点区提供极少量动态强调。',
    labels: ['观点', '方法', '复盘']
  }
}

const variantClass = {
  'home-hero': 'rb-home',
  'resume-profile': 'rb-resume',
  'case-showcase': 'rb-case',
  'workflow-flow': 'rb-workflow',
  'resource-micro': 'rb-resource',
  'article-accent': 'rb-article'
}

export default function BitsEffects({ variant = 'home-hero', tone = 'default', density = 'medium' }) {
  const data = copy[variant] || copy['home-hero']
  const isFlow = variant === 'workflow-flow'

  return (
    <section className={`rb-shell ${variantClass[variant] || 'rb-home'}`} data-tone={tone} data-density={density}>
      <div className="rb-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="rb-copy">
        <p>{data.kicker}</p>
        <h3>{data.title}</h3>
        <span>{data.body}</span>
      </div>
      <div className={isFlow ? 'rb-flow' : 'rb-chipline'} aria-hidden="true">
        {data.labels.map((label, index) => (
          <i key={label} style={{ '--i': index }}>
            {label}
          </i>
        ))}
      </div>
    </section>
  )
}
