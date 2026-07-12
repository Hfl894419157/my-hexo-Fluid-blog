<script setup>
import { allBlogPosts as blogPosts } from '../.shared/blogData.js'
import MediaFrame from '../components/MediaFrame.vue'
import KnowledgePageHero from '../components/KnowledgePageHero.vue'
</script>

<template>
  <div class="blog-section">
    <KnowledgePageHero
      title="设计方法"
      description="以低频、高质量的方式记录 AI 时代的设计判断、工作流建设、知识资产与项目复盘，不追求传统博客的更新频率。"
      variant="method"
    />

    <div class="blog-grid">
      <a
        v-for="(post, index) in blogPosts"
        :key="post.id"
        class="blog-card"
        :class="{ 'blog-card--draft': post.status === 'draft', 'blog-card--lead': index === 0 }"
        :href="post.status === 'published' ? post.link : undefined"
        :aria-disabled="post.status === 'draft'"
      >
        <!-- Cover -->
        <div class="blog-card__cover">
          <MediaFrame
            v-if="post.cover && post.status === 'published'"
            :src="post.cover"
            :alt="post.alt"
            aspect="16 / 9"
          />
          <div v-else class="blog-card__placeholder" aria-hidden="true">
            <svg viewBox="0 0 160 90" fill="none">
              <rect x="24" y="18" width="112" height="54" rx="4"
                stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.28" stroke-dasharray="5 4" fill="none"/>
              <rect x="38" y="30" width="50" height="5" rx="2" fill="var(--brand-main)" fill-opacity="0.25"/>
              <rect x="38" y="42" width="38" height="4" rx="2" fill="var(--brand-main)" fill-opacity="0.18"/>
              <rect x="38" y="53" width="44" height="4" rx="2" fill="var(--brand-main)" fill-opacity="0.14"/>
            </svg>
          </div>
          <span v-if="post.status === 'draft'" class="blog-card__badge">更新中</span>
          <span v-else-if="index === 0" class="blog-card__badge blog-card__badge--featured">最新</span>
        </div>

        <!-- Copy -->
        <div class="blog-card__body">
          <span class="blog-card__meta">
            {{ post.type }}<template v-if="post.publishedAt"> · {{ post.publishedAt }}</template>
          </span>
          <h2>{{ post.title }}</h2>
          <p v-if="post.summary">{{ post.summary }}</p>
          <ul v-if="post.tags && post.tags.length">
            <li v-for="tag in post.tags" :key="tag"># {{ tag }}</li>
          </ul>
          <strong v-if="post.status === 'published'" class="blog-card__cta">阅读全文 →</strong>
          <strong v-else class="blog-card__cta blog-card__cta--pending">敬请期待</strong>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.blog-section {
  width: min(1080px, 100%);
  margin: 0 auto;
  padding: 44px 0 24px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 42px;
}

.blog-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: var(--bg-card);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.blog-card:not(.blog-card--draft):hover {
  border-color: color-mix(in srgb, var(--brand-main) 40%, transparent);
  box-shadow: 0 8px 36px color-mix(in srgb, var(--brand-main) 10%, transparent);
  transform: translateY(-3px);
}

.blog-card--draft {
  cursor: default;
  opacity: 0.58;
}

/* Cover */
.blog-card__cover {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.blog-card__cover :deep(.media-frame__viewport) {
  border: 0;
  border-radius: 0;
  box-shadow: none;
  transition: transform 0.4s ease;
}

.blog-card:not(.blog-card--draft):hover :deep(.media-frame__viewport img) {
  transform: scale(1.04);
}

.blog-card__cover :deep(figcaption) { display: none; }

.blog-card__placeholder {
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-soft), var(--bg-page));
}

.blog-card__placeholder svg { width: 55%; height: auto; }

/* Badge */
.blog-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: var(--text-micro);
  letter-spacing: 0.08em;
  border: 1px solid var(--border-soft);
  background: color-mix(in srgb, var(--bg-card) 82%, transparent);
  backdrop-filter: blur(6px);
  color: var(--text-muted);
}

.blog-card__badge--featured {
  color: var(--brand-cyan);
  border-color: color-mix(in srgb, var(--brand-main) 30%, transparent);
}

/* Body */
.blog-card__body {
  display: flex;
  flex-direction: column;
  padding: 22px 22px 24px;
  flex: 1;
}

.blog-card__meta {
  color: var(--brand-cyan);
  font-size: var(--text-label);
  letter-spacing: 0.08em;
}

h2 {
  margin: 10px 0 0 !important;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(17px, 1.6vw, 22px);
  font-weight: 600;
  line-height: 1.3;
}

p {
  margin: 10px 0 0 !important;
  color: var(--text-sub);
  font-size: var(--text-label);
  line-height: 1.8;
  flex: 1;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0;
  margin: 14px 0 0;
  list-style: none;
}

li {
  color: var(--text-muted);
  font-size: var(--text-micro);
  letter-spacing: 0.04em;
}

.blog-card__cta {
  display: inline-block;
  margin-top: 18px;
  color: var(--brand-main);
  font-size: var(--text-small);
}

.blog-card__cta--pending { color: var(--text-muted) !important; }

@media (max-width: 900px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .blog-grid { grid-template-columns: 1fr; } }

@media (prefers-reduced-motion: reduce) {
  .blog-card { transition: none; }
  .blog-card:not(.blog-card--draft):hover { transform: none; }
}
</style>
