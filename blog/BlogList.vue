<script setup>
import { publishedBlogPosts as blogPosts } from '../.shared/blogData.js'
import BaseButton from '../components/BaseButton.vue'
import BaseCard from '../components/BaseCard.vue'
import ReactIsland from '../components/ReactIsland.vue'
</script>

<template>
  <ClientOnly>
    <ReactIsland variant="article-accent" tone="article" density="low" />
  </ClientOnly>

  <div class="blog-list">
    <BaseCard v-for="post in blogPosts" :key="post.id" :href="post.link" :padded="false">
      <div v-if="post.img" class="blog-image">
        <img :src="post.img" :alt="post.title" loading="lazy" />
      </div>
      <div class="blog-content">
        <div>
          <p class="blog-date">{{ post.type }} · {{ post.publishedAt }}</p>
          <h3>{{ post.title }}</h3>
          <p class="desc">{{ post.summary }}</p>
        </div>
        <div class="blog-meta">
          <span v-for="tag in post.tags" :key="tag"># {{ tag }}</span>
          <BaseButton as="span" variant="text">阅读全文 →</BaseButton>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.blog-list {
  display: grid;
  gap: 22px;
  margin-top: 42px;
}

:deep(.base-card) {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 250px;
}

.blog-image {
  overflow: hidden;
  background: var(--bg-soft);
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.94) contrast(1.04);
  transition: transform 0.42s ease, filter 0.42s ease;
}

:deep(.base-card:hover) .blog-image img {
  transform: scale(1.04);
  filter: saturate(1.06) contrast(1.06);
}

.blog-content {
  display: grid;
  gap: 24px;
  align-content: space-between;
  padding: 30px;
}

.blog-date {
  margin: 0 0 12px !important;
  color: var(--brand-cyan);
  font-size: var(--text-label);
  font-weight: 400;
  letter-spacing: 0.08em;
}

h3 {
  margin: 0 !important;
  color: var(--text-main);
  font-family: var(--font-sans);
  font-size: var(--text-card-large);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
}

.desc {
  margin: 14px 0 0 !important;
  color: var(--text-sub);
  font-size: var(--text-small);
  font-weight: 400;
  line-height: 1.75;
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.blog-meta span {
  color: var(--text-muted);
  font-size: var(--text-label);
}

@media (max-width: 760px) {
  :deep(.base-card) {
    grid-template-columns: 1fr;
  }

  .blog-image {
    aspect-ratio: 16 / 9;
  }
}
</style>
