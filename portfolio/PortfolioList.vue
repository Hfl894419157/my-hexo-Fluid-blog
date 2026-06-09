<script setup>
import { withBase } from 'vitepress'
import { portfolioWorks } from '../.shared/portfolioData.js'
import ReactIsland from '../components/ReactIsland.vue'

const pageLink = (path) => withBase(path)
</script>

<template>
  <ClientOnly>
    <ReactIsland variant="case-showcase" tone="case" density="medium" />
  </ClientOnly>
  <div class="portfolio-list">

    <a 
      v-for="work in portfolioWorks" 
      :key="work.id" 
      :href="pageLink(work.link)" 
      class="project-card"
    >
      <div class="card-image">
        <img :src="work.img" :alt="work.title" />
      </div>
      <div class="card-info">
        <h3>{{ work.title }}</h3>
        <p>{{ work.desc }}</p>
        <div class="btn">查看详情 →</div>
      </div>
    </a>

</div> </template> <style scoped>
.portfolio-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
}

@media (max-width: 960px) {
  .portfolio-list { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .portfolio-list { grid-template-columns: 1fr; }
}

.project-card {
  display: block;
  background: var(--liuli-card);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  text-decoration: none !important;
  transition: all 0.3s ease;
  color: var(--vp-c-text-1) !important;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px var(--liuli-glow);
  border-color: var(--vp-c-brand-1); 
}

.card-image { aspect-ratio: 4 / 3; overflow: hidden; background: var(--vp-c-bg-soft); }
.card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.project-card:hover .card-image img { transform: scale(1.05); }

.card-info { padding: 24px; }
.card-info h3 { margin: 0 !important; font-size: 1.2rem; font-weight: 800; line-height: 1.4; color: var(--vp-c-text-1); }
.card-info p { margin: 8px 0 16px 0 !important; font-size: 0.9rem; color: var(--vp-c-text-2); }
.btn { font-size: 0.9rem; font-weight: 600; color: var(--vp-c-brand-1); }
</style>
