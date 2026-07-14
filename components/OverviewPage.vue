<script setup>
import PageHero from './PageHero.vue'
import ContentCard from './ContentCard.vue'

defineProps({
  titleLines: { type: Array, required: true },
  description: { type: String, required: true },
  visual: { type: String, default: 'system' },
  topics: { type: Array, default: () => [] },
  items: { type: Array, default: () => [] },
  sectionTitle: { type: String, default: '内容列表' },
  sectionDescription: { type: String, default: '' }
})
</script>

<template>
  <div class="overview-page">
    <PageHero :title-lines="titleLines" :description="description" :visual="visual" :topics="topics" />
    <section class="overview-content">
      <header class="overview-content__head">
        <h2>{{ sectionTitle }}</h2>
        <p v-if="sectionDescription">{{ sectionDescription }}</p>
      </header>
      <div class="overview-grid">
        <ContentCard v-for="item in items" :key="item.id || item.title" :item="item" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.overview-page { width: min(var(--page-width), 100%); margin-inline: auto; }
.overview-content { margin-top: 0; }
.overview-content__head { max-width: 720px; margin-bottom: 30px; }
.overview-content__head h2 { margin: 0; font-size: 34px; line-height: 1.25; }
.overview-content__head p { margin: 12px 0 0; color: var(--text-sub); font-size: 15px; line-height: 1.8; }
.overview-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
@media (max-width: 1100px) { .overview-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) {
  .overview-content__head h2 { font-size: 28px; }
  .overview-grid { grid-template-columns: 1fr; }
}
</style>
