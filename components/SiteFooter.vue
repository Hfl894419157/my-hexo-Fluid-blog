<script setup>
import { withBase } from 'vitepress'
import { siteFooterGroups as groups, socialLinks } from '../.shared/siteNavigation.js'

const navLink = (path) => /^(https?:|mailto:|tel:)/.test(path) ? path : withBase(path)
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__container">
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <a :href="withBase('/')">Liuli AI Lab</a>
          <p>记录 AI 商业视觉实践、可复用工作流与经过验证的知识资产。</p>
          <div class="site-footer__socials" aria-label="社交平台">
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
          </div>
        </div>
        <nav v-for="group in groups" :key="group.title" :aria-label="group.title">
          <strong>{{ group.title }}</strong>
          <a v-for="item in group.links" :key="item.text" :href="navLink(item.link)">{{ item.text }}</a>
        </nav>
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
}

.site-footer__container {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 58px 0 28px;
  border-top: 1px solid var(--border-soft);
}

.site-footer__inner {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 34px;
}

.site-footer__brand > a {
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-large);
  font-weight: 600;
  letter-spacing: 0;
  text-decoration: none;
}

.site-footer__brand p {
  max-width: 100%;
  margin: 16px 0 0;
  color: var(--text-muted);
  font-size: var(--text-caption);
  line-height: 1.75;
}

.site-footer nav {
  display: grid;
  gap: 10px;
  align-content: start;
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
}

.site-footer nav a:hover { color: var(--brand-main); }

.site-footer__socials {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

.site-footer__socials a {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  color: var(--text-sub);
}

.site-footer__socials :deep(svg) { width: 18px; height: 18px; }
.site-footer__socials a[aria-label="小红书"] :deep(svg) { width: 27px; }

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

@media (min-width: 960px) {
  :global(.Layout:has(> .VPContent.has-sidebar) > .site-footer) {
    padding-left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  :global(.Layout:has(> .VPContent.has-sidebar) > .site-footer) {
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
    padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width));
  }
}

@media (max-width: 760px) {
  .site-footer { margin-top: 48px; }
  .site-footer__container { width: calc(100% - 32px); }
  .site-footer__inner { grid-template-columns: repeat(2, 1fr); }
  .site-footer__brand { grid-column: 1 / -1; }
}

@media (max-width: 480px) {
  .site-footer__inner { grid-template-columns: 1fr; }
  .site-footer__brand { grid-column: auto; }
  .site-footer__meta { display: grid; gap: 8px; }
}
</style>
