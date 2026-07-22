<script setup>
import BaseButton from '../BaseButton.vue'
import DotField from './DotField.vue'
</script>

<template>
  <section class="home-hero">
    <!-- Interactive dot field（颜色跟随主题，见 DotField.vue 文件头说明） -->
    <DotField
      class="home-hero__dots"
      :dot-radius="2.4"
      :dot-spacing="18"
      :bulge-strength="82"
      :glow-radius="160"
      :cursor-radius="550"
      aria-hidden="true"
    />

    <div class="home-hero__inner">
      <div class="home-hero__content">
        <h1 class="hero-fade-in-item" style="--hero-delay: 0ms">
          <span class="h1-line">把 AI 学习与设计实践</span>
          <span class="h1-line h1-accent">沉淀为可复用的个人能力系统</span>
        </h1>

        <p class="home-hero__lead hero-fade-in-item" style="--hero-delay: 100ms">
          这里记录真实作品、方法判断、生产流程及经验证的资源。
        </p>

        <div class="home-hero__actions hero-fade-in-item" style="--hero-delay: 200ms">
          <BaseButton href="/portfolio/">查看实践作品</BaseButton>
          <BaseButton href="/knowledge/" variant="secondary">进入知识系统</BaseButton>
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
  min-height: 760px;
  overflow: hidden;
  padding: 104px 24px 56px;
  background:
    radial-gradient(ellipse 60% 50% at 72% 22%, color-mix(in srgb, var(--brand-main) 9%, transparent), transparent),
    radial-gradient(ellipse 40% 40% at 18% 80%, color-mix(in srgb, var(--brand-main) 5%, transparent), transparent),
    var(--site-background);
}

/* Dot field 点阵层：边缘淡出，与网格层融合 */
.home-hero__dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mask-image: linear-gradient(180deg, transparent 0%, #000 18%, #000 72%, transparent 100%);
}

/* ─── Inner layout ───────────────────────────────────── */
.home-hero__inner {
  position: relative;
  z-index: 1;
  width: min(760px, 100%);
  min-height: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* ─── Content ────────────────────────────────────────── */
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
  margin: 28px auto 0;
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
  justify-content: center;
}

.home-hero__actions :deep(.base-button) {
  flex: 0 0 auto;
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
  h1 { font-size: 48px; }
}

@media (max-width: 800px) {
  .home-hero { padding: 96px 24px 48px; min-height: auto; }
  .home-hero__inner { min-height: auto; }
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
