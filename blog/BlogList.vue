<script setup>
import { blogPosts } from '../.shared/blogData.js'
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
      <div class="blog-image">
        <img :src="post.img" :alt="post.title" loading="lazy" />
      </div>
      <div class="blog-content">
        <div>
          <p class="blog-date">{{ post.date }}</p>
          <h3>{{ post.title }}</h3>
          <p class="desc">{{ post.desc }}</p>
        </div>
        <div class="blog-meta">
          <span>{{ post.likes }} 喜欢</span>
          <span>{{ post.comments }} 评论</span>
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
  grid-template-columns: minmax(260px, 0.42fr) 1fr;
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
  font-size: 13px;
  font-weight: 740;
}

h3 {
  margin: 0 !important;
  color: var(--text-main);
  font-size: var(--font-h3);
  line-height: 1.18;
  letter-spacing: 0;
}

.desc {
  margin: 14px 0 0 !important;
  color: var(--text-sub);
  font-size: var(--font-body);
  line-height: 1.72;
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.blog-meta span {
  color: var(--text-muted);
  font-size: 13px;
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
