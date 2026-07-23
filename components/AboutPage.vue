<script setup>
import BaseButton from './BaseButton.vue'
import ResponsiveImage from './ResponsiveImage.vue'
import profile from '../.shared/content/profile.json'

const path = [
  {
    index: '01',
    label: '起点',
    title: '商业视觉设计',
    description: '从产品事实、信息层级和真实使用场景出发，学习如何用设计解决商业问题，而不只是完成一张画面。'
  },
  {
    index: '02',
    label: '延伸',
    title: '3D 产品表现',
    description: '把平面判断延伸到结构、材质、灯光与空间，让产品表达更准确，也让视觉不受单一媒介限制。'
  },
  {
    index: '03',
    label: '协同',
    title: 'AI 图像生产',
    description: '不追求一次生成的偶然结果，而是把资料理解、方向策划、变量控制、人工筛选和精修校验连接起来。'
  },
  {
    index: '04',
    label: '动态',
    title: 'AI 视频制作',
    description: '从文案、脚本和分镜开始，独立完成画面生成、配音字幕、剪辑包装与最终成片输出。'
  },
  {
    index: '05',
    label: '现在',
    title: '知识与流程沉淀',
    description: '把项目里验证过的方法、提示词、模板和复盘留下来，逐渐形成能够反复使用的个人工作系统。'
  }
]

const principles = [
  {
    index: '01',
    title: '先理解产品，再开始表达',
    description: '视觉不是独立于事实的装饰。只有先弄清产品、受众和使用环境，画面才有明确的判断依据。'
  },
  {
    index: '02',
    title: 'AI 可以扩大可能性，但不能代替判断',
    description: '工具可以帮助提炼、生成和扩展方向，最终保留什么、修正什么、能否交付，仍然需要由人完成。'
  },
  {
    index: '03',
    title: '一次项目应该同时留下成果和方法',
    description: '除了最终成品，我也会保留有效规则、变量、模板和检查依据，让下一次工作从更高的位置开始。'
  }
]

const currentFocus = [
  ['AI 图像', '探索可控生成与商业视觉交付之间更稳定的连接方式。'],
  ['AI 视频', '研究从策划、脚本、分镜到配音字幕和成片输出的完整流程。'],
  ['知识系统', '整理项目经验、方法、工具与复盘，形成可检索的个人资料库。'],
  ['工作流程', '把反复出现的环节变成清晰规则，减少无效试错和重复劳动。']
]

const directory = [
  { label: '查看商业视觉作品', href: '/portfolio/' },
  { label: '查看 AI 生产实践', href: '/aigc/' },
  { label: '查看研究与复盘', href: '/knowledge/' },
  { label: '讨论项目合作', href: `mailto:${profile.email}` }
]

const reveal = (delay = 0, y = 24) => ({
  repeat: true,
  delay,
  y,
  blur: 3,
  duration: 860
})
</script>

<template>
  <main class="about-profile">
    <section class="profile-hero" aria-labelledby="profile-title">
      <div class="profile-hero__portrait" v-reveal="reveal(0, 28)">
        <ResponsiveImage
          :src="profile.avatar"
          :alt="`${profile.name}的个人形象`"
          sizes="(max-width: 760px) calc(100vw - 32px), 520px"
          eager
        />
        <span aria-hidden="true">HF / 08</span>
      </div>

      <div class="profile-hero__copy">
        <p class="profile-eyebrow" v-reveal="reveal(70, 20)">ABOUT / PERSONAL ARCHIVE</p>
        <h1 id="profile-title" v-reveal="reveal(130, 24)">{{ profile.name }}</h1>
        <p class="profile-role" v-reveal="reveal(190, 20)">商业视觉设计师 · AI 内容实践者</p>
        <p class="profile-statement" v-reveal="reveal(250, 24)">
          我从商业视觉设计出发，持续把 3D、AI 图像、视频和知识管理带进真实项目。
        </p>

        <dl class="profile-facts" v-reveal="reveal(310, 18)">
          <div>
            <dt>{{ String(profile.yearsValue).padStart(2, '0') }}</dt>
            <dd>年商业视觉实践</dd>
          </div>
          <div>
            <dt>现在</dt>
            <dd>AI 图像、AI 视频与个人知识系统</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="profile-section profile-path" aria-labelledby="path-title">
      <header class="profile-section__heading" v-reveal="reveal()">
        <p class="profile-eyebrow">01 / MY PATH</p>
        <h2 id="path-title">我的成长路径</h2>
        <p>这些能力不是同时出现的。它们来自一次次真实工作中，对表达边界的持续延伸。</p>
      </header>

      <ol class="path-list">
        <li
          v-for="(item, index) in path"
          :key="item.index"
          v-reveal="reveal(index * 70, 22)"
        >
          <span class="path-list__index">{{ item.index }}</span>
          <span class="path-list__label">{{ item.label }}</span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="profile-section profile-principles" aria-labelledby="principles-title">
      <header class="profile-section__heading" v-reveal="reveal()">
        <p class="profile-eyebrow">02 / HOW I WORK</p>
        <h2 id="principles-title">我的工作方式</h2>
      </header>

      <ol class="principle-list">
        <li
          v-for="(item, index) in principles"
          :key="item.index"
          v-reveal="reveal(index * 80, 24)"
        >
          <span>{{ item.index }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </li>
      </ol>
    </section>

    <section class="profile-section profile-now" aria-labelledby="now-title">
      <header class="profile-section__heading" v-reveal="reveal()">
        <p class="profile-eyebrow">03 / IN PROGRESS</p>
        <h2 id="now-title">我现在正在做什么</h2>
      </header>

      <div class="profile-now__body">
        <figure v-reveal="reveal(60, 28)">
          <ResponsiveImage
            src="/images/uploads/工作流板块图片/AI 产品海报图批量生成流程/1.png"
            alt="AI 内容生产流程的真实工作界面"
            profile="card"
            sizes="(max-width: 820px) calc(100vw - 32px), 560px"
          />
          <figcaption>持续实践、记录、校验，再把有效方法送回下一次工作。</figcaption>
        </figure>

        <div class="profile-now__copy">
          <p class="profile-now__lead" v-reveal="reveal(120, 22)">
            我正在把分散的设计经验、AI 实践和学习记录，组织成一个能够长期生长的个人系统。
          </p>
          <dl>
            <div
              v-for="([title, description], index) in currentFocus"
              :key="title"
              v-reveal="reveal(160 + index * 65, 18)"
            >
              <dt>{{ title }}</dt>
              <dd>{{ description }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="profile-directory" aria-labelledby="directory-title">
      <div v-reveal="reveal()">
        <p class="profile-eyebrow">04 / CONTINUE EXPLORING</p>
        <h2 id="directory-title">继续了解</h2>
      </div>
      <nav aria-label="继续了解">
        <a
          v-for="(item, index) in directory"
          :key="item.label"
          :href="item.href"
          v-reveal="reveal(index * 70, 18)"
        >
          <span>{{ item.label }}</span>
          <span aria-hidden="true">→</span>
        </a>
      </nav>
      <div class="profile-directory__contact" v-reveal="reveal(160, 20)">
        <p>如果你正在寻找商业视觉、AI 内容或完整视频生产方面的合作，可以直接说明项目背景与期望交付。</p>
        <BaseButton :href="`mailto:${profile.email}`">联系合作</BaseButton>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-profile {
  width: min(var(--page-width), 100%);
  margin-inline: auto;
  color: var(--text-main);
}

.profile-eyebrow {
  margin: 0;
  color: var(--brand-main);
  font: 700 10px/1.5 var(--font-mono);
  letter-spacing: .16em;
  text-transform: uppercase;
}

.profile-hero {
  display: grid;
  grid-template-columns: minmax(360px, .88fr) minmax(460px, 1.12fr);
  gap: clamp(60px, 8vw, 120px);
  align-items: center;
  min-height: 690px;
  padding: 30px 0 88px;
  border-bottom: 1px solid var(--border-soft);
}

.profile-hero__portrait {
  position: relative;
  height: 600px;
  overflow: hidden;
  background: var(--bg-soft);
}

.profile-hero__portrait :deep(.responsive-picture),
.profile-hero__portrait :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
}

.profile-hero__portrait :deep(img) {
  object-fit: cover;
  object-position: 56% center;
  filter: var(--image-treatment);
}

.profile-hero__portrait > span {
  position: absolute;
  right: 18px;
  bottom: 18px;
  padding: 8px 10px;
  color: rgba(255, 255, 255, .9);
  background: rgba(10, 10, 10, .62);
  font: 700 9px/1 var(--font-mono);
  letter-spacing: .14em;
  backdrop-filter: blur(8px);
}

.profile-hero__copy h1 {
  margin: 26px 0 0;
  font-family: var(--font-display);
  font-size: clamp(68px, 7.4vw, 108px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -.07em;
}

.profile-role {
  margin: 21px 0 0;
  color: var(--brand-main);
  font-size: 17px;
  font-weight: 650;
}

.profile-statement {
  max-width: 650px;
  margin: 34px 0 0;
  font-family: var(--font-display);
  font-size: clamp(25px, 2.4vw, 34px);
  line-height: 1.62;
  letter-spacing: -.025em;
}

.profile-facts {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  margin: 46px 0 0;
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
}

.profile-facts > div {
  padding: 19px 0 21px;
}

.profile-facts > div + div {
  padding-left: 28px;
  border-left: 1px solid var(--border-soft);
}

.profile-facts dt {
  color: var(--brand-main);
  font-family: var(--font-display);
  font-size: 30px;
  line-height: 1;
}

.profile-facts dd {
  margin: 9px 0 0;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.7;
}

.profile-section {
  padding: 124px 0;
  border-bottom: 1px solid var(--border-soft);
}

.profile-section__heading {
  display: grid;
  grid-template-columns: minmax(220px, .42fr) minmax(380px, .78fr) minmax(280px, .8fr);
  gap: 38px;
  align-items: end;
}

.profile-section__heading h2,
.profile-directory h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(42px, 4.2vw, 62px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -.05em;
}

.profile-section__heading > p:last-child {
  margin: 0;
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.9;
}

.path-list,
.principle-list {
  margin: 62px 0 0;
  padding: 0;
  list-style: none;
}

.path-list {
  border-top: 1px solid var(--border-soft);
}

.path-list li {
  display: grid;
  grid-template-columns: 72px 110px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
  padding: 31px 0;
  border-bottom: 1px solid var(--border-soft);
}

.path-list__index {
  color: var(--brand-main);
  font: 700 11px/1.6 var(--font-mono);
}

.path-list__label {
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
}

.path-list h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 27px;
  line-height: 1.35;
}

.path-list p {
  max-width: 680px;
  margin: 10px 0 0;
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.9;
}

.profile-principles .profile-section__heading {
  grid-template-columns: minmax(220px, .42fr) 1fr;
}

.principle-list {
  border-top: 1px solid var(--border-soft);
}

.principle-list li {
  display: grid;
  grid-template-columns: 72px minmax(300px, .9fr) minmax(380px, 1.1fr);
  gap: 28px;
  padding: 36px 0;
  border-bottom: 1px solid var(--border-soft);
}

.principle-list > li > span {
  padding-top: 5px;
  color: var(--brand-main);
  font: italic 500 26px/1 var(--font-display);
}

.principle-list h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 27px;
  line-height: 1.45;
}

.principle-list p {
  margin: 0;
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.9;
}

.profile-now__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(380px, .88fr);
  gap: clamp(50px, 7vw, 100px);
  align-items: start;
  margin-top: 62px;
}

.profile-now figure {
  margin: 0;
}

.profile-now figure :deep(.responsive-picture),
.profile-now figure :deep(img) {
  display: block;
  width: 100%;
}

.profile-now figure :deep(img) {
  border: 1px solid var(--border-soft);
  filter: var(--image-treatment);
}

.profile-now figcaption {
  margin-top: 13px;
  color: var(--text-muted);
  font-size: 10px;
  line-height: 1.7;
}

.profile-now__lead {
  margin: 0;
  font-family: var(--font-display);
  font-size: 25px;
  line-height: 1.65;
}

.profile-now__copy dl {
  margin: 31px 0 0;
  border-top: 1px solid var(--border-soft);
}

.profile-now__copy dl > div {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 24px;
  padding: 17px 0;
  border-bottom: 1px solid var(--border-soft);
}

.profile-now__copy dt {
  color: var(--text-main);
  font-size: 12px;
  font-weight: 750;
}

.profile-now__copy dd {
  margin: 0;
  color: var(--text-sub);
  font-size: 12px;
  line-height: 1.75;
}

.profile-directory {
  padding: 124px 0 76px;
}

.profile-directory h2 {
  margin-top: 18px;
}

.profile-directory nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 58px;
  border-top: 1px solid var(--border-soft);
}

.profile-directory nav a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 86px;
  padding: 0 25px 0 0;
  border-bottom: 1px solid var(--border-soft);
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: 21px;
  text-decoration: none;
  transition: color 180ms ease, padding 180ms ease;
}

.profile-directory nav a:nth-child(odd) {
  padding-right: 32px;
  border-right: 1px solid var(--border-soft);
}

.profile-directory nav a:nth-child(even) {
  padding-left: 32px;
}

.profile-directory nav a:hover,
.profile-directory nav a:focus-visible {
  padding-right: 16px;
  color: var(--brand-main);
}

.profile-directory nav a:nth-child(even):hover,
.profile-directory nav a:nth-child(even):focus-visible {
  padding-left: 40px;
}

.profile-directory__contact {
  display: flex;
  gap: 34px;
  align-items: center;
  justify-content: space-between;
  margin-top: 52px;
  padding: 32px 0;
}

.profile-directory__contact p {
  max-width: 680px;
  margin: 0;
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.9;
}

@media (max-width: 980px) {
  .profile-hero {
    grid-template-columns: minmax(300px, .82fr) minmax(360px, 1.18fr);
    gap: 44px;
  }

  .profile-hero__portrait { height: 520px; }
  .profile-section__heading { grid-template-columns: 160px 1fr; }
  .profile-section__heading > p:last-child { grid-column: 2; }
  .principle-list li { grid-template-columns: 52px minmax(250px, .9fr) minmax(300px, 1.1fr); }
  .profile-now__body { grid-template-columns: 1fr; }
}

@media (max-width: 720px) {
  .profile-hero {
    grid-template-columns: 1fr;
    gap: 42px;
    min-height: 0;
    padding: 0 0 72px;
  }

  .profile-hero__portrait {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 5;
  }

  .profile-hero__copy h1 {
    margin-top: 19px;
    font-size: clamp(58px, 19vw, 82px);
  }

  .profile-role { font-size: 14px; }
  .profile-statement { margin-top: 25px; font-size: 24px; }
  .profile-facts { grid-template-columns: 110px minmax(0, 1fr); margin-top: 34px; }
  .profile-facts > div + div { padding-left: 18px; }
  .profile-section { padding: 88px 0; }

  .profile-section__heading,
  .profile-principles .profile-section__heading {
    grid-template-columns: 1fr;
    gap: 17px;
    align-items: start;
  }

  .profile-section__heading > p:last-child { grid-column: auto; }
  .profile-section__heading h2,
  .profile-directory h2 { font-size: 41px; }
  .path-list { margin-top: 40px; }
  .path-list li { grid-template-columns: 38px 62px minmax(0, 1fr); gap: 12px; padding: 26px 0; }
  .path-list h3 { font-size: 22px; }
  .path-list p { font-size: 12px; }
  .principle-list { margin-top: 40px; }

  .principle-list li {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 13px;
    padding: 27px 0;
  }

  .principle-list p { grid-column: 2; }
  .principle-list h3 { font-size: 22px; }
  .profile-now__body { gap: 38px; margin-top: 40px; }
  .profile-now__lead { font-size: 22px; }
  .profile-now__copy dl > div { grid-template-columns: 74px minmax(0, 1fr); gap: 15px; }
  .profile-directory { padding: 88px 0 50px; }
  .profile-directory nav { grid-template-columns: 1fr; margin-top: 39px; }

  .profile-directory nav a,
  .profile-directory nav a:nth-child(odd),
  .profile-directory nav a:nth-child(even) {
    min-height: 72px;
    padding: 0;
    border-right: 0;
  }

  .profile-directory nav a:hover,
  .profile-directory nav a:focus-visible,
  .profile-directory nav a:nth-child(even):hover,
  .profile-directory nav a:nth-child(even):focus-visible {
    padding: 0 8px;
  }

  .profile-directory__contact {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 430px) {
  .path-list li { grid-template-columns: 34px minmax(0, 1fr); }
  .path-list__label { grid-column: 2; grid-row: 1; }
  .path-list li > div { grid-column: 2; }
}

@media (prefers-reduced-motion: reduce) {
  .profile-directory nav a { transition: none; }
}
</style>
