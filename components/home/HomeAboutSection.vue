<script setup>
import BaseButton from '../BaseButton.vue'
import MediaFrame from '../MediaFrame.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const notes = [
  ['实践背景', '8 年商业视觉、电商设计与跨媒介交付经验。'],
  ['当前方向', '研究 AI 如何进入真实项目，并提升生产、判断与资产复用效率。'],
  ['合作方式', '适合从产品图、详情页、品牌内容或视觉工作流梳理开始。']
]
</script>

<template>
  <SectionShell id="about" tone="soft">
    <div class="about-layout">
      <div class="about-portrait">
        <MediaFrame
          src="/avatar.jpg"
          alt="Liuli AI Lab 主理人韩福利的数字头像"
          eyebrow="LIULI AI LAB"
          aspect="4 / 5"
          position="center top"
        />
        <p>个人头像为数字形象；项目经历与业务数据来自已脱敏的个人实践记录。</p>
      </div>

      <div class="about-copy">
        <SectionHeader
          eyebrow="About"
          title="由实践驱动的 AI 视觉实验室"
          desc="我关注的不是单次生成效果，而是如何把设计经验、商业目标与 AI 能力组织成稳定流程。"
        />
        <div class="about-list">
          <div v-for="item in notes" :key="item[0]">
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
.about-layout { display: grid; grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.28fr); gap: clamp(42px, 8vw, 110px); align-items: center; }
.about-portrait { width: min(430px, 100%); }
.about-portrait > p { margin: 14px 0 0; color: var(--text-muted); font-size: var(--text-label); line-height: 1.7; }
.about-copy { display: grid; gap: 28px; }
.about-list { display: grid; border-top: 1px solid var(--border-soft); }
.about-list > div { display: grid; grid-template-columns: 128px minmax(0, 1fr); gap: 24px; padding: 22px 0; border-bottom: 1px solid var(--border-soft); }
h3 { margin: 0; color: var(--brand-cyan); font-family: var(--font-sans); font-size: var(--text-small); font-weight: 600; }
.about-list p { margin: 0; color: var(--text-sub); font-size: var(--text-small); line-height: 1.8; }

@media (max-width: 760px) {
  .about-layout { grid-template-columns: 1fr; }
  .about-portrait { width: min(360px, 100%); margin: 0 auto; }
  .about-list > div { grid-template-columns: 1fr; gap: 8px; }
}
</style>
