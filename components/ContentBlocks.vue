<script setup>
import ResponsiveImage from './ResponsiveImage.vue'
import ContentVideo from './ContentVideo.vue'

defineProps({ blocks: { type: Array, default: () => [] } })

const cardCover = (block) => block.customCover || block.platformCover || block.cover || ''
const cardLabel = (block) => block.buttonLabel || (block.type === 'download' ? '打开资源' : '访问链接')
</script>

<template>
  <div class="content-blocks">
    <template v-for="block in blocks" :key="block.id">
      <section v-if="block.type === 'richText' && block.html" class="content-block content-block--rich" v-html="block.html" />

      <figure v-else-if="block.type === 'image' && block.src" class="content-block content-block--image">
        <ResponsiveImage :src="block.src" :alt="block.alt || ''" sizes="(max-width: 640px) calc(100vw - 32px), 760px" />
        <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
      </figure>

      <section v-else-if="block.type === 'gallery' && block.items?.length" class="content-block content-block--gallery">
        <figure v-for="(item, index) in block.items" :key="`${block.id}-${index}-${item.src}`">
          <ResponsiveImage v-if="item.src" :src="item.src" :alt="item.alt || ''" sizes="(max-width: 640px) calc(100vw - 48px), 380px" />
          <figcaption v-if="item.caption">{{ item.caption }}</figcaption>
        </figure>
      </section>

      <ContentVideo v-else-if="block.type === 'video'" class="content-block" :block="block" />

      <article v-else-if="(block.type === 'download' || block.type === 'externalLink') && (block.title || block.summary || block.url)" class="content-block content-resource-card">
        <ResponsiveImage v-if="cardCover(block)" class="content-resource-card__cover" :src="cardCover(block)" :alt="block.title || ''" sizes="(max-width: 640px) calc(100vw - 48px), 240px" />
        <div class="content-resource-card__copy">
          <span v-if="block.platform || block.format || block.size" class="content-resource-card__meta">
            {{ [block.platform, block.format, block.size].filter(Boolean).join(' · ') }}
          </span>
          <h3 v-if="block.title || block.name">{{ block.title || block.name }}</h3>
          <p v-if="block.summary">{{ block.summary }}</p>
          <p v-if="block.code" class="content-resource-card__code">提取码：{{ block.code }}</p>
          <a v-if="block.url" :href="block.url" target="_blank" rel="noopener noreferrer">{{ cardLabel(block) }} ↗</a>
        </div>
      </article>
    </template>
  </div>
</template>
