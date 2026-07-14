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
        <h1 class="hero-fade-in-item" style="--hero-delay: 0ms">
          <span class="h1-line">把 AI 学习与设计实践</span>
          <span class="h1-line h1-accent">沉淀为可复用的个人能力系统</span>
        </h1>

        <p class="home-hero__lead hero-fade-in-item" style="--hero-delay: 100ms">
          这里记录我真实案例、方法判断、生产流程及经验证的资源。
        </p>

        <div class="home-hero__actions hero-fade-in-item" style="--hero-delay: 200ms">
          <BaseButton href="/portfolio/">查看实践案例</BaseButton>
          <BaseButton href="/knowledge/" variant="secondary">进入知识系统</BaseButton>
        </div>

      </div>

      <!-- Right: SVG Visual -->
      <div class="home-hero__visual hero-fade-in-item" aria-hidden="true" style="--hero-delay: 280ms">
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
  min-height: 760px;
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
  grid-template-columns: minmax(0, 760px) minmax(300px, 360px);
  gap: 60px;
  align-items: center;
  width: min(1180px, 100%);
  min-height: 600px;
  margin: 0 auto;
}

/* ─── Content (left) ─────────────────────────────────── */
.home-hero__content { min-width: 0; }
    
h1 {
  width: 100%;
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: 58px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.04em;
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
  width: min(100%, 500px); /* 提升至 500px 展现极简线稿细节 */
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
  .home-hero__inner { grid-template-columns: minmax(0, 1fr) 320px; gap: 36px; }
  h1 { font-size: 48px; }
}

@media (max-width: 800px) {
  .home-hero { padding: 96px 24px 48px; min-height: auto; }
  .home-hero__inner {
    grid-template-columns: 1fr;
    gap: 36px;
    min-height: auto;
  }
  .home-hero__content { text-align: left; }
  .home-hero__lead { margin-left: auto; margin-right: auto; }
  .home-hero__actions { justify-content: flex-start; }
  .home-hero__visual { max-width: 420px; margin: 0; }
  .home-hero__scroll { display: none; }
}

@media (max-width: 640px) {
  .home-hero { padding-right: 16px; padding-left: 16px; }
}

@media (max-width: 480px) {
  h1 { font-size: clamp(23px, 7.4vw, 28px); letter-spacing: -0.055em; }
  .home-hero__lead { margin-top: 22px; }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__scroll { display: none; }
}
</style>
