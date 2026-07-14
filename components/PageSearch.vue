<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter, withBase } from 'vitepress'
import { data as searchPages } from '../.vitepress/search.data.mjs'

const props = defineProps({
  topics: {
    type: Array,
    default: () => ['个人品牌', '内容架构', 'AI 设计', 'AIGC', '工作流', '资产沉淀']
  }
})

const router = useRouter()
const query = ref('')
const selectedIndex = ref(0)
const terms = computed(() => query.value.trim().toLowerCase().split(/\s+/).filter(Boolean))

const normalize = (value) => String(value || '').toLowerCase()
const score = (page) => {
  let value = 0
  const title = normalize(page.title)
  const headings = normalize(page.headings?.map((item) => item.text).join(' '))
  const body = normalize(page.text)
  for (const term of terms.value) {
    if (!title.includes(term) && !headings.includes(term) && !body.includes(term)) return 0
    if (title.includes(term)) value += 160
    if (headings.includes(term)) value += 90
    if (body.includes(term)) value += 35
  }
  return value
}

const results = computed(() => {
  if (!terms.value.length) return []
  return searchPages
    .map((page) => ({ page, score: score(page) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 7)
    .map(({ page }) => page)
})

watch(results, () => { selectedIndex.value = 0 })

const go = (page = results.value[selectedIndex.value]) => {
  if (page) router.go(withBase(page.url))
}

const onKeydown = (event) => {
  if (!results.value.length) return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % results.value.length
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    selectedIndex.value = (selectedIndex.value - 1 + results.value.length) % results.value.length
  } else if (event.key === 'Enter') {
    event.preventDefault()
    go()
  }
}

const useTopic = (topic) => {
  query.value = topic
}
</script>

<template>
  <div class="page-search">
    <div class="page-search__field">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 20-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
      <input
        v-model="query"
        type="search"
        placeholder="搜索全站的标题、文章与文案…"
        aria-label="搜索全站内容"
        @keydown="onKeydown"
      >
      <button v-if="query" type="button" @click="query = ''">清除</button>
    </div>

    <div v-if="query.trim()" class="page-search__results" aria-live="polite">
      <button
        v-for="(result, index) in results"
        :key="result.url"
        type="button"
        :class="{ active: selectedIndex === index }"
        @mouseenter="selectedIndex = index"
        @click="go(result)"
      >
        <span>{{ result.section }}</span>
        <strong>{{ result.title }}</strong>
        <i aria-hidden="true">进入 →</i>
      </button>
      <p v-if="!results.length">没有找到匹配内容，请换一个关键词。</p>
    </div>

    <div class="page-search__topics">
      <span>热门主题：</span>
      <button v-for="topic in topics" :key="topic" type="button" @click="useTopic(topic)"># {{ topic }}</button>
    </div>
  </div>
</template>

<style scoped>
.page-search {
  position: relative;
  z-index: 5;
  padding: 30px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--bg-card) 90%, transparent);
  box-shadow: 0 20px 60px color-mix(in srgb, var(--text-main) 5%, transparent);
}

.page-search__field {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  min-height: 64px;
  padding: 0 18px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  background: var(--bg-soft);
}

.page-search__field svg {
  width: 22px;
  fill: none;
  stroke: var(--text-muted);
  stroke-width: 1.8;
}

.page-search__field input {
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text-main);
  font-size: 16px;
}

.page-search__field input::placeholder { color: var(--text-muted); }
.page-search__field button {
  border: 0;
  background: transparent;
  color: var(--brand-main);
  font-size: var(--text-caption);
  cursor: pointer;
}

.page-search__topics {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  align-items: center;
  margin-top: 18px;
}

.page-search__topics > span {
  margin-right: 4px;
  color: var(--text-sub);
  font-size: var(--text-caption);
}

.page-search__topics button {
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  background: var(--bg-soft);
  color: var(--text-sub);
  font-size: var(--text-label);
  font-weight: 600;
  cursor: pointer;
}

.page-search__topics button:hover { border-color: var(--border-strong); color: var(--brand-main); }

.page-search__results {
  position: absolute;
  top: calc(100% - 17px);
  right: 30px;
  left: 30px;
  display: grid;
  max-height: 360px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-page);
  box-shadow: var(--shadow-card);
}

.page-search__results button {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 12px 14px;
  border: 0;
  border-radius: var(--radius-control);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.page-search__results button:hover,
.page-search__results button.active { background: var(--bg-soft); }
.page-search__results span { color: var(--brand-main); font-size: var(--text-label); }
.page-search__results strong { overflow: hidden; font-size: var(--text-small); text-overflow: ellipsis; white-space: nowrap; }
.page-search__results i { color: var(--text-muted); font-size: var(--text-label); font-style: normal; }
.page-search__results p { margin: 0; padding: 18px; color: var(--text-muted); font-size: var(--text-small); }

@media (max-width: 640px) {
  .page-search { padding: 16px; }
  .page-search__field { min-height: 56px; padding: 0 14px; }
  .page-search__field input { font-size: 14px; }
  .page-search__results { top: calc(100% - 8px); right: 16px; left: 16px; }
  .page-search__results button { grid-template-columns: 72px minmax(0, 1fr); gap: 8px; }
  .page-search__results i { display: none; }
}
</style>
