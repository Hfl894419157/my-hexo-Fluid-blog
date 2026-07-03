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

const heroApps = ['需求', '资料', '提示', '生成', '筛选', '资产', '复盘', '交付']

const principles = [
  ['需求拆解', '把目标、受众、约束和交付物转成 AI 能理解的创意简报。'],
  ['资料结构化', '整理参考、竞品、卖点、尺寸和内容素材，减少反复沟通。'],
  ['提示词策略', '建立变量、风格边界和批量规则，让方案探索可控。'],
  ['多方案生成', '快速获得方向、构图、文案和素材版本，扩大试错空间。'],
  ['人工筛选', '用设计判断保留有效结果，把时间放回决策与优化。'],
  ['资产沉淀', '把模板、提示词和复盘变成下一次项目的提效起点。']
]

const quotes = [
  ['定位高耗时环节：资料整理、初稿探索、文案变体、尺寸适配和复盘沉淀。', '01 诊断'],
  ['设计可复用流程：简报模板、提示词结构、生成批次、筛选标准和交付清单。', '02 搭建'],
  ['把 AI 输出接入设计判断：保留审美、策略和业务目标，不让工具替代决策。', '03 协同'],
  ['沉淀项目资产：每次交付都回收提示词、模板、案例和方法，持续提高效率。', '04 复盘']
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

      <div class="hero-poster" aria-hidden="true">
        <div class="poster-halo"></div>
        <div class="poster-grid"></div>
        <div class="poster-ring ring-one"></div>
        <div class="poster-ring ring-two"></div>
        <div class="app-cloud">
          <span v-for="(item, index) in heroApps" :key="item" :style="{ '--i': index }">{{ item }}</span>
        </div>
        <div class="poster-card">
          <span>AI DESIGN OPS</span>
          <strong>设计提效中枢</strong>
          <small>Brief / Prompt / Generate / Review</small>
        </div>
      </div>

      <div class="hero-copy">
        <h1>用 AI 推动设计提效，让产出变成可复用流程</h1>
        <p>这里呈现一套从需求拆解、提示词策略、多方案生成到资产沉淀的设计提效方案，让 AI 成为设计判断和项目交付的加速器。</p>
        <a class="main-button" :href="pageLink('/aigc/')">查看 AI 工作流</a>
        <small>需求诊断 / 流程搭建 / 资产沉淀</small>
      </div>
    </section>

    <section class="dual-showcase">
      <article class="showcase-card code-card">
        <div class="code-window">
          <span>brief = extract(project.goal, user.need)</span>
          <span>prompt = map(brief, style, format)</span>
          <span>output = review(generate(prompt))</span>
        </div>
        <h2>先诊断：哪些环节最值得提效</h2>
        <p>把项目拆成需求、资料、探索、筛选、交付和复盘，找到真正耗时的节点，再决定 AI 介入方式。</p>
        <a :href="pageLink('/blog/')">查看方法论</a>
      </article>

      <article class="showcase-card extension-card">
        <div class="mini-apps" aria-hidden="true">
          <span>B</span>
          <span>P</span>
          <span>G</span>
          <span>R</span>
          <span>A</span>
        </div>
        <h2>再搭建：可复用的 AI 设计工作流</h2>
        <p>把简报模板、提示词结构、生成批次、筛选标准和交付清单固化下来，让每次项目都能复用。</p>
        <a :href="pageLink('/resources/')">查看资源模板</a>
      </article>
    </section>

    <section class="ecosystem">
      <div class="section-title">
        <h2>AI 提效不是换工具，而是重组设计流程</h2>
      </div>
      <div class="principle-grid">
        <article v-for="item in principles" :key="item[0]">
          <i></i>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </section>

    <section class="company">
      <div class="center-title">
        <h2>首页内容按策划方案展开</h2>
        <p>浏览者先理解你解决什么问题，再看到你如何用 AI 组织流程、提升效率并沉淀方法。</p>
      </div>
      <div class="quote-row">
        <article v-for="quote in quotes" :key="quote[1]">
          <b></b>
          <span>{{ quote[1] }}</span>
          <p>{{ quote[0] }}</p>
        </article>
      </div>
      <a class="community-link" :href="pageLink('/portfolio/')">查看提效案例 →</a>
    </section>

    <section class="takeoff">
      <h2>从一个项目开始做提效改造</h2>
      <p>选择海报、详情页、短视频脚本或品牌内容中的一个高频任务，先搭出一套可复用流程，再逐步沉淀为系统。</p>
      <a class="main-button" :href="pageLink('/resume')">讨论合作方向</a>
      <code>Brief → Prompt → Batch → Review → Asset</code>
    </section>

    <section class="signal-cards">
      <article class="signal-card blue">
        <h3>给设计师</h3>
        <p>把重复执行交给流程，把时间留给判断、策略、审美和最终交付质量。</p>
      </article>
      <article class="signal-card red">
        <h3>给项目方</h3>
        <p>用更快的方案验证、更稳定的内容产出和更清晰的资产管理，降低沟通成本。</p>
      </article>
    </section>

    <section class="newsletter">
      <div>
        <h3>订阅更新</h3>
        <p>接收 AI 设计提效、提示词策略和项目复盘的最新内容。</p>
      </div>
      <form>
        <input aria-label="邮箱地址" placeholder="your@email.com">
        <button type="button">订阅</button>
      </form>
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
  --text: #18181d;
  --muted: rgba(111, 115, 123, 0.82);
  --card: rgba(255, 255, 255, 0.86);
  --card-strong: #ffffff;
  --line: #dedfe3;
  --glow-a: rgba(255, 255, 255, 0.88);
  --glow-b: rgba(24, 24, 29, 0.06);
  --accent: #7a7f89;
  --accent-2: #b7bbc3;
  --button-gradient: linear-gradient(135deg, #e8e9ed, #cfd3da);
  --poster-bg: rgba(255, 255, 255, 0.74);
  --poster-panel: rgba(255, 255, 255, 0.88);
  --poster-ink: #18181d;
  --poster-line: rgba(24, 24, 29, 0.1);
  --poster-shadow: rgba(24, 24, 29, 0.12);
  width: 100vw;
  min-height: 100vh;
  margin-right: calc(50% - 50vw);
  margin-left: calc(50% - 50vw);
  overflow: hidden;
  color: var(--text);
  background:
    radial-gradient(circle at 50% -5%, var(--glow-a), transparent 34%),
    radial-gradient(circle at 20% 20%, var(--glow-b), transparent 26%),
    linear-gradient(180deg, var(--bg), var(--bg-soft));
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  transition: background 0.45s ease, color 0.45s ease;
}

.ray-home.dark-mode {
  --bg: #080714;
  --bg-soft: #0b0a18;
  --text: #ffffff;
  --muted: rgba(199, 210, 255, 0.7);
  --card: rgba(17, 16, 34, 0.92);
  --card-strong: #111022;
  --line: #2d2a52;
  --glow-a: rgba(154, 134, 255, 0.26);
  --glow-b: rgba(118, 173, 255, 0.14);
  --accent: #9a86ff;
  --accent-2: #76adff;
  --button-gradient: linear-gradient(135deg, #9a86ff, #76adff);
  --poster-bg: rgba(17, 16, 34, 0.7);
  --poster-panel: rgba(17, 16, 34, 0.86);
  --poster-ink: #ffffff;
  --poster-line: #2d2a52;
  --poster-shadow: rgba(0, 0, 0, 0.44);
  background:
    radial-gradient(circle at 50% -6%, rgba(154, 134, 255, 0.22), transparent 34%),
    radial-gradient(circle at 72% 3%, rgba(118, 173, 255, 0.13), transparent 28%),
    linear-gradient(180deg, #080714 0%, #0b0a18 52%, #080714 100%);
}

:global(html.dark body),
:global(html.dark #app),
:global(html.dark .VPContent) {
  --site-bg: #080714;
}

.theme-toggle {
  position: absolute;
  top: 32px;
  right: clamp(22px, 7vw, 112px);
  z-index: 8;
  width: 56px;
  height: 30px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  cursor: pointer;
}

.theme-toggle span {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff, #d7d9de);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
  transition: transform 0.32s cubic-bezier(.2, .8, .2, 1), background 0.32s ease;
}

.theme-toggle.active span {
  transform: translateX(26px);
  background: linear-gradient(135deg, #9a86ff, #76adff);
}

a {
  color: inherit;
  text-decoration: none;
}

.ray-hero {
  position: relative;
  min-height: 840px;
  padding: 82px 24px 112px;
  isolation: isolate;
}

.ray-hero::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  background:
    radial-gradient(circle at var(--mx) var(--my), rgba(134, 91, 255, 0.2), transparent 24%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 112px);
  mask-image: linear-gradient(180deg, #000, transparent 76%);
}

.ray-home.light-mode .ray-hero::before {
  background:
    radial-gradient(circle at var(--mx) var(--my), rgba(24, 24, 29, 0.07), transparent 24%),
    repeating-linear-gradient(90deg, rgba(24, 24, 29, 0.045) 0 1px, transparent 1px 112px);
}

.hero-poster {
  position: relative;
  width: min(880px, calc(100% - 32px));
  height: clamp(330px, 36vw, 420px);
  margin: 0 auto 54px;
  overflow: hidden;
  border: 1px solid var(--poster-line);
  border-radius: 8px;
  background:
    radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent), transparent 72%), transparent 34%),
    radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--accent-2), transparent 76%), transparent 30%),
    linear-gradient(180deg, var(--poster-bg), color-mix(in srgb, var(--poster-bg), var(--bg-soft) 22%));
  box-shadow: 0 28px 100px var(--poster-shadow);
}

.poster-halo,
.poster-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.poster-halo {
  background:
    radial-gradient(circle at 50% 34%, color-mix(in srgb, var(--accent), transparent 54%), transparent 18%),
    radial-gradient(circle at 50% 76%, color-mix(in srgb, var(--accent-2), transparent 66%), transparent 24%);
  filter: blur(14px);
}

.poster-grid {
  opacity: 0.58;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--line), transparent 52%) 1px, transparent 1px),
    linear-gradient(0deg, color-mix(in srgb, var(--line), transparent 60%) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: radial-gradient(circle at 50% 48%, #000, transparent 72%);
}

.poster-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px solid color-mix(in srgb, var(--line), transparent 12%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.ring-one {
  width: min(520px, 76%);
  aspect-ratio: 1;
}

.ring-two {
  width: min(360px, 58%);
  aspect-ratio: 1;
  border-style: dashed;
}

.poster-ring::before,
.poster-ring::after {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 26px color-mix(in srgb, var(--accent), transparent 34%);
  content: "";
}

.poster-ring::before {
  top: 16%;
  left: 12%;
}

.poster-ring::after {
  right: 14%;
  bottom: 18%;
}

.poster-card {
  position: absolute;
  right: 50%;
  top: 50%;
  z-index: 2;
  display: grid;
  width: min(330px, calc(100% - 72px));
  gap: 8px;
  padding: 26px 28px;
  border: 1px solid var(--poster-line);
  border-radius: 8px;
  color: var(--poster-ink);
  text-align: center;
  background: var(--poster-panel);
  box-shadow: 0 24px 70px var(--poster-shadow);
  transform: translate(50%, -50%);
  backdrop-filter: blur(22px);
}

.poster-card span,
.poster-card small,
.poster-card strong,
.app-cloud span {
  font-family: inherit;
  font-size: 14px;
  line-height: 1.25;
  text-align: center;
}

.poster-card span,
.poster-card small {
  color: var(--muted);
  font-weight: 700;
}

.poster-card strong {
  color: var(--poster-ink);
  font-weight: 820;
}
.app-cloud {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: block;
  perspective: 900px;
}

.app-cloud span {
  position: absolute;
  display: grid;
  width: 76px;
  height: 42px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 12px;
  color: var(--text);
  font-weight: 780;
  background:
    radial-gradient(circle at 28% 20%, rgba(255, 255, 255, 0.32), transparent 30%),
    linear-gradient(145deg, var(--card-strong), color-mix(in srgb, var(--card-strong), transparent 46%));
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.16);
  transform: translate(-50%, -50%);
}

.app-cloud span:nth-child(1) {
  top: 17%;
  left: 50%;
}

.app-cloud span:nth-child(2) {
  top: 28%;
  left: 73%;
}

.app-cloud span:nth-child(3) {
  top: 50%;
  left: 82%;
}

.app-cloud span:nth-child(4) {
  top: 72%;
  left: 73%;
}

.app-cloud span:nth-child(5) {
  top: 83%;
  left: 50%;
}

.app-cloud span:nth-child(6) {
  top: 72%;
  left: 27%;
}

.app-cloud span:nth-child(7) {
  top: 50%;
  left: 18%;
}

.app-cloud span:nth-child(8) {
  top: 28%;
  left: 27%;
}

.ray-home.dark-mode .app-cloud span {
  color: rgba(255, 255, 255, 0.92);
  background:
    radial-gradient(circle at 28% 20%, rgba(255, 255, 255, 0.18), transparent 30%),
    linear-gradient(145deg, #262541, rgba(17, 16, 34, 0.78));
  box-shadow: 0 22px 62px rgba(0, 0, 0, 0.42), 0 0 44px rgba(154, 134, 255, 0.1);
}

.hero-copy {
  width: min(660px, calc(100% - 32px));
  margin: 0 auto;
  text-align: center;
}

.hero-copy h1 {
  margin: 0;
  color: var(--text);
  font-size: clamp(46px, 6vw, 76px);
  font-weight: 780;
  line-height: 0.96;
  letter-spacing: 0;
}

.hero-copy p {
  width: min(520px, 100%);
  margin: 26px auto 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.72;
}

.main-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 178px;
  min-height: 42px;
  margin-top: 30px;
  border: 1px solid var(--line);
  border-radius: 7px;
  color: var(--text);
  font-size: 13px;
  font-weight: 760;
  background: var(--button-gradient);
  box-shadow: 0 0 42px rgba(118, 173, 255, 0.16), 0 20px 60px rgba(0, 0, 0, 0.2);
}

.hero-copy small {
  display: block;
  margin-top: 16px;
  color: color-mix(in srgb, var(--muted), transparent 16%);
  font-size: 12px;
}

.dual-showcase,
.ecosystem,
.company,
.takeoff,
.signal-cards,
.newsletter,
.ray-footer {
  width: min(1060px, calc(100% - 48px));
  margin-right: auto;
  margin-left: auto;
}

.dual-showcase {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 0;
}

.showcase-card {
  min-height: 360px;
  padding: 44px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--card);
  backdrop-filter: blur(22px);
}

.code-card {
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.5), transparent 28%),
    linear-gradient(135deg, #f5f6f8, #dfe2e8);
  color: #18181d;
}

.ray-home.dark-mode .code-card {
  background:
    radial-gradient(circle at 18% 0%, rgba(154, 134, 255, 0.26), transparent 30%),
    linear-gradient(135deg, rgba(154, 134, 255, 0.9), rgba(118, 173, 255, 0.58));
  color: #ffffff;
}

.code-window {
  display: grid;
  gap: 10px;
  width: min(100%, 360px);
  margin-bottom: 58px;
  padding: 28px;
  border-radius: 8px;
  color: #e7d8ff;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 12px;
  background: #171226;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.32);
}

.extension-card {
  background:
    radial-gradient(circle at 58% 12%, rgba(154, 134, 255, 0.18), transparent 24%),
    radial-gradient(circle at 80% 0%, rgba(118, 173, 255, 0.13), transparent 24%),
    var(--card);
}

.mini-apps {
  display: flex;
  gap: 16px;
  margin: 58px 0 76px;
}

.mini-apps span {
  display: grid;
  width: 50px;
  height: 50px;
  place-items: center;
  border-radius: 14px;
  color: var(--text);
  font-size: 12px;
  font-weight: 760;
  background: var(--button-gradient);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.32);
}

.showcase-card h2,
.showcase-card p,
.showcase-card a {
  margin-left: 0;
}

.showcase-card h2 {
  margin: 0;
  font-size: 22px;
  line-height: 1.2;
}

.showcase-card p {
  max-width: 370px;
  margin: 14px 0 22px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.72;
}

.code-card p {
  color: rgba(24, 24, 29, 0.68);
}

.ray-home.dark-mode .code-card p {
  color: rgba(255, 255, 255, 0.72);
}

.showcase-card a {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  padding: 0 14px;
  border-radius: 6px;
  color: var(--text);
  font-size: 12px;
  background: rgba(255, 255, 255, 0.11);
}

.code-card a {
  color: #18181d;
  background: rgba(255, 255, 255, 0.42);
}

.ray-home.dark-mode .code-card a {
  color: #ffffff;
  background: rgba(17, 16, 34, 0.22);
}

.ecosystem {
  margin-top: 152px;
}

.section-title {
  max-width: 640px;
}

.section-title h2,
.center-title h2,
.takeoff h2 {
  margin: 0;
  color: var(--text);
  font-size: clamp(38px, 5vw, 58px);
  font-weight: 760;
  line-height: 0.98;
  letter-spacing: 0;
}

.principle-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  width: min(820px, 100%);
  margin: 70px auto 0;
}

.principle-grid article {
  min-height: 220px;
  padding: 30px;
  border: 1px solid var(--line);
  background: var(--card);
}

.principle-grid i {
  display: block;
  width: 36px;
  height: 36px;
  margin-bottom: 26px;
  border-radius: 10px;
  background:
    radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.42), transparent 36%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04));
}

.principle-grid h3 {
  margin: 0;
  color: var(--text);
  font-size: 15px;
}

.principle-grid p {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.66;
}

.company {
  margin-top: 170px;
}

.center-title {
  text-align: center;
}

.center-title p {
  width: min(520px, 100%);
  margin: 22px auto 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
}

.quote-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(260px, 1fr));
  gap: 2px;
  width: 100vw;
  margin: 76px 0 0 calc(50% - 50vw);
  padding: 0 18px;
}

.quote-row article {
  min-height: 260px;
  padding: 34px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--card), transparent 18%);
}

.quote-row b {
  display: block;
  width: 36px;
  height: 36px;
  margin-bottom: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9a86ff, #76adff);
}

.quote-row p {
  margin: 0;
  color: var(--text);
  font-size: 13px;
  line-height: 1.78;
}

.quote-row span {
  display: block;
  margin-top: 22px;
  color: var(--accent-2);
  font-size: 12px;
}

.community-link {
  display: table;
  margin: 58px auto 0;
  color: var(--text);
  font-size: 13px;
}

.takeoff {
  margin-top: 170px;
  text-align: center;
}

.takeoff p {
  width: min(520px, 100%);
  margin: 18px auto 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.72;
}

.takeoff code {
  display: table;
  margin: 20px auto 0;
  padding: 12px 18px;
  border: 1px solid var(--line);
  border-radius: 7px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.04);
}

.signal-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 170px;
}

.signal-card {
  min-height: 174px;
  padding: 38px;
  border: 1px solid var(--line);
  border-radius: 8px;
}

.signal-card.blue {
  background: var(--button-gradient);
}

.signal-card.red {
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent), #ffffff 10%), color-mix(in srgb, var(--accent-2), transparent 12%));
}

.signal-card h3 {
  margin: 0;
  color: var(--text);
  font-size: 18px;
}

.signal-card p {
  max-width: 410px;
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.newsletter {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.9fr);
  gap: 60px;
  align-items: center;
  margin-top: 78px;
}

.newsletter h3 {
  margin: 0;
  color: var(--text);
  font-size: 17px;
}

.newsletter p {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.newsletter form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 116px;
  gap: 10px;
}

.newsletter input,
.newsletter button {
  min-height: 42px;
  border: 1px solid var(--line);
  border-radius: 7px;
  font: inherit;
}

.newsletter input {
  padding: 0 14px;
  color: var(--text);
  background: var(--card);
}

.newsletter button {
  color: var(--text);
  background: var(--button-gradient);
}

.ray-footer {
  display: grid;
  grid-template-columns: 70px repeat(4, 1fr);
  gap: 42px;
  margin-top: 130px;
  padding: 76px 0 92px;
  border-top: 1px solid var(--line);
}

.footer-mark {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 8px;
  color: var(--text);
  font-size: 11px;
  font-weight: 760;
  background: var(--button-gradient);
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
}

.ray-footer a {
  color: var(--muted);
  font-size: 12px;
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
  background: var(--card);
  cursor: pointer;
}

@media (max-width: 960px) {
  .app-cloud span {
    width: 70px;
    height: 40px;
  }

  .dual-showcase,
  .principle-grid,
  .signal-cards,
  .newsletter,
  .ray-footer {
    grid-template-columns: 1fr;
  }

  .quote-row {
    grid-template-columns: repeat(2, minmax(260px, 1fr));
  }
}

@media (max-width: 640px) {
  .ray-hero {
    padding-top: 76px;
  }

  .hero-poster {
    height: 360px;
    margin-bottom: 44px;
  }

  .app-cloud span {
    width: 62px;
    height: 36px;
    font-size: 12px;
  }

  .poster-card {
    width: min(270px, calc(100% - 54px));
    padding: 22px 20px;
  }

  .poster-card span,
  .poster-card small,
  .poster-card strong {
    font-size: 12px;
  }

  .hero-copy h1 {
    font-size: clamp(38px, 12vw, 58px);
  }

  .dual-showcase,
  .ecosystem,
  .company,
  .takeoff,
  .signal-cards,
  .newsletter,
  .ray-footer {
    width: calc(100% - 28px);
  }

  .showcase-card,
  .principle-grid article,
  .quote-row article,
  .signal-card {
    padding: 26px;
  }

  .quote-row {
    grid-template-columns: 1fr;
  }

  .newsletter form {
    grid-template-columns: 1fr;
  }
}
</style>
