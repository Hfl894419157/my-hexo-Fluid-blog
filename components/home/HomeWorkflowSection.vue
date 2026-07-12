<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgWorkflowStep from './svg/SvgWorkflowStep.vue'

// 统一的五阶段 AI 视觉工作流底座
const paradigms = [
  {
    id: 'input',
    iconNum: 1,
    tag: '阶段 01 / INPUT',
    title: '需求输入与解构',
    desc: '解构商业目标、产品事实与核心卖点，将模糊诉求转译为高确定性的视觉 Brief。',
    proof: '输出确定性视觉 Brief'
  },
  {
    id: 'deconstruction',
    iconNum: 2,
    tag: '阶段 02 / DECONSTRUCT',
    title: '变量拆解与锁定',
    desc: '拆解构图、光影、物理材质与配色限制，锁定核心变量，消灭不可控的“盲盒生成”。',
    proof: '建立视觉变量控制地图'
  },
  {
    id: 'generation',
    iconNum: 3,
    tag: '阶段 03 / GENERATION',
    title: '方向生成与迭代',
    desc: '多模型协同组合，围绕已锁定的核心变量展开大量高品质创意探索，拓宽方案空间。',
    proof: '高效率扩充方案方案池'
  },
  {
    id: 'judgment',
    iconNum: 4,
    tag: '阶段 04 / JUDGMENT',
    title: '人工判断与精修',
    desc: '人脑审美与逻辑把关。进行局部图层重绘、多轨拼接与后期像素级精细打磨，保障高质量交付。',
    proof: '人机审美与算力的高精咬合'
  },
  {
    id: 'compounding',
    iconNum: 5,
    tag: '阶段 05 / ACCUMULATE',
    title: '资产沉淀与复利',
    desc: '将交付项目中被验证的 Prompt、参数模板和检查清单送回资源库，让每次交付产生资产复利。',
    proof: '构建越用越聪明的专有生产库'
  }
]
</script>

<template>
  <SectionShell id="workflow" tone="soft">
    <div class="wf-container">
      <!-- 左侧：Sticky 粘性标题与导言区 -->
      <div class="wf-sticky-sidebar">
        <div class="wf-sticky-inner" v-reveal="{ delay: 0, y: 16 }">
          <SectionHeader
            :title-lines="['由实践驱动的五阶段工作流', '让 AI 生产进入确定性轨道']"
            desc="从需求输入、变量拆解、方向生成，到人工介入判断与最终的资产化沉淀。我不相信单次随机生成的“奇迹”，而是将每次任务整理为可重复的交付流程。"
          />
          <div class="wf-sticky-action">
            <BaseButton href="/aigc/" variant="ghost">探索协同工作流</BaseButton>
          </div>
        </div>
      </div>

      <!-- 右侧：垂直推进的步骤卡片列表与 SVG/虚线点亮轨道 -->
      <div class="wf-scroll-list">
        <!-- 垂直轨道连接线 (仅大屏显示) -->
        <div class="wf-track-line" aria-hidden="true"></div>

        <article
          v-for="(item, idx) in paradigms"
          :key="item.id"
          class="wf-card-row"
          v-reveal="{ delay: idx * 80, y: 24 }"
        >
          <!-- 轨道指示灯节点 -->
          <div class="wf-track-node" aria-hidden="true">
            <span class="wf-track-node__inner"></span>
          </div>

          <!-- 卡片内容体 -->
          <div class="wf-card-inner">
            <!-- 图标概念图示 -->
            <div class="wf-card-row__icon">
              <SvgWorkflowStep :step="item.iconNum" />
            </div>

            <!-- 文本内容 -->
            <div class="wf-card-row__copy">
              <span class="wf-card-row__tag">{{ item.tag }}</span>
              <h3>{{ item.title }}</h3>
              <p class="wf-card-row__desc">{{ item.desc }}</p>
              <div class="wf-card-row__proof">
                <span class="wf-dot"></span>
                <strong>核心：{{ item.proof }}</strong>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
/* ─── 布局容器 ───────────────────────────────────────── */
.wf-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

/* ─── 左侧 Sticky 容器 (仅大屏激活) ────────────────────────── */
.wf-sticky-sidebar {
  position: relative;
  width: 100%;
}

.wf-sticky-inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wf-sticky-action {
  margin-top: 8px;
}

/* ─── 右侧垂直卡片列表 ───────────────────────────────────── */
.wf-scroll-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 轨道背景线 (默认隐藏，大屏开启) */
.wf-track-line {
  display: none;
}

/* ─── 垂直横版卡片设计 ───────────────────────────────────── */
.wf-card-row {
  position: relative;
  display: flex;
  align-items: stretch;
}

.wf-track-node {
  display: none;
}

.wf-card-inner {
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  transition: 
    border-color var(--transition-smooth), 
    box-shadow var(--transition-smooth), 
    transform var(--transition-smooth);
}

.wf-card-row:hover .wf-card-inner {
  border-color: color-mix(in srgb, var(--brand-main) 35%, transparent);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--brand-main) 6%, transparent);
  transform: translateY(-2px);
}

/* 图标区域 */
.wf-card-row__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  background: linear-gradient(160deg,
    color-mix(in srgb, var(--brand-main) 4%, var(--bg-soft)),
    var(--bg-card));
  border-right: 1px solid var(--border-soft);
  flex-shrink: 0;
}

.wf-card-row__icon :deep(svg) {
  width: 52px;
  height: 52px;
}

/* 内容区域 */
.wf-card-row__copy {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 24px;
}

.wf-card-row__tag {
  color: var(--brand-main);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
  text-transform: uppercase;
}

h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(18px, 1.5vw, 22px);
  font-weight: 600;
  line-height: 1.3;
}

.wf-card-row__desc {
  margin: 10px 0 0;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.8;
  flex-grow: 1;
}

.wf-card-row__proof {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 12px;
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

.wf-card-row__proof strong {
  color: var(--text-main);
  font-size: var(--text-label);
  font-weight: 500;
}

/* ─── 媒体查询响应式 ─────────────────────────────────────── */

/* 大屏端 (>= 1024px) 激活 Sticky Scroll 布局与指示轨点亮 */
@media (min-width: 1024px) {
  .wf-container {
    grid-template-columns: 380px 1fr;
    gap: 64px;
  }

  .wf-sticky-sidebar {
    position: sticky;
    top: 130px; /* 完美固定高度，给 Header 留出空间 */
  }

  .wf-scroll-list {
    padding-left: 48px;
  }

  /* 直立的轨道虚线 */
  .wf-track-line {
    display: block;
    position: absolute;
    left: 17px;
    top: 48px;
    bottom: 48px;
    width: 1px;
    border-left: 1px dashed var(--border-soft);
    z-index: 0;
  }

  .wf-track-node {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--bg-page);
    border: 1.5px solid var(--border-strong);
    z-index: 1;
    transition: 
      background-color var(--transition-smooth),
      border-color var(--transition-smooth),
      box-shadow var(--transition-smooth);
  }

  /* 指示圆点心部 */
  .wf-track-node__inner {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: transparent;
    transition: background-color var(--transition-smooth);
  }

  /* 当卡片在滚动中被 reveal 激活时，小圆点高亮 */
  .wf-card-row.is-revealed .wf-track-node {
    border-color: var(--brand-main);
    background: var(--bg-page);
    box-shadow: 0 0 12px color-mix(in srgb, var(--brand-main) 60%, transparent);
  }

  .wf-card-row.is-revealed .wf-track-node__inner {
    background-color: var(--brand-main);
  }
}

/* 窄屏端 (< 560px) 卡片降级为自适应上下堆叠结构 */
@media (max-width: 560px) {
  .wf-card-inner {
    flex-direction: column;
  }
  
  .wf-card-row__icon {
    width: 100%;
    padding: 24px 0;
    border-right: none;
    border-bottom: 1px solid var(--border-soft);
  }
}

@media (prefers-reduced-motion: reduce) {
  .wf-card-inner {
    transition: none;
  }
  .wf-card-row:hover .wf-card-inner {
    transform: none;
  }
}
</style>
