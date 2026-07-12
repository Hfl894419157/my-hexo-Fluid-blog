<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgWorkflowStep from './svg/SvgWorkflowStep.vue'

// 协同四大黄金法则数据，精简文案字数，确保排版长度绝对整齐一致
const paradigms = [
  {
    id: 'alignment',
    iconNum: 1,
    tag: '意图转译 / Intent',
    title: '商业意图精准转译',
    desc: '解构商业目标与场景约束，将人类意图精准转译为 AI 可读取的技术架构与高精细度指令语义。',
    action: '意图转译标准 →'
  },
  {
    id: 'control',
    iconNum: 2,
    tag: '变量控制 / Control',
    title: '视觉变量参数锁定',
    desc: '深度拆解画面构图与物理材质约束，将 AI 随机生成控制在品牌的确定性规范内。',
    action: '锁定参数矩阵 →'
  },
  {
    id: 'synergy',
    iconNum: 4,
    tag: '人机重塑 / Synthesis',
    title: '混合层级深度重塑',
    desc: '通过局部图层重绘、多轨拼接与人工精细后期，攻克生成盲区，确保像素级细节交付。',
    action: '查看重塑方案 →'
  },
  {
    id: 'compounding',
    iconNum: 5,
    tag: '资产回流 / Loop',
    title: '知识固化资产复利',
    desc: '将交付项目验证的 Prompt 与 Checklist 固化回知识库，让每一次项目交付叠加为资产复利。',
    action: '进入资产回流 →'
  }
]
</script>

<template>
  <SectionShell id="workflow" tone="soft">
    <!-- ① 标题区 -->
    <div class="wf-head">
      <SectionHeader
        :title-lines="['人机协同的四大黄金法则', '让 AI 创意转化为确定性资产']"
        desc="不依赖随机运气，而是通过可控变量解构、并行探索与人机协作，建立系统化的 AI 视觉交付路径。"
      />
    </div>

    <!-- ② 统一的 4 列卡片网格，结构 100% 对齐知识库 -->
    <div class="wf-grid">
      <article v-for="item in paradigms" :key="item.id" class="wf-card">
        <!-- SVG 图标 -->
        <div class="wf-card__media">
          <SvgWorkflowStep :step="item.iconNum" />
        </div>

        <!-- 卡片内容：字号、字体与间距 100% 对齐知识库 -->
        <div class="wf-card__body">
          <div class="wf-card__meta">
            <span class="wf-card__category">{{ item.tag }}</span>
          </div>
          <h3 class="wf-card__title">{{ item.title }}</h3>
          <p class="wf-card__desc">{{ item.desc }}</p>
          <div class="wf-card__footer">
            <span>{{ item.action }}</span>
          </div>
        </div>
      </article>
    </div>

    <!-- ③ 底部行动点 -->
    <div class="wf-action">
      <BaseButton href="/aigc/commercial-visual-system" variant="ghost">探索协同工作流</BaseButton>
    </div>
  </SectionShell>
</template>

<style scoped>
.wf-head {
  display: grid;
  width: 100%;
  justify-items: center;
  gap: 24px;
  text-align: center;
}

/* ─── 4列网格 ───────────────────────────────────────── */
.wf-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  margin-top: 48px;
}

/* ─── 卡片设计：100% 镜像知识库 kr-card 风格 ─────────── */
.wf-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  transition: border-color var(--transition-smooth), box-shadow var(--transition-smooth), transform var(--transition-smooth);
}

.wf-card:hover {
  border-color: color-mix(in srgb, var(--brand-main) 30%, transparent);
  box-shadow: var(--shadow-card);
  transform: translateY(-4px);
}

/* 图标区域对齐 kr-card__media 尺寸和结构 */
.wf-card__media {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 10;
  background: linear-gradient(160deg,
    color-mix(in srgb, var(--brand-main) 4%, var(--bg-soft)),
    var(--bg-card));
  border-bottom: 1px solid var(--border-soft);
}

.wf-card__media :deep(svg) {
  width: 68px;
  height: 68px;
}

/* 内容区域对齐 kr-card__body */
.wf-card__body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 24px;
}

.wf-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: var(--text-label);
}

.wf-card__category {
  color: var(--brand-main);
  font-weight: 500;
  letter-spacing: 0.05em;
}

.wf-card__title {
  margin: 0 0 10px;
  color: var(--text-main);
  font-family: var(--font-sans);
  font-size: var(--text-card-title);
  font-weight: 600;
  line-height: 1.45;
}

.wf-card__desc {
  margin: 0 0 20px;
  color: var(--text-sub);
  font-size: var(--text-caption);
  line-height: 1.65;
  flex-grow: 1;
}

.wf-card__footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--border-soft);
  color: var(--brand-main);
  font-size: var(--text-small);
  font-weight: 500;
}

/* ─── 底部操作 ───────────────────────────── */
.wf-action {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

/* ─── 响应式 ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .wf-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (max-width: 560px) {
  .wf-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wf-card {
    transition: none;
  }
  .wf-card:hover {
    transform: none;
  }
}
</style>
