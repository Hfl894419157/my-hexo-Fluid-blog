<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgAboutIdent from './svg/SvgAboutIdent.vue'

const notes = [
  ['实践背景', '8 年商业视觉、电商设计与跨媒介交付经验。'],
  ['当前方向', '研究 AI 如何进入真实项目，并提升生产、判断与资产复用效率。'],
  ['合作方式', '适合从产品图、详情页、品牌内容或视觉工作流梳理开始。']
]
</script>

<template>
  <SectionShell id="about" tone="soft">
    <div class="about-layout">
      <!-- Left: SVG identity -->
      <div class="about-portrait">
        <div class="about-portrait__frame">
          <SvgAboutIdent />
        </div>
        <p class="about-portrait__note">数字身份图形由几何构成；项目经历来自已脱敏的个人实践记录。</p>
      </div>

      <!-- Right: Copy -->
      <div class="about-copy">
        <SectionHeader
          eyebrow="About"
          title="由实践驱动的 AI 视觉实验室"
          desc="我关注的不是单次生成效果，而是如何把设计经验、商业目标与 AI 能力组织成稳定流程。"
        />

        <div class="about-list">
          <div v-for="item in notes" :key="item[0]" class="about-list__row">
            <h3>{{ item[0] }}</h3>
            <p>{{ item[1] }}</p>
          </div>
        </div>

        <BaseButton href="/resume" variant="ghost">了解我的实践背景</BaseButton>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.28fr);
  gap: clamp(40px, 7vw, 100px);
  align-items: center;
}

/* ─── Portrait ───────────────────────────────────────── */
.about-portrait { display: flex; flex-direction: column; gap: 16px; }

.about-portrait__frame {
  width: min(340px, 100%);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.about-portrait__note {
  margin: 0;
  color: var(--text-muted);
  font-size: var(--text-label);
  line-height: 1.7;
}

/* ─── Copy ───────────────────────────────────────────── */
.about-copy {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* ─── List ───────────────────────────────────────────── */
.about-list {
  border-top: 1px solid var(--border-soft);
}

.about-list__row {
  display: grid;
  grid-template-columns: 128px minmax(0, 1fr);
  gap: 24px;
  padding: 22px 0;
  border-bottom: 1px solid var(--border-soft);
}

h3 {
  margin: 0;
  color: var(--brand-cyan);
  font-family: var(--font-sans);
  font-size: var(--text-small);
  font-weight: 600;
  line-height: 1.6;
}

p {
  margin: 0;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.85;
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 780px) {
  .about-layout { grid-template-columns: 1fr; }
  .about-portrait { align-items: center; }
  .about-portrait__frame { width: min(280px, 100%); }
  .about-list__row { grid-template-columns: 1fr; gap: 8px; }
}
</style>
