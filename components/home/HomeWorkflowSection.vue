<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgWorkflowStep from './svg/SvgWorkflowStep.vue'

const steps = [
  { no: 1, label: '01', title: '需求输入', desc: '把目标、受众、场景、限制和交付物整理成 AI 能理解的可执行简报。', output: '可执行 Brief' },
  { no: 2, label: '02', title: '变量拆解', desc: '定义风格、构图、材质、镜头和文案变量，形成可控的生成参数范围。', output: '变量地图' },
  { no: 3, label: '03', title: '方向生成', desc: '用多方向探索替代单点试错，让初稿成为可以横向比较的方案池。', output: '方向方案池' },
  { no: 4, label: '04', title: '人工判断', desc: '用真实性、品牌一致性、转化目标和制作成本筛选真正有价值的结果。', output: '精修清单' },
  { no: 5, label: '05', title: '资产沉淀', desc: '把案例、Prompt、模板和复盘记录回收到下一轮工作流，形成复利。', output: '可复用资产包' }
]
</script>

<template>
  <SectionShell id="workflow" tone="soft">
    <div class="workflow-head">
      <SectionHeader
        :title-lines="['五个阶段，', '把生成结果变成可交付系统']"
        desc="每个阶段有明确的输入、过程与输出——让 AI 生成从试错变成生产。"
      />
      <BaseButton href="/aigc/commercial-visual-system" variant="ghost">查看完整工作流</BaseButton>
    </div>

    <div class="workflow-grid">
      <article v-for="step in steps" :key="step.no" class="workflow-card">
        <!-- Icon area -->
        <div class="workflow-card__icon-area">
          <SvgWorkflowStep :step="step.no" />
          <span class="workflow-card__number">{{ step.label }}</span>
        </div>

        <!-- Copy -->
        <div class="workflow-card__copy">
          <p class="workflow-card__stage">阶段 {{ step.label }}</p>
          <h3>{{ step.title }}</h3>
          <p class="workflow-card__desc">{{ step.desc }}</p>
          <div class="workflow-card__output">
            <span class="output-dot"></span>
            <strong>{{ step.output }}</strong>
          </div>
        </div>
      </article>
    </div>

    <!-- Flow connector hint -->
    <div class="workflow-connector" aria-hidden="true">
      <div v-for="i in 4" :key="i" class="connector-line"></div>
    </div>
  </SectionShell>
</template>

<style scoped>
.workflow-head {
  display: grid;
  justify-items: center;
  gap: 24px;
  text-align: center;
}

/* ─── Grid ───────────────────────────────────────────── */
.workflow-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
  margin-top: 44px;
}

/* ─── Card ───────────────────────────────────────────── */
.workflow-card {
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.workflow-card:hover {
  border-color: color-mix(in srgb, var(--brand-main) 40%, transparent);
  box-shadow: 0 8px 32px color-mix(in srgb, var(--brand-main) 10%, transparent);
  transform: translateY(-3px);
}

/* Icon area */
.workflow-card__icon-area {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 20px 20px;
  min-height: 130px;
  background: linear-gradient(160deg,
    color-mix(in srgb, var(--brand-main) 6%, var(--bg-soft)),
    var(--bg-card));
  border-bottom: 1px solid var(--border-soft);
}

.workflow-card__number {
  position: absolute;
  top: 14px;
  right: 16px;
  color: var(--brand-main);
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  opacity: 0.22;
  line-height: 1;
}

/* Copy area */
.workflow-card__copy {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 20px 22px;
}

.workflow-card__stage {
  margin: 0;
  color: var(--brand-cyan);
  font-size: var(--text-micro);
  letter-spacing: 0.14em;
}

h3 {
  margin: 10px 0 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  font-weight: 600;
  line-height: 1.3;
}

.workflow-card__desc {
  margin: 10px 0 0;
  color: var(--text-sub);
  font-size: var(--text-caption);
  line-height: 1.85;
  flex: 1;
}

.workflow-card__output {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--border-soft);
}

.output-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--brand-main);
  flex-shrink: 0;
  opacity: 0.7;
}

.workflow-card__output strong {
  color: var(--text-main);
  font-size: var(--text-label);
  font-weight: 500;
}

/* ─── Connector (decorative) ─────────────────────────── */
.workflow-connector {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: -1px;
  padding: 0 calc(10% + 7px);
  pointer-events: none;
}

.connector-line {
  height: 2px;
  background: linear-gradient(90deg, var(--brand-main), transparent);
  opacity: 0.12;
  border-radius: 1px;
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1100px) {
  .workflow-grid { grid-template-columns: repeat(3, 1fr); }
  .workflow-connector { display: none; }
}

@media (max-width: 720px) {
  .workflow-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .workflow-grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .workflow-card { transition: none; }
  .workflow-card:hover { transform: none; }
}
</style>
