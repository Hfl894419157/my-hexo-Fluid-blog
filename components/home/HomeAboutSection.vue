<script setup>
import BaseCard from '../BaseCard.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const notes = [
  ['实践背景', '8 年商业视觉、电商设计与跨媒介交付经验。'],
  ['当前方向', '研究 AI 如何进入真实项目，并提升生产、判断与资产复用效率。'],
  ['合作方式', '适合从产品图、详情页、品牌内容或视觉工作流梳理开始。']
]
</script>

<template>
  <SectionShell id="about" tone="soft">
    <div class="about-layout">
      <SectionHeader
        title="由实践驱动的 AI 视觉实验室"
        desc="我关注的不是单次生成效果，而是如何把设计经验、商业目标与 AI 能力组织成稳定流程。"
      />
      <div class="about-list">
        <BaseCard v-for="item in notes" :key="item[0]">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </BaseCard>
      </div>
      <a class="about-link" href="/resume">了解我的实践背景 →</a>
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

.about-link { width: fit-content; margin: 0 auto; color: var(--brand-main); font-size: 15px; font-weight: 500; text-decoration: none; }

:deep(.base-card--padded) {
  padding: 22px 28px;
}

h3 {
  margin: 0;
  color: var(--brand-cyan);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  font-weight: 500;
  letter-spacing: 0;
}

p {
  margin: 10px 0 0;
  color: var(--text-sub);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: 1.75;
}

@media (max-width: 860px) {
  .about-layout {
    grid-template-columns: 1fr;
  }
}
</style>
