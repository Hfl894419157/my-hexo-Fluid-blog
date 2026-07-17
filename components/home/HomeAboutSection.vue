<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgHomeAboutIllustration from './svg/SvgHomeAboutIllustration.vue'

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
      <div class="ab-visual" v-reveal="{ delay: 0, y: 32 }">
        <SvgHomeAboutIllustration />
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
          <BaseButton href="/resume" variant="ghost">了解我的实践背书</BaseButton>
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

/* ─── 左侧：用户提供的主题插画 ────────────────────────── */
.ab-visual {
  display: flex;
  width: 100%;
  justify-content: center;
}

.ab-visual :deep(.home-about-illustration) {
  width: min(440px, 100%);
  filter: drop-shadow(0 22px 36px color-mix(in srgb, var(--text-main), transparent 90%));
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
  
  .ab-visual {
    order: 2;
  }
  
  .ab-copy {
    order: 1;
  }
  
  .ab-visual :deep(.home-about-illustration) { width: min(380px, 86vw); }
}
</style>
