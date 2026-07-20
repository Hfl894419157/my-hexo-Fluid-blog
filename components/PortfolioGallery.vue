<script setup>
import { computed, ref, onMounted } from 'vue'
import ResponsiveImage from './ResponsiveImage.vue'
import { partitionJustifiedRows, getAspectRatio } from '../.shared/justifiedGallery.mjs'

const props = defineProps({
  items: { type: Array, default: () => [] }
})

const loadedRatios = ref({})

const onImageLoad = (event, index, item) => {
  const img = event.target
  if (img && img.naturalWidth && img.naturalHeight) {
    const ratio = img.naturalWidth / img.naturalHeight
    const key = item.id || item.src || index
    if (loadedRatios.value[key] !== ratio) {
      loadedRatios.value = { ...loadedRatios.value, [key]: ratio }
    }
  }
}

const enrichedItems = computed(() => {
  return props.items.map((item, index) => {
    const key = item.id || item.src || index
    const dynamicRatio = loadedRatios.value[key]
    const ratio = dynamicRatio || getAspectRatio(item)
    return { ...item, ratio }
  })
})

const justifiedRows = computed(() => {
  return partitionJustifiedRows(enrichedItems.value)
})
</script>

<template>
  <section class="content-block portfolio-gallery" aria-label="作品图片组">
    <div
      v-for="(row, rowIndex) in justifiedRows"
      :key="`row-${rowIndex}`"
      class="portfolio-gallery-row"
      :class="{
        'portfolio-gallery-row--single-portrait': row.length === 1 && row[0].ratio < 1.0,
        'portfolio-gallery-row--single-landscape': row.length === 1 && row[0].ratio >= 1.0,
        'portfolio-gallery-row--multi': row.length > 1
      }"
    >
      <figure
        v-for="(item, itemIndex) in row"
        :key="item.id || `${rowIndex}-${itemIndex}-${item.src}`"
        class="portfolio-gallery-item"
        :style="{ flex: `${item.ratio} ${item.ratio} 0%`, aspectRatio: `${item.ratio}` }"
      >
        <div class="portfolio-gallery__content">
          <ResponsiveImage
            v-if="item.src"
            :src="item.src"
            :alt="item.alt || ''"
            :eager="item.eager"
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 760px"
            @load="(e) => onImageLoad(e, itemIndex, item)"
          />
          <figcaption v-if="item.caption">{{ item.caption }}</figcaption>
        </div>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.portfolio-gallery {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  margin: 36px 0;
}

.portfolio-gallery-row {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  gap: 18px;
  align-items: stretch;
}

.portfolio-gallery-row--single-landscape .portfolio-gallery-item {
  flex: 1 1 100% !important;
  width: 100%;
}

.portfolio-gallery-row--single-portrait {
  justify-content: center;
}

.portfolio-gallery-row--single-portrait .portfolio-gallery-item {
  flex: none !important;
  width: 100%;
  max-width: min(100%, 580px);
  margin: 0 auto;
}

.portfolio-gallery-item {
  min-width: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

.portfolio-gallery__content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.portfolio-gallery__content :deep(.responsive-picture),
.portfolio-gallery__content :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: calc(var(--radius-card) - 2px);
  background: var(--bg-soft);
}

.portfolio-gallery figcaption {
  margin-top: 8px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.65;
  text-align: center;
}

@media (max-width: 640px) {
  .portfolio-gallery {
    gap: 14px;
    margin: 24px 0;
  }
  .portfolio-gallery-row {
    flex-wrap: wrap;
    gap: 14px;
  }
  .portfolio-gallery-item {
    flex: 1 1 100% !important;
    max-width: 100% !important;
    aspect-ratio: auto !important;
  }
  .portfolio-gallery-row--multi .portfolio-gallery-item {
    flex: 1 1 calc(50% - 7px) !important;
  }
}
</style>
