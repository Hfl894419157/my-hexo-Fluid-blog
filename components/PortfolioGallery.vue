<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  items: { type: Array, default: () => [] }
})

const groupedRows = computed(() => {
  const rows = []
  let i = 0
  while (i < props.items.length) {
    const item = props.items[i]
    const w = item.width || 0
    const h = item.height || 0
    const isLandscape = !w || !h || w / h >= 1.0

    if (isLandscape) {
      rows.push({ items: [item], class: 'row-landscape' })
      i += 1
    } else {
      if (i + 1 < props.items.length) {
        const next = props.items[i + 1]
        const nw = next.width || 0
        const nh = next.height || 0
        const nextIsLandscape = nw && nh && nw / nh >= 1.0
        if (!nextIsLandscape) {
          rows.push({ items: [item, next], class: 'row-portrait-pair' })
          i += 2
        } else {
          rows.push({ items: [item], class: 'row-portrait-single' })
          i += 1
        }
      } else {
        rows.push({ items: [item], class: 'row-portrait-single' })
        i += 1
      }
    }
  }
  return rows
})

const imgUrl = (src) => {
  if (!src) return ''
  return /^(https?:)?\/\//.test(src) ? src : withBase(src)
}
</script>

<template>
  <section class="pf-gallery">
    <div
      v-for="(row, ri) in groupedRows"
      :key="ri"
      :class="['pf-row', row.class]"
    >
      <figure
        v-for="(item, ii) in row.items"
        :key="item.id || `${ri}-${ii}`"
        class="pf-figure"
      >
        <img
          v-if="item.src"
          :src="imgUrl(item.src)"
          :alt="item.alt || ''"
          loading="lazy"
          decoding="async"
          class="pf-img"
        />
        <figcaption v-if="item.caption" class="pf-caption">{{ item.caption }}</figcaption>
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
  text-align: center;
}

.pf-row.row-portrait-single .pf-img {
  max-width: 100%;
  height: auto;
  display: inline-block;
  border-radius: calc(var(--radius-card) - 2px);
  background: var(--bg-soft);
}

/* ----- 通用 ----- */
.pf-figure {
  margin: 0;
  padding: 0;
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
  .pf-row.row-portrait-pair { gap: 14px; }
}
</style>
