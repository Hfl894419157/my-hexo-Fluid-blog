<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgWorkflowStep from './svg/SvgWorkflowStep.vue'
import { data as contentCatalog } from '../../.shared/content.data.mjs'
import { resolveSelections } from '../../.shared/contentClient.js'
import homeSelections from '../../.shared/content/home.json'

const featuredWorkflows = resolveSelections(
  contentCatalog.workflows,
  homeSelections.featuredWorkflows,
  3
)

// 统一的五阶段 AI 视觉工作流底座
const paradigms = [
  {
    id: 'input',
    iconNum: 1,
    title: '需求输入与解构',
    desc: '解构商业目标、产品事实与核心卖点，将模糊诉求转译为高确定性的视觉 Brief。',
    proof: '输出确定性视觉 Brief'
  },
  {
    id: 'deconstruction',
    iconNum: 2,
    title: '变量拆解与锁定',
    desc: '拆解构图、光影、物理材质与配色限制，锁定核心变量，消灭不可控的“盲盒生成”。',
    proof: '建立视觉变量控制地图'
  },
  {
    id: 'generation',
    iconNum: 3,
    title: '方向生成与迭代',
    desc: '多模型协同组合，围绕已锁定的核心变量展开大量高品质创意探索，拓宽方案空间。',
    proof: '高效率扩充方案方案池'
  },
  {
    id: 'judgment',
    iconNum: 4,
    title: '人工判断与精修',
    desc: '人脑审美与逻辑把关。进行局部图层重绘、多轨拼接与后期像素级精细打磨，保障高质量交付。',
    proof: '人机审美与算力的高精咬合'
  },
  {
    id: 'compounding',
    iconNum: 5,
    title: '资产沉淀与复利',
    desc: '将交付项目中被验证的 Prompt、参数模板和检查清单送回资源库，让每次交付产生资产复利。',
    proof: '构建越用越聪明的专有生产库'
  }
]
</script>

<template>
  <SectionShell id="workflow" tone="soft">
    <!-- ① 标题区：重塑对 AI 工作流程的从容发散 -->
    <div class="wf-head" v-reveal="{ delay: 0, y: 16 }">
      <SectionHeader
        :title-lines="['由实践驱动的五阶段工作流', '让 AI 生产进入确定性轨道']"
        desc="从需求输入、变量拆解、方向生成，到人工介入判断与最终的资产化沉淀。我不相信单次随机生成的“奇迹”，而是将每次任务整理为可重复的交付流程。"
      />
      <BaseButton href="/aigc/" variant="ghost">探索协同工作流</BaseButton>
    </div>

    <!-- ② 原版 5 列卡片网格 (100% 完美恢复，仅引入 v-reveal 滚动渐显) -->
    <div class="wf-grid">
      <article 
        v-for="(item, idx) in paradigms" 
        :key="item.id" 
        class="wf-card"
        v-reveal="{ delay: idx * 80, y: 24 }"
      >
        <!-- SVG 图标概念性图示 -->
        <div class="wf-card__icon">
          <SvgWorkflowStep :step="item.iconNum" />
        </div>

        <!-- 文本内容 -->
        <div class="wf-card__copy">
          <h3>{{ item.title }}</h3>
          <p class="wf-card__desc">{{ item.desc }}</p>
          <div class="wf-card__proof">
            <span class="wf-dot"></span>
            <strong>核心：{{ item.proof }}</strong>
          </div>
        </div>
      </article>
    </div>

    <section v-if="featuredWorkflows.length" class="wf-featured" aria-labelledby="featured-workflows-title">
      <div class="wf-featured__head">
        <div>
          <span>SELECTED WORKFLOWS</span>
          <h3 id="featured-workflows-title">精选工作流</h3>
        </div>
        <BaseButton href="/aigc/" variant="text">查看全部工作流 →</BaseButton>
      </div>
      <div class="wf-featured__grid">
        <article v-for="(item, index) in featuredWorkflows" :key="item.sourcePath" class="wf-featured__card">
          <span class="wf-featured__number">{{ String(index + 1).padStart(2, '0') }}</span>
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
          <div class="wf-featured__tags">
            <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
          </div>
          <a :href="item.url">进入工作流 <span aria-hidden="true">→</span></a>
        </article>
      </div>
    </section>
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

/* ─── 原版 5 列卡片平铺网格 ───────────────────────────────── */
.wf-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
  margin-top: 48px;
}

/* ─── 卡片样式 ───────────────────────────────────────── */
.wf-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  transition: 
    border-color var(--transition-smooth), 
    box-shadow var(--transition-smooth), 
    transform var(--transition-smooth);
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

.wf-featured {
  width: min(1080px, 100%);
  margin: 64px auto 0;
  padding-top: 34px;
  border-top: 1px solid var(--border-soft);
}

.wf-featured__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
}

.wf-featured__head > div > span {
  color: var(--brand-main);
  font: 700 10px/1 var(--font-mono);
  letter-spacing: .16em;
}

.wf-featured__head h3 {
  margin-top: 10px;
  font-size: 26px;
}

.wf-featured__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.wf-featured__card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 24px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
}

.wf-featured__number { color: var(--brand-main); font: 700 11px/1 var(--font-mono); }
.wf-featured__card h4 { margin: 18px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: 21px; line-height: 1.4; }
.wf-featured__card p { margin: 12px 0 0; color: var(--text-sub); font-size: 13px; line-height: 1.75; }
.wf-featured__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
.wf-featured__tags span { padding: 5px 7px; border: 1px solid var(--border-soft); border-radius: 6px; color: var(--text-muted); font-size: 10px; }
.wf-featured__card > a { width: fit-content; margin-top: auto; padding-top: 24px; color: var(--brand-main); font-size: 13px; font-weight: 700; text-decoration: none; }

/* ─── 响应式自适应 ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .wf-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
  .wf-featured__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 560px) {
  .wf-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .wf-featured__head { align-items: start; flex-direction: column; }
  .wf-featured__grid { grid-template-columns: 1fr; }
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
