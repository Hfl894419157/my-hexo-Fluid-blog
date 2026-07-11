<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const steps = [
  { no: '01', title: '需求输入', desc: '把目标、受众、场景、限制和交付物整理成 AI 能理解的简报。', output: '可执行 Brief', image: '/aigc-3.jpg', position: '50% 40%' },
  { no: '02', title: '变量拆解', desc: '定义风格、构图、材质、镜头和文案变量，形成可控生成范围。', output: '变量地图', image: '/aigc-2.jpg', position: '50% 52%' },
  { no: '03', title: '方向生成', desc: '用多方向探索替代单点试错，让初稿成为可以比较的方案池。', output: '方向方案池', image: '/aigc-3.jpg', position: '50% 62%' },
  { no: '04', title: '人工判断', desc: '用真实性、品牌一致性、转化目标和成本筛选真正有价值的结果。', output: '精修清单', image: '/aigc-2.jpg', position: '50% 48%' },
  { no: '05', title: '资产沉淀', desc: '把案例、Prompt、模板和复盘记录回收到下一次工作流。', output: '可复用资产包', image: '/avatar.jpg', position: '50% 30%' }
]
</script>

<template>
  <SectionShell id="workflow" tone="soft">
    <div class="workflow-head">
      <SectionHeader
        eyebrow="Workflow"
        title="五个阶段，把生成结果变成可交付系统"
        desc="横向浏览每个阶段：输入是什么、发生了什么、最后留下什么。"
      />
      <BaseButton href="/aigc/commercial-visual-system" variant="ghost">查看完整工作流</BaseButton>
    </div>

    <div class="workflow-rail" tabindex="0" aria-label="AI 视觉工作流五阶段，可横向滚动">
      <article v-for="step in steps" :key="step.no" class="workflow-step">
        <div class="workflow-step__media">
          <img :src="step.image" :alt="`${step.title}阶段的视觉示意`" loading="lazy" :style="{ objectPosition: step.position }" />
          <span>{{ step.no }}</span>
        </div>
        <div class="workflow-step__copy">
          <p>阶段 {{ step.no }}</p>
          <h3>{{ step.title }}</h3>
          <div>{{ step.desc }}</div>
          <strong>输出 · {{ step.output }}</strong>
        </div>
      </article>
    </div>
    <p class="workflow-hint">滚动查看完整流程 →</p>
  </SectionShell>
</template>

<style scoped>
.workflow-head { display: flex; gap: 32px; align-items: end; justify-content: space-between; }
.workflow-rail { display: grid; grid-auto-columns: minmax(320px, 0.62fr); grid-auto-flow: column; gap: 18px; overflow-x: auto; margin-top: 40px; padding: 0 0 18px; scroll-snap-type: x mandatory; scrollbar-color: var(--brand-main) var(--bg-card); }
.workflow-rail:focus-visible { outline: 2px solid var(--brand-main); outline-offset: 6px; }
.workflow-step { overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-card); scroll-snap-align: start; }
.workflow-step__media { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: var(--bg-soft); }
.workflow-step__media::after { position: absolute; inset: 0; content: ""; background: linear-gradient(180deg, transparent 50%, rgba(8, 10, 16, 0.6)); }
.workflow-step__media img { width: 100%; height: 100%; object-fit: cover; filter: var(--image-treatment); transition: transform 0.45s ease; }
.workflow-step:hover .workflow-step__media img { transform: scale(1.035); }
.workflow-step__media span { position: absolute; right: 18px; bottom: 14px; z-index: 1; color: #fff; font-family: var(--font-display); font-size: 44px; font-weight: 600; }
.workflow-step__copy { display: grid; min-height: 260px; align-content: start; padding: 26px; }
.workflow-step__copy p { margin: 0; color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.12em; }
h3 { margin: 14px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: var(--text-card-large); font-weight: 600; }
.workflow-step__copy div { margin-top: 14px; color: var(--text-sub); font-size: var(--text-small); line-height: 1.8; }
.workflow-step__copy strong { margin-top: auto; padding-top: 28px; color: var(--text-main); font-size: var(--text-small); }
.workflow-hint { margin: 8px 0 0; color: var(--text-muted); font-size: var(--text-label); text-align: right; }

@media (max-width: 720px) {
  .workflow-head { display: grid; align-items: start; }
  .workflow-rail { grid-auto-columns: minmax(280px, 86vw); margin-right: -16px; }
}

@media (prefers-reduced-motion: reduce) {
  .workflow-rail { scroll-behavior: auto; }
  .workflow-step__media img { transition: none; }
  .workflow-step:hover .workflow-step__media img { transform: none; }
}
</style>
