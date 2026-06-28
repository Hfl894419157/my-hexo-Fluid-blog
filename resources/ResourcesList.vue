<script setup>
import { withBase } from 'vitepress'
import { toolsResources } from '../.shared/resourcesData.js'
import ReactIsland from '../components/ReactIsland.vue'

const pageLink = (path) => withBase(path)
</script>

<template>
  <ClientOnly>
    <ReactIsland variant="resource-micro" tone="resource" density="low" />
  </ClientOnly>
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
  min-height: 308px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  background: var(--liuli-card);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none !important;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 42px var(--liuli-glow);
  border-color: var(--vp-c-brand-1);
}

.tool-icon {
  width: 68px;
  height: 68px;
  display: grid;
  place-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #f2f3f5;
  font-size: 2rem;
  margin-bottom: 5px;
  transition: all 0.3s;
}

:global(html.dark) .tool-icon {
  background: #292947;
  border-color: #3a3862;
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
  font-size: 1.22rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.category {
  margin: 0 0 12px !important;
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.desc {
  margin: 0 !important;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.btn-download {
  width: 100%;
  margin-top: auto;
  padding: 11px 0;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  color: var(--vp-c-text-1) !important;
  font-weight: 700;
  transition: all 0.3s;
}

:global(html.dark) .btn-download {
  color: white !important;
}

.tool-card:hover .btn-download {
  box-shadow: 0 4px 12px var(--liuli-glow);
  transform: scale(1.02);
}
</style>
