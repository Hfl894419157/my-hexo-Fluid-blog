<script setup>
import { withBase } from 'vitepress'
import { portfolioWorks } from '../.shared/portfolioData.js'

const pageLink = (path) => withBase(path)
</script>

<template>
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
/* 强制 3 列布局 */
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
  background: rgba(255,255,255,0.05); /* 强制深色背景 */
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  text-decoration: none !important;
  transition: all 0.3s ease;
  color: #ffffff !important; /* 强制白色文字 */
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand-1); 
}

.card-image { height: 200px; overflow: hidden; background: #333; }
.card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.project-card:hover .card-image img { transform: scale(1.05); }

.card-info { padding: 24px; }
.card-info h3 { margin: 0 !important; font-size: 1.2rem; font-weight: 700; line-height: 1.4; color: #ffffff; }
.card-info p { margin: 8px 0 16px 0 !important; font-size: 0.9rem; color: #999999; }
.btn { font-size: 0.9rem; font-weight: 600; color: var(--vp-c-brand-1); }

.project-card {
  background: var(--liuli-card);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1) !important;
}

.project-card:hover {
  box-shadow: 0 12px 24px var(--liuli-glow);
  border-color: var(--vp-c-brand-1);
}

.card-info h3 {
  color: var(--vp-c-text-1);
}

.card-info p {
  color: var(--vp-c-text-2);
}
</style>
