<script setup>
import { withBase } from 'vitepress'
import { toolsResources } from '../.shared/resourcesData.js'

const pageLink = (path) => withBase(path)
</script>

<template>
  <div class="resources-list">
    <a 
      v-for="tool in toolsResources" 
      :key="tool.id" 
      :href="pageLink(tool.link)" 
      class="tool-card"
    >
      <div class="tool-icon">{{ tool.icon }}</div>
      <div class="tool-info">
        <h3>{{ tool.name }}</h3>
        <p class="category">{{ tool.category }}</p>
        <p class="desc">{{ tool.desc }}</p>
      </div>
      <div class="btn-download">查看详情 →</div>
    </a>
  </div>
</template>

<style scoped>
/* 3列网格布局 */
.resources-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
}

@media (max-width: 960px) {
  .resources-list { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .resources-list { grid-template-columns: 1fr; }
}

.tool-card {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  text-decoration: none !important;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(139, 92, 246, 0.2);
  border-color: #8B5CF6;
}

.tool-icon {
  font-size: 3rem;
  margin-bottom: 5px;
  filter: drop-shadow(0 4px 12px rgba(139, 92, 246, 0.3));
  transition: all 0.3s;
}

.tool-card:hover .tool-icon {
  transform: scale(1.1);
}

.tool-info {
  flex: 1;
  width: 100%;
}

.tool-info h3 {
  margin: 0 0 8px !important;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.category {
  margin: 0 0 12px !important;
  font-size: 0.85rem;
  color: #8B5CF6;
  font-weight: 600;
}

.desc {
  margin: 0 !important;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.btn-download {
  width: 100%;
  padding: 10px 0;
  border-radius: 8px;
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: white !important;
  font-weight: 600;
  margin-top: 10px;
  transition: all 0.3s;
}

.tool-card:hover .btn-download {
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  transform: scale(1.02);
}
</style>
