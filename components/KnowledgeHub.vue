<script setup>
import BaseButton from './BaseButton.vue'
import BaseCard from './BaseCard.vue'
import ReactIsland from './ReactIsland.vue'

const lanes = [
  {
    label: '方法与洞察',
    title: '把经验整理成可复用的方法',
    desc: '记录 AI 时代的设计判断、工作流建设、个人知识系统与项目复盘。',
    href: '/blog/',
    action: '阅读方法与洞察'
  },
  {
    label: '资源库',
    title: '只保留真正能进入项目的资源',
    desc: '按使用场景整理提示词结构、检查清单和工具资料，并明确来源与使用边界。',
    href: '/resources/',
    action: '进入资源库'
  }
]
</script>

<template>
  <section class="knowledge-hub">
    <p class="knowledge-hub__eyebrow">Knowledge System</p>
    <h1>知识库</h1>
    <p class="knowledge-hub__lead">这里不是链接仓库，也不是追求更新频率的传统博客。内容只有两个标准：经过判断，并且能够回到真实项目中复用。</p>
    <ClientOnly>
      <ReactIsland variant="article-accent" tone="article" density="low" />
    </ClientOnly>
    <div class="knowledge-hub__grid">
      <BaseCard v-for="lane in lanes" :key="lane.label" :href="lane.href">
        <span>{{ lane.label }}</span>
        <h2>{{ lane.title }}</h2>
        <p>{{ lane.desc }}</p>
        <BaseButton as="span" variant="text">{{ lane.action }} →</BaseButton>
      </BaseCard>
    </div>
    <div class="knowledge-hub__principles">
      <h2>收录原则</h2>
      <ul>
        <li>方法必须说明适用场景和限制，不把工具参数包装成普遍结论。</li>
        <li>资源必须标明来源、访问方式和验证时间，不提供失效或虚构下载。</li>
        <li>每篇内容尽量连接到案例或工作流，让知识回到实践。</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.knowledge-hub { width: min(1080px, 100%); margin: 0 auto; padding: 44px 0 24px; }
.knowledge-hub__eyebrow { margin: 0; color: var(--brand-cyan); font-size: 13px; font-weight: 800; text-transform: uppercase; }
h1 { margin: 12px 0 0; color: var(--text-main); font-family: var(--font-title); font-size: var(--font-h1); letter-spacing: var(--title-letter-spacing); }
.knowledge-hub__lead { max-width: 760px; margin: 20px 0 0; color: var(--text-sub); font-size: var(--font-body); line-height: 1.8; }
.knowledge-hub__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 42px; }
.knowledge-hub__grid span { color: var(--brand-cyan); font-size: 13px; font-weight: 780; }
.knowledge-hub__grid h2 { margin: 22px 0 0; color: var(--text-main); font-family: var(--font-title); font-size: var(--font-h3); line-height: 1.2; }
.knowledge-hub__grid p { margin: 14px 0 22px; color: var(--text-sub); line-height: 1.72; }
.knowledge-hub__principles { margin-top: 54px; padding: 30px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-soft); }
.knowledge-hub__principles h2 { margin: 0; color: var(--text-main); font-family: var(--font-title); }
.knowledge-hub__principles ul { display: grid; gap: 10px; padding-left: 20px; margin: 18px 0 0; color: var(--text-sub); line-height: 1.72; }
@media (max-width: 700px) { .knowledge-hub__grid { grid-template-columns: 1fr; } }
</style>
