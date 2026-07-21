<script setup>
import { computed, ref } from 'vue'
import ResponsiveImage from './ResponsiveImage.vue'

const props = defineProps({
  items: { type: Array, default: () => [] }
})

// 用真实的自然宽高比判断横竖版
const loadedRatios = ref({})

const onImageLoad = (e, index) => {
  const img = e.target
  if (img?.naturalWidth && img?.naturalHeight) {
    loadedRatios.value = { ...loadedRatios.value, [index]: img.naturalWidth / img.naturalHeight }
  }
}

const getRatio = (item, index) => {
  const dynamic = loadedRatios.value[index]
  if (dynamic) return dynamic
  if (item.width && item.height) return item.width / item.height
  return 1.5 // 默认横版
}

const isLandscape = (item, index) => getRatio(item, index) >= 1.0

const groupedRows = computed(() => {
  const rows = []
  let i = 0
  while (i < props.items.length) {
    const item = props.items[i]
    if (isLandscape(item, i)) {
      // 横版图：每行一张
      rows.push({ items: [item], startIndex: i, class: 'row-landscape' })
      i += 1
    } else {
      // 竖版图：两两配对
      if (i + 1 < props.items.length && !isLandscape(props.items[i + 1], i + 1)) {
        rows.push({ items: [item, props.items[i + 1]], startIndex: i, class: 'row-portrait-pair' })
        i += 2
      } else {
        rows.push({ items: [item], startIndex: i, class: 'row-portrait-single' })
        i += 1
      }
    }
  }
  return rows
})
</script>

<template>
  <section class="content-block portfolio-gallery" aria-label="作品图片组">
    <div
      v-for="(row, rowIndex) in groupedRows"
      :key="`row-${rowIndex}`"
      :class="['portfolio-gallery-row', row.class]"
    >
      <figure
        v-for="(item, itemIndex) in row.items"
        :key="item.id || `${rowIndex}-${itemIndex}-${item.src}`"
        class="portfolio-gallery-item"
      >
        <div class="portfolio-gallery__content">
          <ResponsiveImage
            v-if="item.src"
            :src="item.src"
            :alt="item.alt || ''"
            profile="original"
            :eager="item.eager"
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 760px"
            @load="(e) => onImageLoad(e, row.startIndex + itemIndex)"
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

/* ----- 横版图：每行一张，原比例展示 ----- */
.portfolio-gallery-row.row-landscape .portfolio-gallery-item {
  width: 100%;
}

/* ----- 竖版图单独一张（奇数时）居中显示 ----- */
.portfolio-gallery-row.row-portrait-single {
  justify-content: center;
}

.portfolio-gallery-row.row-portrait-single .portfolio-gallery-item {
  width: 100%;
  max-width: min(100%, 580px);
  margin: 0 auto;
}

/* ----- 竖版图两两配对：等宽并排 ----- */
.portfolio-gallery-row.row-portrait-pair {
  display: flex;
  flex-wrap: nowrap;
  gap: 18px;
}

.portfolio-gallery-row.row-portrait-pair .portfolio-gallery-item {
  flex: 1 1 0%;
  min-width: 0;
}

/* ----- 通用 item 样式（不裁剪，完整展示） ----- */
.portfolio-gallery-item {
  min-width: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

.portfolio-gallery__content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.portfolio-gallery__content :deep(.responsive-picture),
.portfolio-gallery__content :deep(img) {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
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
    width: 100% !important;
    max-width: 100% !important;
  }
  .portfolio-gallery-row.row-portrait-pair {
    flex-wrap: wrap;
  }
  .portfolio-gallery-row.row-portrait-pair .portfolio-gallery-item {
    flex: 1 1 calc(50% - 7px) !important;
  }
}
</style>
