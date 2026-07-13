<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, withBase } from 'vitepress'

const route = useRoute()
const showBackToTop = ref(false)
const contactOpen = ref(false)
const serviceButtonRef = ref(null)
const dialogRef = ref(null)
const closeButtonRef = ref(null)

const wechatQr = withBase('/wechat.png')
const qqQr = withBase('/qq.png')
const focusableSelector = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

let scrollFrame = 0
let previousActiveElement = null
let previousBodyOverflow = ''
let previousBodyPaddingRight = ''

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

const lockPageScroll = () => {
  previousBodyOverflow = document.body.style.overflow
  previousBodyPaddingRight = document.body.style.paddingRight

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  if (scrollbarWidth > 0) {
    const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0
    document.body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`
  }
  document.body.style.overflow = 'hidden'
}

const unlockPageScroll = () => {
  document.body.style.overflow = previousBodyOverflow
  document.body.style.paddingRight = previousBodyPaddingRight
}

const openContact = async () => {
  if (contactOpen.value) return
  previousActiveElement = document.activeElement
  contactOpen.value = true
  lockPageScroll()
  await nextTick()
  closeButtonRef.value?.focus()
}

const closeContact = async ({ restoreFocus = true } = {}) => {
  if (!contactOpen.value) return
  contactOpen.value = false
  unlockPageScroll()
  await nextTick()

  if (restoreFocus && previousActiveElement?.isConnected) {
    previousActiveElement.focus()
  } else if (restoreFocus) {
    serviceButtonRef.value?.focus()
  }
  previousActiveElement = null
}

const trapDialogFocus = (event) => {
  const dialog = dialogRef.value
  if (!dialog) return

  const focusableItems = Array.from(dialog.querySelectorAll(focusableSelector))
    .filter((element) => element.getAttribute('aria-hidden') !== 'true')

  if (!focusableItems.length) {
    event.preventDefault()
    dialog.focus()
    return
  }

  const first = focusableItems[0]
  const last = focusableItems[focusableItems.length - 1]
  const activeElement = document.activeElement

  if (event.shiftKey && (activeElement === first || !dialog.contains(activeElement))) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && (activeElement === last || !dialog.contains(activeElement))) {
    event.preventDefault()
    first.focus()
  }
}

const onKeydown = (event) => {
  if (!contactOpen.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    closeContact()
  } else if (event.key === 'Tab') {
    trapDialogFocus(event)
  }
}

watch(() => route.path, () => closeContact())

onMounted(() => {
  updateBackToTop()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
  if (contactOpen.value) unlockPageScroll()
})
</script>

<template>
  <div class="floating-actions" role="group" aria-label="页面快捷操作">
    <Transition name="floating-action">
      <button
        v-if="showBackToTop"
        class="floating-actions__button floating-actions__button--top"
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

    <button
      ref="serviceButtonRef"
      class="floating-actions__button floating-actions__button--service"
      type="button"
      aria-label="联系客服"
      aria-haspopup="dialog"
      :aria-expanded="contactOpen"
      aria-controls="customer-contact-dialog"
      data-label="联系客服"
      @click="openContact"
    >
      <svg class="floating-actions__service-icon" viewBox="0 0 1024 1024" aria-hidden="true">
        <path
          class="floating-actions__service-background"
          d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        />
        <path
          class="floating-actions__service-glyph"
          d="M768 562.24c0 35.52-21.44 67.84-54.4 81.92-12.16 32-32.96 59.84-60.48 80-26.56 19.84-57.92 32-91.2 35.52-0.96 0-3.84 0.32-8.96 0.32v13.44h-96v-77.76h96v11.84c4.16 0 6.72-0.32 7.36-0.32 39.36-5.12 73.92-27.52 93.76-61.12-11.52-7.04-18.88-19.52-18.88-32.96v-141.44c0-18.88 13.44-34.56 31.68-38.08-7.68-75.2-72.64-131.2-153.6-131.2s-146.24 56.64-153.6 131.84c16.32 4.8 28.16 19.84 28.16 37.12v141.12c0 21.44-17.6 38.72-39.36 38.72h-2.24c-49.92 0-90.88-40.32-90.88-89.6v-39.68c0-18.24 5.76-36.16 16.32-51.2 8.64-12.48 20.48-22.4 34.24-29.12 3.2-108.16 93.76-192 207.04-192 113.92 0 204.48 84.48 207.04 193.6 29.76 16.32 48 46.4 48 79.36v39.68z"
        />
      </svg>
    </button>
  </div>

  <Teleport to="body">
    <Transition name="contact-modal">
      <div v-if="contactOpen" class="contact-modal__overlay" @click.self="closeContact()">
        <section
          id="customer-contact-dialog"
          ref="dialogRef"
          class="contact-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="customer-contact-title"
          aria-describedby="customer-contact-description"
          tabindex="-1"
        >
          <header class="contact-modal__header">
            <div>
              <p class="contact-modal__eyebrow">CUSTOMER SERVICE</p>
              <h2 id="customer-contact-title">添加客服</h2>
              <p id="customer-contact-description">选择微信或 QQ 扫码联系</p>
            </div>
            <button
              ref="closeButtonRef"
              class="contact-modal__close"
              type="button"
              aria-label="关闭客服弹窗"
              title="关闭"
              @click="closeContact()"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </header>

          <div class="contact-modal__qr-grid">
            <article class="contact-modal__qr-card">
              <img
                class="contact-modal__qr-image"
                :src="wechatQr"
                width="1008"
                height="975"
                alt="微信客服二维码"
                decoding="async"
              />
              <strong>微信</strong>
              <span>使用微信扫码添加</span>
            </article>
            <article class="contact-modal__qr-card">
              <img
                class="contact-modal__qr-image"
                :src="qqQr"
                width="721"
                height="694"
                alt="QQ 客服二维码"
                decoding="async"
              />
              <strong>QQ</strong>
              <span>使用 QQ 扫码添加</span>
            </article>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.floating-actions {
  position: fixed;
  right: calc(24px + env(safe-area-inset-right, 0px));
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  z-index: 48;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.floating-actions__button {
  display: grid;
  flex: 0 0 auto;
  padding: 0;
  place-items: center;
  border: 1px solid var(--border-soft);
  color: var(--brand-main);
  cursor: pointer;
  transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

.floating-actions__button:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

.floating-actions__button:focus-visible,
.contact-modal__close:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--brand-main), transparent 58%);
  outline-offset: 3px;
}

.floating-actions__button--top {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: color-mix(in srgb, var(--bg-card), var(--bg-page) 18%);
  box-shadow: 0 12px 28px color-mix(in srgb, var(--text-main), transparent 88%);
  backdrop-filter: blur(18px) saturate(1.08);
  -webkit-backdrop-filter: blur(18px) saturate(1.08);
}

.floating-actions__button--top svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.floating-actions__button--service {
  position: relative;
  width: 50px;
  height: 50px;
  overflow: visible;
  border-color: color-mix(in srgb, var(--brand-main), var(--bg-page) 30%);
  border-radius: 50%;
  background: var(--brand-main);
  box-shadow: 0 14px 34px color-mix(in srgb, var(--brand-main), transparent 66%);
}

.floating-actions__button--service::before {
  position: absolute;
  top: 50%;
  right: calc(100% + 10px);
  padding: 7px 10px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  color: var(--text-main);
  background: color-mix(in srgb, var(--bg-page), transparent 4%);
  box-shadow: 0 12px 30px color-mix(in srgb, var(--text-main), transparent 90%);
  content: attr(data-label);
  font-family: var(--font-sans);
  font-size: var(--text-caption);
  font-weight: 600;
  line-height: 1;
  opacity: 0;
  pointer-events: none;
  transform: translate(6px, -50%);
  transition: opacity 0.18s ease, transform 0.18s ease;
  white-space: nowrap;
}

.floating-actions__button--service:hover::before,
.floating-actions__button--service:focus-visible::before {
  opacity: 1;
  transform: translate(0, -50%);
}

.floating-actions__service-icon {
  display: block;
  width: 100%;
  height: 100%;
}

.floating-actions__service-background { fill: var(--brand-main); }
.floating-actions__service-glyph { fill: var(--button-primary-text); }

.floating-action-enter-active,
.floating-action-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.floating-action-enter-from,
.floating-action-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.94);
}

.contact-modal__overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  padding: calc(16px + env(safe-area-inset-top, 0px)) calc(16px + env(safe-area-inset-right, 0px)) calc(16px + env(safe-area-inset-bottom, 0px)) calc(16px + env(safe-area-inset-left, 0px));
  place-items: center;
  background: rgba(9, 9, 10, 0.5);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
}

.contact-modal {
  width: min(620px, 100%);
  max-height: calc(100vh - 32px);
  max-height: calc(100dvh - 32px);
  padding: 26px;
  overflow-y: auto;
  border: 1px solid var(--border-soft);
  border-radius: calc(var(--radius-card) + 4px);
  color: var(--text-main);
  background: color-mix(in srgb, var(--bg-page) 88%, var(--bg-section) 12%);
  box-shadow: 0 34px 100px rgba(0, 0, 0, 0.28);
}

.contact-modal__header {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 22px;
}

.contact-modal__eyebrow {
  margin: 0 0 8px;
  color: var(--brand-main);
  font-family: var(--font-sans);
  font-size: var(--text-micro);
  font-weight: 700;
  letter-spacing: 0.16em;
  line-height: 1.4;
}

.contact-modal__header h2 {
  margin: 0;
  border: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.contact-modal__header p:last-child {
  margin: 7px 0 0;
  color: var(--text-sub);
  font-family: var(--font-sans);
  font-size: var(--text-small);
  line-height: 1.6;
}

.contact-modal__close {
  display: grid;
  flex: 0 0 auto;
  width: 36px;
  height: 36px;
  padding: 0;
  place-items: center;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  color: var(--text-sub);
  background: var(--bg-card);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.contact-modal__close:hover {
  border-color: var(--border-strong);
  color: var(--text-main);
  transform: rotate(4deg);
}

.contact-modal__close svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 1.8;
}

.contact-modal__qr-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.contact-modal__qr-card {
  display: grid;
  min-width: 0;
  padding: 16px;
  place-items: center;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  text-align: center;
}

.contact-modal__qr-image {
  display: block;
  width: 100%;
  max-width: 220px;
  height: auto;
  margin: 0 auto 12px;
  border-radius: 10px;
  background: #fff;
}

.contact-modal__qr-card strong {
  color: var(--text-main);
  font-family: var(--font-sans);
  font-size: var(--text-body);
  font-weight: 700;
}

.contact-modal__qr-card span {
  margin-top: 4px;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-caption);
  line-height: 1.5;
}

.contact-modal-enter-active,
.contact-modal-leave-active {
  transition: opacity 0.24s ease;
}

.contact-modal-enter-active .contact-modal,
.contact-modal-leave-active .contact-modal {
  transition: opacity 0.24s ease, transform 0.24s ease;
}

.contact-modal-enter-from,
.contact-modal-leave-to,
.contact-modal-enter-from .contact-modal,
.contact-modal-leave-to .contact-modal {
  opacity: 0;
}

.contact-modal-enter-from .contact-modal,
.contact-modal-leave-to .contact-modal {
  transform: translateY(12px) scale(0.98);
}

@media (max-width: 560px) {
  .floating-actions {
    right: calc(14px + env(safe-area-inset-right, 0px));
    bottom: calc(14px + env(safe-area-inset-bottom, 0px));
    gap: 8px;
  }

  .floating-actions__button--top {
    width: 42px;
    height: 42px;
    border-radius: 12px;
  }

  .floating-actions__button--service {
    width: 46px;
    height: 46px;
  }

  .contact-modal__overlay {
    padding: calc(12px + env(safe-area-inset-top, 0px)) calc(12px + env(safe-area-inset-right, 0px)) calc(12px + env(safe-area-inset-bottom, 0px)) calc(12px + env(safe-area-inset-left, 0px));
  }

  .contact-modal {
    max-height: calc(100vh - 24px);
    max-height: calc(100dvh - 24px);
    padding: 18px;
  }

  .contact-modal__header { margin-bottom: 16px; }
  .contact-modal__header h2 { font-size: 24px; }
  .contact-modal__qr-grid { grid-template-columns: 1fr; gap: 12px; }
  .contact-modal__qr-card { padding: 14px; }
  .contact-modal__qr-image { max-width: 230px; }
}

@media (hover: none), (pointer: coarse) {
  .floating-actions__button--service::before { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .floating-actions__button,
  .floating-actions__button--service::before,
  .floating-action-enter-active,
  .floating-action-leave-active,
  .contact-modal-enter-active,
  .contact-modal-leave-active,
  .contact-modal-enter-active .contact-modal,
  .contact-modal-leave-active .contact-modal {
    transition: none;
  }

  .floating-actions__button:hover,
  .contact-modal__close:hover {
    transform: none;
  }
}
</style>
