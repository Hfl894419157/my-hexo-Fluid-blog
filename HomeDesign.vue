<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'
import { portfolioWorks } from './.shared/portfolioData.js'
import { aigcWorks as allAigcWorks } from './.shared/aigcData.js'
import { blogPosts as allBlogPosts } from './.shared/blogData.js'
import { toolsResources } from './.shared/resourcesData.js'

const pageLink = (path) => withBase(path)

const selectedWorks = computed(() => portfolioWorks.filter((work) => work.featured).slice(0, 4))
const workflowItems = computed(() => allAigcWorks.filter((work) => work.featured).slice(0, 3))
const resourceItems = computed(() => toolsResources.filter((tool) => tool.featured).slice(0, 6))
const postItems = computed(() => allBlogPosts.filter((post) => post.featured).slice(0, 3))

const workflowSteps = [
  {
    step: '01',
    title: '拆解目标',
    desc: '先把项目目标、受众、渠道和交付物整理清楚。'
  },
  {
    step: '02',
    title: '建立风格',
    desc: '用参考图、关键词和模型参数确定可执行的视觉方向。'
  },
  {
    step: '03',
    title: '产出资产',
    desc: '把方案、图像、页面和复盘记录沉淀为可复用资源。'
  }
]

const activeWork = ref(0)
const pointerX = ref(50)
const pointerY = ref(50)
const showBackToTop = ref(false)

let activeTimer = null

const activeWorkData = computed(() => selectedWorks.value[activeWork.value] || selectedWorks.value[0])

const heroStyle = computed(() => ({
  '--mx': `${pointerX.value}%`,
  '--my': `${pointerY.value}%`
}))

const updateHeroPointer = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  pointerX.value = Math.round(((event.clientX - rect.left) / rect.width) * 100)
  pointerY.value = Math.round(((event.clientY - rect.top) / rect.height) * 100)
}

const resetHeroPointer = () => {
  pointerX.value = 50
  pointerY.value = 50
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 420
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  activeTimer = window.setInterval(() => {
    if (selectedWorks.value.length > 1) {
      activeWork.value = (activeWork.value + 1) % selectedWorks.value.length
    }
  }, 4200)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (activeTimer) window.clearInterval(activeTimer)
})
</script>

<template>
  <main class="home-container">
    <section
      class="hero-stage"
      :style="heroStyle"
      @mousemove="updateHeroPointer"
      @mouseleave="resetHeroPointer"
    >
      <div class="hero-inner">
        <p class="hero-kicker">AI DESIGN / DIGITAL CONTENT / PERSONAL ARCHIVE</p>
        <h1>
          韩宇杰 · <span>AI</span><br>
          设计与数字内容
        </h1>
        <p class="hero-desc">作品、方案、简历、方法论的个人档案。</p>
        <div class="hero-actions">
          <a class="primary-action" :href="pageLink('/portfolio/')">进入案例</a>
          <a class="secondary-action" :href="pageLink('/resume')">查看简历</a>
        </div>
      </div>

      <div class="hero-orbit" aria-hidden="true">
        <span class="orbit-line"></span>
        <span class="orbit-core"></span>
      </div>

      <div class="hero-dock" aria-label="首页内容概览">
        <a class="dock-card dock-case" :href="pageLink('/portfolio/')">
          <span>01</span>
          <strong>案例</strong>
          <em>精选作品与项目表达</em>
        </a>
        <a class="dock-card dock-flow" :href="pageLink('/aigc/')">
          <span>02</span>
          <strong>AI工作流</strong>
          <em>从灵感到交付的流程</em>
        </a>
        <a class="dock-card dock-resource" :href="pageLink('/resources/')">
          <span>03</span>
          <strong>资源库</strong>
          <em>工具、模板与资料沉淀</em>
        </a>
      </div>
    </section>

    <section class="section-block featured-section" id="cases">
      <div class="section-heading">
        <span>01 / 案例</span>
        <h2>把作品做成可以被理解的项目证据。</h2>
        <a :href="pageLink('/portfolio/')">查看全部案例</a>
      </div>

      <div class="featured-grid">
        <article class="feature-main" v-if="activeWorkData">
          <div class="feature-media">
            <img :src="activeWorkData.img" :alt="activeWorkData.title">
          </div>
          <div class="feature-copy">
            <span>{{ activeWorkData.category }}</span>
            <h3>{{ activeWorkData.title }}</h3>
            <p>{{ activeWorkData.desc }}</p>
            <a :href="pageLink(activeWorkData.link)">查看项目</a>
          </div>
        </article>

        <div class="case-rail">
          <button
            v-for="(work, index) in selectedWorks"
            :key="work.id"
            type="button"
            :class="{ active: activeWork === index }"
            @click="activeWork = index"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ work.title }}</strong>
          </button>
        </div>
      </div>
    </section>

    <section class="section-block workflow-section" id="workflow">
      <div class="section-heading split">
        <div>
          <span>02 / AI工作流</span>
          <h2>让每次创作都留下可复用的方法。</h2>
        </div>
        <a :href="pageLink('/aigc/')">进入工作流</a>
      </div>

      <div class="workflow-layout">
        <div class="workflow-steps">
          <article v-for="item in workflowSteps" :key="item.step" class="workflow-step">
            <span>{{ item.step }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </article>
        </div>
        <div class="workflow-preview">
          <a
            v-for="item in workflowItems"
            :key="item.id"
            class="workflow-item"
            :href="pageLink(item.link)"
          >
            <img :src="item.img" :alt="item.title">
            <div>
              <span>{{ item.category }}</span>
              <strong>{{ item.title }}</strong>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="section-block resource-section" id="resources">
      <div class="section-heading">
        <span>03 / 资源库</span>
        <h2>像个人插件商店一样管理创作资产。</h2>
        <a :href="pageLink('/resources/')">打开资源库</a>
      </div>

      <div class="resource-grid">
        <a
          v-for="item in resourceItems"
          :key="item.id"
          class="resource-card"
          :href="pageLink(item.link)"
        >
          <span>{{ item.category }}</span>
          <strong>{{ item.name }}</strong>
          <p>{{ item.desc }}</p>
        </a>
      </div>
    </section>

    <section class="section-block notes-section" id="methods">
      <div class="notes-panel">
        <div class="section-heading compact">
          <span>04 / 方法论</span>
          <h2>写下判断，也写下过程。</h2>
          <a :href="pageLink('/blog/')">阅读方法论</a>
        </div>
        <div class="post-list">
          <a v-for="post in postItems" :key="post.id" :href="pageLink(post.link)" class="post-row">
            <span>{{ post.date }}</span>
            <strong>{{ post.title }}</strong>
          </a>
        </div>
      </div>

      <div class="about-panel">
        <span>05 / 关于我</span>
        <h2>AI 设计与数字内容工作流创作者。</h2>
        <p>关注设计方案、AIGC 流程、项目表达和个人资源沉淀，把零散能力整理成可以长期更新的网站资产。</p>
        <div class="about-actions">
          <a :href="pageLink('/resume')">查看简历</a>
          <a href="mailto:1442855983@qq.com">联系合作</a>
        </div>
      </div>
    </section>

    <button
      v-show="showBackToTop"
      type="button"
      class="back-to-top"
      aria-label="返回顶部"
      @click="scrollToTop"
    >
      ↑
    </button>
  </main>
</template>

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}

:global(body),
:global(#app),
:global(.VPContent),
:global(.VPContent.has-sidebar),
:global(.VPDoc),
:global(.VPDoc .container),
:global(.VPDoc .content),
:global(.VPDoc .content-container) {
  background: var(--site-bg, #f3f1ee) !important;
}

:global(.VPDoc .container),
:global(.VPDoc .content),
:global(.VPDoc .content-container) {
  max-width: none !important;
  padding: 0 !important;
}

:global(.VPDocFooter),
:global(.VPDocFooterEdit),
:global(.VPDocAside),
:global(.VPDoc h1:first-child) {
  display: none !important;
}

.home-container {
  --page-bg: #f3f1ee;
  --stage-bg: #05040a;
  --stage-bg-2: #0f0b18;
  --surface: rgba(255, 249, 242, 0.84);
  --surface-solid: #fff9f2;
  --surface-dark: rgba(15, 11, 24, 0.78);
  --text: #17120f;
  --text-invert: #f7f2ea;
  --muted: #756d66;
  --muted-invert: #9b92a8;
  --line: rgba(23, 18, 15, 0.12);
  --line-invert: rgba(255, 255, 255, 0.12);
  --violet: #7657d8;
  --orange: #ff4a1f;
  --orange-soft: rgba(255, 74, 31, 0.16);
  --shadow: rgba(23, 18, 15, 0.12);
  width: 100vw;
  margin-right: calc(50% - 50vw);
  margin-left: calc(50% - 50vw);
  min-height: 100vh;
  overflow: hidden;
  color: var(--text);
  background:
    radial-gradient(circle at 50% 0%, rgba(118, 87, 216, 0.12), transparent 30%),
    var(--page-bg);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}

:global(html.dark) .home-container {
  --page-bg: #05040a;
  --surface: rgba(15, 11, 24, 0.84);
  --surface-solid: #0f0b18;
  --text: #f7f2ea;
  --muted: #9b92a8;
  --line: rgba(255, 255, 255, 0.12);
  --shadow: rgba(0, 0, 0, 0.42);
  background:
    radial-gradient(circle at 50% -10%, rgba(118, 87, 216, 0.26), transparent 36%),
    #05040a;
}

:global(html.dark body),
:global(html.dark #app),
:global(html.dark .VPContent) {
  --site-bg: #05040a;
}

.hero-stage {
  position: relative;
  min-height: 940px;
  padding: 28px clamp(20px, 4vw, 56px) 72px;
  color: var(--text-invert);
  background:
    radial-gradient(circle at var(--mx) var(--my), rgba(124, 77, 255, 0.26), transparent 26%),
    radial-gradient(circle at 50% 72%, rgba(255, 74, 31, 0.22), transparent 25%),
    linear-gradient(180deg, #05040a 0%, #0d0716 54%, #05040a 100%);
  isolation: isolate;
}

.hero-stage::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  background:
    linear-gradient(90deg, transparent 0 18%, rgba(255, 255, 255, 0.04) 50%, transparent 82%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 96px);
  mask-image: linear-gradient(180deg, transparent, #000 18%, #000 70%, transparent);
}

.hero-actions a,
.section-heading a,
.feature-copy a,
.about-actions a {
  text-decoration: none;
}

.hero-inner {
  position: relative;
  z-index: 2;
  width: min(1040px, 100%);
  margin: 112px auto 0;
  text-align: center;
}

.hero-kicker {
  margin: 0 0 22px;
  color: rgba(247, 242, 234, 0.56);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.24em;
}

.hero-inner h1 {
  margin: 0;
  color: #fffaf3;
  font-size: clamp(52px, 8.2vw, 104px);
  font-weight: 760;
  line-height: 0.95;
  letter-spacing: 0;
}

.hero-inner h1 span {
  color: var(--orange);
  text-shadow: 0 0 42px rgba(255, 74, 31, 0.54);
}

.hero-desc {
  max-width: 520px;
  margin: 28px auto 0;
  color: rgba(247, 242, 234, 0.68);
  font-size: 17px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 34px;
}

.hero-actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
}

.primary-action {
  color: #fff;
  background: linear-gradient(135deg, var(--orange), #ff7a32);
  box-shadow: 0 16px 40px rgba(255, 74, 31, 0.32);
}

.secondary-action {
  color: rgba(247, 242, 234, 0.82);
  border: 1px solid var(--line-invert);
  background: rgba(255, 255, 255, 0.05);
}

.hero-orbit {
  position: absolute;
  right: -8vw;
  bottom: 168px;
  left: -8vw;
  z-index: 1;
  height: 340px;
  pointer-events: none;
}

.orbit-line {
  position: absolute;
  inset: 0;
  border-top: 5px solid rgba(255, 74, 31, 0.88);
  border-radius: 50% 50% 0 0;
  filter: drop-shadow(0 -8px 20px rgba(255, 74, 31, 0.5));
  transform: translateY(130px);
}

.orbit-core {
  position: absolute;
  inset: 130px 0 -220px;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(124, 77, 255, 0.44), transparent 35%),
    radial-gradient(ellipse at 50% 0%, rgba(255, 74, 31, 0.2), transparent 44%),
    linear-gradient(180deg, rgba(124, 77, 255, 0.2), #05040a 55%);
  filter: blur(2px);
}

.hero-dock {
  position: absolute;
  right: clamp(20px, 5vw, 72px);
  bottom: 54px;
  left: clamp(20px, 5vw, 72px);
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.dock-card {
  min-height: 124px;
  padding: 20px;
  border: 1px solid var(--line-invert);
  border-radius: 8px;
  color: var(--text-invert);
  background: rgba(255, 255, 255, 0.055);
  backdrop-filter: blur(18px);
  transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
}

.dock-card:hover {
  border-color: rgba(255, 74, 31, 0.44);
  background: rgba(255, 74, 31, 0.08);
  transform: translateY(-4px);
}

.dock-card span,
.section-heading span,
.feature-copy span,
.workflow-step span,
.workflow-item span,
.resource-card span,
.about-panel > span {
  display: block;
  color: var(--orange);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.dock-card strong {
  display: block;
  margin-top: 18px;
  font-size: 24px;
  line-height: 1.1;
}

.dock-card em {
  display: block;
  margin-top: 10px;
  color: rgba(247, 242, 234, 0.62);
  font-size: 14px;
  font-style: normal;
}

.section-block {
  width: min(1180px, calc(100% - 48px));
  margin: 120px auto 0;
}

.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 30px;
  margin-bottom: 28px;
}

.section-heading h2 {
  max-width: 760px;
  margin: 12px 0 0;
  color: var(--text);
  font-size: clamp(34px, 4.4vw, 58px);
  font-weight: 760;
  line-height: 1.08;
  letter-spacing: 0;
}

.section-heading a,
.feature-copy a,
.about-actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--text);
  font-size: 14px;
  font-weight: 700;
  background: var(--surface);
}

.featured-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
  gap: 18px;
}

.feature-main,
.workflow-section,
.resource-section,
.notes-panel,
.about-panel {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: 0 24px 80px rgba(23, 18, 15, 0.08);
}

:global(html.dark) .feature-main,
:global(html.dark) .workflow-section,
:global(html.dark) .resource-section,
:global(html.dark) .notes-panel,
:global(html.dark) .about-panel {
  box-shadow: 0 24px 90px rgba(0, 0, 0, 0.24);
}

.feature-main {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  overflow: hidden;
}

.feature-media {
  min-height: 440px;
  background: var(--stage-bg);
}

.feature-media img {
  width: 100%;
  height: 100%;
  min-height: 440px;
  object-fit: cover;
  filter: saturate(0.9) contrast(1.04);
}

.feature-copy {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 440px;
  padding: clamp(28px, 4vw, 48px);
}

.feature-copy h3 {
  margin: 18px 0 0;
  color: var(--text);
  font-size: clamp(28px, 3.6vw, 46px);
  line-height: 1.08;
}

.feature-copy p {
  margin: 18px 0 28px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.8;
}

.case-rail {
  display: grid;
  gap: 10px;
}

.case-rail button {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  align-items: center;
  min-height: 78px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--text);
  text-align: left;
  background: var(--surface);
  cursor: pointer;
}

.case-rail button span {
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
}

.case-rail button strong {
  overflow: hidden;
  font-size: 16px;
  line-height: 1.35;
  text-overflow: ellipsis;
}

.case-rail button.active {
  border-color: rgba(255, 74, 31, 0.48);
  background:
    linear-gradient(135deg, rgba(255, 74, 31, 0.12), transparent 54%),
    var(--surface);
}

.workflow-section,
.resource-section {
  padding: clamp(28px, 5vw, 58px);
}

.section-heading.split {
  grid-template-columns: minmax(0, 1fr) auto;
}

.workflow-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
  gap: 18px;
}

.workflow-steps {
  display: grid;
  gap: 12px;
}

.workflow-step {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--surface-solid), transparent 18%);
}

.workflow-step h3 {
  margin: 12px 0 0;
  color: var(--text);
  font-size: 24px;
}

.workflow-step p {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.7;
}

.workflow-preview {
  display: grid;
  gap: 12px;
}

.workflow-item {
  display: grid;
  grid-template-columns: 142px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  min-height: 130px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--text);
  text-decoration: none;
  background: color-mix(in srgb, var(--surface-solid), transparent 12%);
}

.workflow-item img {
  width: 100%;
  height: 100px;
  border-radius: 6px;
  object-fit: cover;
}

.workflow-item strong {
  display: block;
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.3;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.resource-card {
  min-height: 172px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--text);
  text-decoration: none;
  background:
    radial-gradient(circle at 100% 0%, rgba(118, 87, 216, 0.12), transparent 34%),
    color-mix(in srgb, var(--surface-solid), transparent 14%);
}

.resource-card strong {
  display: block;
  margin-top: 24px;
  font-size: 22px;
}

.resource-card p {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.65;
}

.notes-section {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr);
  gap: 18px;
}

.notes-panel,
.about-panel {
  padding: clamp(28px, 4vw, 48px);
}

.section-heading.compact {
  display: block;
  margin-bottom: 26px;
}

.section-heading.compact h2,
.about-panel h2 {
  margin: 12px 0 0;
  color: var(--text);
  font-size: clamp(30px, 3.4vw, 44px);
  line-height: 1.12;
}

.post-list {
  display: grid;
  border-top: 1px solid var(--line);
}

.post-row {
  display: grid;
  grid-template-columns: 100px minmax(0, 1fr);
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
  color: var(--text);
  text-decoration: none;
}

.post-row span {
  color: var(--muted);
  font-size: 13px;
}

.post-row strong {
  overflow: hidden;
  font-size: 17px;
  line-height: 1.45;
  text-overflow: ellipsis;
}

.about-panel {
  color: var(--text-invert);
  background:
    radial-gradient(circle at 18% 8%, rgba(255, 74, 31, 0.24), transparent 28%),
    linear-gradient(135deg, #0f0b18, #05040a);
}

.about-panel h2 {
  color: var(--text-invert);
}

.about-panel p {
  margin: 18px 0 0;
  color: rgba(247, 242, 234, 0.7);
  font-size: 15px;
  line-height: 1.8;
}

.about-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.about-actions a {
  color: var(--text-invert);
  border-color: var(--line-invert);
  background: rgba(255, 255, 255, 0.06);
}

.back-to-top {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 20;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--text);
  background: var(--surface);
  box-shadow: 0 16px 40px var(--shadow);
  cursor: pointer;
}

@media (max-width: 960px) {
  .hero-stage {
    min-height: auto;
    padding-bottom: 34px;
  }

  .hero-actions,
  .about-actions {
    flex-wrap: wrap;
  }

  .hero-inner {
    margin-top: 82px;
  }

  .hero-dock {
    position: relative;
    right: auto;
    bottom: auto;
    left: auto;
    grid-template-columns: 1fr;
    width: 100%;
    margin-top: 260px;
  }

  .hero-orbit {
    bottom: 260px;
    height: 240px;
  }

  .section-heading,
  .section-heading.split,
  .featured-grid,
  .feature-main,
  .workflow-layout,
  .resource-grid,
  .notes-section {
    grid-template-columns: 1fr;
  }

  .section-block {
    width: min(100% - 32px, 720px);
    margin-top: 76px;
  }

  .feature-media,
  .feature-media img,
  .feature-copy {
    min-height: 300px;
  }
}

@media (max-width: 640px) {
  .hero-stage {
    padding: 18px 14px 28px;
  }

  .hero-inner h1 {
    font-size: clamp(42px, 15vw, 68px);
  }

  .hero-desc {
    font-size: 15px;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .hero-actions a {
    width: 100%;
  }

  .section-heading h2 {
    font-size: 34px;
  }

  .workflow-item,
  .post-row {
    grid-template-columns: 1fr;
  }

  .workflow-item img {
    height: 160px;
  }
}

/* Refined lower homepage sections */
.home-container {
  --content-measure: min(1040px, calc(100% - 48px));
  --quiet-surface: color-mix(in srgb, var(--surface-solid), transparent 34%);
  --quiet-line: color-mix(in srgb, var(--line), transparent 28%);
}

.section-block {
  width: var(--content-measure);
}

.section-block {
  margin-top: clamp(82px, 9vw, 118px);
}

.section-heading,
.section-heading.split {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
  margin-bottom: 22px;
}

.section-heading h2,
.section-heading.compact h2,
.about-panel h2 {
  max-width: 1040px;
  font-size: clamp(28px, 3.1vw, 42px);
  font-weight: 720;
  line-height: 1.14;
}

.section-heading span,
.feature-copy span,
.workflow-step span,
.workflow-item span,
.resource-card span,
.about-panel > span {
  color: color-mix(in srgb, var(--orange), var(--text) 26%);
  font-size: 11px;
  letter-spacing: 0.06em;
}

.section-heading a,
.feature-copy a,
.about-actions a {
  min-height: 36px;
  padding: 0 14px;
  border-color: var(--quiet-line);
  background: transparent;
  font-size: 13px;
}

.feature-main,
.workflow-section,
.resource-section,
.notes-panel,
.about-panel {
  border-color: var(--quiet-line);
  background: var(--quiet-surface);
  box-shadow: none;
}

:global(html.dark) .feature-main,
:global(html.dark) .workflow-section,
:global(html.dark) .resource-section,
:global(html.dark) .notes-panel,
:global(html.dark) .about-panel {
  box-shadow: none;
}

.featured-grid {
  grid-template-columns: 1fr;
  gap: 12px;
}

.feature-main {
  grid-template-columns: minmax(320px, 0.95fr) minmax(0, 1fr);
}

.feature-media,
.feature-media img,
.feature-copy {
  min-height: 360px;
}

.feature-copy {
  padding: clamp(26px, 4vw, 42px);
}

.feature-copy h3 {
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.14;
}

.feature-copy p,
.workflow-step p,
.resource-card p,
.about-panel p {
  max-width: 560px;
  font-size: 14px;
  line-height: 1.72;
}

.case-rail {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.case-rail button {
  min-height: 66px;
  padding: 14px;
  border-color: var(--quiet-line);
  background: transparent;
}

.case-rail button.active {
  border-color: color-mix(in srgb, var(--orange), transparent 48%);
  background: color-mix(in srgb, var(--orange-soft), transparent 46%);
}

.workflow-section,
.resource-section,
.notes-panel,
.about-panel {
  padding: clamp(26px, 4vw, 42px);
}

.workflow-layout {
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: 14px;
}

.workflow-step,
.workflow-item,
.resource-card {
  border-color: var(--quiet-line);
  background: transparent;
}

.workflow-step {
  padding: 18px 0;
  border-width: 0 0 1px;
  border-radius: 0;
}

.workflow-step:first-child {
  padding-top: 0;
}

.workflow-step h3 {
  font-size: 20px;
}

.workflow-item {
  min-height: 108px;
  grid-template-columns: 118px minmax(0, 1fr);
  padding: 10px;
}

.workflow-item img {
  height: 88px;
}

.workflow-item strong {
  font-size: 18px;
}

.resource-grid {
  gap: 8px;
}

.resource-card {
  min-height: 154px;
  padding: 20px;
  background: transparent;
}

.resource-card strong {
  margin-top: 20px;
  font-size: 20px;
}

.notes-section {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 12px;
  margin-bottom: 110px;
}

.post-row {
  padding: 16px 0;
  border-color: var(--quiet-line);
}

.about-panel {
  background: #0f0b18;
}

:global(html.dark) .about-panel {
  background: color-mix(in srgb, #0f0b18, #05040a 34%);
}

@media (max-width: 960px) {
  .home-container {
    --content-measure: min(100% - 32px, 720px);
  }

  .feature-main,
  .workflow-layout,
  .notes-section {
    grid-template-columns: 1fr;
  }

  .case-rail,
  .resource-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .home-container {
    --content-measure: calc(100% - 28px);
  }

  .section-heading,
  .section-heading.split {
    grid-template-columns: 1fr;
  }

  .case-rail,
  .resource-grid {
    grid-template-columns: 1fr;
  }

  .workflow-item {
    grid-template-columns: 1fr;
  }
}
</style>
