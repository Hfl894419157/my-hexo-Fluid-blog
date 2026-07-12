<script setup>
import { publishedResources } from '../../.shared/resourcesData.js'
import { publishedBlogPosts } from '../../.shared/blogData.js'
import SectionShell from '../SectionShell.vue'
import SectionHeader from '../SectionHeader.vue'
import BaseButton from '../BaseButton.vue'

const leadArticle = publishedBlogPosts[0]
const resources = publishedResources.slice(0, 2)
</script>

<template>
  <SectionShell id="knowledge">

    <!-- ① 标题区：居中对齐，与其他板块保持一致 -->
    <div class="kr-head">
      <SectionHeader
        :title-lines="['知识不是链接仓库', '而是下一次项目的起点']"
        desc="方法解释为什么这样做，资源预览让你先判断它是否值得使用。"
      />
      <BaseButton href="/knowledge/" variant="ghost">进入知识库</BaseButton>
    </div>

    <!-- ② 内容网格：主文章（横跨左侧） + 右侧两个资源卡 -->
    <div class="kr-grid">

      <!-- 主文章卡 -->
      <a v-if="leadArticle" class="kr-article" :href="leadArticle.link">
        <div class="kr-article__media">
          <img :src="leadArticle.cover" :alt="leadArticle.alt" loading="lazy" />
          <span class="kr-article__badge">{{ leadArticle.type }}</span>
        </div>
        <div class="kr-article__body">
          <p class="kr-meta">{{ leadArticle.type }} · {{ leadArticle.publishedAt }}</p>
          <h3 class="kr-article__title">{{ leadArticle.title }}</h3>
          <p class="kr-article__summary">{{ leadArticle.summary }}</p>
          <span class="kr-read-more">
            阅读全文
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </a>

      <!-- 资源卡列表 -->
      <div class="kr-resources">
        <a
          v-for="resource in resources"
          :key="resource.id"
          class="kr-resource"
          :href="resource.link"
        >
          <!-- 真实图片封面 -->
          <div class="kr-resource__cover">
            <img :src="resource.cover" :alt="resource.alt" loading="lazy" />
            <span class="kr-resource__type-badge">{{ resource.category }}</span>
          </div>

          <!-- 文字信息 -->
          <div class="kr-resource__body">
            <div class="kr-resource__meta-row">
              <span class="kr-meta">RESOURCE</span>
              <span class="kr-verified">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <circle cx="5" cy="5" r="4.5" stroke="currentColor" opacity="0.5"/>
                  <path d="M3 5l1.4 1.4L7 3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                已验证 {{ resource.verifiedAt }}
              </span>
            </div>
            <h3 class="kr-resource__title">{{ resource.name }}</h3>
            <p class="kr-resource__desc">{{ resource.desc }}</p>
            <div class="kr-resource__footer">
              <span class="kr-access-badge">{{ resource.accessType }}</span>
              <span class="kr-arrow">查看资源 →</span>
            </div>
          </div>
        </a>
      </div>

    </div>


  </SectionShell>
</template>

<style scoped>
/* ─── 标题区 ─────────────────────────────── */
.kr-head {
  display: grid;
  width: 100%;
  justify-items: center;
  gap: 24px;
  text-align: center;
}

/* ─── 内容网格 ────────────────────────────── */
.kr-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(340px, 0.85fr);
  gap: 20px;
  margin-top: 32px;
  align-items: start;
}

/* ─── 主文章卡 ────────────────────────────── */
.kr-article {
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
.kr-article:hover {
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}

.kr-article__media {
  position: relative;
  overflow: hidden;
}
.kr-article__media img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  filter: var(--image-treatment);
  transition: transform 0.55s ease;
}
.kr-article:hover .kr-article__media img {
  transform: scale(1.035);
}
.kr-article__badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 5px 10px;
  border-radius: 6px;
  background: rgba(23, 19, 15, 0.55);
  color: #fff;
  font-size: 11px;
  letter-spacing: 0.08em;
  backdrop-filter: blur(8px);
}

.kr-article__body {
  padding: clamp(24px, 4vw, 38px);
  display: grid;
  align-content: start;
}

.kr-article__title {
  margin: 10px 0 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(20px, 2.2vw, 30px);
  font-weight: 600;
  line-height: 1.35;
}

.kr-article__summary {
  margin: 12px 0 0;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.85;
}

.kr-read-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 22px;
  color: var(--brand-main);
  font-size: var(--text-small);
  font-weight: 500;
}

/* ─── 资源卡列表 ──────────────────────────── */
.kr-resources {
  display: grid;
  gap: 16px;
}

.kr-resource {
  display: grid;
  grid-template-columns: 136px minmax(0, 1fr);
  gap: 0;
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
  height: 100%;
  min-height: 160px;
  object-fit: cover;
  filter: var(--image-treatment);
  transition: transform 0.55s ease;
}
.kr-resource:hover .kr-resource__cover img {
  transform: scale(1.05);
}
.kr-resource__type-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 3px 8px;
  border-radius: 5px;
  background: rgba(23, 19, 15, 0.6);
  color: #fff;
  font-size: 10px;
  letter-spacing: 0.06em;
  backdrop-filter: blur(6px);
}

.kr-resource__body {
  display: grid;
  align-content: start;
  gap: 0;
  padding: 18px 20px;
}

.kr-resource__meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.kr-meta {
  margin: 0;
  color: var(--brand-main);
  font-size: var(--text-label);
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
  margin: 10px 0 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  font-weight: 600;
  line-height: 1.4;
}

.kr-resource__desc {
  margin: 8px 0 0;
  color: var(--text-sub);
  font-size: var(--text-caption);
  line-height: 1.7;
}

.kr-resource__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--border-soft);
}

.kr-access-badge {
  padding: 3px 8px;
  border: 1px solid var(--border-soft);
  border-radius: 5px;
  color: var(--text-sub);
  font-size: 10px;
  letter-spacing: 0.06em;
  background: var(--bg-soft);
}

.kr-arrow {
  color: var(--brand-main);
  font-size: var(--text-caption);
  font-weight: 500;
}


/* ─── 响应式 ──────────────────────────────── */
@media (max-width: 900px) {
  .kr-head { flex-direction: column; align-items: flex-start; }
  .kr-grid { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .kr-resource { grid-template-columns: 110px minmax(0, 1fr); }
  .kr-resource__cover img { min-height: 130px; }
  .kr-resource__body { padding: 14px 16px; }
}
</style>
