<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, withBase } from 'vitepress'
import ThemeToggle from './ThemeToggle.vue'
import { navItems, socialLinks } from '../.shared/siteNavigation.js'

const route = useRoute()
const hasScrolled = ref(false)
const scrollingUp = ref(false)
let lastScrollY = 0

const pageLink = (path) => withBase(path)
const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path)
const normalizePath = (path) => path.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/'
const currentPath = computed(() => normalizePath(route.path))

const isActive = (link) => {
  const normalized = normalizePath(link)
  if (normalized === '/') return currentPath.value === '/'
  return currentPath.value === normalized || currentPath.value.startsWith(`${normalized}/`)
}

const updateScrollState = () => {
  const nextScrollY = window.scrollY || 0
  scrollingUp.value = nextScrollY < lastScrollY && nextScrollY > 24
  hasScrolled.value = nextScrollY > 16
  lastScrollY = nextScrollY
}

onMounted(() => {
  lastScrollY = window.scrollY || 0
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<template>
  <header class="site-header" :class="{ 'site-header--scrolled': hasScrolled, 'site-header--up': scrollingUp }">
    <div class="site-header__glass" aria-hidden="true" />
    <a class="site-header__brand" :href="pageLink('/')">AI Creative Lab</a>
    <nav class="site-header__nav" aria-label="全站导航">
      <a
        v-for="item in navItems"
        :key="item.text"
        :class="{ active: isActive(item.link) }"
        :href="pageLink(item.link)"
      >
        {{ item.text }}
      </a>
    </nav>
    <div class="site-header__actions">
      <div class="site-header__socials" aria-label="社交链接">
        <a
          v-for="item in socialLinks"
          :key="item.name"
          class="site-header__social"
          :href="isExternal(item.link) ? item.link : pageLink(item.link)"
          :aria-label="item.name"
          :title="item.name"
          target="_blank"
          rel="noreferrer"
          v-html="item.svg"
        />
      </div>
      <ThemeToggle />
    </div>
  </header>
</template>

<style scoped>
.site-header {
  --header-glass-offset: -18px;
  --header-glass-height: 76px;
  position: fixed;
  top: 18px;
  left: 50%;
  z-index: 50;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  width: min(1180px, calc(100% - 32px));
  min-height: 58px;
  padding: 0 12px 0 18px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--nav-bg), transparent 4%);
  backdrop-filter: blur(22px) saturate(1.18);
  -webkit-backdrop-filter: blur(22px) saturate(1.18);
  box-shadow: 0 10px 34px rgba(15, 23, 42, 0.08);
  transform: translateX(-50%);
  transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

.site-header--scrolled {
  border-color: var(--border-strong);
  background: color-mix(in srgb, var(--nav-bg), transparent 0%);
  box-shadow: 0 12px 38px rgba(15, 23, 42, 0.10);
}

.site-header--up {
  background: color-mix(in srgb, var(--nav-bg), transparent 8%);
  backdrop-filter: blur(30px) saturate(1.28);
  -webkit-backdrop-filter: blur(30px) saturate(1.28);
  transform: translateX(-50%) translateY(2px);
}

.site-header__glass {
  position: fixed;
  top: var(--header-glass-offset);
  left: 50%;
  z-index: -1;
  width: 100vw;
  height: var(--header-glass-height);
  pointer-events: none;
  background: color-mix(in srgb, var(--nav-bg), transparent 20%);
  backdrop-filter: blur(22px) saturate(1.16);
  -webkit-backdrop-filter: blur(22px) saturate(1.16);
  mask-image: linear-gradient(180deg, #000 0%, #000 82%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 82%, transparent 100%);
  opacity: 0;
  transform: translateX(-50%);
  transition: opacity 0.22s ease, height 0.22s ease, backdrop-filter 0.22s ease;
}

.site-header--scrolled .site-header__glass {
  opacity: 1;
}

.site-header--up .site-header__glass {
  backdrop-filter: blur(30px) saturate(1.28);
  -webkit-backdrop-filter: blur(30px) saturate(1.28);
}

.site-header__brand {
  position: relative;
  z-index: 1;
  color: var(--text-main);
  font-size: 14px;
  font-weight: 820;
  text-decoration: none;
  white-space: nowrap;
}

.site-header__nav {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 6px;
  justify-content: center;
  min-width: 0;
}

.site-header__nav a {
  padding: 10px 12px;
  border-radius: var(--radius-control);
  color: var(--text-sub);
  font-size: 13px;
  font-weight: 680;
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease;
  white-space: nowrap;
}

.site-header__nav a:hover,
.site-header__nav a.active {
  color: var(--text-main);
  background: var(--bg-soft);
}

.site-header__actions {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 8px;
  align-items: center;
}

.site-header__socials {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 0 2px;
}

.site-header__social {
  display: grid;
  width: 30px;
  height: 34px;
  place-items: center;
  border-radius: var(--radius-control);
  color: var(--text-sub);
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.site-header__social:hover {
  color: var(--text-main);
  background: var(--bg-soft);
  transform: translateY(-1px);
}

.site-header__social :deep(svg) {
  width: 18px;
  height: 18px;
  display: block;
}

.site-header__social[aria-label="小红书"] :deep(svg) {
  width: 30px;
}

@media (max-width: 900px) {
  .site-header {
    --header-glass-height: 126px;
    grid-template-columns: 1fr auto;
    gap: 10px;
    padding: 10px 12px;
  }

  .site-header__nav {
    grid-column: 1 / -1;
    grid-row: 2;
    justify-content: flex-start;
    order: 3;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
  }

  .site-header__nav::-webkit-scrollbar {
    display: none;
  }
}

@media (max-width: 560px) {
  .site-header {
    --header-glass-offset: -10px;
    --header-glass-height: 120px;
    top: 10px;
    width: calc(100% - 20px);
    min-height: 0;
  }

  .site-header__brand {
    font-size: 13px;
  }

  .site-header__actions {
    gap: 4px;
  }

  .site-header__socials {
    gap: 0;
  }

  .site-header__social {
    width: 26px;
  }

  .site-header__nav a {
    padding: 8px 10px;
    font-size: 12px;
  }
}
</style>
