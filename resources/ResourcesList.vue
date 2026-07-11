<script setup>
import { publishedResources as toolsResources } from '../.shared/resourcesData.js'
import BaseButton from '../components/BaseButton.vue'
import BaseCard from '../components/BaseCard.vue'
import ReactIsland from '../components/ReactIsland.vue'
</script>

<template>
  <ClientOnly>
    <ReactIsland variant="resource-micro" tone="resource" density="low" />
  </ClientOnly>

  <div class="resources-list">
    <BaseCard v-for="tool in toolsResources" :key="tool.id" :href="tool.link">
      <div class="tool-type">{{ tool.accessType }}</div>
      <p class="category">{{ tool.category }}</p>
      <h3>{{ tool.name }}</h3>
      <p class="desc">{{ tool.desc }}</p>
      <p class="verified">验证于 {{ tool.verifiedAt }}</p>
      <BaseButton as="span" variant="text">查看详情 →</BaseButton>
    </BaseCard>
  </div>
</template>

<style scoped>
.resources-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 42px;
}

.tool-type {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  width: fit-content;
  padding: 0 10px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  background: var(--bg-soft);
  color: var(--text-sub);
  font-size: 12px;
  font-weight: 720;
}

.category {
  margin: 22px 0 8px !important;
  color: var(--brand-cyan);
  font-size: 13px;
  font-weight: 740;
}

h3 {
  margin: 0 !important;
  color: var(--text-main);
  font-size: 24px;
  line-height: 1.22;
  letter-spacing: 0;
}

.desc {
  margin: 12px 0 22px !important;
  color: var(--text-sub);
  font-size: var(--font-small);
  line-height: 1.7;
}

.verified {
  margin: -10px 0 18px !important;
  color: var(--text-muted);
  font-size: 12px;
}

@media (max-width: 960px) {
  .resources-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .resources-list {
    grid-template-columns: 1fr;
  }
}
</style>
