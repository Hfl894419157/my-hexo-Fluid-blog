<script setup>
import { withBase } from 'vitepress'
import PageHero from './PageHero.vue'
import ContentCard from './ContentCard.vue'
import profile from '../.shared/content/profile.json'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { publishedContent } from '../.shared/contentClient.js'

const works = publishedContent(contentCatalog.cases).slice(0, 3).map((item) => ({
  ...item,
  summary: item.desc,
  image: item.cover,
  alt: item.coverAlt,
  eyebrow: '代表作品',
  cta: '查看作品'
}))
const mailLink = `mailto:${profile.email}`
</script>

<template>
  <div class="about-page">
    <PageHero
      :title-lines="['关于我']"
      :description="profile.intro"
      visual="about"
      :topics="['商业设计', 'AI 工作流', '知识系统', '合作方式']"
    />

    <section class="about-profile">
      <div class="about-profile__portrait">
        <img :src="withBase(profile.avatar)" :alt="`${profile.name}的头像`">
      </div>
      <div class="about-profile__copy">
        <span>{{ profile.yearsLabel }}</span>
        <h2>{{ profile.name }}</h2>
        <strong>{{ profile.role }}</strong>
        <p>{{ profile.intro }}</p>
        <div class="about-profile__actions">
          <a :href="mailLink">联系合作</a>
          <a v-if="profile.resumePdf" :href="withBase(profile.resumePdf)" target="_blank" rel="noopener">下载个人简历</a>
          <a href="/faq#cooperation">合作常见问题</a>
        </div>
      </div>
    </section>

    <section v-if="profile.capabilities.length" class="about-section">
      <header><h2>核心能力</h2><p>能力必须对应真实实践，并能持续产生可复用的结果。</p></header>
      <div class="about-capabilities">
        <article v-for="(item, index) in profile.capabilities" :key="item.title">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </section>

    <section v-if="works.length" class="about-section">
      <header><h2>代表作品</h2><a href="/portfolio/">查看全部作品 →</a></header>
      <div class="about-works"><ContentCard v-for="item in works" :key="item.sourcePath" :item="item" /></div>
    </section>

    <section v-if="profile.services.length" class="about-section about-services">
      <header><h2>合作方向</h2><p>如果你的项目属于以下方向，可以在邮件中说明背景、目标和时间。</p></header>
      <ul><li v-for="service in profile.services" :key="service">{{ service }}</li></ul>
    </section>

    <section v-if="profile.experience.length" class="about-section about-experience">
      <header><h2>工作经历</h2></header>
      <ol>
        <li v-for="item in profile.experience" :key="`${item.period}-${item.company}`">
          <time>{{ item.period }}</time>
          <div><h3>{{ item.role }}</h3><strong>{{ item.company }}</strong><p v-if="item.description">{{ item.description }}</p></div>
        </li>
      </ol>
    </section>

    <section class="about-contact">
      <div><h2>从一个真实问题开始</h2><p>请说明项目背景、目标、时间和期望交付，我会根据实际情况回复。</p></div>
      <div><a :href="mailLink">发送合作邮件</a><a href="/faq">查看常见问题</a></div>
    </section>
  </div>
</template>

<style scoped>
.about-page { width: min(var(--page-width), 100%); margin-inline: auto; }
.about-profile { display: grid; grid-template-columns: minmax(240px, 340px) minmax(0, 1fr); gap: clamp(36px, 6vw, 84px); align-items: center; padding: 34px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-card); }
.about-profile__portrait { overflow: hidden; aspect-ratio: 4 / 5; border-radius: calc(var(--radius-card) - 4px); background: var(--bg-soft); }
.about-profile__portrait img { display: block; width: 100%; height: 100%; object-fit: cover; }
.about-profile__copy > span { color: var(--brand-main); font-size: 11px; font-weight: 700; letter-spacing: .12em; }
.about-profile__copy h2 { margin: 18px 0 0; font-size: clamp(36px, 5vw, 58px); line-height: 1.15; }
.about-profile__copy > strong { display: block; margin-top: 12px; color: var(--text-main); font-size: 18px; }
.about-profile__copy > p { max-width: 680px; margin: 20px 0 0; color: var(--text-sub); font-size: 15px; line-height: 1.9; }
.about-profile__actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
.about-profile__actions a,
.about-contact a { display: inline-flex; min-height: 40px; align-items: center; padding: 0 16px; border: 1px solid var(--border-soft); border-radius: var(--radius-control); color: var(--text-main); background: var(--bg-soft); font-size: 13px; font-weight: 700; text-decoration: none; }
.about-profile__actions a:first-child,
.about-contact a:first-child { border-color: var(--brand-main); color: var(--button-primary-text); background: var(--brand-main); }
.about-section { margin-top: 72px; }
.about-section > header { display: flex; gap: 24px; align-items: end; justify-content: space-between; margin-bottom: 28px; }
.about-section > header h2 { margin: 0; font-size: 34px; }
.about-section > header p { max-width: 560px; margin: 0; color: var(--text-sub); font-size: 14px; line-height: 1.8; }
.about-section > header a { color: var(--brand-main); font-size: 13px; font-weight: 700; text-decoration: none; }
.about-capabilities,
.about-works { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.about-capabilities article { min-height: 240px; padding: 28px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-card); }
.about-capabilities span { color: var(--brand-main); font: 700 11px/1 var(--font-mono); letter-spacing: .12em; }
.about-capabilities h3 { margin: 46px 0 0; font-size: 23px; }
.about-capabilities p { margin: 14px 0 0; color: var(--text-sub); font-size: 14px; line-height: 1.8; }
.about-services ul { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin: 0; padding: 0; list-style: none; }
.about-services li { padding: 22px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-card); color: var(--text-main); font-size: 15px; font-weight: 650; }
.about-experience ol { display: grid; margin: 0; padding: 0; list-style: none; }
.about-experience li { display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 28px; padding: 24px 0; border-top: 1px solid var(--border-soft); }
.about-experience time { color: var(--brand-main); font-size: 13px; font-weight: 700; }
.about-experience h3 { margin: 0; font-size: 20px; }.about-experience strong { display: block; margin-top: 6px; color: var(--text-sub); font-size: 13px; }.about-experience p { margin: 12px 0 0; color: var(--text-sub); font-size: 14px; line-height: 1.8; }
.about-contact { display: flex; gap: 28px; align-items: center; justify-content: space-between; margin-top: 72px; padding: 32px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-soft); }
.about-contact h2 { margin: 0; font-size: 28px; }.about-contact p { margin: 10px 0 0; color: var(--text-sub); font-size: 14px; }.about-contact > div:last-child { display: flex; flex-wrap: wrap; gap: 10px; }
@media (max-width: 900px) {
  .about-profile { grid-template-columns: minmax(200px, 280px) minmax(0, 1fr); gap: 32px; }
  .about-capabilities,
  .about-works { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .about-profile { grid-template-columns: 1fr; padding: 20px; }
  .about-profile__portrait { max-width: 260px; }
  .about-section { margin-top: 52px; }
  .about-section > header { display: grid; gap: 10px; }
  .about-section > header h2 { font-size: 28px; }
  .about-capabilities,
  .about-works,
  .about-services ul { grid-template-columns: 1fr; }
  .about-capabilities article { min-height: 0; }
  .about-experience li { grid-template-columns: 1fr; gap: 10px; }
  .about-contact { display: grid; padding: 24px; }
}
</style>
