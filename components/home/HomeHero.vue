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
        <h1>
          <span class="h1-line">把 AI 学习、设计实践与工作流，</span>
          <span class="h1-line h1-accent">沉淀成可复用的个人能力系统</span>
        </h1>

        <p class="home-hero__lead">
          这里记录我真实案例、方法判断、生产流程，以及经过整理和验证的知识资源。
        </p>

        <div class="home-hero__actions">
          <BaseButton href="/portfolio/">查看实践案例</BaseButton>
          <BaseButton href="/knowledge/" variant="secondary">进入知识系统</BaseButton>
        </div>

      </div>

      <!-- Right: SVG Visual -->
      <div class="home-hero__visual" aria-hidden="true">
        <SvgHeroVisual />
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
  min-height: 82vh;
  overflow: hidden;
  padding: 104px 24px 56px;
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
  width: min(1180px, 100%);
  min-height: calc(82vh - 160px);
  margin: 0 auto;
}

/* ─── Content (left) ─────────────────────────────────── */
.home-hero__content { min-width: 0; }

h1 {
  max-width: 700px;
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(40px, 4.2vw, 60px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.h1-line {
  display: block;
  white-space: nowrap;
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

/* ─── Visual (right) ─────────────────────────────────── */
.home-hero__visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home-hero__visual :deep(svg) {
  width: min(100%, 420px);
  height: auto;
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
  .home-hero { padding: 96px 24px 48px; min-height: auto; }
  .home-hero__inner {
    grid-template-columns: 1fr;
    gap: 36px;
    min-height: auto;
  }
  .home-hero__content { text-align: center; }
  .home-hero__lead { margin-left: auto; margin-right: auto; }
  .home-hero__actions { justify-content: center; }
  .home-hero__visual { max-width: 420px; margin: 0 auto; }
  .home-hero__scroll { display: none; }
}

@media (max-width: 640px) {
  .home-hero { padding-right: 16px; padding-left: 16px; }
}

@media (max-width: 480px) {
  h1 { font-size: clamp(30px, 8.4vw, 38px); }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__scroll { display: none; }
}
</style>
