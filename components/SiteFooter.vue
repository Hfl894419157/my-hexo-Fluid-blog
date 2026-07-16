<script setup>
import { withBase } from 'vitepress'
import { siteFooterGroups as groups, socialLinks } from '../.shared/siteNavigation.js'
import BrandMark from './BrandMark.vue'

const navLink = (path) => /^(https?:|mailto:|tel:)/.test(path) ? path : withBase(path)
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

.site-footer__socials a {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  color: var(--text-sub);
}

.site-footer__socials :deep(svg) {
  width: 18px;
  height: 18px;
}

.site-footer__socials a[aria-label="小红书"] :deep(svg) {
  width: 27px;
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
