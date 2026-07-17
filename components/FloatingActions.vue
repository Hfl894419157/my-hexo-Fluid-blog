<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import ResponsiveImage from './ResponsiveImage.vue'

const route = useRoute()
const showBackToTop = ref(false)
const contactOpen = ref(false)
const contactPinned = ref(false)
const contactGroupRef = ref(null)

const wechatQr = '/wechat.png'
const qqQr = '/qq.png'

let scrollFrame = 0

const updateBackToTop = () => {
  showBackToTop.value = window.scrollY > 480
}

const onScroll = () => {
  if (scrollFrame) return
  scrollFrame = window.requestAnimationFrame(() => {
    updateBackToTop()
    scrollFrame = 0
  })
}

const scrollToTop = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
}

const showContactPreview = () => {
  contactOpen.value = true
}

const hideContactPreview = () => {
  if (!contactPinned.value) contactOpen.value = false
}

const toggleContactPreview = () => {
  contactPinned.value = !contactPinned.value
  contactOpen.value = contactPinned.value
}

const closeContactPreview = () => {
  contactPinned.value = false
  contactOpen.value = false
}

const onContactFocusOut = (event) => {
  if (contactGroupRef.value?.contains(event.relatedTarget)) return
  hideContactPreview()
}

const onDocumentPointerDown = (event) => {
  if (!contactGroupRef.value?.contains(event.target)) closeContactPreview()
}

const onKeydown = (event) => {
  if (event.key !== 'Escape' || !contactOpen.value) return
  event.preventDefault()
  closeContactPreview()
  contactGroupRef.value?.querySelector('button')?.focus()
}

watch(() => route.path, closeContactPreview)

onMounted(() => {
  updateBackToTop()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onDocumentPointerDown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <div
    ref="contactGroupRef"
    class="floating-service"
    @mouseenter="showContactPreview"
    @mouseleave="hideContactPreview"
    @focusin="showContactPreview"
    @focusout="onContactFocusOut"
  >
    <button
      class="floating-control floating-control--service"
      type="button"
      aria-label="联系客服"
      :aria-expanded="contactOpen"
      aria-controls="customer-contact-preview"
      title="联系客服"
      @click="toggleContactPreview"
    >
      <svg class="floating-service__icon" viewBox="0 0 1024 1024" aria-hidden="true">
        <path
          class="floating-service__background"
          d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        />
        <path
          class="floating-service__glyph"
          d="M768 562.24c0 35.52-21.44 67.84-54.4 81.92-12.16 32-32.96 59.84-60.48 80-26.56 19.84-57.92 32-91.2 35.52-0.96 0-3.84 0.32-8.96 0.32v13.44h-96v-77.76h96v11.84c4.16 0 6.72-0.32 7.36-0.32 39.36-5.12 73.92-27.52 93.76-61.12-11.52-7.04-18.88-19.52-18.88-32.96v-141.44c0-18.88 13.44-34.56 31.68-38.08-7.68-75.2-72.64-131.2-153.6-131.2s-146.24 56.64-153.6 131.84c16.32 4.8 28.16 19.84 28.16 37.12v141.12c0 21.44-17.6 38.72-39.36 38.72h-2.24c-49.92 0-90.88-40.32-90.88-89.6v-39.68c0-18.24 5.76-36.16 16.32-51.2 8.64-12.48 20.48-22.4 34.24-29.12 3.2-108.16 93.76-192 207.04-192 113.92 0 204.48 84.48 207.04 193.6 29.76 16.32 48 46.4 48 79.36v39.68z"
        />
      </svg>
    </button>

    <Transition name="contact-preview">
      <div
        v-show="contactOpen"
        id="customer-contact-preview"
        class="floating-service__preview"
        role="group"
        aria-label="客服二维码"
        :aria-hidden="!contactOpen"
      >
        <figure class="floating-service__qr-item">
          <ResponsiveImage
            :src="wechatQr"
            alt="微信客服二维码"
            sizes="164px"
            eager
          />
          <figcaption>微信</figcaption>
        </figure>
        <figure class="floating-service__qr-item">
          <ResponsiveImage
            :src="qqQr"
            alt="QQ 客服二维码"
            sizes="164px"
            eager
          />
          <figcaption>QQ</figcaption>
        </figure>
      </div>
    </Transition>
  </div>

  <div class="floating-actions" role="group" aria-label="页面快捷操作">
    <Transition name="floating-action">
      <button
        v-if="showBackToTop"
        class="floating-control floating-control--top"
        type="button"
        aria-label="返回顶部"
        title="返回顶部"
        @click="scrollToTop"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.5 10.5 12 5l5.5 5.5M12 5v14" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.floating-service,
.floating-actions {
  position: fixed;
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  z-index: 48;
}

.floating-service {
  left: calc(24px + env(safe-area-inset-left, 0px));
}

.floating-actions {
  right: calc(24px + env(safe-area-inset-right, 0px));
}

.floating-control {
  display: grid;
  flex: 0 0 auto;
  padding: 0;
  place-items: center;
  border: 1px solid var(--border-soft);
  color: var(--brand-main);
  cursor: pointer;
  transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

.floating-control:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

.floating-control:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--brand-main), transparent 58%);
  outline-offset: 3px;
}

.floating-control--service {
  width: 50px;
  height: 50px;
  border-color: color-mix(in srgb, var(--brand-main), var(--bg-page) 30%);
  border-radius: 50%;
  background: var(--brand-main);
  box-shadow: 0 14px 34px color-mix(in srgb, var(--brand-main), transparent 66%);
}

.floating-service__icon {
  display: block;
  width: 100%;
  height: 100%;
}

.floating-service__background { fill: var(--brand-main); }
.floating-service__glyph { fill: var(--button-primary-text); }

.floating-service__preview {
  position: absolute;
  bottom: 0;
  left: calc(100% + 10px);
  display: flex;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--bg-page), transparent 3%);
  box-shadow: 0 18px 46px color-mix(in srgb, var(--text-main), transparent 84%);
  backdrop-filter: blur(18px) saturate(1.08);
  -webkit-backdrop-filter: blur(18px) saturate(1.08);
}

.floating-service__preview::before {
  position: absolute;
  right: 100%;
  bottom: 17px;
  width: 9px;
  height: 14px;
  background: inherit;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  content: '';
}

.floating-service__qr-item {
  display: grid;
  flex: 0 0 2.5cm;
  gap: 4px;
  margin: 0;
  place-items: center;
  width: 2.5cm;
}

.floating-service__qr-item img {
  display: block;
  width: 2.5cm;
  min-width: 2.5cm;
  height: 2.5cm;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
}

.floating-service__qr-item figcaption {
  color: var(--text-sub);
  font-family: var(--font-sans);
  font-size: var(--text-micro);
  font-weight: 700;
  line-height: 1.3;
}

.floating-control--top {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: color-mix(in srgb, var(--bg-card), var(--bg-page) 18%);
  box-shadow: 0 12px 28px color-mix(in srgb, var(--text-main), transparent 88%);
  backdrop-filter: blur(18px) saturate(1.08);
  -webkit-backdrop-filter: blur(18px) saturate(1.08);
}

.floating-control--top svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.contact-preview-enter-active,
.contact-preview-leave-active,
.floating-action-enter-active,
.floating-action-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}

.contact-preview-enter-from,
.contact-preview-leave-to {
  opacity: 0;
  transform: translateX(-6px) scale(0.98);
}

.floating-action-enter-from,
.floating-action-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.94);
}

@media (max-width: 560px) {
  .floating-service,
  .floating-actions {
    bottom: calc(14px + env(safe-area-inset-bottom, 0px));
  }

  .floating-service {
    left: calc(14px + env(safe-area-inset-left, 0px));
  }

  .floating-actions {
    right: calc(14px + env(safe-area-inset-right, 0px));
  }

  .floating-control--service {
    width: 46px;
    height: 46px;
  }

  .floating-control--top {
    width: 42px;
    height: 42px;
    border-radius: 12px;
  }

  .floating-service__preview {
    left: calc(100% + 8px);
    gap: 6px;
    padding: 7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-control,
  .contact-preview-enter-active,
  .contact-preview-leave-active,
  .floating-action-enter-active,
  .floating-action-leave-active {
    transition: none;
  }

  .floating-control:hover { transform: none; }
}
</style>
