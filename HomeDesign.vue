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

const heroTiles = ['AI', 'UI', '3D', 'CV', 'BR', 'PM', 'UX', 'SD', 'MG', 'AR', 'ID', 'GD']

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
const isDarkTheme = ref(false)

let activeTimer = null
let themeObserver = null

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

const syncThemeState = () => {
  isDarkTheme.value = document.documentElement.classList.contains('dark')
}

const setTheme = (dark) => {
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  localStorage.setItem('vitepress-theme-appearance', dark ? 'dark' : 'light')
  syncThemeState()
}

const toggleTheme = () => {
  setTheme(!isDarkTheme.value)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  syncThemeState()
  themeObserver = new MutationObserver(syncThemeState)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  activeTimer = window.setInterval(() => {
    if (selectedWorks.value.length > 1) {
      activeWork.value = (activeWork.value + 1) % selectedWorks.value.length
    }
  }, 4200)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (activeTimer) window.clearInterval(activeTimer)
  if (themeObserver) themeObserver.disconnect()
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
      <button
        type="button"
        class="theme-toggle"
        :class="{ active: isDarkTheme }"
        :aria-label="isDarkTheme ? '切换到亮色模式' : '切换到暗色模式'"
        @click="toggleTheme"
      >
        <span></span>
      </button>

      <div class="hero-visual" aria-hidden="true">
        <span
          v-for="(tile, index) in heroTiles"
          :key="tile"
          class="hero-tile"
          :style="{ '--tile-index': index }"
        >
          {{ tile }}
        </span>
      </div>

      <div class="hero-inner">
        <h1>
          Build the<br>
          design system
        </h1>
        <p class="hero-desc">用 AI 工作流、项目表达和资源沉淀，把设计能力组织成清晰、可复用、可持续更新的个人系统。</p>
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
          <strong>案例</strong>
        </a>
        <a class="dock-card dock-flow" :href="pageLink('/aigc/')">
          <strong>AI工作流</strong>
        </a>
        <a class="dock-card dock-resource" :href="pageLink('/resources/')">
          <strong>资源库</strong>
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

/* Product-grade homepage direction */
.home-container {
  --content-measure: min(1060px, calc(100% - 48px));
  --page-bg: #f4f1eb;
  --stage-bg: #f4f1eb;
  --surface: rgba(255, 252, 245, 0.72);
  --surface-solid: #fffaf2;
  --text: #17130f;
  --text-invert: #17130f;
  --muted: rgba(23, 19, 15, 0.58);
  --line: rgba(42, 35, 28, 0.1);
  --line-invert: rgba(42, 35, 28, 0.1);
  --violet: #7058df;
  --orange: #ff5a32;
  --orange-soft: rgba(255, 90, 50, 0.12);
  background:
    radial-gradient(circle at 50% -6%, rgba(120, 92, 224, 0.2), transparent 34%),
    radial-gradient(circle at 18% 20%, rgba(38, 171, 225, 0.12), transparent 28%),
    linear-gradient(180deg, #f4f1eb 0%, #eee9e1 100%);
  transition: background 0.45s ease, color 0.45s ease;
}

:global(html.dark) .home-container {
  --page-bg: #03010a;
  --stage-bg: #03010a;
  --surface: rgba(27, 23, 34, 0.74);
  --surface-solid: #17131f;
  --text: #f6f2ea;
  --text-invert: #f6f2ea;
  --muted: rgba(246, 242, 234, 0.56);
  --line: rgba(255, 255, 255, 0.08);
  --line-invert: rgba(255, 255, 255, 0.09);
  --violet: #7a5cff;
  --orange: #ff5a32;
  --orange-soft: rgba(255, 90, 50, 0.14);
  background:
    radial-gradient(circle at 48% -8%, rgba(73, 205, 171, 0.2), transparent 24%),
    radial-gradient(circle at 30% 0%, rgba(117, 58, 189, 0.42), transparent 34%),
    radial-gradient(circle at 72% 5%, rgba(218, 44, 86, 0.24), transparent 30%),
    linear-gradient(180deg, #03010a 0%, #070412 45%, #03010a 100%);
}

.theme-toggle {
  position: absolute;
  top: 34px;
  right: clamp(20px, 6vw, 88px);
  z-index: 8;
  width: 56px;
  height: 30px;
  border: 1px solid var(--line-invert);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface-solid), transparent 24%);
  box-shadow: 0 18px 52px rgba(0, 0, 0, 0.14);
  cursor: pointer;
  transition: background 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease;
}

.theme-toggle span {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff, #f1e5d5);
  box-shadow: 0 0 0 1px rgba(23, 19, 15, 0.08), 0 8px 22px rgba(0, 0, 0, 0.22);
  transition: transform 0.34s cubic-bezier(.2, .8, .2, 1), background 0.34s ease;
}

.theme-toggle.active {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 34px rgba(122, 92, 255, 0.22);
}

.theme-toggle.active span {
  transform: translateX(26px);
  background: linear-gradient(135deg, #7a5cff, #49cdab);
}

.hero-stage {
  min-height: 880px;
  padding: 72px clamp(20px, 4vw, 56px) 70px;
  color: var(--text-invert);
  background:
    radial-gradient(circle at var(--mx) var(--my), rgba(122, 92, 255, 0.18), transparent 24%),
    linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--page-bg), transparent 0%) 100%);
}

:global(html.dark) .hero-stage {
  background:
    radial-gradient(circle at var(--mx) var(--my), rgba(122, 92, 255, 0.24), transparent 24%),
    radial-gradient(ellipse at 50% 0%, rgba(168, 48, 120, 0.28), transparent 36%),
    linear-gradient(180deg, rgba(3, 1, 10, 0.04), #03010a 100%);
}

.hero-stage::before {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 36%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 120px);
  opacity: 0.22;
}

:global(html:not(.dark)) .hero-stage::before {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.46), transparent 36%),
    repeating-linear-gradient(90deg, rgba(30, 24, 18, 0.035) 0 1px, transparent 1px 120px);
  opacity: 0.72;
}

.hero-visual {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(6, 62px);
  justify-content: center;
  gap: 18px;
  width: min(560px, 100%);
  margin: 10px auto 78px;
  perspective: 900px;
}

.hero-tile {
  display: grid;
  width: 62px;
  height: 62px;
  place-items: center;
  border: 1px solid var(--line-invert);
  border-radius: 16px;
  color: var(--text);
  font-size: 14px;
  font-weight: 760;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--surface-solid), transparent 8%), color-mix(in srgb, var(--surface-solid), transparent 42%));
  box-shadow: 0 22px 58px rgba(0, 0, 0, 0.14);
  transform: translateY(calc((var(--tile-index) - 6) * -1px)) rotateX(12deg);
}

:global(html.dark) .hero-tile {
  color: rgba(246, 242, 234, 0.88);
  background:
    radial-gradient(circle at 32% 24%, rgba(255, 255, 255, 0.18), transparent 30%),
    linear-gradient(145deg, rgba(42, 34, 58, 0.9), rgba(18, 15, 26, 0.76));
  box-shadow: 0 22px 68px rgba(0, 0, 0, 0.4), 0 0 44px rgba(122, 92, 255, 0.12);
}

.hero-inner {
  width: min(720px, 100%);
  margin: 0 auto;
}

.hero-kicker,
.section-heading span,
.feature-copy span,
.workflow-item span,
.resource-card span,
.about-panel > span,
.dock-card span,
.dock-card em,
.case-rail button span {
  display: none !important;
}

.hero-inner h1 {
  color: var(--text);
  font-size: clamp(54px, 7.8vw, 96px);
  font-weight: 780;
  line-height: 0.92;
  text-shadow: none;
}

:global(html.dark) .hero-inner h1 {
  color: #fbf7ef;
  text-shadow: 0 0 70px rgba(122, 92, 255, 0.22);
}

.hero-inner h1 span {
  color: inherit;
  text-shadow: none;
}

.hero-desc {
  max-width: 560px;
  margin-top: 26px;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.72;
}

.hero-actions a {
  min-height: 42px;
  padding: 0 22px;
  border-radius: 7px;
  font-size: 13px;
}

.primary-action {
  color: #17130f;
  background: linear-gradient(135deg, #ffffff, #eae3d7);
  box-shadow: 0 22px 62px rgba(255, 90, 50, 0.2);
}

:global(html.dark) .primary-action {
  color: #130f18;
  background: linear-gradient(135deg, #ffffff, #e5e0ff);
  box-shadow: 0 0 42px rgba(122, 92, 255, 0.3), 0 20px 62px rgba(0, 0, 0, 0.24);
}

.secondary-action {
  color: var(--text);
  border-color: var(--line-invert);
  background: color-mix(in srgb, var(--surface-solid), transparent 38%);
}

.hero-orbit {
  display: none;
}

.hero-dock {
  position: relative;
  right: auto;
  bottom: auto;
  left: auto;
  width: min(840px, calc(100% - 40px));
  margin: 96px auto 0;
  gap: 12px;
}

.dock-card {
  min-height: 88px;
  padding: 22px;
  border-color: var(--line-invert);
  color: var(--text);
  background: color-mix(in srgb, var(--surface-solid), transparent 36%);
  box-shadow: none;
}

:global(html.dark) .dock-card {
  background: rgba(255, 255, 255, 0.045);
}

.dock-card strong {
  margin-top: 0;
  font-size: 19px;
}

.section-block {
  width: var(--content-measure);
  margin-top: clamp(96px, 12vw, 150px);
}

.section-heading,
.section-heading.split {
  display: block;
  margin-bottom: 34px;
  text-align: left;
}

.section-heading h2,
.section-heading.compact h2,
.about-panel h2 {
  max-width: 620px;
  margin: 0;
  color: var(--text);
  font-size: clamp(34px, 4vw, 54px);
  font-weight: 760;
  line-height: 1;
}

.section-heading a,
.feature-copy a,
.about-actions a {
  margin-top: 22px;
  min-height: 34px;
  border-radius: 7px;
  border-color: var(--line);
  color: var(--text);
  background: transparent;
}

.feature-main,
.workflow-section,
.resource-section,
.notes-panel,
.about-panel {
  border-color: var(--line);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: none;
  backdrop-filter: blur(20px);
}

.feature-main {
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.86fr);
}

.feature-media,
.feature-media img,
.feature-copy {
  min-height: 420px;
}

.feature-copy h3 {
  font-size: clamp(30px, 3.8vw, 48px);
}

.feature-copy p,
.workflow-step p,
.resource-card p,
.about-panel p {
  color: var(--muted);
  font-size: 14px;
}

.case-rail {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.case-rail button {
  min-height: 72px;
  border-color: var(--line);
  background: color-mix(in srgb, var(--surface-solid), transparent 54%);
}

.case-rail button strong {
  font-size: 14px;
}

.workflow-section,
.resource-section {
  padding: clamp(32px, 5vw, 58px);
}

.workflow-layout {
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
}

.workflow-step {
  border-color: var(--line);
}

.workflow-step h3 {
  font-size: 22px;
}

.workflow-item,
.resource-card {
  border-color: var(--line);
  background: color-mix(in srgb, var(--surface-solid), transparent 58%);
}

.workflow-item {
  grid-template-columns: 104px minmax(0, 1fr);
}

.workflow-item img {
  height: 82px;
}

.resource-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.resource-card strong {
  margin-top: 0;
  font-size: 20px;
}

.notes-section {
  gap: 12px;
  margin-bottom: 130px;
}

.about-panel {
  color: #f6f2ea;
  background:
    radial-gradient(circle at 12% 4%, rgba(122, 92, 255, 0.26), transparent 32%),
    linear-gradient(135deg, #17131f, #08050f);
}

.about-panel h2 {
  color: #f6f2ea;
}

.about-panel p {
  color: rgba(246, 242, 234, 0.62);
}

.back-to-top {
  border-radius: 999px;
  background: var(--surface);
}

@media (max-width: 960px) {
  .hero-visual {
    grid-template-columns: repeat(4, 56px);
    gap: 12px;
    margin-bottom: 58px;
  }

  .hero-tile {
    width: 56px;
    height: 56px;
  }

  .hero-dock,
  .feature-main,
  .workflow-layout,
  .notes-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .theme-toggle {
    top: 22px;
    right: 18px;
  }

  .hero-stage {
    padding-top: 72px;
  }

  .hero-visual {
    grid-template-columns: repeat(3, 52px);
  }

  .hero-tile {
    width: 52px;
    height: 52px;
  }

  .hero-inner h1 {
    font-size: clamp(46px, 15vw, 68px);
  }
}
</style>
