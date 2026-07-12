<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgWorkflowStep from './svg/SvgWorkflowStep.vue'

// 重新定义 AI 协作与工作流的五个核心支柱，抛弃死板的线性流水线，强调系统级能力
const modules = [
  {
    no: 1,
    tag: 'INTENT · 意图转译',
    title: '商业需求精确转译',
    desc: '从产品事实与商业Brief出发，解构目标受众与场景约束，将人类意图精准转译为 AI 可读取的技术架构与指令上下文。',
    output: '可执行指令集'
  },
  {
    no: 2,
    tag: 'CONTROL · 变量控制',
    title: '多维视觉变量解构',
    desc: '对画风、构图、光影材质与视角变量进行深度拆解和参数化锁定，把 AI 随机生成的“概率”压缩在确定性的品牌规范内。',
    output: '可控参数矩阵'
  },
  {
    no: 3,
    tag: 'SYNTHESIS · 多轨探索',
    title: '多并轨并行探索',
    desc: '抛弃单点低效试错，通过结构化方向矩阵，多条创意线索同步输出与并联测试，建立宽广且极具对比性的方案池。',
    output: '方案对比池'
  },
  {
    no: 4,
    tag: 'DECISION · 协同决策',
    title: '高维审美与人工介入',
    desc: '基于真实转化率、版权合规及印刷/屏幕成像标准，对生成结果进行多轮价值判定，结合人工精细后期完成最终交付。',
    output: '精修交付包'
  },
  {
    no: 5,
    tag: 'COMPOUND · 资产回收',
    title: '交付资产回收与沉淀',
    desc: '每个项目的完结都是下一次的起点。将沉淀出的可用 Prompt、微调模型及 Checklist 沉淀并固化，形成可持续复利。',
    output: '可复用资产库'
  }
]
</script>

<template>
  <SectionShell id="workflow" tone="soft">
    <!-- ① 标题区：重新优化文案，强调 AI 生成到商业交付的底层确定性 -->
    <div class="workflow-head">
      <SectionHeader
        :title-lines="['从概率生成', '到确定性的商业交付']"
        desc="不依赖随机运气，而是通过可控变量解构、并行探索与人机协作，建立系统化的 AI 视觉交付路径。"
      />
      <BaseButton href="/aigc/commercial-visual-system" variant="ghost">探索 AI 工作流</BaseButton>
    </div>

    <!-- ② 统一的卡片网格 -->
    <div class="workflow-grid">
      <article v-for="mod in modules" :key="mod.no" class="workflow-card">
        <!-- 概念性 SVG 示意图 -->
        <div class="workflow-card__icon-area">
          <SvgWorkflowStep :step="mod.no" />
        </div>

        <!-- 卡片内容 -->
        <div class="workflow-card__copy">
          <span class="workflow-card__tag">{{ mod.tag }}</span>
          <h3>{{ mod.title }}</h3>
          <p class="workflow-card__desc">{{ mod.desc }}</p>
          <div class="workflow-card__output">
            <span class="output-dot"></span>
            <strong>输出 · {{ mod.output }}</strong>
          </div>
        </div>
      </article>
    </div>

    <!-- 概念链接图饰 -->
    <div class="workflow-connector" aria-hidden="true">
      <div v-for="i in 4" :key="i" class="connector-line"></div>
    </div>
  </SectionShell>
</template>

<style scoped>
.workflow-head {
  display: grid;
  width: 100%;
  justify-items: center;
  gap: 24px;
  text-align: center;
}

/* ─── Grid ───────────────────────────────────────────── */
.workflow-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
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
  transition: border-color var(--transition-smooth), box-shadow var(--transition-smooth), transform var(--transition-smooth);
}

.workflow-card:hover {
  border-color: color-mix(in srgb, var(--brand-main) 35%, transparent);
  box-shadow: 0 10px 32px color-mix(in srgb, var(--brand-main) 8%, transparent);
  transform: translateY(-3px);
}

/* 图标区域 */
.workflow-card__icon-area {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 20px 20px;
  min-height: 120px;
  background: linear-gradient(160deg,
    color-mix(in srgb, var(--brand-main) 4%, var(--bg-soft)),
    var(--bg-card));
  border-bottom: 1px solid var(--border-soft);
}

/* 内容区域 */
.workflow-card__copy {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
}

.workflow-card__tag {
  color: var(--brand-main);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
  text-transform: uppercase;
}

h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  font-weight: 600;
  line-height: 1.35;
}

.workflow-card__desc {
  margin: 10px 0 0;
  color: var(--text-sub);
  font-size: var(--text-caption);
  line-height: 1.75;
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
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--brand-main);
  flex-shrink: 0;
  opacity: 0.8;
}

.workflow-card__output strong {
  color: var(--text-main);
  font-size: var(--text-label);
  font-weight: 500;
}

/* ─── 概念连线 (点缀装饰) ────────────────────────── */
.workflow-connector {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: -1px;
  padding: 0 calc(10% + 8px);
  pointer-events: none;
}

.connector-line {
  height: 2px;
  background: linear-gradient(90deg, var(--brand-main), transparent);
  opacity: 0.08;
  border-radius: 1px;
}

/* ─── 响应式 ─────────────────────────────────────── */
@media (max-width: 1200px) {
  .workflow-grid { grid-template-columns: repeat(3, 1fr); }
  .workflow-connector { display: none; }
}

@media (max-width: 768px) {
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
