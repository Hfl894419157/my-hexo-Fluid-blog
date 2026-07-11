<script setup>
import { allPortfolioWorks as portfolioWorks } from '../.shared/portfolioData.js'
import MediaFrame from '../components/MediaFrame.vue'
</script>

<template>
  <div class="portfolio-grid">
    <a
      v-for="(work, index) in portfolioWorks"
      :key="work.id"
      class="portfolio-card"
      :class="{ 'portfolio-card--draft': work.status === 'draft' }"
      :href="work.status === 'published' ? work.link : undefined"
      :aria-disabled="work.status === 'draft'"
    >
      <div class="portfolio-card__media">
        <MediaFrame
          v-if="work.cover"
          :src="work.cover"
          :alt="work.alt || work.title"
          aspect="4 / 3"
        />
        <div v-else class="portfolio-card__placeholder-img" aria-hidden="true"></div>
        <span v-if="work.status === 'draft'" class="portfolio-card__badge">更新中</span>
      </div>
      <div class="portfolio-card__body">
        <span class="portfolio-card__label">{{ String(index + 1).padStart(2, '0') }} · {{ work.category }}</span>
        <h2>{{ work.title }}</h2>
        <p>{{ work.desc }}</p>
        <ul v-if="work.tags && work.tags.length">
          <li v-for="tag in work.tags" :key="tag">{{ tag }}</li>
        </ul>
        <strong v-if="work.status === 'published'">查看案例 →</strong>
        <strong v-else class="portfolio-card__coming">敬请期待</strong>
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

.portfolio-card:not(.portfolio-card--draft):hover {
  border-color: var(--brand-main);
  box-shadow: 0 6px 32px rgba(0, 0, 0, 0.12);
}

.portfolio-card--draft {
  cursor: default;
  opacity: 0.6;
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

.portfolio-card__badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: var(--text-label);
  letter-spacing: 0.06em;
  border: 1px solid var(--border-soft);
}

.portfolio-card__body {
  display: flex;
  flex-direction: column;
  padding: clamp(20px, 3vw, 32px);
  flex: 1;
}

.portfolio-card__label {
  color: var(--brand-cyan);
  font-size: var(--text-label);
  letter-spacing: 0.12em;
}

h2 {
  margin: 12px 0 0 !important;
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

.portfolio-card__coming {
  margin-top: 20px;
  color: var(--text-muted) !important;
  font-size: var(--text-small);
}

@media (max-width: 900px) {
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .portfolio-grid { grid-template-columns: 1fr; }
}
</style>
