<script setup>
import BaseCard from '../BaseCard.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const notes = [
  ['定位', 'AI 设计师个人站，聚焦商业视觉生产效率和方法沉淀。'],
  ['内容', 'AI 知识、工作流、案例、方法论、资源库、关于我和作品展示。'],
  ['气质', '高级、克制、清晰、大气、年轻、有未来感。']
]
</script>

<template>
  <SectionShell id="about" tone="soft">
    <div class="about-layout">
      <SectionHeader
        title="AI 视觉实验室"
        desc="网站的表达重点从“我做过什么”升级为“我如何把设计经验变成可复用系统”。"
      />
      <div class="about-list">
        <BaseCard v-for="item in notes" :key="item[0]">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </BaseCard>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: start;
}

.about-list {
  display: grid;
  gap: 12px;
  width: min(580px, 100%);
  margin: 0 auto;
}

:deep(.base-card--padded) {
  padding: 22px 28px;
}

h3 {
  margin: 0;
  color: var(--brand-cyan);
  font-size: 18px;
  letter-spacing: 0;
}

p {
  margin: 10px 0 0;
  color: var(--text-sub);
  font-size: var(--font-body);
  line-height: 1.72;
}

@media (max-width: 860px) {
  .about-layout {
    grid-template-columns: 1fr;
  }
}
</style>
