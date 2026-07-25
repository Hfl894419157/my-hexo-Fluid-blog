<script setup>
import { computed, reactive } from 'vue'
import ResponsiveImage from './ResponsiveImage.vue'
import { resolveResponsiveImage } from './responsiveImage.js'

const props = defineProps({
  items: { type: Array, default: () => [] }
})

const loadedOrientations = reactive({})

const itemKey = (item, index) => item.id || `${index}-${item.src || 'image'}`

const orientationFor = (item, index) => {
  const key = itemKey(item, index)
  if (loadedOrientations[key]) return loadedOrientations[key]

  const resolved = item.src ? resolveResponsiveImage(item.src) : {}
  const width = Number(resolved.width || item.width || 0)
  const height = Number(resolved.height || item.height || 0)
  return width && height && width < height ? 'portrait' : 'landscape'
}

const rememberOrientation = (item, index, event) => {
  const image = event.currentTarget
  if (!image?.naturalWidth || !image?.naturalHeight) return
  loadedOrientations[itemKey(item, index)] = image.naturalWidth < image.naturalHeight
    ? 'portrait'
    : 'landscape'
}

const groupedRows = computed(() => {
  const rows = []
  let i = 0
  while (i < props.items.length) {
    const item = props.items[i]
    const orientation = orientationFor(item, i)

    if (orientation === 'landscape') {
      rows.push({ entries: [{ item, index: i }], class: 'row-landscape' })
      i += 1
      continue
    }

    const next = props.items[i + 1]
    const hasPortraitPair = next && orientationFor(next, i + 1) === 'portrait'
    rows.push({
      entries: hasPortraitPair
        ? [{ item, index: i }, { item: next, index: i + 1 }]
        : [{ item, index: i }],
      class: hasPortraitPair ? 'row-portrait-pair' : 'row-portrait-single'
    })
    i += hasPortraitPair ? 2 : 1
  }
  return rows
})
</script>

<template>
  <section class="pf-gallery">
    <div
      v-for="(row, ri) in groupedRows"
      :key="ri"
      :class="['pf-row', row.class]"
    >
      <figure
        v-for="entry in row.entries"
        :key="itemKey(entry.item, entry.index)"
        class="pf-figure"
      >
        <ResponsiveImage
          v-if="entry.item.src"
          :src="entry.item.src"
          :alt="entry.item.alt || ''"
          :eager="entry.item.eager"
          :sizes="row.class === 'row-portrait-pair'
            ? '(max-width: 640px) calc(100vw - 32px), 371px'
            : row.class === 'row-portrait-single'
              ? '(max-width: 640px) calc(100vw - 32px), 520px'
              : '(max-width: 640px) calc(100vw - 32px), 760px'"
          class="pf-img"
          @load="rememberOrientation(entry.item, entry.index, $event)"
        />
        <figcaption v-if="entry.item.caption" class="pf-caption">{{ entry.item.caption }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.pf-gallery {
  width: 100%;
  margin: 36px 0;
}

/* 行与行之间的间距 */
.pf-gallery > .pf-row + .pf-row {
  margin-top: 18px;
}

/* ----- 横版图行 ----- */
.pf-row.row-landscape {
  width: 100%;
}

.pf-row.row-landscape .pf-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: calc(var(--radius-card) - 2px);
  background: var(--bg-soft);
}

/* ----- 竖版配对行 ----- */
.pf-row.row-portrait-pair {
  display: flex;
  gap: 18px;
  width: 100%;
}

.pf-row.row-portrait-pair .pf-figure {
  flex: 1;
  min-width: 0;
}

.pf-row.row-portrait-pair .pf-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: calc(var(--radius-card) - 2px);
  background: var(--bg-soft);
}

/* ----- 单张竖版居中 ----- */
.pf-row.row-portrait-single {
  display: grid;
  justify-items: center;
}

.pf-row.row-portrait-single .pf-figure {
  width: min(68%, 520px);
}

/* ----- 通用 ----- */
.pf-figure {
  min-width: 0;
  margin: 0;
  padding: 0;
}

.pf-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: calc(var(--radius-card) - 2px);
  background: var(--bg-soft);
}

.pf-figure :deep(.responsive-picture) {
  display: block;
  width: 100%;
}

.pf-caption {
  margin-top: 8px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.65;
  text-align: center;
}

/* ----- 移动端 ----- */
@media (max-width: 640px) {
  .pf-gallery { margin: 24px 0; }
  .pf-gallery > .pf-row + .pf-row { margin-top: 14px; }
  .pf-row.row-portrait-pair {
    flex-direction: column;
    gap: 14px;
  }
  .pf-row.row-portrait-single .pf-figure { width: 100%; }
}
</style>
