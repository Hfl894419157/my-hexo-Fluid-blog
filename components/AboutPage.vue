<script setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'
import ResponsiveImage from './ResponsiveImage.vue'
import profile from '../.shared/content/profile.json'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { publishedContent } from '../.shared/contentClient.js'

const workflows = publishedContent(contentCatalog.workflows)
const cases = publishedContent(contentCatalog.cases)

const findById = (items, id) => items.find((item) => item.contentId === id)

const flagship = findById(workflows, '2b7f85b9-98f6-416e-b334-143711834901')
const brandCase = findById(cases, '4ad30ecb-deac-4526-8c62-313946621468')
const renderCase = findById(cases, '2e2425de-8c61-4aab-abd0-8084290387ad')
const posterWorkflow = findById(workflows, '3b346090-470d-48a6-aba6-c9b910769816')

const imageOf = (item, fallback) => item?.homeCover || item?.cover || fallback
const heroImages = computed(() => ({
  flagship: imageOf(flagship, '/images/uploads/工作流板块图片/GTS200工作流案例/封面.jpg'),
  brand: imageOf(brandCase, '/images/uploads/案例板块图片/北食刻品牌设计/12.jpg'),
  render: imageOf(renderCase, '/images/uploads/案例板块图片/3D模搭建型渲染/22.jpg')
}))

const journey = [
  {
    index: '01',
    title: '商业视觉',
    description: '从产品事实、信息层级和使用场景出发，理解一套视觉为什么成立，也理解什么才算完成交付。'
  },
  {
    index: '02',
    title: '3D 与跨媒介表达',
    description: '把平面判断延伸到产品建模、材质、光影与空间，让表达不被单一工具和媒介限制。'
  },
  {
    index: '03',
    title: 'AI 协同生产',
    description: '不追求一次生成的偶然结果，而是把资料理解、策划、生成、校验与精修连接起来。'
  },
  {
    index: '04',
    title: '知识与工具系统',
    description: '把验证过的规则、Prompt、模板和复盘送回下一次项目，让经验不随着交付结束而消失。'
  }
]

const workflowSteps = [
  ['理解', '先读产品资料，确认结构、参数与真实使用方式'],
  ['策划', '提炼卖点，统一主图与详情页的内容逻辑'],
  ['生成', '围绕明确任务逐张出图，而不是随机碰方向'],
  ['校验', '检查结构、文案、参数、场景与系列一致性'],
  ['沉淀', '保留有效规则、提示词与检查依据']
]

const principles = [
  {
    index: '01',
    title: '准确，先于表面效果',
    description: '产品结构、参数和使用场景不能因为画面更好看而被随意改变。商业视觉首先要对产品负责。'
  },
  {
    index: '02',
    title: '规则，先于批量生成',
    description: '先明确品牌、构图、产品与文字规范，再让 AI 在边界内扩展方向，系列内容才不会失控。'
  },
  {
    index: '03',
    title: '判断，始终由人完成',
    description: 'AI 可以帮助提炼、策划与生成，但什么该保留、什么能交付，仍然依赖设计经验与人工判断。'
  },
  {
    index: '04',
    title: '交付之后仍有积累',
    description: '一次项目留下的不只有成品，还应包括可复用的 Prompt、变量、模板、规范与检查清单。'
  }
]

const practiceMeta = new Map([
  [brandCase?.contentId, {
    eyebrow: '品牌设计',
    title: '北食刻品牌设计',
    description: '从品牌识别到多场景视觉延展，呈现传统商业设计基础与完整表达能力。'
  }],
  [renderCase?.contentId, {
    eyebrow: '3D 视觉',
    title: '产品建模与渲染作品',
    description: '通过模型、材质与光影建立产品表现，也为 AI 视觉提供更准确的空间判断。'
  }],
  [posterWorkflow?.contentId, {
    eyebrow: 'AI 工作流',
    title: '系列海报批量生成流程',
    description: '先建立品牌档案和系列规则，再批量策划与生成，让效率建立在一致性之上。'
  }]
])

const practices = [brandCase, renderCase, posterWorkflow]
  .filter(Boolean)
  .map((item) => ({
    ...item,
    ...practiceMeta.get(item.contentId),
    image: imageOf(item, item.cover)
  }))

const collaborationFits = [
  '产品资料复杂，需要提炼卖点并完成整套视觉',
  '需要持续生产系列内容，同时保持品牌表达统一',
  '已经开始使用 AI，但结果不稳定、难以进入交付',
  '希望把一次项目整理成后续可复用的生产流程'
]

const mailLink = `mailto:${profile.email}`
const yearsValue = String(profile.yearsValue).padStart(2, '0')
</script>

<template>
  <main class="about-page">
    <section class="about-hero" aria-labelledby="about-title">
      <div class="about-hero__copy" v-reveal="{ y: 20, blur: 3 }">
        <p class="about-kicker">HAN FULI · COMMERCIAL VISUAL / AI WORKFLOW</p>
        <h1 id="about-title">
          <span>我用 {{ profile.yearsValue }} 年设计经验</span>
          <span>判断结果，<em>用 AI</em></span>
          <span>重构视觉生产过程。</span>
        </h1>
        <p class="about-hero__lead">
          从产品资料、卖点提炼、主图与详情页，到品牌内容和可复用工作流。我关心的不是生成了多少张图，而是最后能否准确、统一、稳定地完成交付。
        </p>
        <div class="about-hero__actions">
          <BaseButton href="#featured-practice">查看代表实践</BaseButton>
          <BaseButton :href="mailLink" variant="secondary">联系合作</BaseButton>
        </div>
        <dl class="about-hero__facts">
          <div>
            <dt>{{ yearsValue }}</dt>
            <dd>{{ profile.yearsLabel }}</dd>
          </div>
          <div>
            <dt>视觉交付</dt>
            <dd>主图 · 详情页 · 品牌内容</dd>
          </div>
          <div>
            <dt>流程资产</dt>
            <dd>Prompt · 规范 · 检查清单</dd>
          </div>
        </dl>
      </div>

      <div class="about-hero__visual" v-reveal="{ delay: 120, y: 28, blur: 4 }" aria-label="代表实践作品拼贴">
        <figure class="about-collage about-collage--main">
          <ResponsiveImage
            :src="heroImages.flagship"
            alt="GTS200 产品整套商业视觉"
            profile="card"
            sizes="(max-width: 760px) 64vw, 390px"
            eager
          />
          <figcaption><span>AI WORKFLOW</span><strong>从资料到整套视觉</strong></figcaption>
        </figure>
        <figure class="about-collage about-collage--brand">
          <ResponsiveImage
            :src="heroImages.brand"
            alt="北食刻品牌设计"
            profile="card"
            sizes="(max-width: 760px) 32vw, 220px"
            eager
          />
          <figcaption><span>BRAND</span><strong>品牌识别</strong></figcaption>
        </figure>
        <figure class="about-collage about-collage--render">
          <ResponsiveImage
            :src="heroImages.render"
            alt="3D 产品建模与渲染"
            profile="card"
            sizes="(max-width: 760px) 32vw, 220px"
            eager
          />
          <figcaption><span>3D VISUAL</span><strong>产品表达</strong></figcaption>
        </figure>
        <span class="about-hero__visual-index" aria-hidden="true">ABOUT / PRACTICE</span>
      </div>
    </section>

    <section class="about-story about-block" aria-labelledby="story-title">
      <header class="about-section-heading" v-reveal="{ y: 18 }">
        <span>01 / ORIGIN</span>
        <h2 id="story-title">我不是从 AI 开始的。</h2>
        <p>AI 是进入工作的新工具，商业设计经验才是判断结果的底层依据。</p>
      </header>

      <div class="about-story__body">
        <div class="about-story__statement" v-reveal="{ delay: 80, y: 20 }">
          <p>我的起点是商业视觉设计。</p>
          <p>过去的实践让我长期面对同一类真实问题：如何理解产品、组织信息、提炼卖点，再把设计落实到主图、详情页、品牌内容和不同媒介中。</p>
          <blockquote>
            AI 出现以后，我真正关心的不是它能不能替代设计师，而是怎样把它放进真实工作，让生成结果受到产品事实、品牌规则和交付标准的约束。
          </blockquote>
          <p>所以我开始拆解流程、控制变量、记录问题，并把有效的方法持续沉淀下来。这个网站，就是这些实践正在生长的地方。</p>
        </div>

        <ol class="about-journey" aria-label="能力形成路径">
          <li v-for="(item, index) in journey" :key="item.index" v-reveal="{ delay: index * 70, y: 18 }">
            <span>{{ item.index }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section id="featured-practice" class="about-proof about-block" aria-labelledby="proof-title">
      <header class="about-section-heading about-section-heading--wide" v-reveal="{ y: 18 }">
        <span>02 / PROOF</span>
        <h2 id="proof-title">价值不写在能力标签里，<br>写在怎么把问题做完。</h2>
        <p>以 GTS200 为例：从复杂产品资料进入，经过策划、生成、校验和规范化，最终形成一套能够实际使用的商业视觉。</p>
      </header>

      <article class="about-feature" v-reveal="{ y: 24, blur: 4 }">
        <a v-if="flagship?.link" class="about-feature__media" :href="flagship.link" aria-label="查看 GTS200 完整工作流">
          <ResponsiveImage
            :src="heroImages.flagship"
            alt="GTS200 产品视觉工作流成品"
            profile="homeMobile"
            desktop-profile="homeDesktop"
            sizes="(max-width: 900px) calc(100vw - 32px), 660px"
          />
          <span>PRODUCT → CONTENT → SYSTEM</span>
        </a>
        <div v-else class="about-feature__media">
          <ResponsiveImage
            :src="heroImages.flagship"
            alt="GTS200 产品视觉工作流成品"
            profile="homeMobile"
            desktop-profile="homeDesktop"
            sizes="(max-width: 900px) calc(100vw - 32px), 660px"
          />
          <span>PRODUCT → CONTENT → SYSTEM</span>
        </div>

        <div class="about-feature__copy">
          <p class="about-feature__eyebrow">FEATURED PRACTICE / GTS200</p>
          <h3>从产品资料到整套视觉落地</h3>
          <p class="about-feature__intro">面对多种探头、线缆和连接器规格，画面效果不是唯一标准；产品结构准确、内容逻辑统一、整套交付可用，才是这个项目真正要解决的问题。</p>

          <ol class="about-feature__steps">
            <li v-for="([title, description], index) in workflowSteps" :key="title">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <strong>{{ title }}</strong>
              <p>{{ description }}</p>
            </li>
          </ol>

          <div class="about-feature__deliverables">
            <span>最终形成</span>
            <p>产品主图 / 详情页 / 应用场景 / 社媒内容 / 可复用规则</p>
          </div>
          <a v-if="flagship?.link" class="about-text-link" :href="flagship.link">查看完整实践过程 <span aria-hidden="true">→</span></a>
        </div>
      </article>
    </section>

    <section class="about-principles about-block" aria-labelledby="principles-title">
      <header class="about-section-heading" v-reveal="{ y: 18 }">
        <span>03 / JUDGEMENT</span>
        <h2 id="principles-title">我真正提供的，<br>不只是出图速度。</h2>
        <p>工具会快速变化，决定项目质量的仍然是对产品、规则、取舍和交付的判断。</p>
      </header>

      <ol class="about-principles__list">
        <li v-for="(item, index) in principles" :key="item.index" v-reveal="{ delay: index * 60, y: 16 }">
          <span>{{ item.index }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </li>
      </ol>
    </section>

    <section v-if="practices.length" class="about-practices about-block" aria-labelledby="practices-title">
      <header class="about-section-heading about-section-heading--inline" v-reveal="{ y: 18 }">
        <div>
          <span>04 / PRACTICE MAP</span>
          <h2 id="practices-title">能力来自不同类型的真实练习。</h2>
        </div>
        <a href="/portfolio/">查看全部作品 <span aria-hidden="true">→</span></a>
      </header>

      <div class="about-practices__grid">
        <article v-for="(item, index) in practices" :key="item.contentId" v-reveal="{ delay: index * 80, y: 22 }">
          <a class="about-practice-card__media" :href="item.link" :aria-label="`查看${item.title}`">
            <ResponsiveImage
              :src="item.image"
              :alt="item.title"
              profile="card"
              sizes="(max-width: 720px) calc(100vw - 32px), (max-width: 1000px) 50vw, 380px"
            />
          </a>
          <div class="about-practice-card__copy">
            <span>{{ item.eyebrow }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <a :href="item.link">进入查看 <span aria-hidden="true">→</span></a>
          </div>
        </article>
      </div>
    </section>

    <section class="about-identity about-block" aria-labelledby="identity-title">
      <div class="about-identity__portrait" v-reveal="{ y: 22, blur: 4 }">
        <ResponsiveImage
          :src="profile.avatar"
          :alt="`${profile.name}的个人形象`"
          sizes="(max-width: 720px) 72vw, 380px"
        />
        <span aria-hidden="true">HF / {{ yearsValue }}</span>
      </div>

      <div class="about-identity__copy" v-reveal="{ delay: 100, y: 20 }">
        <p class="about-kicker">05 / THE PERSON</p>
        <h2 id="identity-title">关于韩福利</h2>
        <strong>{{ profile.role }}</strong>
        <p>我是一名商业视觉设计师，也是一名持续研究 AI、设计和知识系统的实践者。</p>
        <p>相比追逐每一个新工具，我更关心哪些方法能够真正进入工作，哪些判断经得起反复使用。目前我正在持续建设自己的作品、工作流、知识库和网站系统，把分散的学习与项目经验组织成长期可复用的个人能力。</p>
        <dl>
          <div><dt>实践基础</dt><dd>{{ profile.yearsValue }} 年商业视觉设计</dd></div>
          <div><dt>当前关注</dt><dd>产品视觉 / 品牌内容 / AI 工作流</dd></div>
          <div><dt>持续建设</dt><dd>知识管理 / 网站系统 / 自动化实践</dd></div>
        </dl>
      </div>
    </section>

    <section class="about-collaboration about-block" aria-labelledby="collaboration-title">
      <div class="about-collaboration__head" v-reveal="{ y: 18 }">
        <span>06 / COLLABORATION</span>
        <h2 id="collaboration-title">如果你需要的，<br>不只是“让 AI 出一张图”。</h2>
      </div>
      <div class="about-collaboration__body" v-reveal="{ delay: 80, y: 18 }">
        <p>以下问题更适合从完整的内容逻辑、视觉判断和生产流程开始，而不是直接进入生成。</p>
        <ul>
          <li v-for="item in collaborationFits" :key="item">{{ item }}</li>
        </ul>
        <p class="about-collaboration__note">你可以在邮件中说明项目背景、产品资料、期望交付和计划时间，我会根据实际情况回复。</p>
        <div class="about-collaboration__actions">
          <BaseButton :href="mailLink">发送合作邮件</BaseButton>
          <BaseButton href="/faq#cooperation" variant="ghost">查看合作说明</BaseButton>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  width: min(var(--page-width), 100%);
  margin-inline: auto;
  color: var(--text-main);
}

.about-kicker,
.about-section-heading > span,
.about-section-heading > div > span,
.about-collaboration__head > span {
  display: block;
  color: var(--brand-main);
  font: 700 11px/1.4 var(--font-mono);
  letter-spacing: .14em;
  text-transform: uppercase;
}

.about-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(430px, .98fr);
  gap: clamp(44px, 6vw, 84px);
  min-height: 640px;
  align-items: center;
  padding: 24px 0 76px;
  border-bottom: 1px solid var(--border-soft);
}

.about-hero__copy h1 {
  margin: 24px 0 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(44px, 4.6vw, 64px);
  font-weight: 600;
  line-height: 1.18;
  letter-spacing: -.055em;
}

.about-hero__copy h1 span { display: block; }
.about-hero__copy h1 em { color: var(--brand-main); font-style: normal; }

.about-hero__lead {
  max-width: 650px;
  margin: 28px 0 0;
  color: var(--text-sub);
  font-size: 16px;
  line-height: 1.95;
}

.about-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }

.about-hero__facts {
  display: grid;
  grid-template-columns: .7fr 1.15fr 1.15fr;
  gap: 0;
  margin: 46px 0 0;
  padding-top: 22px;
  border-top: 1px solid var(--border-soft);
}

.about-hero__facts > div { min-width: 0; padding-right: 18px; }
.about-hero__facts > div + div { padding-left: 22px; border-left: 1px solid var(--border-soft); }
.about-hero__facts dt { color: var(--text-main); font-family: var(--font-display); font-size: 20px; font-weight: 600; line-height: 1.3; }
.about-hero__facts dd { margin: 7px 0 0; color: var(--text-muted); font-size: 11px; font-weight: 650; letter-spacing: .03em; line-height: 1.55; }

.about-hero__visual {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(150px, .8fr);
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  height: 552px;
  padding: 16px;
  border: 1px solid var(--border-soft);
  border-radius: 18px;
  background:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
    color-mix(in srgb, var(--bg-card) 90%, transparent);
  background-size: 32px 32px, 32px 32px, auto;
  box-shadow: var(--shadow-card);
}

.about-hero__visual::before,
.about-hero__visual::after {
  position: absolute;
  z-index: 3;
  width: 34px;
  height: 34px;
  border-color: var(--border-strong);
  border-style: solid;
  content: '';
  pointer-events: none;
}
.about-hero__visual::before { top: -7px; left: -7px; border-width: 1px 0 0 1px; }
.about-hero__visual::after { right: -7px; bottom: -7px; border-width: 0 1px 1px 0; }

.about-collage { position: relative; overflow: hidden; margin: 0; border: 1px solid var(--border-soft); border-radius: 10px; background: var(--bg-soft); }
.about-collage--main { grid-row: 1 / 3; }
.about-collage :deep(.responsive-picture),
.about-collage :deep(img) { display: block; width: 100%; height: 100%; }
.about-collage :deep(img) { object-fit: cover; filter: var(--image-treatment); transition: transform .7s ease; }
.about-collage:hover :deep(img) { transform: scale(1.025); }
.about-collage figcaption {
  position: absolute;
  inset: auto 0 0;
  display: grid;
  gap: 3px;
  padding: 30px 16px 14px;
  color: #fff;
  background: linear-gradient(transparent, rgba(9, 10, 12, .82));
}
.about-collage figcaption span { font: 700 9px/1.3 var(--font-mono); letter-spacing: .13em; opacity: .72; }
.about-collage figcaption strong { font-size: 13px; line-height: 1.4; }
.about-hero__visual-index {
  position: absolute;
  right: 24px;
  bottom: -30px;
  color: var(--text-muted);
  font: 600 9px/1 var(--font-mono);
  letter-spacing: .13em;
}

.about-block { margin-top: clamp(96px, 11vw, 144px); }

.about-section-heading { display: grid; grid-template-columns: minmax(0, 380px) minmax(280px, 1fr); column-gap: clamp(48px, 8vw, 112px); align-items: end; }
.about-section-heading > span { grid-column: 1 / -1; margin-bottom: 19px; }
.about-section-heading h2,
.about-collaboration__head h2 {
  margin: 0;
  font-size: clamp(34px, 4.2vw, 52px);
  line-height: 1.25;
  letter-spacing: -.045em;
}
.about-section-heading > p { max-width: 560px; margin: 0; color: var(--text-sub); font-size: 14px; line-height: 1.9; }
.about-section-heading--wide { grid-template-columns: minmax(0, 1.25fr) minmax(320px, .75fr); }

.about-story__body {
  display: grid;
  grid-template-columns: minmax(0, .82fr) minmax(460px, 1.18fr);
  gap: clamp(52px, 9vw, 124px);
  margin-top: 58px;
  padding-top: 52px;
  border-top: 1px solid var(--border-soft);
}

.about-story__statement > p { margin: 0; color: var(--text-sub); font-size: 15px; line-height: 1.95; }
.about-story__statement > p + p { margin-top: 18px; }
.about-story__statement > p:first-child { color: var(--text-main); font-family: var(--font-display); font-size: 26px; font-weight: 600; }
.about-story__statement blockquote {
  margin: 30px 0;
  padding: 4px 0 4px 24px;
  border-left: 2px solid var(--brand-main);
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 550;
  line-height: 1.8;
}

.about-journey { display: grid; margin: 0; padding: 0; list-style: none; }
.about-journey li { display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 22px; padding: 0 0 28px; position: relative; }
.about-journey li:not(:last-child)::before { position: absolute; top: 24px; bottom: 0; left: 17px; width: 1px; background: var(--border-soft); content: ''; }
.about-journey li > span { position: relative; z-index: 1; display: grid; width: 35px; height: 35px; place-items: center; border: 1px solid var(--border-strong); border-radius: 50%; background: var(--bg-page); color: var(--brand-main); font: 700 10px/1 var(--font-mono); }
.about-journey h3 { margin: 2px 0 0; font-size: 21px; line-height: 1.4; }
.about-journey p { margin: 8px 0 0; color: var(--text-sub); font-size: 13px; line-height: 1.85; }

.about-feature {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(390px, .88fr);
  min-height: 720px;
  overflow: hidden;
  margin-top: 48px;
  border: 1px solid var(--border-soft);
  border-radius: 18px;
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
}

.about-feature__media { position: relative; display: block; min-width: 0; overflow: hidden; background: var(--bg-soft); color: inherit; text-decoration: none; }
.about-feature__media :deep(.responsive-picture),
.about-feature__media :deep(img) { display: block; width: 100%; height: 100%; }
.about-feature__media :deep(img) { object-fit: cover; filter: var(--image-treatment); transition: transform .7s ease; }
.about-feature__media:hover :deep(img) { transform: scale(1.018); }
.about-feature__media > span { position: absolute; right: 24px; bottom: 22px; padding: 8px 10px; border: 1px solid rgba(255,255,255,.18); border-radius: 6px; color: rgba(255,255,255,.84); background: rgba(8,9,11,.64); font: 700 9px/1 var(--font-mono); letter-spacing: .12em; backdrop-filter: blur(12px); }

.about-feature__copy { display: flex; min-width: 0; flex-direction: column; justify-content: center; padding: clamp(36px, 4.3vw, 58px); }
.about-feature__eyebrow { margin: 0; color: var(--brand-main); font: 700 10px/1.4 var(--font-mono); letter-spacing: .12em; }
.about-feature__copy > h3 { margin: 18px 0 0; font-size: clamp(28px, 3vw, 40px); line-height: 1.3; }
.about-feature__intro { margin: 18px 0 0; color: var(--text-sub); font-size: 14px; line-height: 1.9; }

.about-feature__steps { display: grid; margin: 30px 0 0; padding: 0; border-top: 1px solid var(--border-soft); list-style: none; }
.about-feature__steps li { display: grid; grid-template-columns: 28px 54px minmax(0, 1fr); gap: 12px; align-items: baseline; padding: 14px 0; border-bottom: 1px solid var(--border-soft); }
.about-feature__steps li > span { color: var(--brand-main); font: 700 9px/1 var(--font-mono); }
.about-feature__steps strong { font-size: 13px; }
.about-feature__steps p { margin: 0; color: var(--text-muted); font-size: 11px; line-height: 1.65; }
.about-feature__deliverables { margin-top: 26px; }
.about-feature__deliverables span { color: var(--text-muted); font-size: 10px; font-weight: 700; letter-spacing: .08em; }
.about-feature__deliverables p { margin: 6px 0 0; color: var(--text-main); font-size: 12px; font-weight: 650; line-height: 1.7; }
.about-text-link { width: fit-content; margin-top: 28px; color: var(--brand-main); font-size: 13px; font-weight: 700; text-decoration: none; }
.about-text-link span,
.about-practice-card__copy > a span,
.about-section-heading--inline > a span { display: inline-block; margin-left: 4px; transition: transform 180ms ease; }
.about-text-link:hover span,
.about-practice-card__copy > a:hover span,
.about-section-heading--inline > a:hover span { transform: translateX(4px); }

.about-principles { display: grid; grid-template-columns: minmax(300px, .76fr) minmax(500px, 1.24fr); gap: clamp(64px, 10vw, 136px); align-items: start; }
.about-principles .about-section-heading { display: block; position: sticky; top: 120px; }
.about-principles .about-section-heading > span { margin-bottom: 19px; }
.about-principles .about-section-heading > p { margin-top: 22px; }
.about-principles__list { display: grid; margin: 0; padding: 0; border-top: 1px solid var(--border-soft); list-style: none; }
.about-principles__list li { display: grid; grid-template-columns: 48px minmax(170px, .8fr) minmax(240px, 1.2fr); gap: 20px; align-items: start; padding: 30px 0; border-bottom: 1px solid var(--border-soft); }
.about-principles__list li > span { padding-top: 5px; color: var(--brand-main); font: 700 10px/1 var(--font-mono); }
.about-principles__list h3 { margin: 0; font-size: 21px; line-height: 1.5; }
.about-principles__list p { margin: 0; color: var(--text-sub); font-size: 13px; line-height: 1.85; }

.about-section-heading--inline { display: flex; align-items: end; justify-content: space-between; gap: 32px; }
.about-section-heading--inline > div > span { margin-bottom: 19px; }
.about-section-heading--inline > a { flex: 0 0 auto; padding-bottom: 8px; color: var(--brand-main); font-size: 13px; font-weight: 700; text-decoration: none; }
.about-practices__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 44px; }
.about-practices__grid article { display: flex; min-width: 0; flex-direction: column; overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-card); transition: transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth); }
.about-practices__grid article:hover { border-color: var(--border-strong); box-shadow: var(--shadow-card); transform: translateY(-4px); }
.about-practice-card__media { display: block; aspect-ratio: 16 / 10; overflow: hidden; border-bottom: 1px solid var(--border-soft); }
.about-practice-card__media :deep(.responsive-picture),
.about-practice-card__media :deep(img) { display: block; width: 100%; height: 100%; }
.about-practice-card__media :deep(img) { object-fit: cover; filter: var(--image-treatment); transition: transform .6s ease; }
.about-practices__grid article:hover .about-practice-card__media :deep(img) { transform: scale(1.025); }
.about-practice-card__copy { display: flex; min-height: 282px; flex: 1; flex-direction: column; padding: 26px 24px 28px; }
.about-practice-card__copy > span { color: var(--brand-main); font: 700 10px/1.4 var(--font-mono); letter-spacing: .1em; }
.about-practice-card__copy h3 { margin: 14px 0 0; font-size: 23px; line-height: 1.45; }
.about-practice-card__copy p { margin: 12px 0 0; color: var(--text-sub); font-size: 13px; line-height: 1.8; }
.about-practice-card__copy > a { width: fit-content; margin-top: auto; padding-top: 26px; color: var(--brand-main); font-size: 13px; font-weight: 700; text-decoration: none; }

.about-identity {
  display: grid;
  grid-template-columns: minmax(280px, 390px) minmax(0, 1fr);
  gap: clamp(56px, 10vw, 128px);
  align-items: center;
  padding: clamp(30px, 4vw, 48px);
  border: 1px solid var(--border-soft);
  border-radius: 18px;
  background:
    radial-gradient(circle at 14% 20%, color-mix(in srgb, var(--brand-main) 10%, transparent), transparent 34%),
    color-mix(in srgb, var(--bg-card) 92%, transparent);
}
.about-identity__portrait { position: relative; aspect-ratio: 4 / 5; overflow: hidden; border-radius: 12px; background: var(--bg-soft); box-shadow: var(--shadow-card); }
.about-identity__portrait :deep(.responsive-picture),
.about-identity__portrait :deep(img) { display: block; width: 100%; height: 100%; }
.about-identity__portrait :deep(img) { object-fit: cover; filter: var(--image-treatment); }
.about-identity__portrait > span { position: absolute; right: 14px; bottom: 14px; padding: 7px 9px; border-radius: 5px; color: rgba(255,255,255,.88); background: rgba(8,9,11,.62); font: 700 9px/1 var(--font-mono); letter-spacing: .12em; backdrop-filter: blur(10px); }
.about-identity__copy h2 { margin: 19px 0 0; font-size: clamp(38px, 4.2vw, 54px); line-height: 1.2; }
.about-identity__copy > strong { display: block; margin-top: 12px; color: var(--brand-main); font-size: 15px; }
.about-identity__copy > p { max-width: 650px; margin: 22px 0 0; color: var(--text-sub); font-size: 14px; line-height: 1.95; }
.about-identity__copy dl { display: grid; margin: 32px 0 0; border-top: 1px solid var(--border-soft); }
.about-identity__copy dl > div { display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 20px; padding: 13px 0; border-bottom: 1px solid var(--border-soft); }
.about-identity__copy dt { color: var(--text-muted); font-size: 11px; font-weight: 700; }
.about-identity__copy dd { margin: 0; color: var(--text-main); font-size: 12px; font-weight: 650; }

.about-collaboration {
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(430px, 1.1fr);
  gap: clamp(58px, 10vw, 132px);
  align-items: start;
  padding: clamp(44px, 6vw, 72px);
  border: 1px solid var(--border-soft);
  border-radius: 18px;
  background:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
    var(--bg-soft);
  background-size: 32px 32px, 32px 32px, auto;
}
.about-collaboration__head > span { margin-bottom: 19px; }
.about-collaboration__body > p { margin: 0; color: var(--text-sub); font-size: 14px; line-height: 1.9; }
.about-collaboration__body ul { display: grid; margin: 26px 0 0; padding: 0; border-top: 1px solid var(--border-soft); list-style: none; }
.about-collaboration__body li { position: relative; padding: 15px 0 15px 25px; border-bottom: 1px solid var(--border-soft); color: var(--text-main); font-size: 13px; font-weight: 650; line-height: 1.65; }
.about-collaboration__body li::before { position: absolute; top: 24px; left: 2px; width: 8px; height: 1px; background: var(--brand-main); content: ''; }
.about-collaboration__note { margin-top: 24px !important; font-size: 12px !important; }
.about-collaboration__actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }

@media (max-width: 1000px) {
  .about-hero { grid-template-columns: minmax(0, 1fr) minmax(360px, .8fr); gap: 38px; }
  .about-hero__copy h1 { font-size: 45px; }
  .about-hero__facts { grid-template-columns: .65fr 1.35fr; }
  .about-hero__facts > div:last-child { display: none; }
  .about-story__body { grid-template-columns: minmax(0, .9fr) minmax(400px, 1.1fr); gap: 54px; }
  .about-feature { grid-template-columns: minmax(0, 1fr) minmax(360px, .88fr); }
  .about-principles { grid-template-columns: minmax(260px, .7fr) minmax(440px, 1.3fr); gap: 60px; }
  .about-principles__list li { grid-template-columns: 34px minmax(150px, .75fr) minmax(220px, 1.25fr); }
  .about-identity { gap: 56px; }
}

@media (max-width: 820px) {
  .about-hero { grid-template-columns: 1fr; min-height: 0; padding-top: 0; }
  .about-hero__copy h1 { font-size: clamp(42px, 7.6vw, 58px); }
  .about-hero__visual { width: min(620px, 100%); height: 500px; }
  .about-section-heading,
  .about-section-heading--wide { grid-template-columns: 1fr; align-items: start; }
  .about-section-heading > p { margin-top: 18px; }
  .about-story__body { grid-template-columns: 1fr; gap: 48px; }
  .about-feature { grid-template-columns: 1fr; min-height: 0; }
  .about-feature__media { aspect-ratio: 16 / 10; }
  .about-principles { grid-template-columns: 1fr; gap: 44px; }
  .about-principles .about-section-heading { position: static; }
  .about-practices__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .about-practices__grid article:last-child { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; }
  .about-practices__grid article:last-child .about-practice-card__media { height: 100%; aspect-ratio: auto; border-right: 1px solid var(--border-soft); border-bottom: 0; }
  .about-identity { grid-template-columns: minmax(240px, 320px) minmax(0, 1fr); gap: 42px; padding: 28px; }
  .about-collaboration { grid-template-columns: 1fr; gap: 42px; }
}

@media (max-width: 620px) {
  .about-hero { gap: 44px; padding-bottom: 58px; }
  .about-hero__copy h1 { margin-top: 18px; font-size: clamp(35px, 10.5vw, 46px); line-height: 1.22; }
  .about-hero__copy h1 span { display: inline; }
  .about-hero__lead { margin-top: 22px; font-size: 14px; line-height: 1.9; }
  .about-hero__actions :deep(.base-button) { flex: 1 1 auto; padding-inline: 15px; font-size: 14px; }
  .about-hero__facts { grid-template-columns: 92px minmax(0, 1fr); margin-top: 34px; }
  .about-hero__facts > div + div { padding-left: 16px; }
  .about-hero__facts dt { font-size: 17px; }
  .about-hero__visual { grid-template-columns: minmax(0, 1.35fr) minmax(105px, .75fr); height: 380px; padding: 10px; gap: 8px; border-radius: 14px; }
  .about-collage figcaption { padding: 24px 10px 10px; }
  .about-collage figcaption strong { font-size: 11px; }
  .about-collage figcaption span { font-size: 8px; }
  .about-block { margin-top: 88px; }
  .about-section-heading h2,
  .about-collaboration__head h2 { font-size: 34px; line-height: 1.3; }
  .about-story__body { margin-top: 36px; padding-top: 36px; }
  .about-story__statement > p:first-child { font-size: 23px; }
  .about-story__statement blockquote { padding-left: 18px; font-size: 18px; }
  .about-journey li { grid-template-columns: 40px minmax(0, 1fr); gap: 15px; }
  .about-feature { margin-top: 34px; border-radius: 14px; }
  .about-feature__media { aspect-ratio: 4 / 3; }
  .about-feature__copy { padding: 28px 22px 32px; }
  .about-feature__copy > h3 { font-size: 28px; }
  .about-feature__steps li { grid-template-columns: 24px 42px minmax(0, 1fr); gap: 8px; }
  .about-principles__list li { grid-template-columns: 34px minmax(0, 1fr); gap: 12px; padding: 24px 0; }
  .about-principles__list p { grid-column: 2; }
  .about-section-heading--inline { display: grid; align-items: start; }
  .about-section-heading--inline > a { padding-bottom: 0; }
  .about-practices__grid { grid-template-columns: 1fr; margin-top: 32px; }
  .about-practices__grid article:last-child { grid-column: auto; display: flex; }
  .about-practices__grid article:last-child .about-practice-card__media { height: auto; aspect-ratio: 16 / 10; border-right: 0; border-bottom: 1px solid var(--border-soft); }
  .about-practice-card__copy { min-height: 252px; padding: 23px 20px 25px; }
  .about-identity { grid-template-columns: 1fr; padding: 20px; }
  .about-identity__portrait { width: min(290px, 82vw); }
  .about-identity__copy h2 { font-size: 38px; }
  .about-identity__copy dl > div { grid-template-columns: 86px minmax(0, 1fr); gap: 14px; }
  .about-collaboration { gap: 34px; padding: 28px 22px; border-radius: 14px; }
  .about-collaboration__actions :deep(.base-button) { flex: 1 1 auto; padding-inline: 14px; font-size: 13px; }
}

@media (prefers-reduced-motion: reduce) {
  .about-collage :deep(img),
  .about-feature__media :deep(img),
  .about-practice-card__media :deep(img),
  .about-practices__grid article { transition: none; }
  .about-collage:hover :deep(img),
  .about-feature__media:hover :deep(img),
  .about-practices__grid article:hover .about-practice-card__media :deep(img) { transform: none; }
  .about-practices__grid article:hover { transform: none; }
}
</style>
