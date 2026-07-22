<script setup>
import ContentCard from './ContentCard.vue'
import ImagePlaceholder from './ImagePlaceholder.vue'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { latestPublished } from '../.shared/contentClient.js'
import knowledgeHubCards from '../.shared/content/knowledgeHubCards.json'

const items = knowledgeHubCards.items.map((item, index) => ({
  id: item.id || `knowledge-entry-${index + 1}`,
  title: item.title,
  summary: item.description,
  link: item.link || null,
  tags: item.tags || [],
  imageSubject: item.imageSubject || `${item.title}的栏目预览图`,
  imageFilename: item.imageFilename || `knowledge-${item.id || index + 1}-cover.jpg`,
  status: item.link ? 'published' : 'planned',
  cta: item.linkLabel || '进入栏目'
}))

const latest = latestPublished([...contentCatalog.learning, ...contentCatalog.methods, ...contentCatalog.resources], 6)
  .map((item) => ({
    ...item,
    summary: item.desc,
    image: item.cover,
    alt: item.coverAlt,
    eyebrow: item.type,
    cta: item.kind === 'resource' ? '查看资源' : '阅读全文'
  }))
</script>

<template>
  <div class="knowledge-hub">
    <section class="knowledge-hub__section">
      <header class="knowledge-hub__head">
        <h2>三类知识入口</h2>
        <p>先按内容目的选择栏目，再进入对应的文章与资源。</p>
      </header>
      <div class="knowledge-hub__categories">
        <article v-for="item in items" :key="item.id" class="knowledge-category">
          <a class="knowledge-category__media" :href="item.link" :aria-label="`进入：${item.title}`">
            <ImagePlaceholder
              :subject="item.imageSubject"
              :filename="item.imageFilename"
              aspect="16 / 9"
            />
          </a>
          <div class="knowledge-category__body">
            <h2>{{ item.title }}</h2>
            <p>{{ item.summary }}</p>
            <div class="knowledge-category__tags">
              <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
            </div>
            <a :href="item.link">{{ item.cta }} <span aria-hidden="true">→</span></a>
          </div>
        </article>
      </div>
    </section>

    <section class="knowledge-hub__section knowledge-hub__latest">
      <header class="knowledge-hub__head">
        <h2>最近更新</h2>
        <p>汇总三个栏目最近发布的内容，最多展示 6 篇。</p>
      </header>
      <div v-if="latest.length" class="knowledge-hub__grid">
        <ContentCard v-for="item in latest" :key="item.sourcePath" :item="item" />
      </div>
      <div v-else class="knowledge-hub__empty" role="status">内容整理中</div>
    </section>
  </div>
</template>

<style scoped>
.knowledge-hub { width: min(var(--page-width), 100%); margin-inline: auto; }
.knowledge-hub__section + .knowledge-hub__section { margin-top: 68px; }
.knowledge-hub__head { max-width: 720px; margin-bottom: 30px; }
.knowledge-hub__head h2 { margin: 0; font-size: 34px; line-height: 1.25; }
.knowledge-hub__head p { margin: 12px 0 0; color: var(--text-sub); font-size: 15px; line-height: 1.8; }
.knowledge-hub__categories,
.knowledge-hub__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.knowledge-category { display: flex; min-width: 0; flex-direction: column; overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-card); transition: transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth); }
.knowledge-category:hover { border-color: var(--border-strong); box-shadow: var(--shadow-card); transform: translateY(-4px); }
.knowledge-category__media { display: block; overflow: hidden; }
.knowledge-category__media :deep(.image-slot) { border: 0; border-bottom: 1px solid var(--border-soft); }
.knowledge-category__body { display: flex; min-height: 300px; flex: 1; flex-direction: column; padding: 26px 24px 28px; }
.knowledge-category h2 { margin: 0; font-size: 25px; line-height: 1.4; }
.knowledge-category p { margin: 12px 0 0; color: var(--text-sub); font-size: 14px; line-height: 1.75; }
.knowledge-category__tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }
.knowledge-category__tags span { padding: 6px 9px; border: 1px solid var(--border-soft); border-radius: 7px; background: var(--bg-soft); color: var(--text-sub); font-size: 11px; font-weight: 600; }
.knowledge-category__body > a { width: fit-content; margin-top: auto; padding-top: 24px; color: var(--brand-main); font-size: 14px; font-weight: 700; text-decoration: none; }
.knowledge-hub__empty { display: grid; min-height: 180px; place-content: center; border: 1px dashed var(--border-soft); border-radius: var(--radius-card); background: var(--bg-soft); color: var(--text-muted); }
@media (max-width: 1100px) {
  .knowledge-hub__categories,
  .knowledge-hub__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .knowledge-hub__section + .knowledge-hub__section { margin-top: 52px; }
  .knowledge-hub__head h2 { font-size: 28px; }
  .knowledge-hub__categories,
  .knowledge-hub__grid { grid-template-columns: 1fr; }
  .knowledge-category__body { min-height: 0; }
}
</style>
