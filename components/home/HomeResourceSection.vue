<script setup>
import { publishedResources } from '../../.shared/resourcesData.js'
import { publishedBlogPosts } from '../../.shared/blogData.js'
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const leadArticle = publishedBlogPosts[0]
const supportingArticles = publishedBlogPosts.slice(1, 3)
const resources = publishedResources.slice(0, 2)
</script>

<template>
  <SectionShell id="knowledge">
    <div class="knowledge-head">
      <SectionHeader
        eyebrow="Knowledge"
        title="知识不是链接仓库，而是下一次项目的起点"
        desc="方法解释为什么这样做，资源预览让你先判断它是否值得使用。"
      />
      <BaseButton href="/knowledge/" variant="ghost">进入知识库</BaseButton>
    </div>

    <div class="knowledge-editorial">
      <a v-if="leadArticle" class="knowledge-article" :href="leadArticle.link">
        <img :src="leadArticle.cover" :alt="leadArticle.alt" loading="lazy" />
        <div>
          <span>{{ leadArticle.type }} · {{ leadArticle.publishedAt }}</span>
          <h3>{{ leadArticle.title }}</h3>
          <p>{{ leadArticle.summary }}</p>
          <strong>阅读全文 →</strong>
        </div>
      </a>

      <div class="knowledge-resource-list">
        <a v-for="resource in resources" :key="resource.id" :href="resource.link" class="resource-preview">
          <div class="resource-preview__sheet" aria-hidden="true">
            <span>{{ resource.category }}</span>
            <i></i><i></i><i></i>
            <strong>{{ resource.accessType }}</strong>
          </div>
          <div>
            <span>RESOURCE · {{ resource.verifiedAt }}</span>
            <h3>{{ resource.name }}</h3>
            <p>{{ resource.desc }}</p>
          </div>
        </a>
      </div>
    </div>

    <div class="knowledge-notes">
      <a v-for="post in supportingArticles" :key="post.id" :href="post.link">
        <span>{{ post.type }}</span>
        <strong>{{ post.title }}</strong>
        <em>阅读 →</em>
      </a>
    </div>
  </SectionShell>
</template>

<style scoped>
.knowledge-head { display: flex; gap: 32px; align-items: end; justify-content: space-between; }
.knowledge-editorial { display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(360px, 0.88fr); gap: 22px; margin-top: 40px; }
.knowledge-article { display: grid; overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); color: inherit; text-decoration: none; background: var(--bg-card); }
.knowledge-article img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; filter: var(--image-treatment); }
.knowledge-article > div { padding: clamp(28px, 4vw, 46px); }
.knowledge-article span, .resource-preview > div:last-child > span, .knowledge-notes span { color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.1em; }
h3 { margin: 14px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: clamp(24px, 2.4vw, 36px); font-weight: 600; line-height: 1.35; }
p { margin: 14px 0 0; color: var(--text-sub); font-size: var(--text-small); line-height: 1.8; }
.knowledge-article strong { display: inline-block; margin-top: 24px; color: var(--brand-main); font-size: var(--text-small); }
.knowledge-resource-list { display: grid; gap: 18px; }
.resource-preview { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 24px; align-items: center; padding: 22px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); color: inherit; text-decoration: none; background: var(--bg-card); }
.resource-preview__sheet { display: grid; min-height: 174px; align-content: start; gap: 10px; padding: 18px; border: 1px solid var(--border-soft); border-radius: calc(var(--radius-card) - 4px); background: linear-gradient(155deg, var(--bg-page), var(--bg-soft)); box-shadow: 8px 9px 0 color-mix(in srgb, var(--border-soft) 50%, transparent); }
.resource-preview__sheet span { color: var(--brand-cyan); font-size: var(--text-micro); letter-spacing: 0.08em; }
.resource-preview__sheet i { display: block; height: 5px; border-radius: 999px; background: var(--border-soft); }
.resource-preview__sheet i:nth-of-type(2) { width: 72%; }
.resource-preview__sheet i:nth-of-type(3) { width: 48%; }
.resource-preview__sheet strong { margin-top: auto; color: var(--text-main); font-size: var(--text-label); }
.resource-preview h3 { font-size: var(--text-card-title); }
.resource-preview p { font-size: var(--text-caption); }
.knowledge-notes { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-top: 22px; }
.knowledge-notes a { display: grid; min-height: 170px; align-content: end; gap: 10px; padding: 26px; border-top: 1px solid var(--border-soft); color: inherit; text-decoration: none; }
.knowledge-notes strong { color: var(--text-main); font-family: var(--font-display); font-size: var(--text-card-title); line-height: 1.5; }
.knowledge-notes em { color: var(--brand-main); font-size: var(--text-small); font-style: normal; }

@media (max-width: 900px) {
  .knowledge-editorial { grid-template-columns: 1fr; }
}

@media (max-width: 660px) {
  .knowledge-head { display: grid; align-items: start; }
  .resource-preview { grid-template-columns: 110px minmax(0, 1fr); gap: 18px; padding: 16px; }
  .resource-preview__sheet { min-height: 150px; padding: 14px; }
  .knowledge-notes { grid-template-columns: 1fr; }
}
</style>
