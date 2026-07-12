<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgWorkflowStep from './svg/SvgWorkflowStep.vue'

// 重新发散定义 AI 协作的核心底座（4大协同契约），取代原本死板的线性流
const paradigms = [
  {
    id: 'alignment',
    iconNum: 1,
    tag: '意图共鸣 / Intent Alignment',
    title: '精准意图共鸣与翻译',
    desc: '抛弃粗糙的关键词堆砌。解构商业目的与产品核心事实，将模糊的感性诉求无损转译为 AI 能够理解的高精细度指令语义。',
    proof: '生成确定性的视觉 Brief'
  },
  {
    id: 'control',
    iconNum: 2,
    tag: '可控纠偏 / Parameter Control',
    title: '视觉变量锁定与解构',
    desc: '深度拆解构图、物理光影与材质约束。建立变量锁定模型，将 AI 生成的“随机性概率”约束在可控的品牌调性区间。',
    proof: '消灭不可控的“盲盒生成”'
  },
  {
    id: 'synergy',
    iconNum: 4,
    tag: '人机重塑 / Hybrid Synthesis',
    title: '混合层级修补与重塑',
    desc: '不依赖单纯的直出。通过局部图层重绘、多轨拼接和人工精细后期的复合链路，突破生成极限，确保像素级细节完美交付。',
    proof: '人脑审美与 AI 算力高精度咬合'
  },
  {
    id: 'compounding',
    iconNum: 5,
    tag: '资产回流 / Knowledge Loop',
    title: '知识固化与资产复利',
    desc: '将交付案例中被验证的 Prompt、私有参数和清单规整，重新注回个人与品牌知识库，让每一次项目交付都叠加为资产复利。',
    proof: '构建越用越聪明的专有生产库'
  }
]
</script>

<template>
  <SectionShell id="workflow" tone="soft">
    <!-- ① 标题区：发散文案，重构对 AI 工作流程的深度认知 -->
    <div class="wf-head">
      <SectionHeader
        :title-lines="['人机协同的四大黄金法则', '让 AI 创意转化为确定性资产']"
        desc="我们不相信凭运气直出的偶然生成，而是通过意图翻译、参数锁定、层级修补与资产回流的协同方法，确保商业交付的稳定落地。"
      />
      <BaseButton href="/aigc/commercial-visual-system" variant="ghost">探索协同工作流</BaseButton>
    </div>

    <!-- ② 统一的 4 列卡片网格 -->
    <div class="wf-grid">
      <article v-for="item in paradigms" :key="item.id" class="wf-card">
        <!-- SVG 图标概念性图示 -->
        <div class="wf-card__icon">
          <SvgWorkflowStep :step="item.iconNum" />
        </div>

        <!-- 文本内容 -->
        <div class="wf-card__copy">
          <span class="wf-card__tag">{{ item.tag }}</span>
          <h3>{{ item.title }}</h3>
          <p class="wf-card__desc">{{ item.desc }}</p>
          <div class="wf-card__proof">
            <span class="wf-dot"></span>
            <strong>核心：{{ item.proof }}</strong>
          </div>
        </div>
      </article>
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
  gap: 20px;
  margin-top: 48px;
}

/* ─── 卡片设计 ───────────────────────────────────────── */
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
  border-color: color-mix(in srgb, var(--brand-main) 35%, transparent);
  box-shadow: 0 12px 36px color-mix(in srgb, var(--brand-main) 8%, transparent);
  transform: translateY(-4px);
}

/* 图标区域 */
.wf-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 20px 20px;
  min-height: 120px;
  background: linear-gradient(160deg,
    color-mix(in srgb, var(--brand-main) 4%, var(--bg-soft)),
    var(--bg-card));
  border-bottom: 1px solid var(--border-soft);
}

.wf-card__icon :deep(svg) {
  width: 68px;
  height: 68px;
}

/* 内容区域 */
.wf-card__copy {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 24px;
}

.wf-card__tag {
  color: var(--brand-main);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  text-transform: uppercase;
}

h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(20px, 1.8vw, 26px);
  font-weight: 600;
  line-height: 1.25;
}

.wf-card__desc {
  margin: 14px 0 0;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.85;
  flex-grow: 1;
}

.wf-card__proof {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px dashed var(--border-soft);
}

.wf-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--brand-main);
  flex-shrink: 0;
  opacity: 0.8;
}

.wf-card__proof strong {
  color: var(--text-main);
  font-size: var(--text-label);
  font-weight: 500;
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
