<script setup>
import { publishedPortfolioWorks as portfolioWorks } from '../.shared/portfolioData.js'
import BaseButton from '../components/BaseButton.vue'
import BaseCard from '../components/BaseCard.vue'
import ReactIsland from '../components/ReactIsland.vue'
</script>

<template>
  <ClientOnly>
    <ReactIsland variant="case-showcase" tone="case" density="medium" />
  </ClientOnly>

  <div class="portfolio-list">
    <BaseCard v-for="work in portfolioWorks" :key="work.id" :href="work.link" :padded="false">
      <div v-if="work.img" class="card-image">
        <img :src="work.img" :alt="work.title" loading="lazy" />
      </div>
      <div v-else class="card-cover" aria-hidden="true">
        <span>{{ work.titleEn }}</span>
      </div>
      <div class="card-info">
        <span>{{ work.category }}</span>
        <h3>{{ work.title }}</h3>
        <p>{{ work.desc }}</p>
        <BaseButton as="span" variant="text">查看详情 →</BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.portfolio-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 42px;
}

.card-image {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-soft);
}

.card-cover {
  display: grid;
  aspect-ratio: 4 / 3;
  place-items: end start;
  padding: 24px;
  color: var(--text-sub);
  background: linear-gradient(135deg, var(--bg-soft), var(--bg-card));
}

.card-cover span {
  max-width: 16ch;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-large);
  font-weight: 580;
  line-height: 1.3;
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

.card-info {
  padding: 24px;
}

span {
  color: var(--brand-cyan);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.14em;
}

h3 {
  margin: 12px 0 0 !important;
  color: var(--text-main);
  font-size: var(--text-card-large);
  font-weight: 580;
  line-height: 1.3;
  letter-spacing: 0;
}

p {
  margin: 12px 0 22px !important;
  color: var(--text-sub);
  font-size: var(--text-caption);
  font-weight: 400;
  line-height: 1.72;
}

@media (max-width: 960px) {
  .portfolio-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .portfolio-list {
    grid-template-columns: 1fr;
  }
}
</style>
