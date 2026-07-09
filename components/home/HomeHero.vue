<script setup>
import BaseButton from '../BaseButton.vue'
</script>

<template>
  <section class="home-hero">
    <div class="home-hero__field" aria-hidden="true">
      <span class="home-hero__arch" />
      <span class="home-hero__mark home-hero__mark--one" />
      <span class="home-hero__mark home-hero__mark--two" />
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
  --hero-english: var(--hero-english-color);
  position: relative;
  display: grid;
  box-sizing: border-box;
  min-height: 88vh;
  place-items: center;
  overflow: hidden;
  padding: 118px 24px 76px;
  isolation: isolate;
  background: var(--site-background);
}

.home-hero::before {
  position: absolute;
  inset: 0;
  z-index: -2;
  content: "";
  background:
    linear-gradient(90deg, transparent 0 48%, var(--grid-line) 48% 48.08%, transparent 48.08%),
    linear-gradient(180deg, transparent 0 32%, var(--grid-line) 32% 32.08%, transparent 32.08%),
    radial-gradient(circle at 48% 38%, var(--grid-line) 0 1px, transparent 1.4px);
  background-size: 100% 100%, 100% 100%, 46px 46px;
  mask-image: radial-gradient(circle at 50% 42%, var(--mask-solid) 0%, transparent 68%);
  opacity: 0.42;
}

.home-hero::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  z-index: -1;
  height: 220px;
  content: "";
  background: linear-gradient(180deg, transparent, var(--bg-page) 84%);
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
  content: "";
}

.home-hero__field::before {
  top: 17%;
  left: 50%;
  width: min(76vw, 760px);
  height: min(38vw, 390px);
  border: 1px solid var(--hero-ornament);
  border-bottom: 0;
  border-radius: 999px 999px 0 0;
  opacity: 0.44;
  transform: translateX(-50%);
}

.home-hero__field::after {
  top: 24%;
  left: calc(50% - min(34vw, 380px));
  width: 96px;
  height: 1px;
  background: var(--hero-ornament);
  opacity: 0.58;
}

.home-hero__arch {
  position: absolute;
  top: 22%;
  left: 50%;
  width: min(58vw, 560px);
  height: min(29vw, 290px);
  border: 1px solid var(--hero-ornament);
  border-bottom: 0;
  border-radius: 999px 999px 0 0;
  opacity: 0.34;
  transform: translateX(-50%);
}

.home-hero__mark {
  position: absolute;
  left: 50%;
  width: 58px;
  height: 1px;
  background: var(--hero-ornament);
  opacity: 0.68;
}

.home-hero__mark--one {
  top: 66%;
  transform: translateX(-420px);
}

.home-hero__mark--two {
  top: 29%;
  transform: translateX(354px);
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
  color: var(--hero-english);
  font-family: var(--font-title);
  font-size: var(--font-hero);
  font-weight: 760;
  line-height: 0.96;
  letter-spacing: 0;
}

h1 {
  width: min(900px, 100%);
  margin: 24px auto 0;
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: var(--font-h1);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: 0.04em;
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
    line-height: 1.16;
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
