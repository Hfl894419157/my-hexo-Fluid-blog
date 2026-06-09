<script setup>
import { withBase } from 'vitepress'
import { blogPosts } from '../.shared/blogData.js'
import ReactIsland from '../components/ReactIsland.vue'

const pageLink = (path) => withBase(path)
</script>

<template>
  <ClientOnly>
    <ReactIsland variant="article-accent" tone="article" density="low" />
  </ClientOnly>
  <div class="blog-list">
    <a 
      v-for="post in blogPosts" 
      :key="post.id" 
      :href="pageLink(post.link)" 
      class="blog-card"
    >
      <div class="blog-image">
        <img :src="post.img" :alt="post.title" loading="lazy" />
      </div>
      <div class="blog-content">
        <div class="blog-main">
          <h3>{{ post.title }}</h3>
          <p class="desc">{{ post.desc }}</p>
        </div>
        <div class="blog-meta">
          <span class="meta-tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            {{ post.date }}
          </span>
          <span class="meta-tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            {{ post.likes }}
          </span>
          <span class="meta-tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            {{ post.comments }}
          </span>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 40px;
}

.blog-card {
  display: flex;
  min-height: 260px;
  background: var(--liuli-card);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none !important;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px var(--liuli-glow);
  border-color: var(--vp-c-brand-1);
}

.blog-image {
  width: 40%;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  width: 60%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.blog-main h3 {
  margin: 0 0 15px !important;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  transition: color 0.3s;
}

.blog-card:hover .blog-main h3 {
  color: var(--vp-c-brand-1);
}

.desc {
  margin: 0 !important;
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.meta-tag {
  background: color-mix(in srgb, var(--liuli-card), var(--vp-c-bg) 40%);
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--vp-c-text-2);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .blog-card {
    flex-direction: column;
    height: auto;
  }
  .blog-image {
    width: 100%;
    height: 180px;
  }
  .blog-content {
    width: 100%;
    padding: 24px;
  }
  .blog-main h3 {
    font-size: 1.2rem !important;
  }
}
</style>
