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
      <p class="home-hero__eyebrow">
        <span class="home-hero__status" aria-hidden="true" />
        LIULI LAB · AI COMMERCIAL DESIGN
      </p>

      <h1 class="home-hero__title">
        <span>让 AI 真正进入</span>
        <span class="home-hero__title-highlight">商业设计流程</span>
      </h1>

      <p class="home-hero__lead">
        基于真实项目，整理商业视觉案例、AI 工作流与设计方法，把经验沉淀为可复用、可持续迭代的数字资产。
      </p>

      <div class="home-hero__actions">
        <BaseButton href="/portfolio/">查看精选案例</BaseButton>
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
  min-height: 84vh;
  place-items: center;
  overflow: hidden;
  padding: 132px 24px 88px;
  isolation: isolate;
  background:
    radial-gradient(
      circle at 34% 28%,
      color-mix(in srgb, var(--hero-ornament) 15%, transparent),
      transparent 34%
    ),
    radial-gradient(
      circle at 72% 40%,
      color-mix(in srgb, var(--hero-english) 11%, transparent),
      transparent 38%
    ),
    var(--site-background);
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
  opacity: 0.34;
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
  background:
    linear-gradient(
      118deg,
      transparent 0 43%,
      color-mix(in srgb, var(--hero-ornament) 9%, transparent) 50%,
      transparent 57%
    );
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
  opacity: 0.34;
  transform: translateX(-50%);
}

.home-hero__field::after {
  top: 24%;
  left: calc(50% - min(34vw, 380px));
  width: 96px;
  height: 1px;
  background: var(--hero-ornament);
  opacity: 0.5;
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
  opacity: 0.26;
  transform: translateX(-50%);
}

.home-hero__mark {
  position: absolute;
  left: 50%;
  width: 58px;
  height: 1px;
  background: var(--hero-ornament);
  opacity: 0.58;
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
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  padding: 8px 12px;
  border: 1px solid color-mix(in srgb, var(--hero-ornament) 55%, transparent);
  border-radius: 999px;
  color: color-mix(in srgb, var(--text-main) 68%, var(--site-background));
  background: color-mix(in srgb, var(--text-main) 5%, transparent);
  font-family: var(--font-sans, Inter, "PingFang SC", "Microsoft YaHei", sans-serif);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
}

.home-hero__status {
  width: 7px;
  height: 7px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--hero-english);
  box-shadow: 0 0 14px color-mix(in srgb, var(--hero-english) 68%, transparent);
}

.home-hero__title {
  width: min(840px, 100%);
  margin: 26px auto 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(48px, 5.3vw, 76px);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.home-hero__title > span {
  display: block;
}

.home-hero__title-highlight {
  margin-top: 4px;
  color: var(--text-main);
  background: linear-gradient(
    90deg,
    var(--text-main) 0%,
    color-mix(in srgb, var(--hero-english) 72%, var(--text-main)) 52%,
    color-mix(in srgb, var(--hero-ornament) 80%, var(--text-main)) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 18px 56px color-mix(in srgb, var(--hero-english) 13%, transparent);
}

.home-hero__lead {
  width: min(700px, 100%);
  margin: 24px auto 0;
  color: var(--text-sub);
  color: color-mix(in srgb, var(--text-main) 72%, var(--site-background));
  font-family: var(--font-sans, Inter, "PingFang SC", "Microsoft YaHei", sans-serif);
  font-size: clamp(16px, 1.2vw, 18px);
  font-weight: 400;
  line-height: 1.85;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 34px;
}

@media (max-width: 900px) {
  .home-hero {
    min-height: 82vh;
    padding: 120px 24px 80px;
  }

  .home-hero__title {
    width: min(720px, 100%);
    font-size: clamp(44px, 7vw, 62px);
  }
}

@media (max-width: 640px) {
  .home-hero {
    width: 100%;
    max-width: 100vw;
    min-height: 82vh;
    padding: 104px 16px 68px;
  }

  .home-hero__content {
    width: min(100%, 358px);
  }

  .home-hero__eyebrow {
    max-width: 100%;
    padding: 7px 10px;
    font-size: 10px;
    letter-spacing: 0.1em;
  }

  .home-hero__title {
    margin-top: 22px;
    font-size: clamp(38px, 11vw, 44px);
    line-height: 1.16;
    letter-spacing: -0.02em;
  }

  .home-hero__lead {
    width: min(100%, 340px);
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.8;
  }

  .home-hero__actions {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 30px;
  }
}
</style>
