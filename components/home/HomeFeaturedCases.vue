<script setup>
import { publishedPortfolioWorks } from '../../.shared/portfolioData.js'
import BaseButton from '../BaseButton.vue'
import MediaFrame from '../MediaFrame.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const cases = publishedPortfolioWorks.filter((item) => item.featured).slice(0, 3)
</script>

<template>
  <SectionShell id="featured-cases" compact>
    <div class="section-row">
      <SectionHeader
        eyebrow="Selected Cases"
        title="先看结果，再理解它为什么成立"
        desc="每个案例都把目标、角色、关键判断与最终结果放在同一条证据链上。"
      />
      <BaseButton href="/portfolio/" variant="ghost">全部案例</BaseButton>
    </div>

    <div class="case-editorial">
      <a v-if="cases[0]" class="case-feature" :href="cases[0].link">
        <MediaFrame :src="cases[0].cover" :alt="cases[0].alt" :caption="cases[0].caption" aspect="16 / 11" />
        <div class="case-feature__copy">
          <span>{{ cases[0].category }}</span>
          <h3>{{ cases[0].title }}</h3>
          <p>{{ cases[0].desc }}</p>
          <strong>查看完整案例 →</strong>
        </div>
      </a>

      <div class="case-side">
        <a v-for="work in cases.slice(1)" :key="work.id" class="case-side__item" :href="work.link">
          <img :src="work.cover" :alt="work.alt" loading="lazy" />
          <div>
            <span>{{ work.category }}</span>
            <h3>{{ work.title }}</h3>
            <p>{{ work.desc }}</p>
          </div>
        </a>
        <a class="case-side__manifesto" href="/aigc/commercial-visual-system">
          <span>METHOD BEHIND THE WORK</span>
          <strong>从需求到交付，查看案例背后的五阶段工作流</strong>
          <em>进入工作流 →</em>
        </a>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.section-row { display: flex; gap: 30px; align-items: end; justify-content: space-between; }
.case-editorial { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(330px, 0.65fr); gap: 22px; margin-top: 34px; }
.case-feature { display: grid; overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); color: inherit; text-decoration: none; background: var(--bg-card); }
.case-feature :deep(.media-frame__viewport) { border: 0; border-radius: 0; box-shadow: none; }
.case-feature :deep(figcaption) { display: none; }
.case-feature__copy { padding: clamp(26px, 4vw, 48px); }
.case-feature__copy span, .case-side__item span, .case-side__manifesto span { color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.12em; }
h3 { margin: 12px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: clamp(25px, 2.5vw, 38px); font-weight: 600; line-height: 1.25; }
p { margin: 14px 0 0; color: var(--text-sub); font-size: var(--text-small); line-height: 1.8; }
.case-feature__copy strong { display: inline-block; margin-top: 24px; color: var(--brand-main); font-size: var(--text-small); }
.case-side { display: grid; gap: 18px; }
.case-side__item { display: grid; grid-template-columns: 148px minmax(0, 1fr); overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); color: inherit; text-decoration: none; background: var(--bg-card); }
.case-side__item img { width: 100%; height: 100%; min-height: 176px; object-fit: cover; filter: var(--image-treatment); transition: transform 0.4s ease; }
.case-side__item:hover img { transform: scale(1.035); }
.case-side__item div { padding: 22px; }
.case-side__item h3 { font-size: var(--text-card-title); }
.case-side__item p { font-size: var(--text-caption); }
.case-side__manifesto { display: grid; gap: 13px; align-content: end; min-height: 210px; padding: 28px; border: 1px solid var(--border-soft); border-radius: var(--radius-card); color: inherit; text-decoration: none; background: linear-gradient(145deg, var(--bg-soft), var(--bg-card)); }
.case-side__manifesto strong { color: var(--text-main); font-family: var(--font-display); font-size: var(--text-card-large); line-height: 1.45; }
.case-side__manifesto em { color: var(--brand-main); font-size: var(--text-small); font-style: normal; }

@media (max-width: 920px) {
  .case-editorial { grid-template-columns: 1fr; }
  .case-side { grid-template-columns: repeat(2, 1fr); }
  .case-side__manifesto { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .section-row { display: grid; align-items: start; }
  .case-side { grid-template-columns: 1fr; }
  .case-side__item { grid-template-columns: 116px minmax(0, 1fr); }
}

@media (prefers-reduced-motion: reduce) {
  .case-side__item img { transition: none; }
  .case-side__item:hover img { transform: none; }
}
</style>
