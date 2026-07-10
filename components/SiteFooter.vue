<script setup>
import { withBase } from 'vitepress'
import { siteFooterGroups as groups } from '../.shared/siteNavigation.js'

const navLink = (path) => /^(https?:|mailto:|tel:)/.test(path) ? path : withBase(path)
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__brand">
      <a :href="withBase('/')">AI Creative Lab</a>
      <p>AI 视觉设计、工作流方法与可复用数字资产。</p>
    </div>
    <nav v-for="group in groups" :key="group.title">
      <strong>{{ group.title }}</strong>
      <a v-for="item in group.links" :key="item.text" :href="navLink(item.link)">{{ item.text }}</a>
    </nav>
  </footer>
</template>

<style scoped>
.site-footer {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: 34px;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 72px 0 86px;
  border-top: 1px solid var(--border-soft);
}

.site-footer__brand a {
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: 16px;
  font-weight: 820;
  letter-spacing: var(--title-letter-spacing);
  text-decoration: none;
}

.site-footer__brand p {
  max-width: 360px;
  margin: 16px 0 0;
  color: var(--text-muted);
  font-size: var(--font-small);
  line-height: 1.72;
}

nav {
  display: grid;
  gap: 10px;
  align-content: start;
}

strong {
  margin-bottom: 4px;
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: var(--font-small);
  letter-spacing: var(--title-letter-spacing);
}

nav a {
  color: var(--text-sub);
  font-size: 13px;
  text-decoration: none;
}

nav a:hover {
  color: var(--brand-main);
}

@media (max-width: 760px) {
  .site-footer {
    grid-template-columns: 1fr;
    width: calc(100% - 32px);
  }
}
</style>
