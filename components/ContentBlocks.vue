<script setup>
import { nextTick, onMounted, onUpdated, ref } from 'vue'
import ResponsiveImage from './ResponsiveImage.vue'
import ContentVideo from './ContentVideo.vue'
import PortfolioGallery from './PortfolioGallery.vue'
import ContentLightbox from './ContentLightbox.vue'

defineProps({
  blocks: { type: Array, default: () => [] },
  variant: { type: String, default: 'default' }
})

const cardCover = (block) => block.customCover || block.platformCover || block.cover || ''
const cardLabel = (block) => block.buttonLabel || (block.type === 'download' ? '打开资源' : '访问链接')

const previewSelector = [
  '.content-block--rich img',
  '.content-block--image img',
  '.content-block--gallery img',
  '.pf-gallery img'
].join(', ')

const contentRoot = ref(null)
const previewOpen = ref(false)
const previewItems = ref([])
const previewIndex = ref(0)
let previewTrigger = null

const previewImages = () => contentRoot.value
  ? [...contentRoot.value.querySelectorAll(previewSelector)]
  : []

const imageCaption = (image) => {
  const figureCaption = image.closest('figure')?.querySelector('figcaption')
  return figureCaption?.textContent?.trim() || ''
}

const decoratePreviewImages = () => {
  for (const image of previewImages()) {
    image.classList.add('content-previewable-image')
    image.setAttribute('tabindex', '0')
    image.setAttribute('role', 'button')
    image.setAttribute('aria-label', image.alt?.trim()
      ? `放大查看：${image.alt.trim()}`
      : '放大查看图片')
  }
}

const openPreview = (image) => {
  const images = previewImages()
  const index = images.indexOf(image)
  if (index < 0) return

  previewTrigger = image
  previewItems.value = images.map((item) => ({
    src: item.getAttribute('src') || item.currentSrc || item.src,
    alt: item.alt?.trim() || '',
    caption: imageCaption(item)
  }))
  previewIndex.value = index
  previewOpen.value = true
}

const eligibleImageFromEvent = (event) => {
  const image = event.target instanceof HTMLImageElement ? event.target : null
  return image?.matches(previewSelector) ? image : null
}

const handleContentClick = (event) => {
  const image = eligibleImageFromEvent(event)
  if (!image) return
  event.preventDefault()
  openPreview(image)
}

const handleContentKeydown = (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return
  const image = eligibleImageFromEvent(event)
  if (!image) return
  event.preventDefault()
  openPreview(image)
}

const closePreview = async () => {
  previewOpen.value = false
  await nextTick()
  previewTrigger?.focus()
}

onMounted(decoratePreviewImages)
onUpdated(() => nextTick(decoratePreviewImages))
</script>

<template>
  <div
    ref="contentRoot"
    class="content-blocks"
    @click="handleContentClick"
    @keydown="handleContentKeydown"
  >
    <template v-for="block in blocks" :key="block.id">
      <section v-if="block.type === 'richText' && block.html" class="content-block content-block--rich" v-html="block.html" />

      <figure v-else-if="block.type === 'image' && block.src" class="content-block content-block--image">
        <ResponsiveImage :src="block.src" :alt="block.alt || ''" :eager="block.eager" sizes="(max-width: 640px) calc(100vw - 32px), 760px" />
        <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
      </figure>

      <PortfolioGallery
        v-else-if="block.type === 'gallery' && block.items?.length && variant === 'portfolio'"
        :items="block.items"
      />

      <section v-else-if="block.type === 'gallery' && block.items?.length" class="content-block content-block--gallery">
        <figure v-for="(item, index) in block.items" :key="`${block.id}-${index}-${item.src}`">
          <ResponsiveImage v-if="item.src" :src="item.src" :alt="item.alt || ''" :eager="item.eager" sizes="(max-width: 640px) calc(100vw - 48px), 380px" />
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

  <ContentLightbox
    :open="previewOpen"
    :items="previewItems"
    :active-index="previewIndex"
    :asset-origin="variant === 'portfolio' ? 'site' : 'configured'"
    @close="closePreview"
    @select="previewIndex = $event"
  />
</template>
