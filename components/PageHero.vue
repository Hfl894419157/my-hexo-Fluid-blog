<script setup>
import PageHeroVisual from './PageHeroVisual.vue'
import PageSearch from './PageSearch.vue'

defineProps({
  titleLines: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  visual: {
    type: String,
    default: 'system'
  },
  topics: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <header class="page-hero">
    <div class="page-hero__top">
      <div class="page-hero__copy">
        <h1>
          <span v-for="line in titleLines" :key="line">{{ line }}</span>
        </h1>
        <p>{{ description }}</p>
      </div>
      <div class="page-hero__visual">
        <PageHeroVisual :variant="visual" />
      </div>
    </div>
    <PageSearch :topics="topics" />
  </header>
</template>

<style scoped>
.page-hero {
  display: grid;
  gap: 38px;
  width: min(var(--page-width), 100%);
  margin: 0 auto 64px;
}

.page-hero__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 64px;
  align-items: center;
  min-height: 286px;
  padding-bottom: 38px;
  border-bottom: 1px solid var(--border-soft);
}

.page-hero__copy h1 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-page-title);
  font-weight: 620;
  line-height: 1.12;
  letter-spacing: -0.04em;
}

.page-hero__copy h1 span { display: block; white-space: nowrap; }
.page-hero__copy p {
  max-width: 42rem;
  margin: 22px 0 0;
  color: var(--text-sub);
  font-size: var(--text-lead);
  line-height: 1.85;
}
.page-hero__visual { width: 100%; color: var(--brand-main); }

@media (max-width: 860px) {
  .page-hero { gap: 28px; margin-bottom: 48px; }
  .page-hero__top { grid-template-columns: 1fr; gap: 24px; min-height: 0; }
  .page-hero__visual { width: min(420px, 100%); }
}

@media (max-width: 560px) {
  .page-hero { margin-bottom: 38px; }
  .page-hero__top { padding-bottom: 28px; }
  .page-hero__copy h1 { font-size: 34px; }
  .page-hero__copy p { margin-top: 16px; font-size: 15px; }
}
</style>
