<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, withBase } from 'vitepress'
import ThemeToggle from './ThemeToggle.vue'
import SiteSearch from './SiteSearch.vue'
import { navItems } from '../.shared/siteNavigation.js'

const route = useRoute()
const hasScrolled = ref(false)
const scrollingUp = ref(false)
const searchOpen = ref(false)
const navOpen = ref(false)
let lastScrollY = 0

const pageLink = (path) => withBase(path)
const normalizePath = (path) => path.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/'
const currentPath = computed(() => normalizePath(route.path))

const isActive = (item) => {
  const targets = [item, ...(item.children || [])]
  return targets.some(({ link }) => {
    const normalized = normalizePath(link)
    if (normalized === '/') return currentPath.value === '/'
    return currentPath.value === normalized || currentPath.value.startsWith(`${normalized}/`)
  })
}

const updateScrollState = () => {
  const nextScrollY = window.scrollY || 0
  scrollingUp.value = nextScrollY < lastScrollY && nextScrollY > 24
  hasScrolled.value = nextScrollY > 16
  lastScrollY = nextScrollY
}

const closeNav = () => {
  navOpen.value = false
}

const onKeydown = (event) => {
  if (event.key === 'Escape') closeNav()
}

onMounted(() => {
  lastScrollY = window.scrollY || 0
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    class="site-header__glass"
    :class="{
      'site-header__glass--scrolled': hasScrolled,
      'site-header__glass--up': scrollingUp
    }"
    aria-hidden="true"
  />
  <header
    class="site-header"
    :class="{
      'site-header--scrolled': hasScrolled,
      'site-header--up': scrollingUp,
      'site-header--search-open': searchOpen,
      'site-header--nav-open': navOpen
    }"
  >
    <a class="site-header__brand" :href="pageLink('/')">Liuli AI Lab</a>

    <nav id="site-navigation" class="site-header__nav" aria-label="全站导航">
      <template v-for="item in navItems" :key="item.text">
        <details v-if="item.children" class="site-header__dropdown" :class="{ active: isActive(item) }">
          <summary>{{ item.text }}<span aria-hidden="true">⌄</span></summary>
          <div class="site-header__submenu">
            <a
              v-for="child in item.children"
              :key="child.text"
              :href="pageLink(child.link)"
              :class="{ active: isActive(child) }"
              @click="closeNav"
            >
              {{ child.text }}
            </a>
          </div>
        </details>
        <a
          v-else
          :class="{ active: isActive(item) }"
          :href="pageLink(item.link)"
          @click="closeNav"
        >
          {{ item.text }}
        </a>
      </template>
      <a class="site-header__mobile-contact" href="mailto:1442855983@qq.com">联系合作</a>
    </nav>

    <div class="site-header__actions">
      <SiteSearch @open-change="searchOpen = $event" />
      <ThemeToggle />
      <a class="site-header__contact" href="mailto:1442855983@qq.com">联系合作</a>
      <button
        class="site-header__menu-button"
        type="button"
        :aria-expanded="navOpen"
        aria-controls="site-navigation"
        :aria-label="navOpen ? '关闭菜单' : '打开菜单'"
        @click="navOpen = !navOpen"
      >
        <span />
        <span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
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
  background: var(--nav-bg);
  backdrop-filter: blur(22px) saturate(1.08);
  -webkit-backdrop-filter: blur(22px) saturate(1.08);
  box-shadow: var(--nav-shadow);
  transform: translateX(-50%);
  transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

.site-header--scrolled,
.site-header--up {
  border-color: color-mix(in srgb, var(--border-strong), transparent 26%);
  background: var(--nav-bg-strong);
}

.site-header--up {
  transform: translateX(-50%) translateY(2px);
}

.site-header__glass {
  position: fixed;
  inset: 0 0 auto;
  z-index: 49;
  width: 100vw;
  height: 88px;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(24px) saturate(1.08);
  -webkit-backdrop-filter: blur(24px) saturate(1.08);
  mask-image: linear-gradient(180deg, #000 0%, #000 72%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 72%, transparent 100%);
  opacity: 0;
  transition: height 0.24s ease, opacity 0.22s ease;
}

.site-header__glass--scrolled { opacity: 1; }
.site-header__glass--up { backdrop-filter: blur(30px) saturate(1.28); }

.site-header__brand {
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: 14px;
  font-weight: 820;
  letter-spacing: var(--title-letter-spacing);
  text-decoration: none;
  white-space: nowrap;
}

.site-header__nav {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.site-header__nav > a,
.site-header__dropdown summary {
  display: flex;
  gap: 5px;
  align-items: center;
  min-height: 40px;
  padding: 0 12px;
  border-radius: var(--radius-control);
  color: var(--text-sub);
  font-size: 13px;
  font-weight: 680;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}

.site-header__nav > a:hover,
.site-header__nav > a.active,
.site-header__dropdown.active summary,
.site-header__dropdown summary:hover {
  color: var(--text-main);
  background: rgba(138, 79, 45, 0.07);
}

.site-header__dropdown {
  position: relative;
}

.site-header__dropdown summary {
  list-style: none;
}

.site-header__dropdown summary::-webkit-details-marker { display: none; }

.site-header__submenu {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  display: grid;
  width: 176px;
  padding: 8px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--nav-bg-strong);
  box-shadow: var(--shadow-card);
  transform: translateX(-50%);
}

.site-header__submenu a {
  padding: 10px 12px;
  border-radius: var(--radius-control);
  color: var(--text-sub);
  font-size: 13px;
  text-decoration: none;
}

.site-header__submenu a:hover,
.site-header__submenu a.active {
  color: var(--text-main);
  background: var(--bg-soft);
}

.site-header__actions {
  display: flex;
  gap: 6px;
  align-items: center;
}

.site-header__contact,
.site-header__mobile-contact {
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  padding: 0 14px;
  border-radius: var(--radius-control);
  color: var(--button-primary-text);
  background: var(--brand-main);
  font-size: 12px;
  font-weight: 760;
  text-decoration: none;
}

.site-header__menu-button { display: none; }
.site-header__nav > .site-header__mobile-contact { display: none; }

.site-header__menu-button {
  width: 38px;
  height: 38px;
  place-content: center;
  gap: 5px;
  padding: 0;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  background: var(--bg-card);
}

.site-header__menu-button span {
  display: block;
  width: 16px;
  height: 1px;
  background: var(--text-main);
  transition: transform 0.2s ease;
}

.site-header--nav-open .site-header__menu-button span:first-child { transform: translateY(3px) rotate(45deg); }
.site-header--nav-open .site-header__menu-button span:last-child { transform: translateY(-3px) rotate(-45deg); }

@media (max-width: 900px) {
  .site-header {
    grid-template-columns: 1fr auto;
    min-height: 56px;
  }

  .site-header__contact { display: none; }
  .site-header__menu-button { display: grid; }

  .site-header__nav {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    left: 0;
    display: none;
    gap: 4px;
    align-items: stretch;
    padding: 12px;
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-card);
    z-index: 2;
    max-height: calc(100vh - 92px);
    overflow-y: auto;
    background: var(--bg-page);
    box-shadow: var(--shadow-card);
  }

  .site-header--nav-open .site-header__nav { display: grid; }

  .site-header__nav > a,
  .site-header__dropdown summary {
    justify-content: space-between;
    min-height: 44px;
  }

  .site-header__submenu {
    position: static;
    width: auto;
    padding: 4px 0 4px 14px;
    border: 0;
    background: transparent;
    box-shadow: none;
    transform: none;
  }

  .site-header__nav > .site-header__mobile-contact { display: inline-flex; justify-content: center; margin-top: 4px; }

  .site-header--search-open .site-header__brand,
  .site-header--search-open .site-header__menu-button { display: none; }

  .site-header--search-open { grid-template-columns: 1fr; }
  .site-header--search-open .site-header__actions { width: 100%; }
}

@media (max-width: 560px) {
  .site-header {
    top: 10px;
    width: calc(100% - 20px);
    padding: 8px 10px 8px 14px;
  }

  .site-header__brand { font-size: 13px; }
}

@media (prefers-reduced-motion: reduce) {
  .site-header,
  .site-header__menu-button span { transition: none; }
}
</style>
