<script setup>
import { publishedResources } from '../../.shared/resourcesData.js'
import { publishedBlogPosts } from '../../.shared/blogData.js'
import BaseButton from '../BaseButton.vue'
import BaseCard from '../BaseCard.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const knowledgeItems = [
  ...publishedBlogPosts.slice(0, 2).map((item) => ({
    id: item.id,
    label: item.type,
    title: item.title,
    desc: item.summary,
    link: item.link
  })),
  ...publishedResources.slice(0, 2).map((item) => ({
    id: item.id,
    label: item.category,
    title: item.name,
    desc: item.desc,
    link: item.link
  }))
]
</script>

<template>
  <SectionShell id="knowledge">
    <div class="knowledge-layout">
      <SectionHeader
        align="center"
        title="知识回到实践，才真正有价值"
        desc="方法与洞察解释为什么这样做，资源帮助下一次项目更快开始。"
      />

      <div class="knowledge-grid">
        <BaseCard v-for="item in knowledgeItems" :key="item.id" :href="item.link">
          <span>{{ item.label }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <BaseButton as="span" variant="text">查看内容 →</BaseButton>
        </BaseCard>
      </div>
      <div class="knowledge-action">
        <BaseButton href="/knowledge/" variant="ghost">进入知识库</BaseButton>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.knowledge-layout { display: grid; gap: 28px; }
.knowledge-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.knowledge-grid span { color: var(--brand-cyan); font-size: 13px; font-weight: 780; }
.knowledge-grid h3 { margin: 18px 0 0; color: var(--text-main); font-family: var(--font-title); font-size: 21px; line-height: 1.24; }
.knowledge-grid p { margin: 12px 0 20px; color: var(--text-sub); font-size: var(--font-small); line-height: 1.72; }
.knowledge-action { display: flex; justify-content: center; }
@media (max-width: 680px) { .knowledge-grid { grid-template-columns: 1fr; } }
</style>
