<script setup>
import { publishedPortfolioWorks as portfolioWorks } from '../.shared/portfolioData.js'
import MediaFrame from '../components/MediaFrame.vue'
</script>

<template>
  <div class="portfolio-wall">
    <a
      v-for="(work, index) in portfolioWorks"
      :key="work.id"
      class="portfolio-story"
      :class="{ 'portfolio-story--lead': index === 0 }"
      :href="work.link"
    >
      <MediaFrame :src="work.cover" :alt="work.alt" :aspect="index === 0 ? '16 / 10' : work.aspectRatio" :caption="work.caption" />
      <div class="portfolio-story__copy">
        <span>{{ String(index + 1).padStart(2, '0') }} · {{ work.category }}</span>
        <h2>{{ work.title }}</h2>
        <p>{{ work.desc }}</p>
        <ul><li v-for="tag in work.tags" :key="tag">{{ tag }}</li></ul>
        <strong>查看案例 →</strong>
      </div>
    </a>
  </div>
</template>

<style scoped>
.portfolio-wall { display: grid; gap: 34px; margin-top: 46px; }
.portfolio-story { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr); overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); color: inherit; text-decoration: none; background: var(--bg-card); }
.portfolio-story:nth-child(even) { grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.1fr); }
.portfolio-story:nth-child(even) :deep(.media-frame) { order: 2; }
.portfolio-story :deep(.media-frame__viewport) { height: 100%; border: 0; border-radius: 0; box-shadow: none; }
.portfolio-story :deep(figcaption) { display: none; }
.portfolio-story__copy { display: grid; align-content: center; padding: clamp(30px, 5vw, 64px); }
.portfolio-story__copy > span { color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.12em; }
h2 { margin: 16px 0 0 !important; color: var(--text-main); font-family: var(--font-display); font-size: clamp(30px, 3.8vw, 52px); font-weight: 600; line-height: 1.2; }
p { margin: 18px 0 0 !important; color: var(--text-sub); font-size: var(--text-small); line-height: 1.85; }
ul { display: flex; flex-wrap: wrap; gap: 8px; padding: 0; margin: 26px 0 0; list-style: none; }
li { padding: 7px 10px; border: 1px solid var(--border-soft); border-radius: var(--radius-control); color: var(--text-muted); font-size: var(--text-label); }
.portfolio-story__copy strong { margin-top: 28px; color: var(--brand-main); font-size: var(--text-small); }

@media (max-width: 760px) {
  .portfolio-story, .portfolio-story:nth-child(even) { grid-template-columns: 1fr; }
  .portfolio-story:nth-child(even) :deep(.media-frame) { order: initial; }
  .portfolio-story :deep(.media-frame__viewport) { aspect-ratio: 16 / 10; }
}
</style>
