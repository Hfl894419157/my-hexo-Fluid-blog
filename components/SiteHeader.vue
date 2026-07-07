<script setup>
import { withBase } from 'vitepress'
import ThemeToggle from './ThemeToggle.vue'

const navItems = [
  ['作品案例', '/portfolio/'],
  ['AI 工作流', '/aigc/'],
  ['资源库', '/resources/'],
  ['方法论', '/blog/'],
  ['关于我', '/resume']
]

const pageLink = (path) => withBase(path)
</script>

<template>
  <header class="site-header">
    <a class="site-header__brand" :href="pageLink('/')">AI Creative Lab</a>
    <nav class="site-header__nav" aria-label="首页导航">
      <a v-for="item in navItems" :key="item[0]" :href="pageLink(item[1])">{{ item[0] }}</a>
    </nav>
    <ThemeToggle />
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 18px;
  left: 50%;
  z-index: 50;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
  width: min(1120px, calc(100% - 32px));
  min-height: 58px;
  padding: 0 12px 0 18px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--nav-bg);
  backdrop-filter: blur(22px);
  box-shadow: var(--shadow-card);
  transform: translateX(-50%);
}

.site-header__brand {
  color: var(--text-main);
  font-size: 14px;
  font-weight: 820;
  text-decoration: none;
}

.site-header__nav {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.site-header__nav a {
  padding: 10px 12px;
  border-radius: var(--radius-control);
  color: var(--text-sub);
  font-size: 13px;
  font-weight: 680;
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease;
}

.site-header__nav a:hover {
  color: var(--text-main);
  background: var(--bg-soft);
}

@media (max-width: 760px) {
  .site-header {
    grid-template-columns: 1fr auto;
  }

  .site-header__nav {
    display: none;
  }
}
</style>
