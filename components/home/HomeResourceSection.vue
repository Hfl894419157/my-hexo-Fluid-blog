<script setup>
import { publishedResources } from '../../.shared/resourcesData.js'
import { publishedBlogPosts } from '../../.shared/blogData.js'
import SectionShell from '../SectionShell.vue'
import SectionHeader from '../SectionHeader.vue'
import BaseButton from '../BaseButton.vue'

const leadArticle = publishedBlogPosts[0]
const resources = publishedResources.slice(0, 2)

// 融合成高度统一的卡片数据，确保排版一致性
const items = [
  {
    type: 'article',
    category: leadArticle.type || '定位观察',
    meta: leadArticle.publishedAt,
    title: leadArticle.title,
    desc: leadArticle.summary,
    cover: leadArticle.cover,
    alt: leadArticle.alt,
    link: leadArticle.link,
    action: '阅读文章 →'
  },
  {
    type: 'resource',
    category: resources[0]?.category || '方法模板',
    meta: '已验证',
    title: resources[0]?.name,
    desc: resources[0]?.desc,
    cover: resources[0]?.cover,
    alt: resources[0]?.alt,
    link: resources[0]?.link,
    action: '获取资源 →'
  },
  {
    type: 'resource',
    category: resources[1]?.category || '检查清单',
    meta: '已验证',
    title: resources[1]?.name,
    desc: resources[1]?.desc,
    cover: resources[1]?.cover,
    alt: resources[1]?.alt,
    link: resources[1]?.link,
    action: '获取资源 →'
  }
]
</script>

<template>
  <SectionShell id="knowledge">
    <!-- ① 标题区：居中对齐，与其他板块保持一致 -->
    <div class="kr-head">
      <SectionHeader
        :title-lines="['知识不是链接仓库', '而是下一次项目的起点']"
        desc="方法解释为什么这样做，资源预览让你先判断它是否值得使用。"
      />
    </div>

    <!-- ② 统一的 3 列极简网格 -->
    <div class="kr-grid">
      <a
        v-for="(item, idx) in items"
        :key="idx"
        :href="item.link"
        class="kr-card"
      >
        <!-- 统一比例封面 -->
        <div class="kr-card__media">
          <img :src="item.cover" :alt="item.alt" loading="lazy" />
        </div>

        <!-- 统一内容排版 -->
        <div class="kr-card__body">
          <div class="kr-card__meta">
            <span class="kr-card__category">{{ item.category }}</span>
            <span class="kr-card__info">
              <span v-if="item.type === 'resource'" class="kr-card__dot"></span>
              {{ item.meta }}
            </span>
          </div>
          <h3 class="kr-card__title">{{ item.title }}</h3>
          <p class="kr-card__desc">{{ item.desc }}</p>
          <div class="kr-card__footer">
            <span>{{ item.action }}</span>
          </div>
        </div>
      </a>
    </div>

    <!-- ③ 底部行动点 -->
    <div class="kr-action">
      <BaseButton href="/knowledge/" variant="ghost">进入知识库</BaseButton>
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

/* ─── 统一的网格 ─────────────────────────── */
.kr-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 48px;
}

/* ─── 统一的卡片组件 ─────────────────────── */
.kr-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: var(--bg-card);
  transition: border-color var(--transition-smooth), box-shadow var(--transition-smooth), transform var(--transition-smooth);
}

.kr-card:hover {
  border-color: color-mix(in srgb, var(--brand-main) 30%, transparent);
  box-shadow: var(--shadow-card);
  transform: translateY(-4px);
}

.kr-card__media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border-soft);
}

.kr-card__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--image-treatment);
  transition: transform 0.6s ease;
}

.kr-card:hover .kr-card__media img {
  transform: scale(1.03);
}

.kr-card__body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 24px;
}

.kr-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: var(--text-label);
}

.kr-card__category {
  color: var(--brand-main);
  font-weight: 500;
  letter-spacing: 0.05em;
}

.kr-card__info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
}

.kr-card__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981; /* 绿色代表已验证 */
  display: inline-block;
}

.kr-card__title {
  margin: 0 0 10px;
  color: var(--text-main);
  font-family: var(--font-sans);
  font-size: var(--text-card-title);
  font-weight: 600;
  line-height: 1.45;
}

.kr-card__desc {
  margin: 0 0 20px;
  color: var(--text-sub);
  font-size: var(--text-caption);
  line-height: 1.65;
  flex-grow: 1;
}

.kr-card__footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--border-soft);
  color: var(--brand-main);
  font-size: var(--text-small);
  font-weight: 500;
}

/* ─── 底部操作 ───────────────────────────── */
.kr-action {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

/* ─── 响应式 ──────────────────────────────── */
@media (max-width: 960px) {
  .kr-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .kr-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .kr-card {
    transition: none;
  }
  .kr-card:hover {
    transform: none;
  }
  .kr-card__media img {
    transition: none;
  }
  .kr-card:hover .kr-card__media img {
    transform: none;
  }
}
</style>
