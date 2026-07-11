<script setup>
import { publishedAigcWorks as aigcWorks } from '../.shared/aigcData.js'
import BaseButton from '../components/BaseButton.vue'
import BaseCard from '../components/BaseCard.vue'
import ReactIsland from '../components/ReactIsland.vue'
</script>

<template>
  <ClientOnly>
    <ReactIsland variant="workflow-flow" tone="workflow" density="medium" />
  </ClientOnly>

  <div class="aigc-list">
    <BaseCard v-for="work in aigcWorks" :key="work.id" :href="work.link" :padded="false">
      <div v-if="work.img" class="card-image">
        <img :src="work.img" :alt="work.title" loading="lazy" />
        <span class="ai-badge">AI</span>
      </div>
      <div v-else class="card-cover">
        <span>AI WORKFLOW</span>
      </div>
      <div class="card-info">
        <h3>{{ work.title }}</h3>
        <p>{{ work.category }}</p>
        <p class="card-desc">{{ work.desc }}</p>
        <BaseButton as="span" variant="text">查看详情 →</BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.aigc-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 42px;
}

.card-image {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-soft);
}

.card-cover {
  display: grid;
  aspect-ratio: 4 / 3;
  align-items: end;
  padding: 24px;
  color: var(--brand-cyan);
  background: linear-gradient(135deg, var(--bg-soft), var(--bg-card));
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: 0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.94) contrast(1.04);
  transition: transform 0.42s ease, filter 0.42s ease;
}

:deep(.base-card:hover) .card-image img {
  transform: scale(1.04);
  filter: saturate(1.06) contrast(1.06);
}

.ai-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 0 10px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  color: var(--button-primary-text);
  font-size: var(--text-label);
  font-weight: 600;
  background: linear-gradient(135deg, var(--brand-main), var(--brand-second));
}

.card-info {
  padding: 24px;
}

h3 {
  margin: 0 !important;
  color: var(--text-main);
  font-size: var(--text-card-large);
  font-weight: 500;
  line-height: 1.32;
  letter-spacing: 0;
}

p {
  margin: 12px 0 22px !important;
  color: var(--text-sub);
  font-size: var(--text-small);
  font-weight: 400;
  line-height: 1.65;
}

.card-desc { margin-top: -10px !important; }

@media (max-width: 960px) {
  .aigc-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .aigc-list {
    grid-template-columns: 1fr;
  }
}
</style>
