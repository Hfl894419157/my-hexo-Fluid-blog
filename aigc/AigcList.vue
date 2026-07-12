<script setup>
import { allAigcWorks as aigcWorks } from '../.shared/aigcData.js'
import MediaFrame from '../components/MediaFrame.vue'

const stats = [
  { value: '5', label: '核心工作流阶段' },
  { value: '1', label: '已发布完整案例' },
  { value: '∞', label: '持续更新积累中' },
]

const phases = [
  { no: '01', title: '需求输入', icon: '⬡' },
  { no: '02', title: '变量拆解', icon: '⬡' },
  { no: '03', title: '方向生成', icon: '⬡' },
  { no: '04', title: '人工判断', icon: '⬡' },
  { no: '05', title: '资产沉淀', icon: '⬡' },
]
</script>

<template>
  <!-- ─── Hero 区 ─────────────────────────────────── -->
  <section class="aigc-hero">
    <div class="aigc-hero__grid" aria-hidden="true"></div>

    <div class="aigc-hero__inner">
      <div class="aigc-hero__content">
        <p class="aigc-hero__eyebrow">AI VISUAL LAB · 由实践驱动的工作流实验室</p>
        <h1>
          <span class="h1-line">不是工具清单，</span>
          <span class="h1-line h1-accent">是可复用的生产系统</span>
        </h1>
        <p class="aigc-hero__lead">
          从真实商业项目出发，把 AI 生成的变量控制、结果筛选与判断标准，<br class="aigc-hero__br">
          整理成五阶段工作流——让每一次执行都能为下一次积累。
        </p>

        <!-- 相位指示器 -->
        <div class="aigc-hero__phases" aria-label="工作流阶段">
          <div v-for="phase in phases" :key="phase.no" class="phase-chip">
            <span class="phase-chip__no">{{ phase.no }}</span>
            <span class="phase-chip__label">{{ phase.title }}</span>
          </div>
          <div class="phase-chip__connector" aria-hidden="true"></div>
        </div>
      </div>

      <!-- 右侧装饰视觉 -->
      <div class="aigc-hero__visual" aria-hidden="true">
        <div class="visual-frame">
          <div class="visual-frame__bg"></div>
          <div class="visual-frame__grid"></div>
          <div class="visual-node visual-node--a">
            <svg viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="20" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/>
              <circle cx="28" cy="28" r="8" fill="currentColor" fill-opacity="0.18"/>
              <circle cx="28" cy="28" r="3" fill="currentColor"/>
            </svg>
            <span>需求 Brief</span>
          </div>
          <div class="visual-node visual-node--b">
            <svg viewBox="0 0 56 56" fill="none">
              <rect x="8" y="8" width="40" height="40" rx="6" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/>
              <rect x="18" y="18" width="20" height="20" rx="3" fill="currentColor" fill-opacity="0.12"/>
              <path d="M24 28h8M28 24v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span>变量地图</span>
          </div>
          <div class="visual-node visual-node--c">
            <svg viewBox="0 0 56 56" fill="none">
              <polygon points="28,6 50,50 6,50" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08" stroke-dasharray="4 3"/>
              <circle cx="28" cy="38" r="4" fill="currentColor" fill-opacity="0.4"/>
            </svg>
            <span>方案池</span>
          </div>
          <div class="visual-node visual-node--d">
            <svg viewBox="0 0 56 56" fill="none">
              <path d="M28 10 L46 46 L10 46 Z" stroke="none"/>
              <rect x="10" y="10" width="36" height="36" rx="18" stroke="currentColor" stroke-width="1"/>
              <path d="M20 28l5 5 11-11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
            <span>精修清单</span>
          </div>
          <div class="visual-node visual-node--e">
            <svg viewBox="0 0 56 56" fill="none">
              <path d="M8 28h10M38 28h10M28 8v10M28 38v10" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/>
              <circle cx="28" cy="28" r="10" stroke="currentColor" stroke-width="1.2"/>
              <circle cx="28" cy="28" r="4" fill="currentColor" fill-opacity="0.3"/>
            </svg>
            <span>资产包</span>
          </div>
          <!-- 连接线 -->
          <svg class="visual-lines" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 80 Q160 120 160 140" stroke="currentColor" stroke-width="0.8" stroke-dasharray="5 4" opacity="0.3"/>
            <path d="M240 80 Q160 120 160 140" stroke="currentColor" stroke-width="0.8" stroke-dasharray="5 4" opacity="0.3"/>
            <path d="M160 140 Q100 180 80 200" stroke="currentColor" stroke-width="0.8" stroke-dasharray="5 4" opacity="0.3"/>
            <path d="M160 140 Q220 180 240 200" stroke="currentColor" stroke-width="0.8" stroke-dasharray="5 4" opacity="0.3"/>
          </svg>
        </div>

        <!-- 统计数字 -->
        <div class="aigc-hero__stats">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 滚动提示 -->
    <div class="aigc-hero__scroll" aria-hidden="true"><span></span></div>
  </section>

  <!-- ─── 工作流卡片列表 ─────────────────────────────── -->
  <section class="aigc-list">
    <div class="aigc-list__inner">
      <header class="aigc-list__head">
        <p class="aigc-list__eyebrow">WORKFLOW CASES</p>
        <h2>每个案例都是一次完整的生产记录</h2>
        <p class="aigc-list__desc">重点不是工具清单，而是变量如何控制、结果如何筛选，以及哪些经验可以进入下一次项目。</p>
      </header>

      <div class="aigc-grid">
        <a
          v-for="(work, index) in aigcWorks"
          :key="work.id"
          class="aigc-card"
          :class="{ 'aigc-card--lead': index === 0 }"
          :href="work.link"
        >
          <!-- Media / placeholder -->
          <div class="aigc-card__media">
            <MediaFrame
              v-if="work.cover"
              :src="work.cover"
              :alt="work.alt || work.title"
              aspect="16 / 9"
            />
            <div v-else class="aigc-card__placeholder" aria-hidden="true">
              <svg viewBox="0 0 160 90" fill="none">
                <rect x="20" y="20" width="120" height="50" rx="4"
                  stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.3"
                  stroke-dasharray="5 4" fill="none"/>
                <circle cx="80" cy="45" r="12"
                  stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35" fill="none"/>
                <line x1="80" y1="33" x2="80" y2="57" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.25"/>
                <line x1="68" y1="45" x2="92" y2="45" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.25"/>
              </svg>
            </div>
            <span class="aigc-card__badge aigc-card__badge--live">AI WORKFLOW</span>
          </div>

          <!-- Copy -->
          <div class="aigc-card__body">
            <span class="aigc-card__category">{{ work.category || '内容工作流' }}</span>
            <h3>{{ work.title }}</h3>
            <p v-if="work.desc">{{ work.desc }}</p>
            <strong class="aigc-card__cta">查看完整工作流 →</strong>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ═══════════════════════════════════════════════
   HERO 区域
   ═══════════════════════════════════════════════ */
.aigc-hero {
  position: relative;
  min-height: 76vh;
  overflow: hidden;
  padding: 120px 24px 64px;
  background:
    radial-gradient(ellipse 60% 50% at 70% 20%, color-mix(in srgb, var(--brand-main) 8%, transparent), transparent),
    radial-gradient(ellipse 40% 40% at 20% 75%, color-mix(in srgb, var(--brand-main) 5%, transparent), transparent),
    var(--site-background);
}

.aigc-hero__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image:
    linear-gradient(180deg, transparent 0%, #000 20%, #000 70%, transparent 100%),
    linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
  mask-composite: intersect;
  opacity: 0.32;
}

.aigc-hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 0.9fr);
  gap: clamp(48px, 7vw, 100px);
  align-items: center;
  width: min(1180px, 100%);
  min-height: calc(76vh - 184px);
  margin: 0 auto;
}

/* ── 左侧文字 ── */
.aigc-hero__eyebrow {
  margin: 0 0 20px;
  color: var(--brand-main);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.8;
}

h1 {
  max-width: 640px;
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(38px, 4vw, 58px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.h1-line { display: block; }

.h1-accent {
  display: block;
  margin-top: 4px;
  background: linear-gradient(120deg, var(--brand-main) 0%, var(--brand-second) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.aigc-hero__lead {
  max-width: 560px;
  margin: 28px 0 0;
  color: var(--text-sub);
  font-size: clamp(14px, 1.2vw, 16px);
  line-height: 2;
}

.aigc-hero__br { display: block; }

/* ── 工作流阶段指示器 ── */
.aigc-hero__phases {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 40px;
  padding: 20px 24px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  backdrop-filter: blur(8px);
  overflow: hidden;
}

.aigc-hero__phases::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, color-mix(in srgb, var(--brand-main) 4%, transparent), transparent);
  pointer-events: none;
}

.phase-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 6px;
  padding: 0 8px;
  position: relative;
  z-index: 1;
}

.phase-chip + .phase-chip::before {
  content: '→';
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--brand-main);
  font-size: 11px;
  opacity: 0.35;
}

.phase-chip__no {
  color: var(--brand-main);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  opacity: 0.6;
}

.phase-chip__label {
  color: var(--text-main);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.phase-chip__connector { display: none; }

/* ── 右侧视觉 ── */
.aigc-hero__visual {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.visual-frame {
  position: relative;
  aspect-ratio: 4 / 3.2;
  border: 1px solid var(--border-soft);
  border-radius: 18px;
  background: var(--bg-card);
  overflow: hidden;
}

.visual-frame__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 40%, color-mix(in srgb, var(--brand-main) 7%, transparent), transparent);
}

.visual-frame__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 36px 36px;
  opacity: 0.5;
}

/* 5个节点 */
.visual-node {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--brand-main);
  z-index: 2;
}

.visual-node svg {
  width: 44px;
  height: 44px;
  filter: drop-shadow(0 2px 8px color-mix(in srgb, var(--brand-main) 20%, transparent));
}

.visual-node span {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--text-sub);
  white-space: nowrap;
}

.visual-node--a { top: 14%; left: 18%; }
.visual-node--b { top: 14%; right: 18%; }
.visual-node--c { top: 46%; left: 50%; transform: translateX(-50%); }
.visual-node--d { bottom: 14%; left: 18%; }
.visual-node--e { bottom: 14%; right: 18%; }

.visual-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--brand-main);
  pointer-events: none;
  z-index: 1;
}

/* 统计数字 */
.aigc-hero__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--border-soft);
  overflow: hidden;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 18px 12px;
  background: var(--bg-card);
  text-align: center;
}

.stat-item strong {
  display: block;
  color: var(--brand-main);
  font-family: var(--font-display);
  font-size: clamp(22px, 2.4vw, 30px);
  font-weight: 600;
  line-height: 1;
}

.stat-item span {
  color: var(--text-muted);
  font-size: 11px;
  letter-spacing: 0.04em;
  line-height: 1.4;
}

/* ── 滚动指示 ── */
.aigc-hero__scroll {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
}

.aigc-hero__scroll span {
  display: block;
  width: 1px;
  height: 44px;
  background: linear-gradient(180deg, var(--brand-main), transparent);
  animation: scroll-line 2s ease-in-out infinite;
}

@keyframes scroll-line {
  0%   { opacity: 0; transform: scaleY(0); transform-origin: top; }
  50%  { opacity: 1; transform: scaleY(1); }
  100% { opacity: 0; transform: scaleY(1) translateY(16px); }
}

/* ═══════════════════════════════════════════════
   卡片列表区
   ═══════════════════════════════════════════════ */
.aigc-list {
  padding: clamp(56px, 7vw, 92px) 24px clamp(72px, 8vw, 110px);
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--bg-soft), transparent 18%), transparent);
}

.aigc-list__inner {
  width: min(1180px, 100%);
  margin: 0 auto;
}

.aigc-list__head {
  text-align: center;
  margin-bottom: 52px;
}

.aigc-list__eyebrow {
  margin: 0 0 14px;
  color: var(--brand-main);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.75;
}

.aigc-list__head h2 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(28px, 3.2vw, 44px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.aigc-list__desc {
  max-width: 600px;
  margin: 16px auto 0;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.9;
}

/* ── 网格 ── */
.aigc-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

/* ── 卡片 ── */
.aigc-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: var(--bg-card);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.aigc-card:hover {
  border-color: color-mix(in srgb, var(--brand-main) 40%, transparent);
  box-shadow: 0 8px 36px color-mix(in srgb, var(--brand-main) 10%, transparent);
  transform: translateY(-3px);
}

/* Lead 卡片（首位）占满 2 列 */
.aigc-card--lead {
  grid-column: 1 / -1;
  flex-direction: row;
}

.aigc-card--lead .aigc-card__media {
  flex: 0 0 58%;
  max-width: 58%;
}

.aigc-card--lead .aigc-card__body {
  justify-content: center;
  padding: clamp(28px, 4vw, 52px);
}

.aigc-card--lead h3 {
  font-size: clamp(20px, 2.2vw, 30px);
}

/* Media */
.aigc-card__media {
  position: relative;
  overflow: hidden;
  background: var(--bg-soft);
  flex-shrink: 0;
}

.aigc-card__media :deep(.media-frame__viewport) {
  border: 0;
  border-radius: 0;
  box-shadow: none;
  transition: transform 0.4s ease;
}

.aigc-card:hover :deep(.media-frame__viewport img) {
  transform: scale(1.04);
}

.aigc-card__media :deep(figcaption) { display: none; }

.aigc-card__placeholder {
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-soft), var(--bg-page));
}

.aigc-card__placeholder svg {
  width: 50%;
  height: auto;
}

/* Badge */
.aigc-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 10px;
  letter-spacing: 0.08em;
  border: 1px solid var(--border-soft);
  background: color-mix(in srgb, var(--bg-card) 82%, transparent);
  backdrop-filter: blur(6px);
  color: var(--text-muted);
}

.aigc-card__badge--live {
  color: var(--brand-cyan);
  border-color: color-mix(in srgb, var(--brand-main) 30%, transparent);
}

/* Body */
.aigc-card__body {
  display: flex;
  flex-direction: column;
  padding: 22px 22px 24px;
  flex: 1;
}

.aigc-card__category {
  color: var(--brand-cyan);
  font-size: 11px;
  letter-spacing: 0.08em;
}

h3 {
  margin: 10px 0 0 !important;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(17px, 1.6vw, 22px);
  font-weight: 600;
  line-height: 1.3;
}

p {
  margin: 10px 0 0 !important;
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.8;
  flex: 1;
}

.aigc-card__cta {
  display: inline-block;
  margin-top: 18px;
  color: var(--brand-main);
  font-size: 13px;
}

/* ═══════════════════════════════════════════════
   响应式
   ═══════════════════════════════════════════════ */
@media (max-width: 1060px) {
  .aigc-hero__inner { grid-template-columns: 1fr 320px; }
  .aigc-card--lead { flex-direction: column; }
  .aigc-card--lead .aigc-card__media { flex: unset; max-width: 100%; }
}

@media (max-width: 860px) {
  .aigc-hero { padding: 100px 24px 56px; min-height: auto; }
  .aigc-hero__inner { grid-template-columns: 1fr; gap: 40px; min-height: auto; }
  .aigc-hero__content { text-align: center; }
  .aigc-hero__lead { margin-left: auto; margin-right: auto; }
  .aigc-hero__phases { justify-content: center; }
  .aigc-hero__visual { max-width: 480px; margin: 0 auto; }
  .aigc-hero__scroll { display: none; }
  .aigc-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .aigc-hero { padding-right: 16px; padding-left: 16px; }
  .aigc-list { padding-right: 16px; padding-left: 16px; }
  .aigc-grid { grid-template-columns: 1fr; }
  .aigc-hero__phases { gap: 0; padding: 16px 12px; }
  .phase-chip__label { font-size: 10px; }
  .aigc-hero__br { display: none; }
}

@media (max-width: 480px) {
  h1 { font-size: clamp(30px, 8.4vw, 38px); }
}

@media (prefers-reduced-motion: reduce) {
  .aigc-card { transition: none; }
  .aigc-card:hover { transform: none; }
  .aigc-hero__scroll { display: none; }
}
</style>
