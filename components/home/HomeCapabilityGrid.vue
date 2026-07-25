<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgCapabilityIcon from './svg/SvgCapabilityIcon.vue'

const capabilities = [
  {
    variant: 1,
    index: '01',
    title: '视觉与内容系统',
    desc: '把品牌定位、产品信息和传播目标整理为统一的视觉语言，让每次输出服务于清晰表达与商业转化。',
    deliverables: '品牌视觉、产品内容、主视觉与系列传播',
    href: '/portfolio/',
    cta: '查看相关作品'
  },
  {
    variant: 2,
    index: '02',
    title: '三维与动态影像',
    desc: '结合三维渲染、镜头设计和 AI 生成，让产品、概念与技术信息在时间维度中更容易被理解。',
    deliverables: '三维渲染、产品动画、AI 视频与动态视觉',
    href: '#video-showcase',
    cta: '查看动态案例'
  },
  {
    variant: 4,
    index: '03',
    title: '数字体验与效率系统',
    desc: '把内容、页面和工作方式组织成可持续使用的数字系统，兼顾体验、维护与交付效率。',
    deliverables: '作品与品牌网站、内容架构、设计系统与 AI 工作流',
    href: '/aigc/',
    cta: '了解系统实践'
  }
]
</script>

<template>
  <SectionShell id="capabilities">
    <div class="cap-head" v-reveal="{ y: 24, repeat: true }">
      <SectionHeader
        :title-lines="['三类能力，一套完整交付路径']"
        desc="从视觉表达、动态内容到数字化落地，根据项目目标组合所需能力。"
      />
      <BaseButton href="/portfolio/" variant="ghost">查看完整作品集</BaseButton>
    </div>

    <div class="cap-grid">
      <a v-for="(item, index) in capabilities" :key="item.index"
        :href="item.href" class="cap-card"
        v-reveal="{ delay: index * 70, y: 24, repeat: true }">

        <!-- Icon + number -->
        <div class="cap-card__header">
          <div class="cap-card__icon-wrap">
            <SvgCapabilityIcon :variant="item.variant" />
          </div>
          <span class="cap-card__num">{{ item.index }}</span>
        </div>

        <!-- Copy -->
        <div class="cap-card__body">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>

        <!-- Metrics -->
        <dl class="cap-card__metrics">
          <div>
            <dt>可交付</dt>
            <dd>{{ item.deliverables }}</dd>
          </div>
        </dl>

        <span class="cap-card__cta">{{ item.cta }} →</span>
      </a>

    </div>
  </SectionShell>
</template>

<style scoped>
.cap-head {
  display: grid;
  width: 100%;
  justify-items: center;
  gap: 24px;
  text-align: center;
}

/* ─── 3列网格 ───────────────────────────────────────── */
.cap-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 44px;
}

/* ─── Card ───────────────────────────────────────────── */
.cap-card {
  display: flex;
  flex-direction: column;
  padding: 32px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  color: inherit;
  text-decoration: none;
  transition:
    opacity var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    filter var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    transform var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    border-color .25s,
    box-shadow .25s;
  transition-delay: var(--reveal-delay, 0ms);
}

.cap-card:hover {
  border-color: color-mix(in srgb, var(--brand-main) 45%, transparent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--brand-main) 12%, transparent),
    0 12px 40px color-mix(in srgb, var(--brand-main) 10%, transparent);
  transform: translateY(-4px);
}

/* Header: icon + number */
.cap-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28px;
}

.cap-card__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  background: linear-gradient(140deg,
    color-mix(in srgb, var(--brand-main) 7%, var(--bg-soft)),
    var(--bg-card));
}

.cap-card__num {
  color: var(--brand-main);
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 600;
  opacity: 0.18;
  line-height: 1;
}

/* Body */
.cap-card__body { flex: 1; }

h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(20px, 1.8vw, 26px);
  font-weight: 600;
  line-height: 1.25;
}

p {
  margin: 14px 0 0;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.85;
}

/* Metrics */
.cap-card__metrics {
  display: grid;
  margin: 28px 0 0;
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
  background: var(--border-soft);
}

.cap-card__metrics > div {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  background: var(--bg-card);
}

.cap-card__metrics dt {
  color: var(--text-muted);
  font-size: var(--text-label);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.cap-card__metrics dd {
  margin: 0;
  color: var(--text-main);
  font-size: var(--text-label);
  line-height: 1.5;
}

/* CTA link */
.cap-card__cta {
  display: inline-block;
  margin-top: 20px;
  color: var(--brand-main);
  font-size: var(--text-small);
  font-weight: 500;
  transition: letter-spacing 0.2s;
}

.cap-card:hover .cap-card__cta {
  letter-spacing: 0.04em;
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 900px) {
  .cap-grid { grid-template-columns: 1fr; max-width: 560px; margin-left: auto; margin-right: auto; }
}

@media (prefers-reduced-motion: reduce) {
  .cap-card { transition: none; }
  .cap-card:hover { transform: none; }
  .cap-card:hover .cap-card__cta { letter-spacing: normal; }
}
</style>
