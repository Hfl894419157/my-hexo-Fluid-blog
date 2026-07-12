<script setup>
import { allPortfolioWorks as portfolioWorks } from '../.shared/portfolioData.js'
import MediaFrame from '../components/MediaFrame.vue'
</script>

<template>
  <div class="portfolio-grid">
    <a
      v-for="work in portfolioWorks"
      :key="work.id"
      class="portfolio-card"
      :href="work.link"
    >
      <div class="portfolio-card__media">
        <MediaFrame
          v-if="work.cover"
          :src="work.cover"
          :alt="work.alt || work.title"
          aspect="4 / 3"
        />
        <div v-else class="portfolio-card__placeholder-img" aria-hidden="true"></div>
      </div>
      <div class="portfolio-card__body">
        <h2>{{ work.title }}</h2>
        <p>{{ work.desc }}</p>
        <ul v-if="work.tags && work.tags.length">
          <li v-for="tag in work.tags" :key="tag">{{ tag }}</li>
        </ul>
        <strong>查看案例 →</strong>
      </div>
    </a>
  </div>
</template>

<style scoped>
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 46px;
}

.portfolio-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: var(--bg-card);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.portfolio-card:hover {
  border-color: var(--brand-main);
  box-shadow: 0 6px 32px rgba(0, 0, 0, 0.12);
}

.portfolio-card__media {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.portfolio-card__media :deep(.media-frame__viewport) {
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.portfolio-card__media :deep(figcaption) { display: none; }

.portfolio-card__placeholder-img {
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, var(--bg-soft) 0%, var(--bg-page) 100%);
}

.portfolio-card__body {
  display: flex;
  flex-direction: column;
  padding: clamp(20px, 3vw, 32px);
  flex: 1;
}

h2 {
  margin: 0 !important;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 600;
  line-height: 1.3;
}

p {
  margin: 10px 0 0 !important;
  color: var(--text-sub);
  font-size: var(--text-label);
  line-height: 1.8;
  flex: 1;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0;
  margin: 16px 0 0;
  list-style: none;
}

li {
  padding: 4px 8px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  color: var(--text-muted);
  font-size: var(--text-label);
}

.portfolio-card__body > strong {
  margin-top: 20px;
  color: var(--brand-main);
  font-size: var(--text-small);
}

@media (max-width: 900px) {
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .portfolio-grid { grid-template-columns: 1fr; }
}
</style>
