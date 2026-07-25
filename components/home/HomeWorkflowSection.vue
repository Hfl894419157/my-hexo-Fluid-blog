<script setup>
import BaseButton from '../BaseButton.vue'
import ImagePlaceholder from '../ImagePlaceholder.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgWorkflowStep from './svg/SvgWorkflowStep.vue'
import { data as contentCatalog } from '../../.shared/content.data.mjs'
import { normalizeHomeSelections, resolveVisibleSelections } from '../../.shared/contentClient.js'
import homeSelectionsRaw from '../../.shared/content/home.json'

const homeSelections = normalizeHomeSelections(homeSelectionsRaw)
const featuredWorkflows = resolveVisibleSelections(
  contentCatalog.workflows,
  homeSelections.featuredWorkflows,
  3
)

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
    desc: '多模型协同组合，围绕已锁定的核心变量展开高品质创意探索，拓宽方案空间。',
    proof: '高效率扩充方案池'
  },
  {
    id: 'judgment',
    iconNum: 4,
    title: '人工判断与精修',
    desc: '由人工审美与逻辑把关，进行局部重绘、多轨拼接与后期精细打磨，保障高质量交付。',
    proof: '人机审美与算力协同'
  },
  {
    id: 'compounding',
    iconNum: 5,
    title: '资产沉淀与复利',
    desc: '将项目中被验证的 Prompt、参数模板和检查清单送回资源库，让每次交付产生资产复利。',
    proof: '构建可持续生产资产'
  }
]
</script>

<template>
  <SectionShell id="workflow" tone="soft">
    <div class="wf-head" v-reveal="{ y: 24, repeat: true }">
      <SectionHeader
        :title-lines="['由实践驱动的五阶段工作流', '让 AI 生产进入确定性轨道']"
        desc="从需求输入、变量拆解、方向生成，到人工判断与资产化沉淀，把每次任务整理为可以重复执行的交付流程。"
      />
      <BaseButton href="/aigc/" variant="ghost">探索完整工作流</BaseButton>
    </div>

    <div class="wf-grid" aria-label="五阶段工作流">
      <article
        v-for="(item, idx) in paradigms"
        :key="item.id"
        class="wf-card"
        v-reveal="{ delay: idx * 60, y: 22, repeat: true }"
      >
        <div class="wf-card__icon">
          <span class="wf-card__step">{{ String(idx + 1).padStart(2, '0') }}</span>
          <SvgWorkflowStep :step="item.iconNum" />
        </div>
        <div class="wf-card__copy">
          <h3>{{ item.title }}</h3>
          <p class="wf-card__desc">{{ item.desc }}</p>
          <div class="wf-card__proof">
            <span class="wf-dot"></span>
            <strong>{{ item.proof }}</strong>
          </div>
        </div>
      </article>
    </div>

    <section v-if="featuredWorkflows.length" class="wf-featured" aria-labelledby="featured-workflows-title">
      <header class="wf-featured__head">
        <h3 id="featured-workflows-title">从真实项目查看完整拆解</h3>
        <BaseButton href="/aigc/" variant="text">查看全部工作流 →</BaseButton>
      </header>

      <div class="wf-examples">
        <article
          v-for="(item, index) in featuredWorkflows"
          :key="item.sourcePath"
          class="wf-example"
          :class="{ 'wf-example--planned': item.status === 'planned' }"
          v-reveal="{ delay: index * 70, y: 22, repeat: true }"
        >
          <a
            v-if="item.link"
            class="wf-example__media"
            :href="item.link"
            :aria-label="`进入工作流：${item.title}`"
          >
            <ImagePlaceholder
              :src="item.homeCover"
              :alt="item.coverAlt"
              :subject="item.imageSubject"
              :filename="item.imageFilename"
              aspect="16 / 9"
              profile="homeMobile"
              desktop-profile="homeWorkflowDesktop"
              :focal-point="item.coverFocalPoint"
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 46vw, 380px"
            />
          </a>
          <div v-else class="wf-example__media" aria-hidden="true">
            <ImagePlaceholder
              v-if="item.homeCover"
              :src="item.homeCover"
              alt=""
              :subject="item.imageSubject"
              :filename="item.imageFilename"
              aspect="16 / 9"
              profile="homeMobile"
              desktop-profile="homeWorkflowDesktop"
              :focal-point="item.coverFocalPoint"
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 46vw, 380px"
            />
            <div v-else class="wf-example__placeholder">
              <svg viewBox="0 0 180 100" fill="none">
                <path d="M24 50h32m68 0h32M56 50l20-24m-20 24 20 24m48-24-20-24m20 24-20 24" />
                <circle cx="24" cy="50" r="8" />
                <circle cx="90" cy="18" r="8" />
                <circle cx="90" cy="82" r="8" />
                <circle cx="156" cy="50" r="8" />
              </svg>
            </div>
          </div>

          <div class="wf-example__copy">
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
            <div v-if="item.tags.length" class="wf-example__tags">
              <span v-for="tag in item.tags.slice(0, 4)" :key="tag">{{ tag }}</span>
            </div>
            <a v-if="item.link" class="wf-example__link" :href="item.link">
              进入工作流 <span aria-hidden="true">→</span>
            </a>
            <span v-else class="wf-example__status">内容筹备中</span>
          </div>
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

.wf-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
  margin-top: 48px;
}

.wf-grid::before {
  position: absolute;
  z-index: 0;
  top: 55px;
  right: 9%;
  left: 9%;
  height: 1px;
  background: color-mix(in srgb, var(--brand-main) 28%, var(--border-soft));
  content: '';
}

.wf-card {
  position: relative;
  z-index: 1;
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  transition:
    opacity var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    filter var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    transform var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    border-color var(--transition-smooth),
    box-shadow var(--transition-smooth);
  transition-delay: var(--reveal-delay, 0ms);
}

.wf-card:hover {
  border-color: color-mix(in srgb, var(--brand-main) 35%, transparent);
  box-shadow: 0 12px 36px color-mix(in srgb, var(--brand-main) 8%, transparent);
  transform: translateY(-4px);
}

.wf-card__icon {
  position: relative;
  display: flex;
  min-height: 110px;
  align-items: center;
  justify-content: center;
  padding: 22px 18px 16px;
  border-bottom: 1px solid var(--border-soft);
  background: linear-gradient(160deg,
    color-mix(in srgb, var(--brand-main) 4%, var(--bg-soft)),
    var(--bg-card));
}

.wf-card__step {
  position: absolute;
  top: 13px;
  left: 14px;
  color: var(--brand-main);
  font: 700 10px/1 var(--font-mono);
  letter-spacing: .1em;
}

.wf-card__icon :deep(svg) { width: 62px; height: 62px; }

.wf-card__copy {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 22px 20px;
}

.wf-card h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(19px, 1.65vw, 24px);
  font-weight: 600;
  line-height: 1.3;
}

.wf-card__desc {
  flex: 1;
  margin: 13px 0 0;
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.8;
}

.wf-card__proof {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px dashed var(--border-soft);
}

.wf-dot {
  width: 5px;
  height: 5px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--brand-main);
}

.wf-card__proof strong {
  color: var(--text-main);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.5;
}

.wf-featured {
  width: 100%;
  margin: 64px auto 0;
  padding-top: 34px;
  border-top: 1px solid var(--border-soft);
}

.wf-featured__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.wf-featured__head h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(25px, 2.4vw, 32px);
  line-height: 1.3;
}

.wf-examples {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 26px;
}

.wf-example {
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  transition:
    opacity var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    filter var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    transform var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    border-color var(--transition-smooth),
    box-shadow var(--transition-smooth);
  transition-delay: var(--reveal-delay, 0ms);
}

.wf-example:not(.wf-example--planned):hover {
  border-color: color-mix(in srgb, var(--brand-main) 34%, var(--border-soft));
  box-shadow: var(--shadow-card);
  transform: translateY(-3px);
}

.wf-example--planned {
  border-style: dashed;
  background: color-mix(in srgb, var(--bg-soft) 58%, var(--bg-card));
}

.wf-example__media {
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-bottom: 1px solid var(--border-soft);
  background: var(--bg-soft);
}

.wf-example__media :deep(.image-slot) {
  height: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
}

.wf-example__media :deep(.image-slot__image) { object-fit: cover; }

.wf-example__placeholder {
  display: grid;
  height: 100%;
  place-items: center;
  background:
    radial-gradient(circle at 20% 30%, color-mix(in srgb, var(--brand-main) 9%, transparent), transparent 34%),
    linear-gradient(145deg, var(--bg-soft), var(--bg-card));
}

.wf-example__placeholder svg {
  width: min(54%, 190px);
  color: var(--brand-main);
  opacity: .46;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}

.wf-example__copy {
  display: flex;
  min-height: 300px;
  flex: 1;
  flex-direction: column;
  padding: 28px 26px 30px;
}

.wf-example h4 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(21px, 1.8vw, 26px);
  line-height: 1.42;
}

.wf-example p {
  display: -webkit-box;
  margin: 14px 0 0;
  overflow: hidden;
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.75;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.wf-example__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
}

.wf-example__tags span {
  padding: 6px 8px;
  border: 1px solid var(--border-soft);
  border-radius: 7px;
  background: var(--bg-soft);
  color: var(--text-sub);
  font-size: 10px;
  font-weight: 600;
}

.wf-example__link,
.wf-example__status {
  width: fit-content;
  margin-top: auto;
  padding-top: 24px;
  font-size: 13px;
  font-weight: 700;
}

.wf-example__link {
  color: var(--brand-main);
  text-decoration: none;
}

.wf-example__link span { display: inline-block; transition: transform 180ms ease; }
.wf-example__link:hover span { transform: translateX(4px); }
.wf-example__status { color: var(--text-muted); }

@media (max-width: 1024px) {
  .wf-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
  .wf-grid::before { display: none; }
  .wf-examples { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 700px) {
  .wf-featured__head { align-items: start; flex-direction: column; }
  .wf-examples { grid-template-columns: 1fr; }
  .wf-example__copy { min-height: 0; }
}

@media (max-width: 560px) {
  .wf-grid {
    display: flex;
    overflow-x: auto;
    gap: 14px;
    padding: 2px 2px 10px;
    scroll-snap-type: x mandatory;
  }

  .wf-card {
    min-width: min(286px, 80vw);
    scroll-snap-align: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wf-card,
  .wf-example { transition: none; }
  .wf-card:hover,
  .wf-example:hover { transform: none; }
}
</style>
