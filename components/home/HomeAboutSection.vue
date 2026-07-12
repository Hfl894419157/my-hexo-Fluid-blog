<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgAboutIdent from './svg/SvgAboutIdent.vue'

// 升级实验室的理念宣誓，抛弃原本行政化、表格化的简历感，改用极具专业力量的“宣言式”陈列
const manifestos = [
  {
    title: '8 年商业实战底蕴',
    desc: '深耕商业视觉、电商设计与跨媒介交付。这让我理解 AI 只是工具，而真实的商业转化、审美沉淀与交付标准才是底线。'
  },
  {
    title: '全链路 AI 协同开发',
    desc: '不相信单次随机生成的“奇迹”，我专注于将意图转译、变量控制、局部精修到最终交付，沉淀为高复用性的系统资产。'
  },
  {
    title: '可持续的资产沉淀',
    desc: '为品牌量身定制专有的 Prompt 架构、LoRA 模型与项目 Checklist，让设计经验不再流失，随项目推进产生指数级资产复利。'
  }
]
</script>

<template>
  <SectionShell id="about" tone="soft">
    <div class="ab-layout">
      <!-- 左侧：升级为充满呼吸感与科技背书的“实验室电子铭牌” -->
      <div class="ab-badge-area" v-reveal="{ delay: 0, y: 32 }">
        <div class="ab-badge">
          <div class="ab-badge__glow" aria-hidden="true"></div>
          <div class="ab-badge__inner">
            <div class="ab-badge__logo">
              <SvgAboutIdent />
            </div>
            <div class="ab-badge__meta">
              <span class="ab-badge__label">EST. 2026</span>
              <strong class="ab-badge__title">LIULI AI LAB</strong>
              <p class="ab-badge__desc">实践驱动的 AI 视觉协同</p>
            </div>
            <div class="ab-badge__footer">
              <span>SYSTEMATIC</span>
              <span>VERIFIED</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：大字号的画册风宣言排版 -->
      <div class="ab-copy" v-reveal="{ delay: 100, y: 24 }">
        <SectionHeader
          align="left"
          title="由实践驱动的 AI 视觉实验室"
          desc="我关注的不是单次偶然的生成效果，而是如何把成熟的设计经验、严苛的商业目标与 AI 生产力组织成稳定、可控的流程。"
        />

        <div class="ab-manifestos">
          <div v-for="(item, idx) in manifestos" :key="idx" class="ab-manifestos__card">
            <span class="ab-manifestos__num">0{{ idx + 1 }}</span>
            <div class="ab-manifestos__text">
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <div class="ab-actions">
          <BaseButton href="/resume" variant="ghost">了解实验室实践背书</BaseButton>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.ab-layout {
  display: grid;
  grid-template-columns: minmax(300px, 0.75fr) minmax(0, 1.25fr);
  gap: clamp(48px, 6vw, 96px);
  align-items: center;
}

/* ─── 左侧：实验室电子铭牌卡片 ────────────────────────── */
.ab-badge-area {
  display: flex;
  justify-content: center;
}

.ab-badge {
  position: relative;
  width: min(340px, 100%);
  aspect-ratio: 4 / 5;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-card);
  padding: 32px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 微弱的环境呼吸光晕 */
.ab-badge__glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--brand-main) 4%, transparent), transparent 60%);
  pointer-events: none;
}

.ab-badge__inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.ab-badge__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 1px solid var(--border-soft);
  border-radius: 16px;
  background: var(--bg-soft);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
}

.ab-badge__logo :deep(svg) {
  width: 48px;
  height: 48px;
}

.ab-badge__meta {
  margin-top: 40px;
  margin-bottom: auto;
}

.ab-badge__label {
  display: block;
  font-size: var(--text-micro);
  letter-spacing: 0.15em;
  color: var(--brand-main);
  font-weight: 500;
  margin-bottom: 8px;
}

.ab-badge__title {
  display: block;
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 600;
  color: var(--text-main);
  letter-spacing: 0.05em;
}

.ab-badge__desc {
  margin: 6px 0 0;
  font-size: var(--text-caption);
  color: var(--text-sub);
}

.ab-badge__footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed var(--border-soft);
  padding-top: 20px;
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

/* ─── 右侧：高端画册风宣言列表 ────────────────────────── */
.ab-copy {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.ab-copy :deep(.section-header) {
  width: 100%;
}

.ab-manifestos {
  display: grid;
  gap: 24px;
  border-top: 1px solid var(--border-soft);
  padding-top: 24px;
}

.ab-manifestos__card {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.ab-manifestos__num {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 500;
  color: var(--brand-main);
  opacity: 0.8;
  line-height: 1;
  padding-top: 2px;
}

.ab-manifestos__text h4 {
  margin: 0 0 8px;
  color: var(--text-main);
  font-size: var(--text-body);
  font-weight: 600;
  line-height: 1.4;
}

.ab-manifestos__text p {
  margin: 0;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.75;
}

.ab-actions {
  display: flex;
  justify-content: flex-start;
}

/* ─── 响应式 ─────────────────────────────────────── */
@media (max-width: 900px) {
  .ab-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .ab-badge-area {
    order: 2;
  }
  
  .ab-copy {
    order: 1;
  }
  
  .ab-badge {
    aspect-ratio: auto;
    padding: 28px;
  }

  .ab-badge__meta {
    margin-top: 28px;
    margin-bottom: 28px;
  }
}
</style>
