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

const heroApps = ['AI', 'UI', '3D', 'BR', 'UX', 'CV', 'SD', 'PM', 'MG', 'AR', 'ID', 'GD']

const principles = [
  ['熟悉但更强的工具', '把设计、内容、素材和项目表达放进同一套稳定流程。'],
  ['不费力的界面', '页面只保留真正有用的入口，让浏览者快速理解你是谁。'],
  ['可协作的资源', '案例、方法和素材都能沉淀成可复用的个人资产。'],
  ['面向创作者体验', '不是堆作品，而是展示判断、过程和交付能力。'],
  ['从灵感到交付', 'AI 工作流帮助你更快试错，更稳地进入最终方案。'],
  ['发布到真实世界', '让网站成为作品集、资源库和方法论的长期载体。']
]

const quotes = [
  ['设计需要被理解，不只是被看见。这个网站把结果、过程和判断放在一起。', '品牌设计项目'],
  ['AI 不是装饰，而是把重复工作变成系统能力。这里能看到完整链路。', 'AIGC 工作流'],
  ['案例表达很清晰，能快速知道项目目标、视觉方向和最终价值。', '作品集复盘'],
  ['资源库让内容不再散落，适合长期维护个人品牌和创作资产。', '个人资源沉淀']
]

const footerGroups = [
  {
    title: '作品',
    links: [['案例库', '/portfolio/'], ['AI 工作流', '/aigc/'], ['资源库', '/resources/'], ['方法论', '/blog/']]
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
    title: '系统',
    links: [['设计资产', '/resources/'], ['提示词', '/resources/mj-prompt'], ['模板', '/resources/notion'], ['实验记录', '/aigc/']]
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
        <div class="app-cloud">
          <span v-for="(item, index) in heroApps" :key="item" :style="{ '--i': index }">{{ item }}</span>
        </div>
        <div class="poster-card">
          <span>AI 设计工作流</span>
          <strong>个人创作系统</strong>
          <small>案例 / 资源 / 方法论</small>
        </div>
      </div>

      <div class="hero-copy">
        <h1>让设计、内容与 AI 流程成为一套系统</h1>
        <p>把案例、AIGC 工作流、资源库和方法论连接起来，让个人网站不只是展示作品，而是呈现你的长期创作能力。</p>
        <a class="main-button" :href="pageLink('/portfolio/')">查看精选案例</a>
        <small>作品集 / 工作流 / 资源库</small>
      </div>
    </section>

    <section class="dual-showcase">
      <article class="showcase-card code-card">
        <div class="code-window">
          <span>import design from "personal-system"</span>
          <span>const workflow = createAIProcess()</span>
          <span>return publish(workflow, portfolio)</span>
        </div>
        <h2>开始构建</h2>
        <p>用案例、流程和工具把个人能力组织起来，不再只是展示图片，而是展示一套可以持续交付的设计方法。</p>
        <a :href="pageLink('/aigc/')">查看工作流</a>
      </article>

      <article class="showcase-card extension-card">
        <div class="mini-apps" aria-hidden="true">
          <span>F</span>
          <span>AI</span>
          <span>3D</span>
          <span>V</span>
          <span>UI</span>
        </div>
        <h2>扩展能力</h2>
        <p>把分散的灵感、素材、提示词和复盘变成网站里的清晰入口，让浏览者快速理解你的专业边界。</p>
        <a :href="pageLink('/resources/')">打开资源库</a>
      </article>
    </section>

    <section class="ecosystem">
      <div class="section-title">
        <h2>保持系统清晰、漂亮、可持续</h2>
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
        <h2>你站在正确的方向里</h2>
        <p>它依然很早，但你的作品、流程和资源已经可以被系统地看见。</p>
      </div>
      <div class="quote-row">
        <article v-for="quote in quotes" :key="quote[1]">
          <b></b>
          <p>“{{ quote[0] }}”</p>
          <span>{{ quote[1] }}</span>
        </article>
      </div>
      <a class="community-link" :href="pageLink('/blog/')">阅读方法论 →</a>
    </section>

    <section class="takeoff">
      <h2>准备好起飞了吗？</h2>
      <p>从一个案例开始，把你的设计判断、AI 流程和资源沉淀成长期资产。</p>
      <a class="main-button" :href="pageLink('/resume')">了解我是谁</a>
      <code>npx create-personal-system</code>
    </section>

    <section class="signal-cards">
      <article class="signal-card blue">
        <h3>保持更新</h3>
        <p>关注新的设计方法、AI 工具和真实项目复盘，让网站持续变强。</p>
      </article>
      <article class="signal-card red">
        <h3>一起塑造产品</h3>
        <p>如果你正在做品牌、内容或数字产品，可以把想法带进一次真实合作。</p>
      </article>
    </section>

    <section class="newsletter">
      <div>
        <h3>订阅更新</h3>
        <p>收到作品集、AI 工作流和资源沉淀的最新内容。</p>
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
  min-height: 760px;
  padding: 70px 24px 110px;
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
  width: min(760px, calc(100% - 32px));
  height: clamp(260px, 32vw, 330px);
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

.poster-card {
  position: absolute;
  right: 50%;
  bottom: 34px;
  z-index: 2;
  display: grid;
  min-width: min(360px, calc(100% - 56px));
  gap: 10px;
  padding: 24px 28px;
  border: 1px solid var(--poster-line);
  border-radius: 8px;
  color: var(--poster-ink);
  background: var(--poster-panel);
  box-shadow: 0 24px 70px var(--poster-shadow);
  transform: translateX(50%);
  backdrop-filter: blur(22px);
}

.poster-card span,
.poster-card small {
  color: var(--muted);
  font-size: 12px;
}

.poster-card strong {
  color: var(--poster-ink);
  font-size: clamp(30px, 4vw, 48px);
  line-height: 0.95;
}
.app-cloud {
  display: grid;
  position: absolute;
  top: 28px;
  left: 50%;
  z-index: 2;
  grid-template-columns: repeat(6, 48px);
  justify-content: center;
  gap: 12px;
  transform: translateX(-50%);
  perspective: 900px;
}

.app-cloud span {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 12px;
  color: var(--text);
  font-size: 12px;
  font-weight: 760;
  background:
    radial-gradient(circle at 28% 20%, rgba(255, 255, 255, 0.32), transparent 30%),
    linear-gradient(145deg, var(--card-strong), color-mix(in srgb, var(--card-strong), transparent 46%));
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.16);
  transform: translateY(calc((var(--i) - 6) * -1px)) rotateX(12deg);
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
  .app-cloud {
    grid-template-columns: repeat(4, 46px);
    gap: 12px;
  }

  .app-cloud span {
    width: 46px;
    height: 46px;
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
    height: 320px;
    margin-bottom: 44px;
  }

  .app-cloud {
    grid-template-columns: repeat(3, 44px);
  }

  .app-cloud span {
    width: 44px;
    height: 44px;
  }

  .hero-copy h1 {
    font-size: clamp(44px, 15vw, 66px);
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
