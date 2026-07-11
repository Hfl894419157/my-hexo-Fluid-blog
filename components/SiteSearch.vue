<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter, withBase } from 'vitepress'
import { data as searchPages } from '../.vitepress/search.data.mjs'

const emit = defineEmits(['open-change'])
const route = useRoute()
const router = useRouter()
const isOpen = ref(false)
const query = ref('')
const inputRef = ref(null)
const rootRef = ref(null)
const selectedIndex = ref(0)

const labels = {
  open: '\u641c\u7d22',
  close: '\u5173\u95ed',
  placeholder: '\u641c\u7d22\u5168\u7ad9\u5185\u5bb9',
  submit: '\u641c\u7d22',
  empty: '\u6ca1\u6709\u627e\u5230\u5339\u914d\u5185\u5bb9',
  hint: '\u8f93\u5165\u5173\u952e\u8bcd'
}

const matchLabels = {
  current: '\u5f53\u524d\u9875\u9762',
  title: '\u6807\u9898\u5339\u914d',
  section: '\u680f\u76ee\u5339\u914d',
  body: '\u6b63\u6587\u5339\u914d'
}

const searchIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10.8 4.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm-8.4 6.4a8.4 8.4 0 1 1 15.08 5.1l4.02 4.02-1.58 1.58-4.02-4.02A8.4 8.4 0 0 1 2.4 10.8Z"/></svg>'
const closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5Z"/></svg>'

const normalizePath = (path) => path.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/'
const currentPath = computed(() => normalizePath(route.path))
const trimmedQuery = computed(() => query.value.trim())
const queryTerms = computed(() => trimmedQuery.value.toLowerCase().split(/\s+/).filter(Boolean))

const openSearch = async () => {
  isOpen.value = true
  emit('open-change', true)
  await nextTick()
  inputRef.value?.focus()
}

const closeSearch = () => {
  isOpen.value = false
  emit('open-change', false)
  query.value = ''
  selectedIndex.value = 0
}

const normalizeText = (value) => String(value || '').toLowerCase()

const scorePage = (page, terms) => {
  const title = normalizeText(page.title)
  const headingText = normalizeText(page.headings.map((heading) => heading.text).join(' '))
  const body = normalizeText(page.text)
  const currentBoost = normalizePath(page.url) === currentPath.value ? 1000 : 0
  let score = currentBoost

  for (const term of terms) {
    if (title.includes(term)) score += 160
    if (headingText.includes(term)) score += 90
    if (body.includes(term)) score += 35
    if (!title.includes(term) && !headingText.includes(term) && !body.includes(term)) return 0
  }

  return score
}

const getMatchLabel = (page, terms) => {
  const title = normalizeText(page.title)
  const section = normalizeText(page.section)
  const headingText = normalizeText(page.headings.map((heading) => heading.text).join(' '))
  const isCurrent = normalizePath(page.url) === currentPath.value
  let source = matchLabels.body

  if (terms.some((term) => title.includes(term))) {
    source = matchLabels.title
  } else if (terms.some((term) => section.includes(term) || headingText.includes(term))) {
    source = matchLabels.section
  }

  return isCurrent ? `${matchLabels.current} / ${source}` : source
}

const buildResult = (page, terms) => {
  const titleMatch = terms.some((term) => normalizeText(page.title).includes(term))
  const heading = page.headings.find((item) => terms.some((term) => normalizeText(item.text).includes(term)))
  const target = heading && !titleMatch ? `${page.url}#${heading.anchor}` : page.url

  return {
    ...page,
    target,
    matchLabel: getMatchLabel(page, terms)
  }
}

const results = computed(() => {
  if (!trimmedQuery.value) return []
  const terms = queryTerms.value
  return searchPages
    .map((page) => ({ page, score: scorePage(page, terms) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title))
    .slice(0, 8)
    .map((item) => buildResult(item.page, terms))
})

watch(results, () => {
  selectedIndex.value = 0
})

const goToResult = async (result = results.value[selectedIndex.value]) => {
  if (!result) return
  await router.go(withBase(result.target))
  closeSearch()
}

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    closeSearch()
    return
  }
  if (!results.value.length) return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % results.value.length
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    selectedIndex.value = (selectedIndex.value - 1 + results.value.length) % results.value.length
  }
  if (event.key === 'Enter') {
    event.preventDefault()
    goToResult()
  }
}

const onDocumentClick = (event) => {
  if (!rootRef.value?.contains(event.target)) closeSearch()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <div ref="rootRef" class="site-search" :class="{ 'site-search--open': isOpen }">
    <button
      v-if="!isOpen"
      class="site-search__icon"
      type="button"
      :aria-label="labels.open"
      :title="labels.open"
      @click.stop="openSearch"
      v-html="searchIcon"
    />
    <form v-else class="site-search__form" role="search" @submit.prevent="goToResult()">
      <span class="site-search__leading" v-html="searchIcon" />
      <input
        ref="inputRef"
        v-model="query"
        class="site-search__input"
        type="search"
        :placeholder="labels.placeholder"
        autocomplete="off"
        @keydown="onKeydown"
      />
      <button class="site-search__submit" type="submit" :aria-label="labels.submit" :title="labels.submit">
        {{ labels.submit }}
      </button>
      <button
        class="site-search__close"
        type="button"
        :aria-label="labels.close"
        :title="labels.close"
        @click="closeSearch"
        v-html="closeIcon"
      />
      <div v-if="trimmedQuery" class="site-search__panel">
        <button
          v-for="(result, index) in results"
          :key="result.target"
          class="site-search__result"
          :class="{ active: index === selectedIndex }"
          type="button"
          @mouseenter="selectedIndex = index"
          @click="goToResult(result)"
        >
          <span class="site-search__result-meta">
            <span class="site-search__result-kicker">{{ result.section }}</span>
            <span class="site-search__result-match">{{ result.matchLabel }}</span>
          </span>
          <span class="site-search__result-title">{{ result.title }}</span>
        </button>
        <div v-if="!results.length" class="site-search__empty">{{ labels.empty }}</div>
      </div>
      <div v-else class="site-search__panel site-search__panel--hint">{{ labels.hint }}</div>
    </form>
  </div>
</template>

<style scoped>
.site-search {
  position: relative;
  flex: 0 0 auto;
}

.site-search__icon,
.site-search__close,
.site-search__submit {
  border: 0;
  font: inherit;
  cursor: pointer;
}

.site-search__icon {
  display: grid;
  width: 30px;
  height: 34px;
  place-items: center;
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--text-sub);
  transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.site-search__icon:hover {
  color: var(--text-main);
  background: var(--bg-soft);
  transform: translateY(-1px);
}

.site-search__icon :deep(svg),
.site-search__leading :deep(svg),
.site-search__close :deep(svg) {
  width: 18px;
  height: 18px;
  display: block;
}

.site-search__form {
  position: relative;
  display: flex;
  align-items: center;
  width: min(360px, calc(100vw - 38px));
  height: 38px;
  border: 1px solid color-mix(in srgb, var(--border-strong), transparent 28%);
  border-radius: var(--radius-control);
  background: color-mix(in srgb, var(--nav-bg-strong), transparent 38%);
  box-shadow: 0 16px 42px rgba(23, 19, 15, 0.10);
  /*
  backdrop-filter: blur(28px) saturate(1.2);
  -webkit-backdrop-filter: blur(28px) saturate(1.2);
  */
}

:global(html.dark) .site-search__form {
  box-shadow: 0 16px 46px rgba(0, 0, 0, 0.26);
}

.site-search__leading {
  display: grid;
  width: 36px;
  place-items: center;
  color: var(--text-muted);
}

.site-search__input {
  min-width: 0;
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text-main);
  font: inherit;
  font-size: 15px;
  font-weight: 500;
}

.site-search__input::placeholder {
  color: var(--text-muted);
}

.site-search__submit {
  height: 28px;
  margin-right: 4px;
  padding: 0 9px;
  border-radius: var(--radius-control);
  background: var(--brand-main);
  color: var(--button-primary-text);
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
}

.site-search__close {
  display: grid;
  width: 30px;
  height: 34px;
  place-items: center;
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--text-muted);
}

.site-search__close:hover {
  color: var(--text-main);
  background: var(--bg-soft);
}

.site-search__panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  display: grid;
  width: min(420px, calc(100vw - 32px));
  max-height: min(480px, calc(100vh - 118px));
  overflow-y: auto;
  padding: 8px;
  border: 1px solid color-mix(in srgb, var(--border-strong), transparent 30%);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--nav-bg-strong), transparent 36%);
  box-shadow: 0 26px 72px rgba(23, 19, 15, 0.13);
  /*
  backdrop-filter: blur(34px) saturate(1.22);
  -webkit-backdrop-filter: blur(34px) saturate(1.22);
  */
}

:global(html.dark) .site-search__panel {
  box-shadow: 0 26px 78px rgba(0, 0, 0, 0.34);
}

.site-search__panel--hint,
.site-search__empty {
  padding: 16px 14px;
  color: var(--text-muted);
  font-size: var(--text-caption);
  font-weight: 400;
}

.site-search__result {
  display: grid;
  gap: 5px;
  width: 100%;
  padding: 9px 11px;
  border: 0;
  border-radius: var(--radius-control);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.site-search__result:hover,
.site-search__result.active {
  background: color-mix(in srgb, var(--bg-soft), transparent 24%);
}

.site-search__result-meta {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
}

.site-search__result-kicker {
  color: var(--brand-main);
  font-size: var(--text-label);
  font-weight: 600;
  white-space: nowrap;
}

.site-search__result-match {
  min-width: 0;
  color: var(--text-muted);
  font-size: var(--text-caption);
  font-weight: 400;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.site-search__result-title {
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .site-search--open {
    position: static;
    min-width: 0;
    flex: 1 1 auto;
  }

  .site-search__form {
    width: 100%;
  }

  .site-search__panel {
    position: fixed;
    top: 88px;
    right: 16px;
    left: 16px;
    width: auto;
  }
}

@media (max-width: 560px) {
  .site-search__icon {
    width: 26px;
  }

  .site-search__submit {
    padding: 0 7px;
  }

  .site-search__panel {
    position: fixed;
    top: 68px;
    right: 10px;
    left: 10px;
    max-height: min(480px, calc(100vh - 88px));
  }
}
</style>
