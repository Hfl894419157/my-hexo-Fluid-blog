<script setup>
import PageHero from './PageHero.vue'
import faqData from '../.shared/content/faq.json'

const categories = [
  { id: 'cooperation', title: '合作咨询', description: '了解合作范围、准备信息、报价周期与保密方式。' },
  { id: 'resources', title: '资源下载', description: '了解官网、网盘、提取码、授权与版权边界。' },
  { id: 'site', title: '网站使用', description: '了解知识分类、全站搜索、代码复制与内容更新。' }
]

const items = faqData.items.filter((item) => item.published !== false)
const questionsFor = (category) => items.filter((item) => item.category === category)
</script>

<template>
  <div class="faq-page">
    <PageHero
      :title-lines="['常见问题']"
      description="集中回答合作、资源获取和网站使用中的常见疑问；没有找到答案时，可以通过邮件联系。"
      visual="knowledge"
      :topics="['合作流程', '报价周期', '网盘下载', '版权说明', '网站使用']"
      :show-visual="false"
      :show-search="false"
    />

    <div class="faq-page__groups">
      <section v-for="category in categories" :id="category.id" :key="category.id" class="faq-group">
        <header>
          <h2>{{ category.title }}</h2>
          <p>{{ category.description }}</p>
        </header>
        <div class="faq-group__items">
          <details v-for="item in questionsFor(category.id)" :id="item.id" :key="item.id">
            <summary>
              <span>{{ item.question }}</span>
              <i aria-hidden="true" />
            </summary>
            <div class="faq-answer">
              <p>{{ item.answer }}</p>
              <a v-if="item.link" :href="item.link">{{ item.linkLabel || '了解更多' }} →</a>
            </div>
          </details>
        </div>
      </section>
    </div>

    <aside class="faq-contact">
      <div>
        <h2>仍然没有找到答案？</h2>
        <p>请在邮件中附上问题、相关页面和必要截图，方便快速定位。</p>
      </div>
      <a href="mailto:1442855983@qq.com">发送邮件</a>
    </aside>
  </div>
</template>

<style scoped>
.faq-page { width: min(var(--page-width), 100%); margin-inline: auto; }
.faq-page__groups { display: grid; gap: 64px; }
.faq-group { scroll-margin-top: 110px; }
.faq-group > header { display: grid; grid-template-columns: minmax(180px, .65fr) minmax(0, 1.35fr); gap: 40px; align-items: end; margin-bottom: 22px; }
.faq-group h2 { margin: 0; font-size: 34px; line-height: 1.25; }
.faq-group header p { margin: 0; color: var(--text-sub); font-size: 14px; line-height: 1.8; }
.faq-group__items { overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-card); }
.faq-group details + details { border-top: 1px solid var(--border-soft); }
.faq-group summary { display: grid; grid-template-columns: minmax(0, 1fr) 22px; gap: 20px; align-items: center; min-height: 70px; padding: 18px 22px; color: var(--text-main); font-size: 16px; font-weight: 650; list-style: none; cursor: pointer; }
.faq-group summary::-webkit-details-marker { display: none; }
.faq-group summary:hover { background: var(--bg-soft); }
.faq-group summary i { position: relative; width: 18px; height: 18px; }
.faq-group summary i::before,
.faq-group summary i::after { position: absolute; top: 8px; left: 3px; width: 12px; height: 1px; background: var(--brand-main); content: ''; transition: transform 180ms ease; }
.faq-group summary i::after { transform: rotate(90deg); }
.faq-group details[open] summary i::after { transform: rotate(0deg); }
.faq-answer { padding: 0 64px 22px 22px; }
.faq-answer p { margin: 0; color: var(--text-sub); font-size: 15px; line-height: 1.85; }
.faq-answer a { display: inline-block; margin-top: 14px; color: var(--brand-main); font-size: 13px; font-weight: 700; text-decoration: none; }
.faq-contact { display: flex; gap: 28px; align-items: center; justify-content: space-between; margin-top: 64px; padding: 30px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-soft); }
.faq-contact h2 { margin: 0; font-size: 24px; }
.faq-contact p { margin: 9px 0 0; color: var(--text-sub); font-size: 14px; }
.faq-contact > a { display: inline-flex; min-height: 42px; flex: 0 0 auto; align-items: center; padding: 0 18px; border-radius: var(--radius-control); background: var(--brand-main); color: var(--button-primary-text); font-size: 14px; font-weight: 700; text-decoration: none; }
@media (max-width: 640px) {
  .faq-page__groups { gap: 48px; }
  .faq-group > header { grid-template-columns: 1fr; gap: 10px; }
  .faq-group h2 { font-size: 28px; }
  .faq-group summary { min-height: 64px; padding: 16px 18px; font-size: 15px; }
  .faq-answer { padding: 0 48px 20px 18px; }
  .faq-contact { display: grid; padding: 24px; }
  .faq-contact > a { justify-content: center; }
}
</style>
