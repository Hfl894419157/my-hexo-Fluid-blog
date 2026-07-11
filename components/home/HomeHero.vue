<script setup>
import BaseButton from '../BaseButton.vue'
import SvgHeroVisual from './svg/SvgHeroVisual.vue'
</script>

<template>
  <section class="home-hero">
    <!-- Background grid -->
    <div class="home-hero__grid" aria-hidden="true"></div>

    <div class="home-hero__inner">
      <!-- Left: Copy -->
      <div class="home-hero__content">
        <p class="home-hero__eyebrow">
          <span class="eyebrow-dot"></span>
          AI DESIGN PRACTICE · LIULI AI LAB
        </p>

        <h1>
          把 AI 设计能力，
          <span class="h1-accent">变成可验证的<br>项目资产</span>
        </h1>

        <p class="home-hero__lead">
          从真实商业项目出发，展示结果、判断与生产过程；<br>
          把案例、工作流和知识沉淀组织成可持续复用的设计系统。
        </p>

        <div class="home-hero__actions">
          <BaseButton href="/portfolio/">查看精选案例</BaseButton>
          <BaseButton href="/aigc/" variant="secondary">探索 AI 工作流</BaseButton>
        </div>

        <div class="home-hero__proof" aria-label="实践摘要">
          <div>
            <strong>8 年</strong>
            <span>商业视觉实践</span>
          </div>
          <div class="proof-divider"></div>
          <div>
            <strong>案例 + 流程</strong>
            <span>完整证据链</span>
          </div>
          <div class="proof-divider"></div>
          <div>
            <strong>持续更新</strong>
            <span>知识资产沉淀</span>
          </div>
        </div>
      </div>

      <!-- Right: SVG Visual -->
      <div class="home-hero__visual" aria-hidden="true">
        <SvgHeroVisual />
        <div class="home-hero__visual-label">
          <span>SYSTEM OVERVIEW</span>
          <strong>5 阶段可复用工作流</strong>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="home-hero__scroll" aria-hidden="true">
      <span></span>
    </div>
  </section>
</template>

<style scoped>
/* ─── Container ──────────────────────────────────────── */
.home-hero {
  position: relative;
  min-height: 96vh;
  overflow: hidden;
  padding: 132px 24px 80px;
  background:
    radial-gradient(ellipse 60% 50% at 72% 22%, color-mix(in srgb, var(--brand-main) 9%, transparent), transparent),
    radial-gradient(ellipse 40% 40% at 18% 80%, color-mix(in srgb, var(--brand-main) 5%, transparent), transparent),
    var(--site-background);
}

/* Dot grid overlay */
.home-hero__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(180deg, transparent 0%, #000 20%, #000 70%, transparent 100%),
              linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
  mask-composite: intersect;
  opacity: 0.35;
}

/* ─── Inner layout ───────────────────────────────────── */
.home-hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(380px, 0.85fr);
  gap: clamp(48px, 7vw, 100px);
  align-items: center;
  width: min(1280px, 100%);
  min-height: calc(96vh - 212px);
  margin: 0 auto;
}

/* ─── Content (left) ─────────────────────────────────── */
.home-hero__content { min-width: 0; }

.home-hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: var(--brand-cyan);
  font-size: var(--text-label);
  letter-spacing: 0.2em;
}

.eyebrow-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--brand-main);
  animation: blink 2s ease-in-out infinite;
}

h1 {
  max-width: 700px;
  margin: 24px 0 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(40px, 4.6vw, 66px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.h1-accent {
  display: block;
  margin-top: 4px;
  background: linear-gradient(120deg, var(--brand-main) 0%, var(--brand-second) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-hero__lead {
  max-width: 580px;
  margin: 28px 0 0;
  color: var(--text-sub);
  font-size: clamp(15px, 1.2vw, 17px);
  line-height: 2;
}

/* ─── Actions ────────────────────────────────────────── */
.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
}

/* ─── Proof strip ────────────────────────────────────── */
.home-hero__proof {
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 52px;
  padding-top: 28px;
  border-top: 1px solid var(--border-soft);
}

.home-hero__proof > div:not(.proof-divider) {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 28px 0 0;
}

.home-hero__proof > div:first-child { padding-left: 0; }

.home-hero__proof strong {
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(18px, 1.6vw, 22px);
  font-weight: 600;
  line-height: 1;
}

.home-hero__proof span {
  color: var(--text-muted);
  font-size: var(--text-label);
}

.proof-divider {
  width: 1px;
  height: 40px;
  margin: 0 28px 0 0;
  background: var(--border-soft);
  flex-shrink: 0;
}

/* ─── Visual (right) ─────────────────────────────────── */
.home-hero__visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-hero__visual-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 20px;
  padding: 14px 20px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--bg-card) 80%, transparent);
  backdrop-filter: blur(8px);
  text-align: center;
}

.home-hero__visual-label span {
  color: var(--brand-cyan);
  font-size: var(--text-micro);
  letter-spacing: 0.16em;
}

.home-hero__visual-label strong {
  color: var(--text-main);
  font-size: var(--text-small);
  font-weight: 500;
}

/* ─── Scroll indicator ───────────────────────────────── */
.home-hero__scroll {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-hero__scroll span {
  display: block;
  width: 1px;
  height: 48px;
  background: linear-gradient(180deg, var(--brand-main), transparent);
  animation: scroll-line 2s ease-in-out infinite;
}

/* ─── Animations ─────────────────────────────────────── */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

@keyframes scroll-line {
  0%   { opacity: 0; transform: scaleY(0); transform-origin: top; }
  50%  { opacity: 1; transform: scaleY(1); }
  100% { opacity: 0; transform: scaleY(1) translateY(20px); }
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1020px) {
  .home-hero__inner { grid-template-columns: 1fr 340px; }
}

@media (max-width: 800px) {
  .home-hero { padding: 112px 20px 64px; min-height: auto; }
  .home-hero__inner {
    grid-template-columns: 1fr;
    gap: 48px;
    min-height: auto;
  }
  .home-hero__content { text-align: center; }
  .home-hero__lead { margin-left: auto; margin-right: auto; }
  .home-hero__actions { justify-content: center; }
  .home-hero__proof { justify-content: center; }
  .home-hero__visual { max-width: 480px; margin: 0 auto; }
  .home-hero__scroll { display: none; }
}

@media (max-width: 480px) {
  h1 { font-size: clamp(36px, 10vw, 48px); }
  .home-hero__proof { flex-wrap: wrap; gap: 16px; }
  .proof-divider { display: none; }
  .home-hero__proof > div:not(.proof-divider) { padding: 0; text-align: left; }
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow-dot { animation: none; }
  .home-hero__scroll { display: none; }
}
</style>
