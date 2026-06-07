<script setup>
import { withBase } from 'vitepress'
import { aigcWorks } from '../.shared/aigcData.js'

const pageLink = (path) => withBase(path)
</script>

<template>
  <div class="aigc-list">
    <a 
      v-for="work in aigcWorks" 
      :key="work.id" 
      :href="pageLink(work.link)" 
      class="aigc-card"
    >
      <div class="card-image">
        <img :src="work.img" :alt="work.title" loading="lazy" />
        <div class="ai-badge">AI</div>
      </div>
      <div class="card-info">
        <h3>{{ work.title }}</h3>
        <p class="category">{{ work.category }}</p>
        <div class="btn">查看详情 →</div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.aigc-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
}

@media (max-width: 960px) {
  .aigc-list { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .aigc-list { grid-template-columns: 1fr; }
}

.aigc-card {
  display: block;
  background: var(--liuli-card);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none !important;
  transition: all 0.3s ease;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.aigc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px var(--liuli-glow);
  border-color: var(--vp-c-brand-1);
}

.card-image { 
  aspect-ratio: 4 / 3;
  overflow: hidden; 
  background: var(--vp-c-bg-soft);
  position: relative;
}

.card-image img { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  transition: transform 0.5s ease; 
}

.aigc-card:hover .card-image img { 
  transform: scale(1.05); 
}

.ai-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}

.card-info { 
  padding: 24px; 
}

.card-info h3 { 
  margin: 0 !important; 
  font-size: 1.2rem; 
  font-weight: 800;
  line-height: 1.4; 
  color: var(--vp-c-text-1);
}

.category { 
  margin: 8px 0 16px 0 !important; 
  font-size: 0.9rem; 
  color: var(--vp-c-text-2);
}

.btn { 
  font-size: 0.9rem; 
  font-weight: 600; 
  color: var(--vp-c-brand-1); 
  transition: all 0.2s;
}

.aigc-card:hover .btn {
  transform: translateX(5px);
}
</style>
