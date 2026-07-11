<script setup>
import { publishedPortfolioWorks } from '../../.shared/portfolioData.js'
import BaseButton from '../BaseButton.vue'
import MediaFrame from '../MediaFrame.vue'

const heroCases = publishedPortfolioWorks.filter((item) => item.featured).slice(0, 2)
</script>

<template>
  <section class="home-hero">
    <div class="home-hero__inner">
      <div class="home-hero__content">
        <p class="home-hero__eyebrow">AI DESIGN PRACTICE · LIULI AI LAB</p>
        <h1>
          把 AI 设计能力，
          <span>变成可验证的项目资产</span>
        </h1>
        <p class="home-hero__lead">
          从真实商业项目出发，展示结果、判断与生产过程；把案例、工作流和知识沉淀组织成可持续复用的设计系统。
        </p>
        <div class="home-hero__actions">
          <BaseButton href="/portfolio/">查看精选案例</BaseButton>
          <BaseButton href="/aigc/" variant="secondary">探索 AI 工作流</BaseButton>
        </div>
        <dl class="home-hero__proof" aria-label="实践摘要">
          <div><dt>8 年</dt><dd>商业视觉实践</dd></div>
          <div><dt>案例 + 流程</dt><dd>完整证据链</dd></div>
          <div><dt>持续更新</dt><dd>知识资产沉淀</dd></div>
        </dl>
      </div>

      <div class="home-hero__stage" aria-label="精选实践视觉">
        <MediaFrame
          v-if="heroCases[0]"
          class="home-hero__media home-hero__media--primary"
          :src="heroCases[0].heroMedia"
          :alt="heroCases[0].alt"
          :caption="heroCases[0].caption"
          :eyebrow="heroCases[0].category"
          aspect="4 / 5"
          position="center"
          eager
        />
        <a v-if="heroCases[1]" class="home-hero__media-secondary" :href="heroCases[1].link">
          <img :src="heroCases[1].cover" :alt="heroCases[1].alt" />
          <span>{{ heroCases[1].title }}</span>
        </a>
        <div class="home-hero__stage-note">
          <span>SELECTED PRACTICE</span>
          <strong>结果不是终点，过程同样可见</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  position: relative;
  min-height: 92vh;
  overflow: hidden;
  padding: 124px 24px 76px;
  background:
    radial-gradient(circle at 78% 24%, color-mix(in srgb, var(--brand-main) 12%, transparent), transparent 30%),
    linear-gradient(180deg, var(--site-background), var(--bg-page));
}

.home-hero::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background-image: linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: linear-gradient(90deg, transparent, #000 34%, #000 76%, transparent);
  opacity: 0.2;
}

.home-hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(1280px, 100%);
  min-height: calc(92vh - 200px);
  grid-template-columns: minmax(0, 0.92fr) minmax(420px, 0.78fr);
  gap: clamp(48px, 7vw, 108px);
  align-items: center;
  margin: 0 auto;
}

.home-hero__content { min-width: 0; }
.home-hero__eyebrow { margin: 0; color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.18em; }

h1 {
  max-width: 760px;
  margin: 22px 0 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(42px, 4.4vw, 62px);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

h1 span { display: block; color: var(--brand-main); }

.home-hero__lead {
  max-width: 650px;
  margin: 28px 0 0;
  color: var(--text-sub);
  font-size: clamp(16px, 1.25vw, 18px);
  line-height: 1.9;
}

.home-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }

.home-hero__proof {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin: 52px 0 0;
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
  background: var(--border-soft);
}

.home-hero__proof div { display: grid; gap: 6px; padding: 18px 16px; background: var(--bg-page); }
.home-hero__proof dt { color: var(--text-main); font-family: var(--font-display); font-size: var(--text-card-title); font-weight: 600; }
.home-hero__proof dd { margin: 0; color: var(--text-muted); font-size: var(--text-label); }

.home-hero__stage { position: relative; min-height: 650px; }
.home-hero__media--primary { width: min(430px, 88%); margin-left: auto; }

.home-hero__media-secondary {
  position: absolute;
  bottom: 34px;
  left: 0;
  display: grid;
  width: min(250px, 50%);
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  text-decoration: none;
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
  transition: transform 0.35s ease;
}

.home-hero__media-secondary:hover { transform: translateY(-6px); }
.home-hero__media-secondary img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; filter: var(--image-treatment); }
.home-hero__media-secondary span { padding: 14px 16px; color: var(--text-main); font-size: var(--text-small); line-height: 1.5; }

.home-hero__stage-note {
  position: absolute;
  top: 58px;
  left: -28px;
  display: grid;
  max-width: 210px;
  gap: 8px;
  padding: 16px 18px;
  border-left: 2px solid var(--brand-main);
  background: color-mix(in srgb, var(--bg-page) 86%, transparent);
}

.home-hero__stage-note span { color: var(--brand-cyan); font-size: var(--text-micro); letter-spacing: 0.13em; }
.home-hero__stage-note strong { color: var(--text-main); font-family: var(--font-display); font-size: var(--text-small); line-height: 1.6; }

@media (max-width: 1000px) {
  .home-hero__inner { grid-template-columns: 1fr 360px; gap: 40px; }
  .home-hero__stage { min-height: 560px; }
  .home-hero__stage-note { left: -10px; }
}

@media (max-width: 820px) {
  .home-hero { padding: 112px 20px 68px; }
  .home-hero__inner { grid-template-columns: 1fr; }
  .home-hero__content { text-align: center; }
  .home-hero__lead { margin-right: auto; margin-left: auto; }
  .home-hero__actions { justify-content: center; }
  .home-hero__stage { width: min(620px, 100%); min-height: 560px; margin: 0 auto; }
}

@media (max-width: 540px) {
  .home-hero { min-height: auto; padding: 102px 16px 56px; }
  .home-hero__content { display: contents; }
  .home-hero__eyebrow { order: 1; text-align: center; }
  h1 { order: 2; }
  .home-hero__lead { order: 3; }
  .home-hero__actions { order: 4; width: min(300px, 100%); margin: 12px auto 0; }
  .home-hero__stage { order: 5; }
  .home-hero__proof { order: 6; width: 100%; }
  h1 { font-size: clamp(38px, 11vw, 48px); }
  .home-hero__actions { display: grid; }
  .home-hero__proof { grid-template-columns: 1fr; }
  .home-hero__stage { min-height: 470px; margin-top: 8px; }
  .home-hero__media--primary { width: 88%; }
  .home-hero__media-secondary { bottom: 8px; width: 52%; }
  .home-hero__stage-note { top: 34px; left: 0; max-width: 170px; }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__media-secondary { transition: none; }
  .home-hero__media-secondary:hover { transform: none; }
}
</style>
