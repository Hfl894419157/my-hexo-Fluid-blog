<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { PhTelegramLogo, PhWhatsappLogo } from '@phosphor-icons/vue'
import { siteFooterGroups as groups, socialLinks } from '../.shared/siteNavigation.js'
import BrandMark from './BrandMark.vue'
import ResponsiveImage from './ResponsiveImage.vue'

const navLink = (path) => /^(https?:|mailto:|tel:)/.test(path) ? path : withBase(path)
const qrSocialsRef = ref(null)
const activeQr = ref('')
let isKeyboardNavigation = false
const qrSocials = [
  {
    name: 'Telegram',
    id: 'footer-telegram-qr',
    src: '/telegram-qr.png',
    alt: 'Telegram 联系二维码',
    icon: PhTelegramLogo
  },
  {
    name: 'WhatsApp',
    id: 'footer-whatsapp-qr',
    src: '/whatsapp-qr.png',
    alt: 'WhatsApp 联系二维码',
    icon: PhWhatsappLogo
  }
]

const supportsHover = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(hover: hover) and (pointer: fine)').matches
)

const toggleQr = (name) => {
  activeQr.value = activeQr.value === name ? '' : name
}

const closeQr = () => {
  activeQr.value = ''
}

const onQrClick = (name) => {
  if (supportsHover()) return
  toggleQr(name)
}

const onQrFocusIn = (name, event) => {
  if (supportsHover() && isKeyboardNavigation && event.target) {
    activeQr.value = name
  }
}

const onQrFocusOut = (name, event) => {
  if (!supportsHover() || event.currentTarget?.contains(event.relatedTarget)) return
  if (activeQr.value === name) closeQr()
}

const onDocumentPointerDown = (event) => {
  isKeyboardNavigation = false
  if (supportsHover() || !qrSocialsRef.value?.contains(event.target)) closeQr()
}

const onKeydown = (event) => {
  if (event.key === 'Tab') {
    isKeyboardNavigation = true
    return
  }
  if (event.key !== 'Escape' || !activeQr.value) return
  const openName = activeQr.value
  closeQr()
  qrSocialsRef.value
    ?.querySelector(`[data-qr-social="${openName}"]`)
    ?.focus()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__container">
      <div class="site-footer__main">
        <div class="site-footer__brand">
          <a :href="withBase('/')">
            <BrandMark :size="20" />
            <span>Liuli AI Lab</span>
          </a>
          <p>记录 AI 商业视觉作品、可复用工作流、研究方法与经过验证的工具资源。</p>
          <div ref="qrSocialsRef" class="site-footer__socials" aria-label="社交平台">
            <a
              v-for="item in socialLinks"
              :key="item.name"
              :href="item.link"
              :aria-label="item.name"
              :title="item.name"
              target="_blank"
              rel="noreferrer"
              v-html="item.svg"
            />
            <div
              v-for="item in qrSocials"
              :key="item.name"
              class="site-footer__qr-social"
              @focusin="onQrFocusIn(item.name, $event)"
              @focusout="onQrFocusOut(item.name, $event)"
            >
              <button
                class="site-footer__qr-button"
                type="button"
                :data-qr-social="item.name"
                :aria-label="`显示 ${item.name} 二维码`"
                :title="item.name"
                :aria-expanded="activeQr === item.name"
                :aria-controls="item.id"
                @click="onQrClick(item.name)"
              >
                <component :is="item.icon" weight="fill" aria-hidden="true" />
              </button>

              <div
                :id="item.id"
                class="site-footer__qr-popover"
                :class="{ 'is-open': activeQr === item.name }"
                role="dialog"
                :aria-label="`${item.name} 联系二维码`"
              >
                <a
                  class="site-footer__qr-image"
                  :href="item.src"
                  target="_blank"
                  rel="noopener noreferrer"
                  :title="`打开 ${item.name} 二维码大图`"
                >
                  <ResponsiveImage
                    :src="item.src"
                    :alt="item.alt"
                    sizes="260px"
                  />
                </a>
                <span>扫码添加 {{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="site-footer__nav">
          <nav v-for="group in groups" :key="group.title" :aria-label="group.title">
            <strong>{{ group.title }}</strong>
            <a v-for="item in group.links" :key="item.text" :href="navLink(item.link)">
              {{ item.text }}
            </a>
          </nav>
        </div>
      </div>

      <div class="site-footer__meta">
        <span>© 2026 Liuli AI Lab</span>
        <span>AI 实践与知识系统</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  margin: 72px 0 0;
  border-top: 1px solid var(--border-soft);
  background: var(--footer-bg);
}

.site-footer__container {
  width: min(var(--page-width), calc(100% - 48px));
  margin-inline: auto;
  padding: 58px 0 28px;
}

/*
 * 四列先组成一个紧凑内容组，再整体居中。
 * 不使用 repeat(4, 1fr) 或 space-between，避免后三列被拉散。
 */
.site-footer__main {
  display: grid;
  grid-template-columns: minmax(280px, 300px) auto;
  align-items: start;
  justify-content: center;
  width: max-content;
  max-width: 100%;
  margin-inline: auto;
  column-gap: 56px;
}

.site-footer__brand {
  width: 100%;
  max-width: 300px;
}

.site-footer__brand > a {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  color: var(--text-main);
  font-family: var(--font-sans);
  font-size: var(--text-small);
  font-weight: 700;
  letter-spacing: 0.12em;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
}

.site-footer__brand > a :deep(.brand-mark) { color: var(--brand-main); }

.site-footer__brand p {
  max-width: 280px;
  margin: 16px 0 0;
  color: var(--text-muted);
  font-size: var(--text-caption);
  line-height: 1.75;
}

.site-footer__nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(112px, max-content));
  align-items: start;
  justify-content: start;
  column-gap: 44px;
}

.site-footer__nav nav {
  display: grid;
  align-content: start;
  gap: 10px;
  min-width: 0;
  text-align: left;
}

.site-footer strong {
  margin-bottom: 4px;
  color: var(--text-main);
  font-family: var(--font-sans);
  font-size: var(--text-caption);
  font-weight: 700;
}

.site-footer nav a {
  color: var(--text-sub);
  font-size: var(--text-caption);
  text-decoration: none;
  transition: color 180ms ease;
}

.site-footer nav a:hover {
  color: var(--brand-main);
}

.site-footer__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.site-footer__socials > a,
.site-footer__qr-button {
  display: grid;
  width: 36px;
  height: 36px;
  padding: 0;
  place-items: center;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--text-sub);
  cursor: pointer;
  transition: border-color 180ms ease, color 180ms ease;
}

.site-footer__socials > a:hover,
.site-footer__qr-button:hover,
.site-footer__qr-button[aria-expanded="true"] {
  border-color: var(--border-strong);
  color: var(--brand-main);
}

.site-footer__qr-button:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--brand-main), transparent 58%);
  outline-offset: 3px;
}

.site-footer__socials :deep(svg) {
  width: 18px;
  height: 18px;
}

.site-footer__socials > a[aria-label="小红书"] :deep(svg) {
  width: 27px;
}

.site-footer__qr-social {
  position: relative;
}

.site-footer__qr-popover {
  position: absolute;
  right: 0;
  bottom: calc(100% + 12px);
  z-index: 20;
  display: grid;
  width: min(260px, calc(100vw - 40px));
  gap: 8px;
  padding: 10px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transform: translateY(6px);
  visibility: hidden;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  transition:
    opacity 160ms ease,
    transform 160ms ease,
    visibility 160ms ease;
}

.site-footer__qr-popover.is-open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
  visibility: visible;
}

@media (hover: hover) and (pointer: fine) {
  .site-footer__qr-social:hover > .site-footer__qr-popover {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
    visibility: visible;
  }
}

.site-footer__qr-popover::after {
  position: absolute;
  top: 100%;
  right: 11px;
  width: 12px;
  height: 8px;
  background: inherit;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  content: '';
}

.site-footer__qr-image {
  display: block;
  overflow: hidden;
  padding: 8px;
  border: 1px solid color-mix(in srgb, var(--text-main), transparent 88%);
  border-radius: calc(var(--radius-card) - 4px);
  background: #fff;
}

.site-footer__qr-image :deep(img) {
  display: block;
  width: 100%;
  max-height: 330px;
  border-radius: calc(var(--radius-card) - 10px);
  object-fit: contain;
}

.site-footer__qr-popover span {
  color: var(--text-sub);
  font-size: var(--text-micro);
  font-weight: 700;
}

.site-footer__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 24px;
  padding-top: 28px;
  margin-top: 42px;
  border-top: 1px solid var(--border-soft);
  color: var(--text-muted);
  font-size: var(--text-micro);
  letter-spacing: 0.04em;
  text-align: center;
}

/*
 * 不再针对带侧栏页面单独平移页脚。
 * 页脚始终以完整页面容器为基准居中，保证所有 Layout 视觉一致。
 */
@media (max-width: 1024px) {
  .site-footer__main {
    grid-template-columns: minmax(250px, 280px) auto;
    column-gap: 40px;
  }

  .site-footer__nav {
    grid-template-columns: repeat(3, minmax(104px, max-content));
    column-gap: 30px;
  }
}

@media (max-width: 768px) {
  .site-footer {
    margin-top: 48px;
  }

  .site-footer__main {
    width: 100%;
    grid-template-columns: 1fr;
    justify-content: start;
    row-gap: 38px;
  }

  .site-footer__brand {
    max-width: 320px;
  }

  .site-footer__nav {
    grid-template-columns: repeat(3, minmax(108px, max-content));
    justify-content: start;
    column-gap: 32px;
  }
}

@media (max-width: 560px) {
  .site-footer__nav {
    grid-template-columns: repeat(2, minmax(120px, max-content));
    row-gap: 30px;
    column-gap: 24px;
  }
}

@media (max-width: 480px) {
  .site-footer__container {
    width: calc(100% - 40px);
  }

  .site-footer__qr-popover {
    position: fixed;
    right: 20px;
    bottom: calc(76px + env(safe-area-inset-bottom, 0px));
    left: 20px;
    width: auto;
    max-height: calc(100dvh - 116px);
  }

  .site-footer__qr-popover::after {
    display: none;
  }

  .site-footer__qr-image :deep(img) {
    max-height: calc(100dvh - 166px);
  }

  .site-footer__meta {
    display: grid;
    justify-content: start;
    gap: 8px;
    text-align: left;
  }
}

@media (max-width: 390px) {
  .site-footer__nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 20px;
  }
}
</style>
