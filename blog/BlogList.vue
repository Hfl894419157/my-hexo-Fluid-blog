<script setup>
import { publishedBlogPosts as blogPosts } from '../.shared/blogData.js'
import MediaFrame from '../components/MediaFrame.vue'
</script>

<template>
  <div class="article-feed">
    <a
      v-for="(post, index) in blogPosts"
      :key="post.id"
      :href="post.link"
      class="article-entry"
      :class="{ 'article-entry--lead': index === 0 }"
    >
      <MediaFrame :src="post.cover" :alt="post.alt" :aspect="post.aspectRatio" :caption="post.caption" />
      <div class="article-entry__copy">
        <span>{{ post.type }} · {{ post.publishedAt }}</span>
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
        <ul><li v-for="tag in post.tags" :key="tag"># {{ tag }}</li></ul>
        <strong>阅读全文 →</strong>
      </div>
    </a>
  </div>
</template>

<style scoped>
.article-feed { display: grid; gap: 0; margin-top: 46px; border-top: 1px solid var(--border-soft); }
.article-entry { display: grid; grid-template-columns: minmax(280px, 0.82fr) minmax(0, 1.18fr); gap: clamp(28px, 5vw, 70px); align-items: center; padding: 38px 0; border-bottom: 1px solid var(--border-soft); color: inherit; text-decoration: none; }
.article-entry:nth-child(even) { grid-template-columns: minmax(0, 1.18fr) minmax(280px, 0.82fr); }
.article-entry:nth-child(even) :deep(.media-frame) { order: 2; }
.article-entry--lead { grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr); padding-top: 0; }
.article-entry :deep(.media-frame__viewport) { box-shadow: none; }
.article-entry :deep(figcaption) { display: none; }
.article-entry__copy > span { color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.1em; }
h2 { margin: 16px 0 0 !important; color: var(--text-main); font-family: var(--font-display); font-size: clamp(28px, 3.6vw, 48px); font-weight: 600; line-height: 1.25; }
p { margin: 16px 0 0 !important; color: var(--text-sub); font-size: var(--text-small); line-height: 1.85; }
ul { display: flex; flex-wrap: wrap; gap: 10px; padding: 0; margin: 22px 0 0; list-style: none; }
li { color: var(--text-muted); font-size: var(--text-label); }
.article-entry__copy strong { display: inline-block; margin-top: 24px; color: var(--brand-main); font-size: var(--text-small); }

@media (max-width: 700px) {
  .article-entry, .article-entry:nth-child(even), .article-entry--lead { grid-template-columns: 1fr; }
  .article-entry:nth-child(even) :deep(.media-frame) { order: initial; }
}
</style>
