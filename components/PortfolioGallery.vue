<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import ResponsiveImage from './ResponsiveImage.vue'
import { normalizePortfolioGalleryLayout } from '../.shared/contentSchema.mjs'

const props = defineProps({
  items: { type: Array, default: () => [] }
})

const galleryRef = ref(null)
let resizeObserver = null
let resizeFrame = 0

const figures = () => Array.from(galleryRef.value?.querySelectorAll('.portfolio-gallery__item') || [])

const resolveAutoLayout = (image) => {
  const ratio = image.naturalWidth && image.naturalHeight
    ? image.naturalWidth / image.naturalHeight
    : 1
  if (ratio >= 1.55) return 'two-thirds'
  if (ratio <= 0.82) return 'third'
  return 'half'
}

const updateFigure = (figure) => {
  const grid = galleryRef.value
  const content = figure.querySelector('.portfolio-gallery__content')
  if (!grid || !content) return

  const image = content.querySelector('img')
  if (figure.dataset.layout === 'auto' && image?.complete) {
    figure.dataset.autoLayout = resolveAutoLayout(image)
  }

  const styles = getComputedStyle(grid)
  const rowHeight = Number.parseFloat(styles.gridAutoRows) || 8
  const rowGap = Number.parseFloat(styles.rowGap) || 0
  const contentHeight = content.getBoundingClientRect().height
  const rowSpan = Math.max(1, Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap)))
  figure.style.gridRowEnd = `span ${rowSpan}`
}

const updateLayout = () => figures().forEach(updateFigure)

const scheduleLayout = () => {
  if (resizeFrame) cancelAnimationFrame(resizeFrame)
  resizeFrame = requestAnimationFrame(updateLayout)
}

const observeGallery = () => {
  resizeObserver?.disconnect()
  if (!galleryRef.value || typeof ResizeObserver === 'undefined') return
  resizeObserver = new ResizeObserver(scheduleLayout)
  resizeObserver.observe(galleryRef.value)
  for (const content of galleryRef.value.querySelectorAll('.portfolio-gallery__content')) {
    resizeObserver.observe(content)
  }
}

const onImageLoad = (event) => {
  const figure = event.target.closest('.portfolio-gallery__item')
  if (figure) updateFigure(figure)
}

watch(() => props.items, async () => {
  await nextTick()
  observeGallery()
  scheduleLayout()
}, { deep: true })

onMounted(async () => {
  await nextTick()
  observeGallery()
  scheduleLayout()
  window.addEventListener('resize', scheduleLayout, { passive: true })
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', scheduleLayout)
  if (resizeFrame) cancelAnimationFrame(resizeFrame)
})
</script>

<template>
  <section ref="galleryRef" class="content-block portfolio-gallery" aria-label="作品图片">
    <figure
      v-for="(item, index) in items"
      :key="item.id || `${index}-${item.src}`"
      class="portfolio-gallery__item"
      :data-layout="items.length === 1 ? 'full' : normalizePortfolioGalleryLayout(item.layout)"
    >
      <div class="portfolio-gallery__content">
        <ResponsiveImage
          v-if="item.src"
          :src="item.src"
          :alt="item.alt || ''"
          :eager="item.eager"
          sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 66vw"
          @load="onImageLoad"
        />
        <figcaption v-if="item.caption">{{ item.caption }}</figcaption>
      </div>
    </figure>
  </section>
</template>

<style scoped>
.portfolio-gallery {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-flow: dense;
  grid-auto-rows: 8px;
  gap: 18px;
  align-items: start;
}

.portfolio-gallery__item {
  min-width: 0;
  margin: 0;
  align-self: start;
  grid-column: span 6;
}

.portfolio-gallery__item[data-layout="third"],
.portfolio-gallery__item[data-layout="auto"][data-auto-layout="third"] { grid-column: span 4; }
.portfolio-gallery__item[data-layout="half"],
.portfolio-gallery__item[data-layout="auto"][data-auto-layout="half"] { grid-column: span 6; }
.portfolio-gallery__item[data-layout="two-thirds"],
.portfolio-gallery__item[data-layout="auto"][data-auto-layout="two-thirds"] { grid-column: span 8; }
.portfolio-gallery__item[data-layout="full"] { grid-column: 1 / -1; }

.portfolio-gallery__content,
.portfolio-gallery__content :deep(.responsive-picture),
.portfolio-gallery__content :deep(img) {
  display: block;
  width: 100%;
}

.portfolio-gallery__content :deep(img) {
  height: auto;
  border-radius: calc(var(--radius-card) - 2px);
  background: var(--bg-soft);
}

.portfolio-gallery figcaption {
  margin-top: 10px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.65;
  text-align: center;
}

@media (max-width: 1024px) {
  .portfolio-gallery__item,
  .portfolio-gallery__item[data-layout="third"],
  .portfolio-gallery__item[data-layout="half"],
  .portfolio-gallery__item[data-layout="auto"][data-auto-layout="third"],
  .portfolio-gallery__item[data-layout="auto"][data-auto-layout="half"] { grid-column: span 6; }

  .portfolio-gallery__item[data-layout="two-thirds"],
  .portfolio-gallery__item[data-layout="full"],
  .portfolio-gallery__item[data-layout="auto"][data-auto-layout="two-thirds"] { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .portfolio-gallery { grid-auto-rows: 6px; gap: 14px; }
  .portfolio-gallery__item,
  .portfolio-gallery__item[data-layout],
  .portfolio-gallery__item[data-layout="auto"][data-auto-layout] { grid-column: 1 / -1; }
}
</style>
