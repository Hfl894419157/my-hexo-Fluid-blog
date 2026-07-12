<script setup>
import { ref, computed } from 'vue'
import MediaFrame from './MediaFrame.vue'
import KnowledgePageHero from './KnowledgePageHero.vue'
import { allBlogPosts as blogPosts } from '../.shared/blogData.js'
import { allResources as resourcesData } from '../.shared/resourcesData.js'

const searchQuery = ref('')
const selectedTag = ref('')

// 获取所有资源和文章数据
const allItems = computed(() => {
  const blogs = blogPosts.map(p => ({
    id: p.id,
    title: p.title,
    desc: p.summary,
    link: p.link,
    type: '文章',
    date: p.publishedAt,
    tags: p.tags || []
  }))
  const res = resourcesData.map(r => ({
    id: r.id,
    title: r.name,
    desc: r.desc,
    link: r.link,
    type: '资源',
    date: r.verifiedAt,
    tags: [r.category]
  }))
  return [...blogs, ...res]
})

// 提取所有唯一标签/主题
const popularTags = computed(() => {
  const tags = new Set()
  allItems.value.forEach(item => {
    item.tags.forEach(t => tags.add(t))
  })
  return Array.from(tags).slice(0, 6)
})

// 搜索和过滤
const filteredItems = computed(() => {
  let list = allItems.value
  if (selectedTag.value) {
    list = list.filter(item => item.tags.includes(selectedTag.value))
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q)
    )
  }
  return list
})

const lanes = [
  { label: '学习与观察', title: 'AI 学习笔记与实验记录', desc: '记录 AI 学习过程、行业趋势观察、工具变化与具体的实验测试结论。', href: '/knowledge/learning-observation', image: '/aigc-3.jpg', alt: '蓝紫色数字粒子视觉，代表行业观察与趋势分析', action: '查看学习与观察' },
  { label: '方法体系', title: '把设计经验整理成可复用方法', desc: '将 AI 时代的设计判断、工作流建设、个人知识系统与项目复盘沉淀为结构化方法卡。', href: '/knowledge/methods', image: '/aigc-2.jpg', alt: 'AI 电路视觉，代表沉淀的方法体系', action: '进入方法体系' },
  { label: '资源库', title: '只保留真正能进入项目的资源', desc: '按使用场景整理 Prompt 结构、检查清单、工具模板，并明确使用边界与验证状态。', href: '/knowledge/resources', image: '/avatar.jpg', alt: '知识资产视觉，代表个人资源库', action: '进入资源库' }
]

const toggleTag = (tag) => {
  if (selectedTag.value === tag) {
    selectedTag.value = ''
  } else {
    selectedTag.value = tag
  }
}
</script>

<template>
  <section class="knowledge-hub">
    <KnowledgePageHero
      title="知识库"
      description="把 AI 学习、设计实践与工作流，沉淀成可复用的个人能力系统。"
      variant="method"
    />

    <!-- ① 全局快速检索区 -->
    <div class="kh-search-box">
      <div class="kh-search-box__input-wrap">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="搜索知识库内的文章、方法卡、Prompt、清单..." 
          aria-label="搜索知识库"
        />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''" aria-label="清除输入">✕</button>
      </div>

      <!-- 热门主题/标签 -->
      <div class="kh-search-tags">
        <span class="tags-label">热门主题：</span>
        <button 
          v-for="tag in popularTags" 
          :key="tag" 
          :class="['tag-btn', { 'tag-btn--active': selectedTag === tag }]"
          @click="toggleTag(tag)"
        >
          # {{ tag }}
        </button>
      </div>
    </div>

    <!-- ② 搜索结果悬浮面板 (有输入或选中标签时呈现) -->
    <div v-if="searchQuery || selectedTag" class="kh-search-results">
      <div class="results-header">
        <span>查找到 {{ filteredItems.length }} 条相关知识</span>
        <button class="close-results" @click="searchQuery = ''; selectedTag = ''">重置过滤 ✕</button>
      </div>
      <div v-if="filteredItems.length" class="results-grid">
        <a 
          v-for="item in filteredItems" 
          :key="item.id" 
          :href="item.link" 
          class="result-item"
        >
          <div class="result-item__meta">
            <span class="result-type">{{ item.type }}</span>
            <span class="result-date">{{ item.date }}</span>
          </div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
        </a>
      </div>
      <div v-else class="results-empty">
        未找到匹配的知识内容。请换个关键词试试。
      </div>
    </div>

    <!-- ③ SVG 知识地图网络 -->
    <div class="kh-map-section">
      <div class="map-head">
        <h3>LIULI AI LAB 知识脉络网络</h3>
        <p>流程是骨架，资源是血肉。通过项目复盘，将零散知识固化为可流动的生产网格。</p>
      </div>
      <div class="map-canvas-container">
        <svg class="map-svg" viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 背景网格点 -->
          <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="var(--brand-main)" fill-opacity="0.08"/>
          </pattern>
          <rect width="800" height="240" fill="url(#grid-pattern)" />

          <!-- 连接线段 -->
          <g stroke="var(--brand-main)" stroke-width="1.2" stroke-opacity="0.18">
            <line x1="120" y1="120" x2="260" y2="60" />
            <line x1="120" y1="120" x2="260" y2="180" />
            <line x1="260" y1="60" x2="420" y2="60" />
            <line x1="260" y1="180" x2="420" y2="180" />
            <line x1="420" y1="60" x2="580" y2="120" />
            <line x1="420" y1="180" x2="580" y2="120" />
            <line x1="580" y1="120" x2="700" y2="120" stroke-dasharray="3 3" />
          </g>

          <!-- 流动微粒动效 (纯CSS) -->
          <circle r="3" fill="var(--brand-main)" opacity="0.6">
            <animateMotion path="M 120,120 L 260,60 L 420,60 L 580,120" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle r="3" fill="var(--brand-main)" opacity="0.6">
            <animateMotion path="M 120,120 L 260,180 L 420,180 L 580,120" dur="7s" repeatCount="indefinite" />
          </circle>

          <!-- 节点气泡及文字 -->
          <!-- 节点 1: 真实案例 -->
          <g class="map-node" transform="translate(120, 120)">
            <circle r="22" fill="var(--bg-soft)" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5"/>
            <circle r="8" fill="var(--brand-main)" fill-opacity="0.3"/>
            <circle r="3" fill="var(--brand-main)"/>
            <text y="-32" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="600">项目实践 (CASE)</text>
          </g>

          <!-- 节点 2: 意图转译 -->
          <g class="map-node" transform="translate(260, 60)">
            <circle r="18" fill="var(--bg-soft)" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4"/>
            <text y="-26" text-anchor="middle" fill="var(--text-sub)" font-size="10">意图转译</text>
          </g>

          <!-- 节点 3: 变量锁定 -->
          <g class="map-node" transform="translate(260, 180)">
            <circle r="18" fill="var(--bg-soft)" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4"/>
            <text y="30" text-anchor="middle" fill="var(--text-sub)" font-size="10">变量锁定</text>
          </g>

          <!-- 节点 4: 方法卡片 -->
          <g class="map-node" transform="translate(420, 60)">
            <circle r="18" fill="var(--bg-soft)" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4"/>
            <text y="-26" text-anchor="middle" fill="var(--text-sub)" font-size="10">方法卡片</text>
          </g>

          <!-- 节点 5: 检查清单 -->
          <g class="map-node" transform="translate(420, 180)">
            <circle r="18" fill="var(--bg-soft)" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4"/>
            <text y="30" text-anchor="middle" fill="var(--text-sub)" font-size="10">复盘清单</text>
          </g>

          <!-- 节点 6: 资产回流 -->
          <g class="map-node" transform="translate(580, 120)">
            <circle r="22" fill="var(--bg-soft)" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5"/>
            <circle r="8" fill="var(--brand-main)" fill-opacity="0.3"/>
            <circle r="3" fill="var(--brand-main)"/>
            <text y="-32" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="600">资产沉淀 (ASSET)</text>
          </g>

          <!-- 节点 7: 专有生产库 -->
          <g class="map-node" transform="translate(700, 120)">
            <rect x="-38" y="-12" width="76" height="24" rx="4" fill="var(--bg-soft)" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="3 3"/>
            <text dy="4" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="500">个人资源库</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- ④ 三大分类板块 Lanes -->
    <div class="knowledge-hub__lanes">
      <a v-for="(lane, index) in lanes" :key="lane.label" :href="lane.href" class="knowledge-lane">
        <MediaFrame :src="lane.image" :alt="lane.alt" :aspect="index % 2 === 0 ? '16 / 10' : '4 / 3'" tone="quiet" />
        <div>
          <span>0{{ index + 1 }} · {{ lane.label }}</span>
          <h2>{{ lane.title }}</h2>
          <p>{{ lane.desc }}</p>
          <strong>{{ lane.action }} →</strong>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.knowledge-hub { 
  width: min(1080px, 100%); 
  margin: 0 auto; 
  padding: 44px 0 24px; 
}

/* ── 快速搜索 ── */
.kh-search-box {
  margin-top: 36px;
  padding: 28px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
}

.kh-search-box__input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  width: 18px;
  height: 18px;
  color: var(--text-muted);
  pointer-events: none;
}

.kh-search-box__input-wrap input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  background: var(--bg-soft);
  color: var(--text-main);
  font-size: var(--text-body);
  font-family: var(--font-sans);
  transition: border-color var(--transition-smooth), box-shadow var(--transition-smooth);
}

.kh-search-box__input-wrap input:focus {
  outline: 0;
  border-color: var(--brand-main);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand-main) 12%, transparent);
}

.clear-btn {
  position: absolute;
  right: 16px;
  background: 0;
  border: 0;
  color: var(--text-muted);
  font-size: 14px;
  cursor: pointer;
}

.clear-btn:hover {
  color: var(--text-main);
}

.kh-search-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
}

.tags-label {
  color: var(--text-sub);
  font-size: var(--text-label);
  font-weight: 500;
}

.tag-btn {
  padding: 4px 10px;
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  background: var(--bg-soft);
  color: var(--text-sub);
  font-size: var(--text-micro);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-smooth);
}

.tag-btn:hover {
  border-color: var(--brand-main);
  color: var(--brand-main);
}

.tag-btn--active {
  background: var(--brand-main);
  border-color: var(--brand-main);
  color: var(--button-primary-text);
}

/* ── 搜索结果面板 ── */
.kh-search-results {
  margin-top: 24px;
  padding: 24px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-soft);
  padding-bottom: 14px;
  margin-bottom: 20px;
  color: var(--text-sub);
  font-size: var(--text-small);
  font-weight: 500;
}

.close-results {
  background: 0;
  border: 0;
  color: var(--brand-main);
  font-size: var(--text-label);
  font-weight: 600;
  cursor: pointer;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.result-item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  background: var(--bg-soft);
  color: inherit;
  text-decoration: none;
  transition: border-color var(--transition-smooth), transform var(--transition-smooth);
}

.result-item:hover {
  border-color: var(--brand-main);
  transform: translateY(-2px);
}

.result-item__meta {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-micro);
  color: var(--text-muted);
  margin-bottom: 8px;
}

.result-type {
  font-weight: 600;
  color: var(--brand-main);
}

.result-item h4 {
  margin: 0 0 8px;
  color: var(--text-main);
  font-size: 15px;
  font-weight: 600;
}

.result-item p {
  margin: 0;
  color: var(--text-sub);
  font-size: var(--text-label);
  line-height: 1.6;
}

.results-empty {
  padding: 32px;
  text-align: center;
  color: var(--text-muted);
  font-size: var(--text-small);
}

/* ── 知识地图 ── */
.kh-map-section {
  margin-top: 48px;
  padding: 32px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
}

.map-head {
  text-align: center;
  margin-bottom: 28px;
}

.map-head h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
}

.map-head p {
  margin: 10px 0 0;
  color: var(--text-sub);
  font-size: var(--text-small);
}

.map-canvas-container {
  width: 100%;
  overflow-x: auto;
}

.map-svg {
  width: 100%;
  min-width: 720px;
  height: auto;
  display: block;
}

/* ── 三大 Lane ── */
.knowledge-hub__lanes { display: grid; gap: 24px; margin-top: 48px; }
.knowledge-lane { display: grid; grid-template-columns: minmax(280px, 0.86fr) minmax(0, 1.14fr); overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); color: inherit; text-decoration: none; background: var(--bg-card); transition: border-color var(--transition-smooth), box-shadow var(--transition-smooth); }
.knowledge-lane:hover { border-color: color-mix(in srgb, var(--brand-main) 30%, transparent); box-shadow: var(--shadow-card); }
.knowledge-lane:nth-child(even) { grid-template-columns: minmax(0, 1.14fr) minmax(280px, 0.86fr); }
.knowledge-lane:nth-child(even) :deep(.media-frame) { order: 2; }
.knowledge-lane :deep(.media-frame__viewport) { height: 100%; border: 0; border-radius: 0; }
.knowledge-lane > div { display: grid; align-content: center; padding: clamp(30px, 5vw, 58px); }
.knowledge-lane span { color: var(--brand-main); font-size: var(--text-label); letter-spacing: 0.12em; font-weight: 600; }
.knowledge-lane h2 { margin: 14px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: clamp(28px, 3.2vw, 44px); font-weight: 600; line-height: 1.25; }
.knowledge-lane p { margin: 16px 0 0; color: var(--text-sub); font-size: var(--text-small); line-height: 1.8; }
.knowledge-lane strong { margin-top: 26px; color: var(--brand-main); font-size: var(--text-small); }

@media (max-width: 700px) {
  .knowledge-lane, .knowledge-lane:nth-child(even) { grid-template-columns: 1fr; }
  .knowledge-lane:nth-child(even) :deep(.media-frame) { order: initial; }
  .knowledge-lane :deep(.media-frame__viewport) { aspect-ratio: 16 / 10; }
  .results-grid { grid-template-columns: 1fr; }
}
</style>
