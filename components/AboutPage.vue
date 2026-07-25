<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  PhArrowDown,
  PhArrowRight,
  PhArrowUpRight,
  PhBrowser,
  PhBriefcase,
  PhCamera,
  PhCube,
  PhDownloadSimple,
  PhEnvelopeSimple,
  PhFilmSlate,
  PhFlowArrow,
  PhGraduationCap,
  PhMedal,
  PhPalette
} from '@phosphor-icons/vue'
import profile from '../.shared/content/profile.json'
import aboutPage from '../.shared/content/aboutPage.json'

const reveal = (delay = 0, y = 18) => ({
  repeat: true,
  delay,
  y,
  blur: 0,
  duration: 820
})

const iconComponents = {
  palette: PhPalette,
  cube: PhCube,
  camera: PhCamera,
  flow: PhFlowArrow,
  video: PhFilmSlate,
  web: PhBrowser
}

const capabilities = (aboutPage.workbench?.capabilities || []).map((item, index) => ({
  ...item,
  key: item.id || `capability-${index + 1}`,
  icon: iconComponents[item.icon] || PhPalette,
  process: Array.isArray(item.process) ? item.process : []
}))

const deliveryStages = (aboutPage.delivery?.stages || []).map((stage) => ({
  ...stage,
  items: (stage.items || []).map((item) => ({
    ...item,
    icon: iconComponents[item.icon] || PhPalette
  }))
}))

const resume = aboutPage.resume || {}
const resumeMetrics = Array.isArray(resume.metrics) ? resume.metrics : []
const resumeExperience = Array.isArray(resume.experience) ? resume.experience : []
const resumeSkills = Array.isArray(resume.skills) ? resume.skills : []
const contactHref = computed(() => `mailto:${profile.email}`)

const activeKey = ref(capabilities[0].key)
const activeCapability = computed(() => (
  capabilities.find((item) => item.key === activeKey.value) || capabilities[0]
))
const workbenchRef = ref(null)
const tabElements = new Map()
const AUTOPLAY_DELAY = 5000

let autoplayTimer = null
let workbenchObserver = null
let reducedMotionQuery = null
let isWorkbenchVisible = false
let isPageVisible = true
let prefersReducedMotion = false

function registerTab(key, element) {
  if (element) tabElements.set(key, element)
  else tabElements.delete(key)
}

function clearAutoplayTimer() {
  if (autoplayTimer === null) return
  window.clearTimeout(autoplayTimer)
  autoplayTimer = null
}

function canAutoplay() {
  return isWorkbenchVisible && isPageVisible && !prefersReducedMotion
}

function advanceCapability() {
  const currentIndex = capabilities.findIndex((item) => item.key === activeKey.value)
  const nextIndex = (currentIndex + 1) % capabilities.length
  activeKey.value = capabilities[nextIndex].key
}

function scheduleAutoplay() {
  clearAutoplayTimer()
  if (!canAutoplay()) return

  autoplayTimer = window.setTimeout(() => {
    advanceCapability()
    scheduleAutoplay()
  }, AUTOPLAY_DELAY)
}

function selectCapability(key) {
  activeKey.value = key
  scheduleAutoplay()
}

async function moveFocus(event, currentIndex) {
  const supportedKeys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End']
  if (!supportedKeys.includes(event.key)) return

  event.preventDefault()

  let nextIndex = currentIndex
  if (event.key === 'Home') nextIndex = 0
  else if (event.key === 'End') nextIndex = capabilities.length - 1
  else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    nextIndex = (currentIndex + 1) % capabilities.length
  } else {
    nextIndex = (currentIndex - 1 + capabilities.length) % capabilities.length
  }

  const nextCapability = capabilities[nextIndex]
  selectCapability(nextCapability.key)
  await nextTick()
  tabElements.get(nextCapability.key)?.focus()
}

function handleVisibilityChange() {
  isPageVisible = document.visibilityState === 'visible'
  if (isPageVisible) scheduleAutoplay()
  else clearAutoplayTimer()
}

function handleReducedMotionChange(event) {
  prefersReducedMotion = event.matches
  if (prefersReducedMotion) clearAutoplayTimer()
  else scheduleAutoplay()
}

onMounted(() => {
  isPageVisible = document.visibilityState === 'visible'
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion = reducedMotionQuery.matches
  reducedMotionQuery.addEventListener?.('change', handleReducedMotionChange)
  document.addEventListener('visibilitychange', handleVisibilityChange)

  if ('IntersectionObserver' in window && workbenchRef.value) {
    workbenchObserver = new IntersectionObserver(([entry]) => {
      isWorkbenchVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.18)
      if (isWorkbenchVisible) scheduleAutoplay()
      else clearAutoplayTimer()
    }, {
      threshold: [0, 0.18],
      rootMargin: '0px 0px -12% 0px'
    })
    workbenchObserver.observe(workbenchRef.value)
  } else {
    isWorkbenchVisible = true
    scheduleAutoplay()
  }
})

onBeforeUnmount(() => {
  clearAutoplayTimer()
  workbenchObserver?.disconnect()
  reducedMotionQuery?.removeEventListener?.('change', handleReducedMotionChange)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <main class="about-page" data-testid="about-page">
    <section class="about-hero" aria-labelledby="about-title">
      <div class="about-hero__copy">
        <h1 id="about-title" v-reveal="reveal()">
          <span>{{ aboutPage.hero.greeting }}<strong>{{ profile.name }}</strong></span>
          <span>{{ aboutPage.hero.title }}</span>
        </h1>
        <p v-reveal="reveal(90)">{{ aboutPage.hero.description }}</p>
      </div>

      <figure class="about-hero__portrait" v-reveal="reveal(150, 22)">
        <span class="about-hero__portrait-bg" aria-hidden="true"></span>
        <img
          :src="aboutPage.hero.portrait"
          :alt="aboutPage.hero.portraitAlt || `${profile.name}的个人形象`"
          width="504"
          height="1430"
          loading="eager"
          decoding="async"
        >
      </figure>
    </section>

    <section
      ref="workbenchRef"
      class="capability-workbench"
      aria-labelledby="capability-title"
      data-testid="capability-workbench"
      :data-active-capability="activeKey"
    >
      <header class="workbench-heading" v-reveal="reveal()">
        <h2 id="capability-title">{{ aboutPage.workbench.title }}</h2>
        <p>{{ aboutPage.workbench.description }}</p>
      </header>

      <div class="workbench-layout">
        <div
          class="capability-tabs"
          role="tablist"
          aria-label="专业能力"
          v-reveal="reveal(70)"
        >
          <button
            v-for="(item, index) in capabilities"
            :id="`capability-tab-${item.key}`"
            :key="item.key"
            :ref="(element) => registerTab(item.key, element)"
            class="capability-tab"
            :class="{ 'is-active': activeKey === item.key }"
            type="button"
            role="tab"
            :aria-selected="activeKey === item.key"
            :aria-controls="`capability-panel-${item.key}`"
            :tabindex="activeKey === item.key ? 0 : -1"
            @click="selectCapability(item.key)"
            @keydown="moveFocus($event, index)"
          >
            <component :is="item.icon" :size="30" weight="regular" aria-hidden="true" />
            <span>{{ item.title }}</span>
            <PhArrowRight :size="22" weight="regular" aria-hidden="true" />
          </button>
        </div>

        <div class="capability-panel-wrap" v-reveal="reveal(130)">
          <Transition name="capability-panel">
            <article
              :id="`capability-panel-${activeCapability.key}`"
              :key="activeCapability.key"
              class="capability-panel"
              role="tabpanel"
              :aria-labelledby="`capability-tab-${activeCapability.key}`"
              tabindex="0"
            >
              <div class="capability-panel__icon" aria-hidden="true">
                <component :is="activeCapability.icon" :size="56" weight="light" />
              </div>

              <div class="capability-panel__intro">
                <h3>{{ activeCapability.title }}</h3>
                <p>{{ activeCapability.statement }}</p>
              </div>

              <dl class="capability-panel__facts">
                <div>
                  <dt>实际工具</dt>
                  <dd>{{ activeCapability.tools }}</dd>
                </div>
                <div>
                  <dt>交付结果</dt>
                  <dd>{{ activeCapability.output }}</dd>
                </div>
              </dl>

              <ol class="capability-panel__process" aria-label="负责环节">
                <li v-for="step in activeCapability.process" :key="step">{{ step }}</li>
              </ol>
            </article>
          </Transition>
        </div>
      </div>
    </section>

    <section class="delivery-flow" aria-labelledby="delivery-title">
      <header class="delivery-heading" v-reveal="reveal()">
        <h2 id="delivery-title">{{ aboutPage.delivery.title }}</h2>
        <p>{{ aboutPage.delivery.description }}</p>
      </header>

      <div class="delivery-map">
        <template v-for="(stage, index) in deliveryStages" :key="stage.title">
          <article class="delivery-stage" v-reveal="reveal(index * 90)">
            <header>
              <h3>{{ stage.title }}</h3>
              <p>{{ stage.description }}</p>
            </header>

            <ul>
              <li v-for="item in stage.items" :key="item.title">
                <component :is="item.icon" :size="34" weight="regular" aria-hidden="true" />
                <div>
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.detail }}</span>
                </div>
              </li>
            </ul>
          </article>

          <div
            v-if="index < deliveryStages.length - 1"
            class="delivery-arrow"
            aria-hidden="true"
            v-reveal="reveal(60 + index * 90)"
          >
            <PhArrowRight class="delivery-arrow__desktop" :size="34" weight="light" />
            <PhArrowDown class="delivery-arrow__mobile" :size="30" weight="light" />
          </div>
        </template>
      </div>
    </section>

    <section
      v-if="resume.title"
      class="resume-section"
      aria-labelledby="resume-title"
      data-testid="resume-section"
    >
      <header class="resume-heading" v-reveal="reveal()">
        <p class="resume-eyebrow">{{ resume.eyebrow }}</p>
        <div>
          <h2 id="resume-title">{{ resume.title }}</h2>
          <p>{{ resume.description }}</p>
        </div>
      </header>

      <dl class="resume-metrics" aria-label="职业履历摘要">
        <div
          v-for="(metric, index) in resumeMetrics"
          :key="metric.label"
          v-reveal="reveal(index * 70)"
        >
          <dt>{{ metric.value }}</dt>
          <dd>{{ metric.label }}</dd>
        </div>
      </dl>

      <div class="resume-feature-grid">
        <article class="resume-career" v-reveal="reveal(70)">
          <header class="resume-card-kicker">
            <PhBriefcase :size="24" weight="regular" aria-hidden="true" />
            <span>RECENT EXPERIENCE</span>
          </header>

          <ol class="resume-timeline">
            <li v-for="item in resumeExperience" :key="`${item.period}-${item.company}`">
              <div class="resume-timeline__marker" aria-hidden="true"></div>
              <div class="resume-timeline__period">{{ item.period }}</div>
              <div class="resume-timeline__content">
                <p class="resume-timeline__role">{{ item.role }}</p>
                <h3>{{ item.company }}</h3>
                <p class="resume-timeline__summary">{{ item.summary }}</p>
                <ul>
                  <li v-for="achievement in item.achievements" :key="achievement">
                    {{ achievement }}
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </article>

        <article class="resume-project" v-reveal="reveal(130)">
          <div class="resume-project__topline">
            <span>SELECTED PROJECT</span>
            <strong>{{ resume.project.year }}</strong>
          </div>
          <p class="resume-project__role">{{ resume.project.role }}</p>
          <h3>{{ resume.project.title }}</h3>
          <p class="resume-project__summary">{{ resume.project.summary }}</p>
          <ul>
            <li v-for="outcome in resume.project.outcomes" :key="outcome">
              <PhArrowUpRight :size="19" weight="bold" aria-hidden="true" />
              <span>{{ outcome }}</span>
            </li>
          </ul>
        </article>
      </div>

      <div class="resume-detail-grid">
        <article class="resume-skills" v-reveal="reveal(90)">
          <header>
            <span>CAPABILITY MAP</span>
            <h3>{{ resume.skillsTitle }}</h3>
          </header>
          <div class="resume-skill-groups">
            <section v-for="group in resumeSkills" :key="group.title">
              <h4>{{ group.title }}</h4>
              <ul>
                <li v-for="item in group.items" :key="item">{{ item }}</li>
              </ul>
            </section>
          </div>
        </article>

        <div class="resume-credentials">
          <article v-reveal="reveal(130)">
            <PhGraduationCap :size="30" weight="regular" aria-hidden="true" />
            <div>
              <span>EDUCATION</span>
              <h3>{{ resume.education.school }}</h3>
              <p>{{ resume.education.major }}</p>
            </div>
          </article>
          <article v-reveal="reveal(170)">
            <PhMedal :size="30" weight="regular" aria-hidden="true" />
            <div>
              <span>RECOGNITION</span>
              <h3>{{ resume.recognition.title }}</h3>
              <p>{{ resume.recognition.year }}</p>
            </div>
          </article>
        </div>
      </div>

      <footer class="resume-cta" v-reveal="reveal(100)">
        <div>
          <p class="resume-eyebrow">{{ resume.cta.eyebrow }}</p>
          <h3>{{ resume.cta.title }}</h3>
          <p>{{ resume.cta.description }}</p>
        </div>
        <nav aria-label="职业联系">
          <a class="resume-button resume-button--primary" :href="contactHref">
            <PhEnvelopeSimple :size="20" weight="bold" aria-hidden="true" />
            联系我
          </a>
          <a class="resume-button" href="/portfolio/">
            查看代表作品
            <PhArrowUpRight :size="19" weight="bold" aria-hidden="true" />
          </a>
          <a
            v-if="profile.resumePdf"
            class="resume-button"
            :href="profile.resumePdf"
            download
          >
            <PhDownloadSimple :size="20" weight="bold" aria-hidden="true" />
            下载完整简历
          </a>
        </nav>
      </footer>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  --workbench-bg: var(--bg-section);
  --workbench-panel: var(--bg-card);
  --workbench-text: var(--text-main);
  --workbench-sub: var(--text-sub);
  --workbench-border: var(--border-soft);
  --workbench-border-strong: color-mix(in srgb, var(--brand-main) 34%, var(--border-soft));
  --workbench-hover: color-mix(in srgb, var(--brand-main) 7%, var(--workbench-panel));
  --workbench-selected-text: #fffaf2;
  width: min(var(--page-width), calc(100% - 32px));
  margin-inline: auto;
  color: var(--text-main);
  font-family: var(--font-sans);
}

:global(html.dark .about-page) {
  --workbench-bg: #17181b;
  --workbench-panel: #202125;
  --workbench-border: rgba(244, 241, 234, .12);
  --workbench-border-strong: rgba(184, 138, 74, .46);
  --workbench-hover: rgba(244, 241, 234, .05);
}

.about-page :is(h1, h2, h3, p) {
  margin: 0;
}

.about-page :is(h1, h2, h3) {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.035em;
}

.about-page p {
  font-size: var(--text-body);
  line-height: 1.85;
}

.about-hero {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-areas: "portrait copy";
  grid-template-columns: minmax(360px, .86fr) minmax(0, 1.14fr);
  gap: var(--space-2xl);
  min-height: 720px;
  padding: var(--space-3xl) var(--space-xl) 0;
  align-items: center;
}

.about-hero__copy {
  grid-area: copy;
  align-self: center;
  padding-bottom: var(--space-xl);
}

.about-hero h1 {
  max-width: 720px;
  font-size: var(--text-hero);
  line-height: 1.16;
  letter-spacing: -0.045em;
}

.about-hero h1 span {
  display: block;
}

.about-hero h1 span + span {
  margin-top: var(--space-xs);
}

.about-hero h1 strong {
  color: var(--brand-main);
  font-weight: inherit;
}

.about-hero__copy > p {
  max-width: 610px;
  margin-top: var(--space-lg);
  color: var(--text-sub);
  font-size: var(--text-lead);
}

.about-hero__portrait {
  position: relative;
  grid-area: portrait;
  align-self: end;
  width: min(440px, 100%);
  height: 640px;
  margin: 0 auto;
}

.about-hero__portrait-bg {
  position: absolute;
  inset: auto 0 0;
  height: 510px;
  border-radius: 50% 50% var(--radius-card) var(--radius-card);
  background: var(--brand-main);
}

.about-hero__portrait img {
  position: absolute;
  z-index: 1;
  right: 50%;
  bottom: 0;
  width: auto;
  height: 668px;
  transform: translateX(50%);
  object-fit: contain;
  object-position: bottom;
}

.capability-workbench {
  position: relative;
  z-index: 1;
  margin-top: -56px;
  padding: calc(var(--space-3xl) + 28px) var(--space-2xl) var(--space-3xl);
  border-radius: var(--radius-card);
  background: var(--workbench-bg);
  color: var(--workbench-text);
}

.workbench-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, .72fr);
  gap: var(--space-2xl);
  align-items: end;
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--workbench-border);
}

.workbench-heading h2,
.delivery-heading h2 {
  font-size: var(--text-section-title);
  line-height: 1.16;
}

.workbench-heading h2,
.capability-panel h3 {
  color: var(--workbench-text);
}

.workbench-heading p {
  color: var(--workbench-sub);
  font-size: var(--text-lead);
}

.workbench-layout {
  display: grid;
  grid-template-columns: minmax(260px, .72fr) minmax(0, 1.28fr);
  gap: var(--space-xl);
  align-items: stretch;
  padding-top: var(--space-xl);
}

.capability-tabs {
  display: grid;
  grid-template-rows: repeat(6, minmax(0, 1fr));
  align-content: stretch;
  gap: var(--space-xs);
  min-height: 600px;
}

.capability-tab {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) 24px;
  gap: var(--space-sm);
  min-height: 0;
  padding: 0 var(--space-md);
  border: 1px solid var(--workbench-border);
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--workbench-sub);
  font: 600 var(--text-body) / 1.4 var(--font-sans);
  text-align: left;
  cursor: pointer;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    color 220ms ease,
    transform 220ms ease;
}

.capability-tab > * {
  align-self: center;
}

.capability-tab > svg:last-child {
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 220ms ease, transform 220ms ease;
}

.capability-tab:hover {
  border-color: var(--workbench-border-strong);
  background: var(--workbench-hover);
  color: var(--workbench-text);
  transform: translateX(4px);
}

.capability-tab.is-active {
  border-color: var(--brand-main);
  background: var(--brand-main);
  color: var(--workbench-selected-text);
}

.capability-tab.is-active > svg:last-child {
  opacity: 1;
  transform: none;
}

.capability-tab:focus-visible,
.capability-panel:focus-visible {
  outline: 2px solid var(--brand-main);
  outline-offset: 3px;
}

.capability-panel-wrap {
  display: grid;
  min-width: 0;
  min-height: 600px;
}

.capability-panel {
  display: grid;
  grid-area: 1 / 1;
  height: 100%;
  min-height: 0;
  padding: var(--space-xl);
  border: 1px solid var(--workbench-border);
  border-radius: var(--radius-card);
  background: var(--workbench-panel);
  outline: none;
}

.capability-panel__icon {
  display: grid;
  width: 88px;
  height: 88px;
  place-items: center;
  border: 1px solid var(--workbench-border-strong);
  border-radius: var(--radius-card);
  color: var(--brand-main);
}

.capability-panel__intro {
  align-self: end;
  padding: var(--space-lg) 0;
}

.capability-panel__intro h3 {
  font-size: clamp(34px, 4vw, 48px);
  line-height: 1.16;
}

.capability-panel__intro p {
  max-width: 620px;
  margin-top: var(--space-sm);
  color: var(--workbench-sub);
  font-size: var(--text-lead);
}

.capability-panel__facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;
  border-top: 1px solid var(--workbench-border);
  border-bottom: 1px solid var(--workbench-border);
}

.capability-panel__facts > div {
  padding: var(--space-md) 0;
}

.capability-panel__facts > div + div {
  padding-left: var(--space-lg);
  border-left: 1px solid var(--workbench-border);
}

.capability-panel__facts dt {
  color: var(--brand-main);
  font-size: var(--text-body);
  font-weight: 700;
}

.capability-panel__facts dd {
  margin: var(--space-xs) 0 0;
  color: var(--workbench-text);
  font-size: var(--text-body);
  line-height: 1.7;
}

.capability-panel__process {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-xs);
  margin: var(--space-md) 0 0;
  padding: 0;
  list-style: none;
}

.capability-panel__process li {
  display: grid;
  min-height: 52px;
  place-items: center;
  padding: 8px;
  border: 1px solid var(--workbench-border);
  border-radius: var(--radius-control);
  color: var(--workbench-sub);
  font-size: var(--text-body);
  text-align: center;
}

.capability-panel-enter-active,
.capability-panel-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.capability-panel-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.capability-panel-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.delivery-flow {
  padding: var(--space-4xl) var(--space-xl);
}

.delivery-heading {
  max-width: 860px;
  margin-inline: auto;
  text-align: center;
}

.delivery-heading p {
  max-width: 680px;
  margin: var(--space-md) auto 0;
  color: var(--text-sub);
  font-size: var(--text-lead);
}

.delivery-map {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
  gap: var(--space-sm);
  align-items: center;
  margin-top: var(--space-2xl);
}

.delivery-stage {
  min-width: 0;
  padding: var(--space-lg);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-soft);
}

.delivery-stage > header {
  min-height: 112px;
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--border-soft);
}

.delivery-stage h3 {
  font-size: var(--text-card-large);
  line-height: 1.35;
}

.delivery-stage header p {
  margin-top: var(--space-xs);
  color: var(--text-sub);
}

.delivery-stage ul {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.delivery-stage li {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: var(--space-sm);
  align-items: center;
  min-height: 96px;
  padding: var(--space-sm) 0;
}

.delivery-stage li + li {
  border-top: 1px solid var(--border-soft);
}

.delivery-stage li > svg {
  color: var(--brand-main);
}

.delivery-stage strong,
.delivery-stage span {
  display: block;
}

.delivery-stage strong {
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  line-height: 1.4;
}

.delivery-stage span {
  margin-top: 5px;
  color: var(--text-sub);
  font-size: var(--text-body);
  line-height: 1.6;
}

.delivery-arrow {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border: 1px solid var(--border-soft);
  border-radius: 50%;
  color: var(--brand-main);
}

.delivery-arrow__mobile {
  display: none;
}

.resume-section {
  position: relative;
  overflow: hidden;
  margin-bottom: var(--space-4xl);
  padding: var(--space-3xl) var(--space-2xl);
  border: 1px solid color-mix(in srgb, var(--brand-main) 22%, var(--border-soft));
  border-radius: calc(var(--radius-card) + 8px);
  background:
    radial-gradient(circle at 86% 2%, color-mix(in srgb, var(--brand-main) 16%, transparent) 0, transparent 34%),
    linear-gradient(145deg, color-mix(in srgb, var(--bg-card) 96%, var(--brand-main)) 0%, var(--bg-card) 52%, var(--bg-soft) 100%);
  box-shadow: 0 28px 80px rgba(20, 18, 14, .08);
}

.resume-section::before {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--border-soft) 55%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--border-soft) 55%, transparent) 1px, transparent 1px);
  background-size: 56px 56px;
  content: "";
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, .42), transparent 48%);
  pointer-events: none;
}

.resume-section > * {
  position: relative;
  z-index: 1;
}

.resume-heading {
  display: grid;
  grid-template-columns: minmax(180px, .45fr) minmax(0, 1.55fr);
  gap: var(--space-xl);
  align-items: start;
}

.resume-eyebrow,
.resume-card-kicker,
.resume-project__topline,
.resume-skills > header > span,
.resume-credentials article span {
  color: var(--brand-main);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .15em;
  line-height: 1.4;
  text-transform: uppercase;
}

.resume-heading h2 {
  font-size: var(--text-section-title);
  line-height: 1.14;
}

.resume-heading > div > p {
  max-width: 720px;
  margin-top: var(--space-sm);
  color: var(--text-sub);
  font-size: var(--text-lead);
}

.resume-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: var(--space-2xl) 0 0;
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
}

.resume-metrics > div {
  padding: var(--space-lg) 0;
}

.resume-metrics > div + div {
  padding-left: var(--space-xl);
  border-left: 1px solid var(--border-soft);
}

.resume-metrics dt {
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 600;
  letter-spacing: -.04em;
  line-height: 1;
}

.resume-metrics dd {
  margin: var(--space-xs) 0 0;
  color: var(--text-sub);
  font-size: var(--text-body);
}

.resume-feature-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.28fr) minmax(300px, .72fr);
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.resume-career,
.resume-project,
.resume-skills,
.resume-credentials article {
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--bg-card) 92%, transparent);
}

.resume-career {
  padding: var(--space-xl);
}

.resume-card-kicker {
  display: flex;
  gap: var(--space-xs);
  align-items: center;
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--border-soft);
}

.resume-timeline {
  margin: 0;
  padding: 0;
  list-style: none;
}

.resume-timeline > li {
  position: relative;
  display: grid;
  grid-template-columns: 114px minmax(0, 1fr);
  gap: var(--space-lg);
  padding-top: var(--space-lg);
}

.resume-timeline__marker {
  position: absolute;
  top: calc(var(--space-lg) + 7px);
  left: 110px;
  width: 9px;
  height: 9px;
  border: 2px solid var(--bg-card);
  border-radius: 50%;
  background: var(--brand-main);
  box-shadow: 0 0 0 1px var(--brand-main);
}

.resume-timeline__period {
  color: var(--text-sub);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .04em;
}

.resume-timeline__content {
  padding-left: var(--space-lg);
  border-left: 1px solid var(--border-soft);
}

.resume-timeline__role,
.resume-project__role {
  color: var(--brand-main);
  font-size: 14px;
  font-weight: 700;
}

.resume-timeline h3,
.resume-project h3,
.resume-skills h3,
.resume-credentials h3,
.resume-cta h3 {
  color: var(--text-main);
  font-size: var(--text-card-large);
  line-height: 1.3;
}

.resume-timeline h3 {
  margin-top: 4px;
}

.resume-timeline__summary {
  margin-top: var(--space-xs);
  color: var(--text-sub);
}

.resume-timeline ul {
  display: grid;
  gap: 9px;
  margin: var(--space-md) 0 0;
  padding: 0;
  list-style: none;
}

.resume-timeline ul li {
  position: relative;
  padding-left: 18px;
  color: var(--text-main);
  font-size: var(--text-body);
  line-height: 1.7;
}

.resume-timeline ul li::before {
  position: absolute;
  top: .72em;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--brand-main);
  content: "";
}

.resume-project {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: var(--space-xl);
  color: #fff8ed;
  background:
    radial-gradient(circle at 100% 0, rgba(255, 255, 255, .14), transparent 42%),
    linear-gradient(155deg, color-mix(in srgb, var(--brand-main) 86%, #2b2117), color-mix(in srgb, var(--brand-main) 56%, #17130f));
}

.resume-project__topline {
  display: flex;
  justify-content: space-between;
  gap: var(--space-md);
  align-items: center;
  color: rgba(255, 248, 237, .74);
}

.resume-project__topline strong {
  color: #fff8ed;
  font-family: var(--font-display);
  font-size: 34px;
  letter-spacing: -.04em;
}

.resume-project__role {
  margin-top: auto;
  padding-top: var(--space-2xl);
  color: rgba(255, 248, 237, .74);
}

.resume-project h3 {
  max-width: 440px;
  margin-top: var(--space-xs);
  color: #fff8ed;
  font-size: clamp(28px, 3vw, 40px);
}

.resume-project__summary {
  margin-top: var(--space-md);
  color: rgba(255, 248, 237, .8);
}

.resume-project ul {
  display: grid;
  gap: var(--space-sm);
  margin: var(--space-lg) 0 0;
  padding: var(--space-lg) 0 0;
  border-top: 1px solid rgba(255, 248, 237, .2);
  list-style: none;
}

.resume-project li {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  color: #fff8ed;
  font-size: var(--text-body);
  line-height: 1.65;
}

.resume-project li svg {
  margin-top: 4px;
}

.resume-detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr);
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.resume-skills {
  padding: var(--space-xl);
}

.resume-skills > header {
  display: flex;
  justify-content: space-between;
  gap: var(--space-lg);
  align-items: baseline;
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--border-soft);
}

.resume-skill-groups {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.resume-skill-groups section {
  min-width: 0;
}

.resume-skill-groups h4 {
  margin: 0 0 var(--space-sm);
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
}

.resume-skill-groups ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.resume-skill-groups li {
  padding: 7px 10px;
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  background: var(--bg-soft);
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.35;
}

.resume-credentials {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: var(--space-md);
}

.resume-credentials article {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: var(--space-sm);
  align-items: start;
  padding: var(--space-lg);
}

.resume-credentials article > svg {
  color: var(--brand-main);
}

.resume-credentials h3 {
  margin-top: var(--space-xs);
  font-size: var(--text-card-title);
}

.resume-credentials p {
  margin-top: 4px;
  color: var(--text-sub);
  font-size: 14px;
}

.resume-cta {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-xl);
  align-items: center;
  margin-top: var(--space-xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--border-soft);
}

.resume-cta h3 {
  margin-top: var(--space-xs);
}

.resume-cta > div > p:last-child {
  max-width: 660px;
  margin-top: var(--space-xs);
  color: var(--text-sub);
}

.resume-cta nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  justify-content: flex-end;
}

.resume-button {
  display: inline-flex;
  gap: 8px;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-md);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  background: var(--bg-card);
  color: var(--text-main);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.resume-button:hover {
  border-color: var(--brand-main);
  color: var(--brand-main);
  transform: translateY(-2px);
}

.resume-button--primary {
  border-color: var(--brand-main);
  background: var(--brand-main);
  color: #fffaf2;
}

.resume-button--primary:hover {
  color: #fffaf2;
}

@media (max-width: 980px) {
  .about-hero {
    grid-template-columns: minmax(300px, .82fr) minmax(0, 1.18fr);
    gap: var(--space-lg);
  }

  .about-hero__portrait {
    height: 590px;
  }

  .about-hero__portrait-bg {
    height: 460px;
  }

  .about-hero__portrait img {
    height: 620px;
  }

  .workbench-layout {
    grid-template-columns: 1fr;
  }

  .capability-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
    grid-auto-rows: minmax(66px, auto);
    min-height: 0;
  }

  .capability-panel-wrap {
    min-height: 520px;
  }

  .capability-tab:hover {
    transform: none;
  }

  .delivery-map {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .delivery-stage {
    display: grid;
    grid-template-columns: minmax(220px, .72fr) minmax(0, 1.28fr);
    gap: var(--space-lg);
    align-items: center;
  }

  .delivery-stage > header {
    min-height: 0;
    padding: 0 var(--space-lg) 0 0;
    border-right: 1px solid var(--border-soft);
    border-bottom: 0;
  }

  .delivery-arrow {
    margin-inline: auto;
  }

  .delivery-arrow__desktop {
    display: none;
  }

  .delivery-arrow__mobile {
    display: block;
  }

  .resume-heading {
    grid-template-columns: 1fr;
    gap: var(--space-xs);
  }

  .resume-feature-grid,
  .resume-detail-grid {
    grid-template-columns: 1fr;
  }

  .resume-project__role {
    padding-top: var(--space-xl);
  }

  .resume-credentials {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
  }

  .resume-cta {
    grid-template-columns: 1fr;
  }

  .resume-cta nav {
    justify-content: flex-start;
  }
}

@media (max-width: 760px) {
  .about-page {
    width: min(var(--page-width), calc(100% - 24px));
  }

  .about-hero {
    grid-template-areas:
      "copy"
      "portrait";
    grid-template-columns: 1fr;
    gap: var(--space-lg);
    min-height: 0;
    padding: var(--space-2xl) var(--space-sm) 0;
    text-align: center;
  }

  .about-hero__copy {
    padding-bottom: 0;
  }

  .about-hero h1 {
    margin-inline: auto;
    font-size: var(--text-page-title);
    line-height: 1.2;
  }

  .about-hero__copy > p {
    margin: var(--space-md) auto 0;
    font-size: var(--text-body);
  }

  .about-hero__portrait {
    width: min(340px, 92vw);
    height: 490px;
  }

  .about-hero__portrait-bg {
    height: 378px;
  }

  .about-hero__portrait img {
    height: 516px;
  }

  .capability-workbench {
    margin-top: -24px;
    padding: calc(var(--space-2xl) + 16px) var(--space-md) var(--space-xl);
  }

  .workbench-heading {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
    padding-bottom: var(--space-lg);
    text-align: center;
  }

  .workbench-heading h2,
  .delivery-heading h2 {
    font-size: var(--text-section-title);
  }

  .workbench-heading p,
  .delivery-heading p {
    font-size: var(--text-body);
  }

  .workbench-layout {
    gap: var(--space-lg);
    padding-top: var(--space-lg);
  }

  .capability-tabs {
    gap: 10px;
  }

  .capability-tab {
    grid-template-columns: 28px minmax(0, 1fr);
    gap: var(--space-xs);
    min-height: 76px;
    padding: var(--space-xs);
    font-size: 15px;
    text-align: center;
  }

  .capability-tab > svg:first-child {
    justify-self: center;
  }

  .capability-tab > svg:last-child {
    display: none;
  }

  .capability-panel {
    height: auto;
    min-height: 0;
    padding: var(--space-lg);
  }

  .capability-panel-wrap {
    min-height: 0;
  }

  .capability-panel__icon {
    width: 72px;
    height: 72px;
  }

  .capability-panel__intro {
    padding: var(--space-md) 0;
  }

  .capability-panel__intro h3 {
    font-size: var(--text-section-title);
  }

  .capability-panel__intro p {
    font-size: var(--text-body);
  }

  .capability-panel__facts {
    grid-template-columns: 1fr;
  }

  .capability-panel__facts > div + div {
    padding-left: 0;
    border-top: 1px solid var(--workbench-border);
    border-left: 0;
  }

  .capability-panel__process {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .delivery-flow {
    padding: var(--space-3xl) var(--space-sm);
  }

  .delivery-map {
    margin-top: var(--space-xl);
  }

  .delivery-stage {
    grid-template-columns: 1fr;
    gap: var(--space-md);
    padding: var(--space-md);
  }

  .delivery-stage > header {
    padding: 0 0 var(--space-md);
    border-right: 0;
    border-bottom: 1px solid var(--border-soft);
  }

  .resume-section {
    margin-bottom: var(--space-3xl);
    padding: var(--space-2xl) var(--space-md);
  }

  .resume-heading {
    text-align: left;
  }

  .resume-heading > div > p {
    font-size: var(--text-body);
  }

  .resume-metrics {
    grid-template-columns: 1fr;
  }

  .resume-metrics > div {
    display: grid;
    grid-template-columns: 100px minmax(0, 1fr);
    gap: var(--space-sm);
    align-items: baseline;
    padding: var(--space-md) 0;
  }

  .resume-metrics > div + div {
    padding-left: 0;
    border-top: 1px solid var(--border-soft);
    border-left: 0;
  }

  .resume-metrics dt {
    font-size: 30px;
  }

  .resume-career,
  .resume-project,
  .resume-skills {
    padding: var(--space-lg);
  }

  .resume-timeline > li {
    grid-template-columns: 1fr;
    gap: var(--space-xs);
  }

  .resume-timeline__marker {
    display: none;
  }

  .resume-timeline__content {
    padding: 0;
    border: 0;
  }

  .resume-skill-groups {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .resume-skills > header {
    display: block;
  }

  .resume-skills > header h3 {
    margin-top: var(--space-xs);
  }

  .resume-credentials {
    grid-template-columns: 1fr;
  }

  .resume-cta nav,
  .resume-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .capability-tab,
  .capability-tab > svg:last-child,
  .capability-panel-enter-active,
  .capability-panel-leave-active {
    transition: none;
  }

  .capability-tab:hover,
  .capability-panel-enter-from,
  .capability-panel-leave-to {
    transform: none;
  }
}
</style>
