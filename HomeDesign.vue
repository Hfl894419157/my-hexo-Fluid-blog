<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

const pageLink = (path) => withBase(path)
const navLink = (path) => (path.startsWith('http') || path.startsWith('mailto:') ? path : pageLink(path))

const isDarkTheme = ref(false)
const pointerX = ref(50)
const pointerY = ref(50)
const showBackToTop = ref(false)

let themeObserver = null

const blueprintSteps = [
  {
    code: '01',
    title: '需求拆解',
    poster: '目标、受众、限制、交付物',
    detail: '把模糊需求整理成 AI 能理解、团队能判断的创意简报。'
  },
  {
    code: '02',
    title: 'Prompt 策略',
    poster: '变量、边界、批量规则',
    detail: '把风格要求、内容结构和输出标准写成可复用提示词。'
  },
  {
    code: '03',
    title: '多方案生成',
    poster: '方向探索、构图、文案变体',
    detail: '用批量生成扩大探索范围，让初稿从单点尝试变成方案池。'
  },
  {
    code: '04',
    title: '人工筛选',
    poster: '审美、策略、业务目标',
    detail: '用设计判断筛掉噪声，保留真正能推进项目的方案。'
  },
  {
    code: '05',
    title: '资产沉淀',
    poster: '模板、案例、复盘、规范',
    detail: '把每次交付回收成下一次项目可以直接调用的资产。'
  }
]

const diagnosisCards = [
  {
    title: '资料被反复整理',
    text: '需求、竞品、卖点、尺寸和参考图分散在不同沟通里，设计开始前就消耗大量时间。',
    result: '输出：项目简报模板'
  },
  {
    title: '初稿依赖低效试错',
    text: '方向探索、构图尝试和文案变体靠手动推进，容易慢，也很难复盘哪一步有效。',
    result: '输出：Prompt 变量表'
  },
  {
    title: '交付无法沉淀复用',
    text: '项目结束后只留下成稿，筛选标准、有效提示词和资产结构没有进入下一次流程。',
    result: '输出：资产回收清单'
  }
]

const deliverables = [
  ['AI 简报系统', '统一需求输入、目标拆解和交付边界，减少开工前的来回确认。'],
  ['提示词策略库', '按海报、详情页、短视频脚本、品牌内容等场景沉淀可复用结构。'],
  ['方案筛选标准', '把审美、策略、转化目标和执行成本变成可讨论的判断维度。'],
  ['项目复盘资产', '把案例、模板、Prompt、素材规则回收成下一次提效的起点。']
]

const footerGroups = [
  {
    title: '方案',
    links: [['提效案例', '/portfolio/'], ['AI 工作流', '/aigc/'], ['资源模板', '/resources/'], ['方法论', '/blog/']]
  },
  {
    title: '关于',
    links: [['个人简历', '/resume'], ['合作联系', 'mailto:1442855983@qq.com'], ['项目复盘', '/blog/'], ['内容更新', '/resources/']]
  },
  {
    title: '社区',
    links: [['GitHub', 'https://github.com/han-yujie'], ['YouTube', 'https://www.youtube.com/@yujie1992'], ['小红书', 'https://www.xiaohongshu.com/'], ['抖音', 'https://www.douyin.com/']]
  },
  {
    title: '提效',
    links: [['设计资产', '/resources/'], ['提示词', '/resources/mj-prompt'], ['项目模板', '/resources/notion'], ['实验记录', '/aigc/']]
  }
]

const updateHeroPointer = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  pointerX.value = Math.round(((event.clientX - rect.left) / rect.width) * 100)
  pointerY.value = Math.round(((event.clientY - rect.top) / rect.height) * 100)
}

const resetHeroPointer = () => {
  pointerX.value = 50
  pointerY.value = 50
}

const heroStyle = () => ({
  '--mx': `${pointerX.value}%`,
  '--my': `${pointerY.value}%`
})

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

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 520
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const savedTheme = localStorage.getItem('vitepress-theme-appearance')
  if (!savedTheme) {
    setTheme(true)
  } else {
    syncThemeState()
  }

  themeObserver = new MutationObserver(syncThemeState)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (themeObserver) themeObserver.disconnect()
})
</script>

<template>
  <main class="ray-home" :class="isDarkTheme ? 'dark-mode' : 'light-mode'">
    <section
      class="ray-hero"
      :style="heroStyle()"
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

      <div class="hero-shell">
        <div class="hero-copy">
          <p class="hero-kicker">AI Design Efficiency System</p>
          <h1>AI 推动设计提效，把创意生产变成可复用系统</h1>
          <p class="hero-lead">
            从需求诊断、Prompt 策略、多方案生成到交付复盘，建立一套能被重复使用的设计提效流程。
          </p>
          <div class="hero-actions">
            <a class="main-button" :href="pageLink('/aigc/')">查看 AI 工作流</a>
            <a class="ghost-button" :href="pageLink('/resources/')">查看资源模板</a>
          </div>
        </div>

        <article class="blueprint-poster">
          <div class="poster-header">
            <span>AI DESIGN BLUEPRINT</span>
            <h2>AI 设计提效蓝图</h2>
            <p>把一次项目拆成清晰输入、可控生成、人工判断和资产回收。</p>
          </div>

          <div class="poster-flow">
            <article v-for="step in blueprintSteps" :key="step.code">
              <span>{{ step.code }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.poster }}</p>
            </article>
          </div>

          <div class="poster-route" aria-hidden="true">
            <span>Brief</span>
            <i></i>
            <span>Prompt</span>
            <i></i>
            <span>Generate</span>
            <i></i>
            <span>Review</span>
            <i></i>
            <span>Asset</span>
          </div>
        </article>
      </div>
    </section>

    <section class="strategy-section diagnosis-section">
      <div class="section-head">
        <span>01 诊断</span>
        <h2>先找到最值得被 AI 放大的环节</h2>
        <p>提效不是把所有步骤都自动化，而是先判断哪里最耗时、哪里最容易复用、哪里必须保留人工决策。</p>
      </div>

      <div class="diagnosis-grid">
        <article v-for="item in diagnosisCards" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <strong>{{ item.result }}</strong>
        </article>
      </div>
    </section>

    <section class="strategy-section workflow-section">
      <div class="section-head center">
        <span>02 流程</span>
        <h2>把 AI 介入点组织成可复制工作流</h2>
        <p>每一步都有明确输入、判断标准和沉淀结果，项目不再只依赖临场发挥。</p>
      </div>

      <div class="workflow-board">
        <article v-for="step in blueprintSteps" :key="step.title">
          <span>{{ step.code }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.detail }}</p>
        </article>
      </div>
    </section>

    <section class="strategy-section deliverable-section">
      <div class="section-head">
        <span>03 交付</span>
        <h2>最终沉淀为团队能继续使用的资产</h2>
        <p>页面不再只展示作品，而是展示一套可以持续提高效率的设计方法。</p>
      </div>

      <div class="deliverable-grid">
        <article v-for="item in deliverables" :key="item[0]">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </section>

    <section class="launch-section">
      <div>
        <span>04 开始</span>
        <h2>从一个高频项目开始做提效改造</h2>
        <p>选择海报、详情页、短视频脚本或品牌内容中的一个重复任务，先搭出流程，再把经验沉淀为系统。</p>
      </div>
      <a class="main-button" :href="pageLink('/resume')">讨论合作方向</a>
    </section>

    <footer class="ray-footer">
      <a class="footer-mark" :href="pageLink('/')">HYJ</a>
      <nav v-for="group in footerGroups" :key="group.title">
        <strong>{{ group.title }}</strong>
        <a v-for="item in group.links" :key="item[0]" :href="navLink(item[1])">{{ item[0] }}</a>
      </nav>
    </footer>

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
  background: var(--site-bg, #f6f6f7) !important;
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

.ray-home {
  --bg: #f6f6f7;
  --bg-soft: #eeeeef;
  --surface: rgba(255, 255, 255, 0.9);
  --surface-strong: #ffffff;
  --surface-muted: rgba(244, 244, 245, 0.88);
  --text: #17181d;
  --text-soft: #4d525c;
  --muted: #737781;
  --line: #dedfe3;
  --line-strong: #cacdd4;
  --accent: #7b7f89;
  --accent-2: #b8bcc4;
  --button-bg: linear-gradient(135deg, #f2f3f5, #d8dce3);
  --button-text: #18191f;
  --poster-bg: rgba(255, 255, 255, 0.82);
  --poster-panel: rgba(248, 248, 249, 0.92);
  --poster-shadow: rgba(24, 24, 29, 0.11);
  width: 100vw;
  min-height: 100vh;
  margin-right: calc(50% - 50vw);
  margin-left: calc(50% - 50vw);
  overflow: hidden;
  color: var(--text);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.86) 0%, transparent 28%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  transition: background 0.45s ease, color 0.45s ease;
}

.ray-home.dark-mode {
  --bg: #080714;
  --bg-soft: #0b0a18;
  --surface: rgba(17, 16, 34, 0.9);
  --surface-strong: #111022;
  --surface-muted: rgba(22, 21, 42, 0.88);
  --text: #ffffff;
  --text-soft: #d9defd;
  --muted: rgba(199, 210, 255, 0.7);
  --line: #2d2a52;
  --line-strong: #3a3862;
  --accent: #9a86ff;
  --accent-2: #76adff;
  --button-bg: linear-gradient(135deg, #9a86ff, #76adff);
  --button-text: #070612;
  --poster-bg: rgba(17, 16, 34, 0.82);
  --poster-panel: rgba(22, 21, 42, 0.9);
  --poster-shadow: rgba(0, 0, 0, 0.48);
  background:
    radial-gradient(circle at 50% -6%, rgba(154, 134, 255, 0.24), transparent 30%),
    radial-gradient(circle at 74% 8%, rgba(118, 173, 255, 0.13), transparent 26%),
    linear-gradient(180deg, #080714 0%, #0b0a18 46%, #080714 100%);
}

:global(html.dark body),
:global(html.dark #app),
:global(html.dark .VPContent) {
  --site-bg: #080714;
}

a {
  color: inherit;
  text-decoration: none;
}

.theme-toggle {
  position: absolute;
  top: 30px;
  right: max(24px, calc((100vw - 1120px) / 2));
  z-index: 8;
  width: 54px;
  height: 30px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface), transparent 18%);
  cursor: pointer;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.theme-toggle:focus {
  outline: none;
}

.theme-toggle:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--accent-2), transparent 20%);
  outline-offset: 3px;
}

.theme-toggle span {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff, #d7d9de);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.24);
  transition: transform 0.32s cubic-bezier(.2, .8, .2, 1), background 0.32s ease;
}

.theme-toggle.active span {
  transform: translateX(24px);
  background: linear-gradient(135deg, #9a86ff, #76adff);
}

.ray-hero {
  position: relative;
  min-height: 820px;
  padding: 106px 0 118px;
  isolation: isolate;
}

.ray-hero::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  background:
    radial-gradient(circle at var(--mx) var(--my), color-mix(in srgb, var(--accent), transparent 78%), transparent 28%),
    linear-gradient(90deg, color-mix(in srgb, var(--line), transparent 74%) 1px, transparent 1px);
  background-size: auto, 120px 100%;
  mask-image: linear-gradient(180deg, #000, transparent 78%);
}

.hero-shell,
.strategy-section,
.launch-section,
.ray-footer {
  width: min(1120px, calc(100% - 48px));
  margin-right: auto;
  margin-left: auto;
}

.hero-copy {
  width: min(780px, 100%);
  margin: 0 auto 58px;
  text-align: center;
}

.hero-kicker,
.section-head span,
.launch-section span,
.poster-header span,
.poster-flow span,
.workflow-board span {
  display: block;
  margin: 0;
  color: var(--accent);
  font-size: 12px;
  font-weight: 780;
  line-height: 1.2;
  text-transform: uppercase;
}

.hero-copy h1 {
  margin: 18px 0 0;
  color: var(--text);
  font-size: 58px;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: 0;
}

.hero-lead {
  width: min(620px, 100%);
  margin: 24px auto 0;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 34px;
}

.main-button,
.ghost-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 760;
  line-height: 1;
}

.main-button {
  min-width: 166px;
  border: 1px solid color-mix(in srgb, var(--accent-2), transparent 25%);
  color: var(--button-text);
  background: var(--button-bg);
  box-shadow: 0 18px 52px color-mix(in srgb, var(--accent-2), transparent 72%);
}

.ghost-button {
  min-width: 148px;
  border: 1px solid var(--line);
  color: var(--text);
  background: color-mix(in srgb, var(--surface), transparent 18%);
}

.blueprint-poster {
  position: relative;
  overflow: hidden;
  min-height: 410px;
  padding: 44px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--poster-bg), var(--surface-strong) 18%), var(--poster-bg)),
    linear-gradient(90deg, color-mix(in srgb, var(--line), transparent 72%) 1px, transparent 1px),
    linear-gradient(0deg, color-mix(in srgb, var(--line), transparent 78%) 1px, transparent 1px);
  background-size: auto, 72px 72px, 72px 72px;
  box-shadow: 0 30px 100px var(--poster-shadow);
}

.blueprint-poster::before {
  position: absolute;
  inset: 0;
  content: "";
  background:
    linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--accent), transparent 82%) 50%, transparent 100%),
    radial-gradient(circle at 50% 18%, color-mix(in srgb, var(--accent-2), transparent 78%), transparent 36%);
  pointer-events: none;
}

.poster-header {
  position: relative;
  z-index: 1;
  width: min(620px, 100%);
  margin: 0 auto;
  text-align: center;
}

.poster-header h2 {
  margin: 12px 0 0;
  color: var(--text);
  font-size: 34px;
  font-weight: 820;
  line-height: 1.08;
  letter-spacing: 0;
}

.poster-header p {
  width: min(520px, 100%);
  margin: 14px auto 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
}

.poster-flow {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  margin-top: 42px;
}

.poster-flow::before {
  position: absolute;
  top: 34px;
  right: 8%;
  left: 8%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), var(--accent-2), transparent);
  content: "";
}

.poster-flow article {
  position: relative;
  display: grid;
  min-height: 150px;
  align-content: start;
  justify-items: center;
  padding: 20px 14px 18px;
  border: 1px solid var(--line);
  border-radius: 8px;
  text-align: center;
  background: color-mix(in srgb, var(--poster-panel), transparent 5%);
  backdrop-filter: blur(18px);
}

.poster-flow article::before {
  width: 10px;
  height: 10px;
  margin: 9px 0 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 24px color-mix(in srgb, var(--accent-2), transparent 35%);
  content: "";
}

.poster-flow span {
  color: var(--accent-2);
  font-size: 11px;
}

.poster-flow h3 {
  margin: 0;
  color: var(--text);
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: 0;
}

.poster-flow p {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.55;
}

.poster-route {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 28px;
  color: var(--text-soft);
  font-size: 12px;
  font-weight: 720;
}

.poster-route i {
  width: 28px;
  height: 1px;
  background: var(--line-strong);
}

.strategy-section {
  margin-top: 126px;
}

.section-head {
  width: min(620px, 100%);
}

.section-head.center {
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.section-head h2,
.launch-section h2 {
  margin: 14px 0 0;
  color: var(--text);
  font-size: 42px;
  font-weight: 790;
  line-height: 1.12;
  letter-spacing: 0;
}

.section-head p,
.launch-section p {
  margin: 18px 0 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.78;
}

.diagnosis-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 42px;
}

.diagnosis-grid article,
.workflow-board article,
.deliverable-grid article {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
}

.diagnosis-grid article {
  min-height: 238px;
  padding: 30px;
}

.diagnosis-grid article:hover,
.workflow-board article:hover,
.deliverable-grid article:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent), var(--line) 36%);
}

.diagnosis-grid h3,
.workflow-board h3,
.deliverable-grid h3 {
  margin: 0;
  color: var(--text);
  font-size: 18px;
  font-weight: 780;
  line-height: 1.32;
}

.diagnosis-grid p,
.workflow-board p,
.deliverable-grid p {
  margin: 16px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.72;
}

.diagnosis-grid strong {
  display: block;
  margin-top: 26px;
  color: var(--accent-2);
  font-size: 13px;
  font-weight: 760;
}

.workflow-board {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1px;
  margin-top: 48px;
  padding: 1px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--line);
}

.workflow-board article {
  min-height: 286px;
  padding: 28px 24px;
  border: 0;
  border-radius: 7px;
  background: var(--surface-strong);
}

.workflow-board span {
  color: var(--accent-2);
}

.workflow-board h3 {
  margin-top: 28px;
}

.deliverable-section {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: 58px;
  align-items: start;
}

.deliverable-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.deliverable-grid article {
  min-height: 178px;
  padding: 28px;
  background: var(--surface-muted);
}

.launch-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 36px;
  align-items: center;
  margin-top: 134px;
  padding: 42px 44px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--surface), var(--accent) 7%), var(--surface));
}

.launch-section p {
  width: min(620px, 100%);
}

.ray-footer {
  display: grid;
  grid-template-columns: 72px repeat(4, 1fr);
  gap: 42px;
  margin-top: 118px;
  padding: 74px 0 90px;
  border-top: 1px solid var(--line);
}

.footer-mark {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 8px;
  color: var(--button-text);
  font-size: 11px;
  font-weight: 800;
  background: var(--button-bg);
}

.ray-footer nav {
  display: grid;
  gap: 10px;
  align-content: start;
}

.ray-footer strong {
  margin-bottom: 4px;
  color: var(--text);
  font-size: 13px;
  font-weight: 780;
}

.ray-footer a {
  color: var(--muted);
  font-size: 12px;
  transition: color 0.2s ease;
}

.ray-footer a:hover {
  color: var(--text);
}

.back-to-top {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 20;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--text);
  background: var(--surface);
  cursor: pointer;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.16);
}

@media (max-width: 1080px) {
  .hero-copy h1 {
    font-size: 50px;
  }

  .poster-flow,
  .workflow-board {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .poster-flow::before {
    display: none;
  }

  .workflow-board article {
    min-height: 220px;
  }

  .deliverable-section,
  .launch-section {
    grid-template-columns: 1fr;
  }

  .ray-footer {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .theme-toggle {
    right: 18px;
  }

  .ray-hero {
    min-height: auto;
    padding: 84px 0 84px;
  }

  .hero-shell,
  .strategy-section,
  .launch-section,
  .ray-footer {
    width: calc(100% - 28px);
  }

  .hero-copy {
    margin-bottom: 38px;
  }

  .hero-copy h1 {
    font-size: 38px;
    line-height: 1.1;
  }

  .hero-lead {
    font-size: 15px;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .main-button,
  .ghost-button {
    width: 100%;
  }

  .blueprint-poster {
    min-height: auto;
    padding: 28px 18px;
  }

  .poster-header h2 {
    font-size: 30px;
  }

  .poster-flow,
  .diagnosis-grid,
  .workflow-board,
  .deliverable-grid,
  .ray-footer {
    grid-template-columns: 1fr;
  }

  .poster-flow article {
    min-height: 132px;
  }

  .poster-route {
    display: none;
  }

  .strategy-section {
    margin-top: 86px;
  }

  .section-head h2,
  .launch-section h2 {
    font-size: 32px;
  }

  .diagnosis-grid article,
  .workflow-board article,
  .deliverable-grid article,
  .launch-section {
    padding: 24px;
  }

  .launch-section {
    margin-top: 96px;
  }
}
</style>
