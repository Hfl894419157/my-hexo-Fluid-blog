<script setup>
import { computed } from 'vue'
import ImagePlaceholder from './ImagePlaceholder.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const isPublished = computed(() => props.item.status !== 'planned' && Boolean(props.item.link))
</script>

<template>
  <article class="content-card" :class="{ 'content-card--planned': !isPublished }">
    <a v-if="isPublished" class="content-card__media" :href="item.link" :aria-label="`进入：${item.title}`">
      <ImagePlaceholder
        :src="item.image || ''"
        :alt="item.alt || item.title"
        :subject="item.imageSubject || item.title"
        :filename="item.imageFilename || `${item.id || 'content'}-cover.jpg`"
        :aspect="item.aspect || '16 / 9'"
        profile="card"
        :focal-point="item.coverFocalPoint"
        sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1100px) 50vw, 360px"
      />
    </a>
    <div v-else class="content-card__media">
      <ImagePlaceholder
        :src="item.image || ''"
        :alt="item.alt || item.title"
        :subject="item.imageSubject || item.title"
        :filename="item.imageFilename || `${item.id || 'content'}-cover.jpg`"
        :aspect="item.aspect || '16 / 9'"
        profile="card"
        :focal-point="item.coverFocalPoint"
        sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1100px) 50vw, 360px"
      />
    </div>
    <div class="content-card__body">
      <h2>{{ item.title }}</h2>
      <p>{{ item.summary || item.desc }}</p>
      <div class="content-card__tags" aria-label="内容标签">
        <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
      </div>
      <a v-if="isPublished" class="content-card__enter" :href="item.link">{{ item.cta || '进入查看' }} <span aria-hidden="true">→</span></a>
      <span v-else class="content-card__planned" :aria-label="`内容筹备中：${item.title}`">内容筹备中</span>
    </div>
  </article>
</template>

<style scoped>
.content-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  transition: transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth);
}
.content-card:hover { border-color: var(--border-strong); box-shadow: var(--shadow-card); transform: translateY(-4px); }
.content-card--planned:hover { border-color: var(--border-soft); box-shadow: none; transform: none; }
.content-card__media { display: block; overflow: hidden; text-decoration: none; }
.content-card__media :deep(.image-slot) { border: 0; border-bottom: 1px solid var(--border-soft); }
.content-card__body { display: flex; min-height: 268px; flex: 1; flex-direction: column; padding: 26px 24px 28px; }
.content-card h2 {
  min-height: 3em;
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.02em;
}
.content-card p {
  display: -webkit-box;
  min-height: 5.1em;
  margin: 12px 0 0;
  overflow: hidden;
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.7;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.content-card__tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }
.content-card__tags span {
  padding: 6px 9px;
  border: 1px solid var(--border-soft);
  border-radius: 7px;
  background: var(--bg-soft);
  color: var(--text-sub);
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}
.content-card__enter { width: fit-content; margin-top: auto; padding-top: 24px; color: var(--brand-main); font-size: 14px; font-weight: 700; text-decoration: none; }
.content-card__enter span { display: inline-block; margin-left: 4px; transition: transform 180ms ease; }
.content-card__enter:hover span { transform: translateX(4px); }
.content-card__planned { width: fit-content; margin-top: auto; padding-top: 24px; color: var(--text-muted); font-size: 13px; font-weight: 700; letter-spacing: 0.06em; }
@media (max-width: 560px) {
  .content-card__body { min-height: 250px; padding: 22px 20px 24px; }
  .content-card h2 { min-height: 0; font-size: 21px; }
  .content-card p { min-height: 0; }
}
</style>
