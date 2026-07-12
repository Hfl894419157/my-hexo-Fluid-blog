<script setup>
import { publishedResources } from '../../.shared/resourcesData.js'
import { publishedBlogPosts } from '../../.shared/blogData.js'
import SectionShell from '../SectionShell.vue'
import SectionHeader from '../SectionHeader.vue'
import BaseButton from '../BaseButton.vue'

// 主推文章
const leadArticle = publishedBlogPosts[0]
// 次级文章：最多2篇
const subArticles = publishedBlogPosts.slice(1, 3)
// 工具资源
const resources = publishedResources.slice(0, 2)
</script>

<template>
  <SectionShell id="knowledge">

    <!-- ① 标题区：居中，与全站一致 -->
    <div class="kr-head">
      <SectionHeader
        :title-lines="['知识不是链接仓库', '而是下一次项目的起点']"
        desc="方法解释为什么这样做，资源预览让你先判断它是否值得使用。"
      />
      <BaseButton href="/knowledge/" variant="ghost">进入知识库</BaseButton>
    </div>

    <!-- ② 主内容：左侧大文章 + 右侧资源卡 -->
    <div class="kr-main">

      <!-- 主推文章大卡 -->
      <a v-if="leadArticle" class="kr-feature" :href="leadArticle.link">
        <div class="kr-feature__media">
          <img :src="leadArticle.cover" :alt="leadArticle.alt" loading="lazy" />
          <span class="kr-badge">{{ leadArticle.type }}</span>
        </div>
        <div class="kr-feature__body">
          <p class="kr-label">{{ leadArticle.type }} · {{ leadArticle.publishedAt }}</p>
          <h3 class="kr-feature__title">{{ leadArticle.title }}</h3>
          <p class="kr-feature__summary">{{ leadArticle.summary }}</p>
          <span class="kr-cta">
            阅读全文
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </a>

      <!-- 右侧资源卡列 -->
      <div class="kr-resources">
        <a
          v-for="resource in resources"
          :key="resource.id"
          class="kr-resource"
          :href="resource.link"
        >
          <div class="kr-resource__cover">
            <img :src="resource.cover" :alt="resource.alt" loading="lazy" />
            <span class="kr-resource__badge">{{ resource.category }}</span>
          </div>
          <div class="kr-resource__body">
            <div class="kr-resource__meta">
              <span class="kr-label">RESOURCE</span>
              <span class="kr-verified">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <circle cx="5" cy="5" r="4.5" stroke="currentColor" opacity="0.45"/>
                  <path d="M3 5l1.4 1.4L7 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                已验证 {{ resource.verifiedAt }}
              </span>
            </div>
            <h3 class="kr-resource__title">{{ resource.name }}</h3>
            <p class="kr-resource__desc">{{ resource.desc }}</p>
            <div class="kr-resource__footer">
              <span class="kr-tag">{{ resource.accessType }}</span>
              <span class="kr-arrow">查看资源 →</span>
            </div>
          </div>
        </a>
      </div>

    </div>

    <!-- ③ 次级文章行：最多2篇 + 引导卡 -->
    <div class="kr-sub">
      <a
        v-for="article in subArticles"
        :key="article.id"
        class="kr-sub-card"
        :href="article.link"
      >
        <div class="kr-sub-card__cover">
          <img :src="article.cover" :alt="article.alt" loading="lazy" />
        </div>
        <div class="kr-sub-card__body">
          <p class="kr-label">{{ article.type }} · {{ article.publishedAt }}</p>
          <h3 class="kr-sub-card__title">{{ article.title }}</h3>
          <p class="kr-sub-card__summary">{{ article.summary }}</p>
        </div>
      </a>

      <!-- 第3格：引导卡 -->
      <a class="kr-sub-more" href="/knowledge/">
        <span class="kr-sub-more__label">知识库</span>
        <strong class="kr-sub-more__text">查看全部文章与资源</strong>
        <span class="kr-sub-more__arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </a>
    </div>

  </SectionShell>
</template>

<style scoped>
/* ─── 标题区 ─────────────────────────────────────── */
.kr-head {
  display: grid;
  width: 100%;
  justify-items: center;
  gap: 24px;
  text-align: center;
}

/* ─── 共用标签 ───────────────────────────────────── */
.kr-label {
  margin: 0;
  color: var(--brand-main);
  font-size: var(--text-label);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.kr-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(23, 19, 15, 0.52);
  color: #fff;
  font-size: 11px;
  letter-spacing: 0.08em;
  backdrop-filter: blur(8px);
}

.kr-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 22px;
  color: var(--brand-main);
  font-size: var(--text-small);
  font-weight: 500;
}

/* ─── 主内容区（2列） ────────────────────────────── */
.kr-main {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 18px;
  margin-top: 40px;
  align-items: start;
}

/* 主推文章大卡 */
.kr-feature {
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: var(--bg-card);
  height: 100%;
  transition: box-shadow var(--transition-smooth), transform var(--transition-smooth);
}
.kr-feature:hover {
  box-shadow: var(--shadow-glow);
  transform: translateY(-3px);
}

.kr-feature__media {
  position: relative;
  overflow: hidden;
}
.kr-feature__media img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  filter: var(--image-treatment);
  transition: transform 0.6s ease;
}
.kr-feature:hover .kr-feature__media img {
  transform: scale(1.04);
}

.kr-feature__body {
  display: grid;
  align-content: start;
  padding: clamp(22px, 3.5vw, 36px);
}

.kr-feature__title {
  margin: 10px 0 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(20px, 2vw, 28px);
  font-weight: 600;
  line-height: 1.35;
}

.kr-feature__summary {
  margin: 12px 0 0;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.85;
}

/* ─── 资源卡列 ───────────────────────────────────── */
.kr-resources {
  display: grid;
  gap: 14px;
  /* 让右侧资源卡与左侧大卡等高 */
  grid-template-rows: 1fr 1fr;
  height: 100%;
}

.kr-resource {
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: var(--bg-card);
  transition: box-shadow var(--transition-smooth), transform var(--transition-smooth);
}
.kr-resource:hover {
  box-shadow: var(--shadow-card);
  transform: translateY(-2px);
}

.kr-resource__cover {
  position: relative;
  overflow: hidden;
}
.kr-resource__cover img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  filter: var(--image-treatment);
  transition: transform 0.6s ease;
}
.kr-resource:hover .kr-resource__cover img {
  transform: scale(1.05);
}
.kr-resource__badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 3px 8px;
  border-radius: 5px;
  background: rgba(23, 19, 15, 0.58);
  color: #fff;
  font-size: 10px;
  letter-spacing: 0.06em;
  backdrop-filter: blur(6px);
}

.kr-resource__body {
  display: grid;
  align-content: start;
  padding: 16px 18px 18px;
}

.kr-resource__meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.kr-verified {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text-muted);
  font-size: 10px;
  letter-spacing: 0.04em;
}

.kr-resource__title {
  margin: 8px 0 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  font-weight: 600;
  line-height: 1.4;
}

.kr-resource__desc {
  margin: 6px 0 0;
  color: var(--text-sub);
  font-size: var(--text-caption);
  line-height: 1.7;
}

.kr-resource__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--border-soft);
}

.kr-tag {
  padding: 3px 8px;
  border: 1px solid var(--border-soft);
  border-radius: 5px;
  color: var(--text-sub);
  font-size: 10px;
  letter-spacing: 0.05em;
  background: var(--bg-soft);
}

.kr-arrow {
  color: var(--brand-main);
  font-size: var(--text-caption);
  font-weight: 500;
}

/* ─── 次级文章行（3列等宽） ──────────────────────── */
.kr-sub {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
}

/* 次级文章卡 */
.kr-sub-card {
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: var(--bg-card);
  transition: box-shadow var(--transition-smooth), transform var(--transition-smooth);
}
.kr-sub-card:hover {
  box-shadow: var(--shadow-card);
  transform: translateY(-2px);
}

.kr-sub-card__cover {
  overflow: hidden;
}
.kr-sub-card__cover img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  filter: var(--image-treatment);
  transition: transform 0.6s ease;
}
.kr-sub-card:hover .kr-sub-card__cover img {
  transform: scale(1.04);
}

.kr-sub-card__body {
  display: grid;
  align-content: start;
  padding: 18px 20px 22px;
}

.kr-sub-card__title {
  margin: 8px 0 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  font-weight: 600;
  line-height: 1.4;
}

.kr-sub-card__summary {
  margin: 8px 0 0;
  color: var(--text-sub);
  font-size: var(--text-caption);
  line-height: 1.75;
}

/* 引导卡（第3格） */
.kr-sub-more {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  padding: clamp(28px, 4vw, 40px);
  overflow: hidden;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--brand-main) 4%, var(--bg-card)),
    var(--bg-card));
  transition: border-color var(--transition-smooth), box-shadow var(--transition-smooth), transform var(--transition-smooth);
}
.kr-sub-more:hover {
  border-color: var(--brand-main);
  border-style: solid;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--brand-main) 15%, transparent),
              var(--shadow-card);
  transform: translateY(-2px);
}

.kr-sub-more__label {
  color: var(--brand-main);
  font-size: var(--text-label);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.kr-sub-more__text {
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(17px, 1.6vw, 22px);
  font-weight: 600;
  line-height: 1.4;
}

.kr-sub-more__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-top: 8px;
  border: 1px solid var(--border-strong);
  border-radius: 50%;
  color: var(--brand-main);
  transition: background var(--transition-smooth), border-color var(--transition-smooth), color var(--transition-smooth);
}
.kr-sub-more:hover .kr-sub-more__arrow {
  background: var(--brand-main);
  border-color: var(--brand-main);
  color: #fff;
}

/* ─── 响应式 ─────────────────────────────────────── */
@media (max-width: 960px) {
  .kr-main { grid-template-columns: 1fr; }
  .kr-resources { grid-template-rows: auto; height: auto; }
  .kr-resource__cover img { aspect-ratio: 16 / 8; }
}

@media (max-width: 720px) {
  .kr-sub { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 520px) {
  .kr-sub { grid-template-columns: 1fr; }
  .kr-sub-more { min-height: 140px; }
}

@media (prefers-reduced-motion: reduce) {
  .kr-feature,
  .kr-resource,
  .kr-sub-card,
  .kr-sub-more { transition: none; }
  .kr-feature:hover,
  .kr-resource:hover,
  .kr-sub-card:hover,
  .kr-sub-more:hover { transform: none; }
  .kr-feature__media img,
  .kr-resource__cover img,
  .kr-sub-card__cover img { transition: none; }
  .kr-feature:hover .kr-feature__media img,
  .kr-resource:hover .kr-resource__cover img,
  .kr-sub-card:hover .kr-sub-card__cover img { transform: none; }
}
</style>
