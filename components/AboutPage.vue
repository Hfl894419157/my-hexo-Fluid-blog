<script setup>
import PageHero from './PageHero.vue'
import aboutCards from '../.shared/content/aboutCards.json'
</script>

<template>
  <div class="about-page">
    <PageHero
      :title-lines="['关于我']"
      description="从商业视觉设计出发，持续研究 AI 如何真正进入工作、形成判断，并沉淀为长期可复用的个人能力。"
      visual="about"
      :topics="['商业设计', 'AI 工作流', '知识系统', '合作方式']"
    />

    <div class="about-layout">
      <section v-for="(item, index) in aboutCards.items" :key="`${item.title}-${index}`">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <div v-if="item.tags?.length" class="about-layout__tags">
          <em v-for="tag in item.tags" :key="tag">{{ tag }}</em>
        </div>
        <a v-if="item.link" :href="item.link">{{ item.linkLabel || '了解更多' }} →</a>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-page { width: min(var(--page-width), 100%); margin-inline: auto; }
.about-layout { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.about-layout section { min-height: 286px; padding: 30px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-card); }
.about-layout span { color: var(--brand-main); font: 700 11px/1 var(--font-mono); letter-spacing: .12em; }
.about-layout h2 { margin: 44px 0 0; font-size: 25px; line-height: 1.35; }
.about-layout p { margin: 16px 0 0; color: var(--text-sub); font-size: 14px; line-height: 1.85; }
.about-layout__tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }
.about-layout__tags em { padding: 6px 9px; border: 1px solid var(--border-soft); border-radius: 7px; background: var(--bg-soft); color: var(--text-sub); font-size: 11px; font-style: normal; }
.about-layout a { display: inline-block; margin-top: 22px; color: var(--brand-main); font-size: 14px; font-weight: 700; text-decoration: none; }
@media (max-width: 1100px) { .about-layout { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .about-layout { grid-template-columns: 1fr; } .about-layout section { min-height: 0; } }
</style>
