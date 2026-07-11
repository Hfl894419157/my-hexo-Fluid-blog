<script setup>
import BaseButton from './BaseButton.vue'
import BaseCard from './BaseCard.vue'
import ReactIsland from './ReactIsland.vue'

const outcomes = [
  { value: '8 年', label: '商业视觉与设计交付经验' },
  { value: '50+', label: '产品摄影与内容制作实践' },
  { value: '1.5 万', label: '个人内容账号累计关注' }
]

const directions = [
  ['AI 商业视觉', '研究产品图、详情页与品牌内容如何在保持真实性的前提下提高生产效率。'],
  ['工作流系统化', '把需求、变量、生成、判断、精修和交付整理成可以复盘的流程。'],
  ['知识资产沉淀', '将有效模板、提示词结构、检查清单和项目结论放回下一次实践。']
]
</script>

<template>
  <div class="about-page">
    <section class="about-hero">
      <div>
        <p class="about-hero__eyebrow">About Liuli AI Lab</p>
        <h1>从商业设计实践出发，探索 AI 如何真正进入工作</h1>
        <p class="about-hero__lead">
          我是韩福利，工业设计背景，长期从事平面、电商视觉、产品表达与视频内容工作。这个网站不是在线求职简历，而是我持续整理 AI 实践、工作流和知识资产的个人实验室。
        </p>
        <div class="about-hero__actions">
          <BaseButton href="mailto:1442855983@qq.com">邮件联系</BaseButton>
          <BaseButton href="/portfolio/" variant="secondary">查看实践案例</BaseButton>
        </div>
      </div>
      <div class="about-hero__portrait">
        <img src="/avatar.jpg" alt="韩福利" />
      </div>
    </section>

    <ClientOnly>
      <ReactIsland variant="resume-profile" tone="profile" density="medium" />
    </ClientOnly>

    <section class="about-section">
      <p class="about-section__eyebrow">Current Focus</p>
      <h2>当前关注的三个方向</h2>
      <div class="about-grid">
        <BaseCard v-for="item in directions" :key="item[0]">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </BaseCard>
      </div>
    </section>

    <section class="about-section about-section--soft">
      <p class="about-section__eyebrow">Practice Evidence</p>
      <h2>实践背景摘要</h2>
      <div class="about-outcomes">
        <div v-for="item in outcomes" :key="item.label">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </div>
      </div>
      <p class="about-note">项目中的业务数据来自个人项目记录，公开内容已做必要脱敏；需要完整履历或进一步项目信息，可通过邮件沟通。</p>
    </section>

    <section class="about-contact">
      <div>
        <p class="about-section__eyebrow">Collaboration</p>
        <h2>适合从一个具体视觉任务开始</h2>
        <p>产品图、详情页、品牌内容、展会视觉或 AI 工作流梳理，都可以先从目标与交付边界开始讨论。</p>
      </div>
      <BaseButton href="mailto:1442855983@qq.com">1442855983@qq.com</BaseButton>
    </section>
  </div>
</template>

<style scoped>
.about-page { width: min(1080px, 100%); margin: 0 auto; padding: 42px 0 24px; }
.about-hero { display: grid; grid-template-columns: 1fr 280px; gap: 56px; align-items: center; }
.about-hero__eyebrow, .about-section__eyebrow { margin: 0; color: var(--brand-cyan); font-size: var(--text-label); font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; }
h1 { margin: 16px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: var(--text-page-title); font-weight: 600; line-height: 1.15; letter-spacing: -0.03em; }
.about-hero__lead { margin: 24px 0 0; color: var(--text-sub); font-size: var(--text-lead); font-weight: 400; line-height: 1.9; }
.about-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.about-hero__portrait { aspect-ratio: 4 / 5; overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-soft); }
.about-hero__portrait img { width: 100%; height: 100%; object-fit: cover; }
.about-section { margin-top: 76px; }
.about-section > h2, .about-contact h2 { margin: 12px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: var(--text-section-title); font-weight: 600; line-height: 1.15; letter-spacing: -0.03em; }
.about-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 28px; }
.about-grid h3 { margin: 0; color: var(--text-main); font-family: var(--font-sans); font-size: var(--text-card-title); font-weight: 700; line-height: 1.4; letter-spacing: 0; }
.about-grid p { margin: 12px 0 0; color: var(--text-sub); font-size: var(--text-small); line-height: 1.8; }
.about-section--soft { padding: 36px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-soft); }
.about-outcomes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 28px; background: var(--border-soft); }
.about-outcomes div { display: grid; gap: 8px; padding: 24px; background: var(--bg-card); }
.about-outcomes strong { color: var(--text-main); font-family: var(--font-display); font-size: var(--text-card-large); font-weight: 580; line-height: 1.3; }
.about-outcomes span, .about-note, .about-contact p { color: var(--text-sub); line-height: 1.9; }
.about-note { margin: 24px 0 0; font-size: var(--text-small); }
.about-contact { display: flex; gap: 30px; align-items: end; justify-content: space-between; margin-top: 76px; padding: 36px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); }
.about-contact p { max-width: 680px; margin: 16px 0 0; }
@media (max-width: 760px) {
  .about-hero { grid-template-columns: 1fr; }
  .about-hero__portrait { width: min(280px, 100%); grid-row: 1; }
  .about-grid, .about-outcomes { grid-template-columns: 1fr; }
  .about-contact { display: grid; align-items: start; }
}
</style>
