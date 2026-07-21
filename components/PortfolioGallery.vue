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

const rowClass = (row) => {
  if (row.length === 1) {
    return row[0].ratio >= 1.0
      ? 'portfolio-gallery-row--single-landscape'
      : 'portfolio-gallery-row--single-portrait'
  }
  if (row.length === 2 && row[0].ratio < 1.0 && row[1].ratio < 1.0) {
    return 'portfolio-gallery-row--portrait-pair'
  }
  return 'portfolio-gallery-row--multi'
}
</script>

<template>
  <section class="content-block portfolio-gallery" aria-label="作品图片组">
    <div
      v-for="(row, rowIndex) in justifiedRows"
      :key="`row-${rowIndex}`"
      :class="['portfolio-gallery-row', rowClass(row)]"
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

/* ----- 横版图：每行一张，满宽显示 ----- */
.portfolio-gallery-row--single-landscape .portfolio-gallery-item {
  flex: 1 1 100% !important;
  width: 100%;
}

/* ----- 竖版图单独一张（奇数时）居中显示 ----- */
.portfolio-gallery-row--single-portrait {
  justify-content: center;
}

.portfolio-gallery-row--single-portrait .portfolio-gallery-item {
  flex: none !important;
  width: 100%;
  max-width: min(100%, 580px);
  margin: 0 auto;
}

/* ----- 竖版图两两配对：等宽并排，视觉平衡 ----- */
.portfolio-gallery-row--portrait-pair {
  display: flex;
  flex-wrap: nowrap;
  gap: 18px;
}

.portfolio-gallery-row--portrait-pair .portfolio-gallery-item {
  flex: 1 1 0%;
  min-width: 0;
  aspect-ratio: auto !important;
}

.portfolio-gallery-row--portrait-pair .portfolio-gallery__content {
  width: 100%;
  height: 100%;
}

.portfolio-gallery-row--portrait-pair .portfolio-gallery__content :deep(img) {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: calc(var(--radius-card) - 2px);
  background: var(--bg-soft);
}

/* ----- 通用 item 样式 ----- */
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

/* ----- 移动端：一律单列，满宽显示 ----- */
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
  .portfolio-gallery-row--portrait-pair {
    flex-wrap: wrap;
  }
  .portfolio-gallery-row--portrait-pair .portfolio-gallery-item {
    flex: 1 1 calc(50% - 7px) !important;
  }
}
</style>
