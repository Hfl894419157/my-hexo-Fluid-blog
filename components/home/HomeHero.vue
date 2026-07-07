<script setup>
import BaseButton from '../BaseButton.vue'
</script>

<template>
  <section class="home-hero">
    <div class="home-hero__field" aria-hidden="true">
      <span class="home-hero__beam home-hero__beam--one" />
      <span class="home-hero__beam home-hero__beam--two" />
    </div>

    <div class="home-hero__content">
      <p class="home-hero__eyebrow">AI Design System</p>
      <h1>用 AI 重构商业视觉生产流程</h1>
      <p class="home-hero__lead">
        聚焦 AI 视觉设计、产品图生成、工作流方法与案例沉淀，把设计经验转化为可复用、可交付、可持续迭代的数字资产。
      </p>
      <div class="home-hero__actions">
        <BaseButton href="/portfolio/">查看作品案例</BaseButton>
        <BaseButton href="/aigc/" variant="secondary">探索 AI 工作流</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  position: relative;
  display: grid;
  box-sizing: border-box;
  min-height: 88vh;
  place-items: center;
  overflow: hidden;
  padding: 118px 24px 76px;
  isolation: isolate;
  background:
    radial-gradient(circle at 50% 42%, var(--glow-blue), transparent 26%),
    radial-gradient(circle at 52% 52%, var(--glow-purple), transparent 30%),
    linear-gradient(180deg, var(--bg-page) 0%, var(--bg-section) 82%, var(--bg-page) 100%);
}

.home-hero::before {
  position: absolute;
  inset: 0;
  z-index: -2;
  content: "";
  background:
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
    linear-gradient(0deg, var(--grid-line) 1px, transparent 1px),
    radial-gradient(var(--border-strong) 1px, transparent 1px);
  background-size: 86px 86px, 86px 86px, 28px 28px;
  mask-image: radial-gradient(circle at 50% 45%, var(--mask-solid) 0%, transparent 72%);
  opacity: 0.74;
}

.home-hero::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  z-index: -1;
  height: 220px;
  content: "";
  background: linear-gradient(180deg, transparent, var(--bg-page) 78%);
}

.home-hero__field {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.home-hero__field::before,
.home-hero__field::after {
  position: absolute;
  width: min(72vw, 820px);
  height: min(72vw, 820px);
  border-radius: 999px;
  content: "";
  filter: blur(10px);
}

.home-hero__field::before {
  top: 12%;
  left: 50%;
  background: radial-gradient(circle, var(--glow-blue), transparent 66%);
  transform: translateX(-50%);
}

.home-hero__field::after {
  top: 20%;
  left: 50%;
  background: radial-gradient(circle, var(--glow-purple), transparent 64%);
  transform: translateX(-50%) scaleX(1.18);
}

.home-hero__beam {
  position: absolute;
  left: 50%;
  width: min(96vw, 1080px);
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--brand-cyan), var(--brand-second), transparent);
  box-shadow: 0 0 34px var(--glow-blue);
  opacity: 0.62;
  transform-origin: center;
}

.home-hero__beam--one {
  top: 34%;
  transform: translateX(-50%) rotate(-6deg);
}

.home-hero__beam--two {
  top: 60%;
  transform: translateX(-50%) rotate(5deg);
}

.home-hero__content {
  position: relative;
  z-index: 1;
  width: min(960px, 100%);
  min-width: 0;
  text-align: center;
}

.home-hero__eyebrow {
  margin: 0;
  background: linear-gradient(135deg, var(--brand-main), var(--brand-second), var(--brand-cyan));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: var(--font-hero);
  font-weight: 860;
  line-height: 0.96;
  letter-spacing: 0;
}

h1 {
  width: min(900px, 100%);
  margin: 24px auto 0;
  color: var(--text-main);
  font-size: var(--font-h1);
  font-weight: 840;
  line-height: 1.08;
  letter-spacing: 0;
}

.home-hero__lead {
  width: min(760px, 100%);
  margin: 26px auto 0;
  color: var(--text-sub);
  font-size: var(--font-body);
  line-height: 1.82;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  margin-top: 38px;
}

@media (max-width: 640px) {
  .home-hero {
    width: 100%;
    max-width: 100vw;
    min-height: 88vh;
    padding: 104px 16px 72px;
  }

  .home-hero__content {
    width: min(100%, 358px);
  }

  .home-hero__eyebrow {
    font-size: 36px;
    line-height: 1;
  }

  h1 {
    font-size: 34px;
  }

  .home-hero__lead {
    font-size: 15px;
  }

  .home-hero__actions {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
