<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ContentLightbox from './ContentLightbox.vue'

const props = defineProps({
  html: { type: String, default: '' },
  css: { type: String, default: '' }
})

const host = ref(null)
const showFallback = ref(true)
const previewOpen = ref(false)
const previewItems = ref([])
const previewIndex = ref(0)
let previewTrigger = null

const safetyCss = `
:host {
  display: block;
  width: 100%;
  min-width: 0;
  color: inherit;
  font: inherit;
  contain: style paint;
  isolation: isolate;
}
*, *::before, *::after { box-sizing: border-box; }
[data-article-root] { width: 100%; min-width: 0; }
img, picture, video, canvas, svg { max-width: 100%; }
`

const shadowImages = () => host.value?.shadowRoot
  ? [...host.value.shadowRoot.querySelectorAll('img')]
  : []

const decorateImages = () => {
  for (const image of shadowImages()) {
    image.setAttribute('tabindex', '0')
    image.setAttribute('role', 'button')
    image.setAttribute('aria-label', image.alt?.trim()
      ? `放大查看：${image.alt.trim()}`
      : '放大查看图片')
  }
}

const mountShadowContent = async () => {
  const element = host.value
  if (!element || typeof element.attachShadow !== 'function') {
    showFallback.value = true
    return
  }
  try {
    const shadow = element.shadowRoot || element.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = `${safetyCss}\n${props.css}`
    const body = document.createElement('div')
    body.className = 'self-contained-article__document'
    body.innerHTML = props.html
    shadow.replaceChildren(style, body)
    showFallback.value = false
    await nextTick()
    decorateImages()
  } catch {
    const shadow = element.shadowRoot
    if (!shadow) {
      showFallback.value = true
      return
    }
    const body = document.createElement('div')
    body.className = 'self-contained-article__document'
    body.innerHTML = props.html
    shadow.replaceChildren(body)
    showFallback.value = false
  }
}

const eventImage = (event) => event.composedPath()
  .find((node) => node instanceof HTMLImageElement) || null

const openPreview = (image) => {
  const images = shadowImages()
  const index = images.indexOf(image)
  if (index < 0) return
  previewTrigger = image
  previewItems.value = images.map((item) => ({
    src: item.getAttribute('src') || item.currentSrc || item.src,
    alt: item.alt?.trim() || '',
    caption: item.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || ''
  }))
  previewIndex.value = index
  previewOpen.value = true
}

const handleClick = (event) => {
  const image = eventImage(event)
  if (!image) return
  event.preventDefault()
  openPreview(image)
}

const handleKeydown = (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return
  const image = eventImage(event)
  if (!image) return
  event.preventDefault()
  openPreview(image)
}

const closePreview = async () => {
  previewOpen.value = false
  await nextTick()
  previewTrigger?.focus()
}

onMounted(mountShadowContent)
watch(() => [props.html, props.css], mountShadowContent)
onBeforeUnmount(() => host.value?.shadowRoot?.replaceChildren())
</script>

<template>
  <section class="content-block content-block--self-contained">
    <div
      ref="host"
      class="self-contained-article"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <div v-if="showFallback" class="content-block--rich" v-html="html" />
    </div>
  </section>

  <ContentLightbox
    :open="previewOpen"
    :items="previewItems"
    :active-index="previewIndex"
    asset-origin="configured"
    @close="closePreview"
    @select="previewIndex = $event"
  />
</template>
