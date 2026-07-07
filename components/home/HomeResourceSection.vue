<script setup>
import { toolsResources } from '../../.shared/resourcesData.js'
import BaseButton from '../BaseButton.vue'
import BaseCard from '../BaseCard.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const resources = toolsResources.filter((item) => item.featured).slice(0, 4)
</script>

<template>
  <SectionShell id="resources">
    <div class="resource-layout">
      <SectionHeader
        align="left"
        eyebrow="Resources"
        title="资源库是设计系统的燃料层"
        desc="把模型、提示词、模板和组件放在同一个可迭代结构里，减少每次项目从零开始的成本。"
      />

      <div class="resource-grid">
        <BaseCard v-for="item in resources" :key="item.id" :href="item.link">
          <div class="resource-card__icon">{{ item.icon }}</div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.desc }}</p>
          <BaseButton as="span" variant="text">查看详情 →</BaseButton>
        </BaseCard>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.resource-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.82fr) 1.18fr;
  gap: 44px;
  align-items: start;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.resource-card__icon {
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  background: var(--bg-soft);
  font-size: 24px;
}

h3 {
  margin: 22px 0 0;
  color: var(--text-main);
  font-size: 22px;
  line-height: 1.22;
  letter-spacing: 0;
}

p {
  margin: 12px 0 22px;
  color: var(--text-sub);
  font-size: var(--font-small);
  line-height: 1.7;
}

@media (max-width: 920px) {
  .resource-layout,
  .resource-grid {
    grid-template-columns: 1fr;
  }
}
</style>
