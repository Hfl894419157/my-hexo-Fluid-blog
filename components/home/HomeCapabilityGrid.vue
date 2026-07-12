<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import SvgCapabilityIcon from './svg/SvgCapabilityIcon.vue'

const capabilities = [
  {
    variant: 1,
    index: '01',
    title: '商业视觉生成',
    desc: '从产品事实和商业目标出发，定义可控的视觉变量，让生成结果从一开始就服务于转化。',
    evidence: '产品图、详情页与品牌内容',
    outcome: '可筛选的方向池',
    href: '/portfolio/'
  },
  {
    variant: 2,
    index: '02',
    title: '流程系统化',
    desc: '把需求、生成、精修和交付连接成可以复盘的路径，每次执行都为下一次积累判断依据。',
    evidence: '五阶段 AI 工作流',
    outcome: '可重复的生产方法',
    href: '/aigc/'
  },
  {
    variant: 3,
    index: '03',
    title: '知识资产化',
    desc: '把有效模板、判断标准与复盘结论送回下一次项目，让经验形成真正可复用的知识资产。',
    evidence: 'Prompt、清单与文章',
    outcome: '持续增长的知识库',
    href: '/knowledge/'
  }
]
</script>

<template>
  <SectionShell id="capabilities">
    <div class="cap-head">
      <SectionHeader
        :title-lines="['能力必须对应证据，', '也必须产生结果']"
        desc="不再用文字卡罗列技能，而是让每个方向连接真实内容与可复用产出。"
      />
      <BaseButton href="/knowledge/" variant="ghost">查看知识系统</BaseButton>
    </div>

    <div class="cap-grid">
      <a v-for="item in capabilities" :key="item.index"
        :href="item.href" class="cap-card">

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
            <dt>证据</dt>
            <dd>{{ item.evidence }}</dd>
          </div>
          <div>
            <dt>产出</dt>
            <dd>{{ item.outcome }}</dd>
          </div>
        </dl>

        <span class="cap-card__cta">深入了解 →</span>
      </a>
    </div>
  </SectionShell>
</template>

<style scoped>
.cap-head {
  display: grid;
  justify-items: center;
  gap: 24px;
  text-align: center;
}

/* ─── Grid ───────────────────────────────────────────── */
.cap-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
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
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  margin: 28px 0 0;
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
  background: var(--border-soft);
}

.cap-card__metrics > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 14px 14px 0;
  background: var(--bg-card);
}

.cap-card__metrics dt {
  color: var(--text-muted);
  font-size: var(--text-micro);
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

@media (min-width: 601px) and (max-width: 900px) {
  .cap-grid { grid-template-columns: repeat(2, 1fr); max-width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .cap-card { transition: none; }
  .cap-card:hover { transform: none; }
  .cap-card:hover .cap-card__cta { letter-spacing: normal; }
}
</style>
