<script setup>
import BaseButton from '../BaseButton.vue'
import MediaFrame from '../MediaFrame.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const capabilities = [
  { index: '01', title: '商业视觉生成', desc: '从产品事实和商业目标出发，定义可控的视觉变量。', evidence: '产品图、详情页与品牌内容', outcome: '可筛选的方向池', image: '/aigc-2.jpg', alt: 'AI 电路视觉，代表可控的商业视觉生成' },
  { index: '02', title: '流程系统化', desc: '把需求、生成、精修和交付连接成可以复盘的路径。', evidence: '五阶段 AI 工作流', outcome: '可重复的生产方法', image: '/aigc-3.jpg', alt: '蓝紫色粒子球体，代表相互连接的工作流系统' },
  { index: '03', title: '知识资产化', desc: '把有效模板、判断标准与复盘结论送回下一次项目。', evidence: 'Prompt、清单与文章', outcome: '持续增长的知识库', image: '/avatar.jpg', alt: 'Liuli AI Lab 主理人数字头像，代表个人知识资产' }
]
</script>

<template>
  <SectionShell id="capabilities" tone="soft">
    <div class="capability-intro">
      <SectionHeader
        eyebrow="System"
        title="能力必须对应证据，也必须产生结果"
        desc="不再用六张文字卡描述能力，而是让每个方向都连接到真实内容与可复用产出。"
      />
      <BaseButton href="/knowledge/" variant="ghost">查看知识系统</BaseButton>
    </div>

    <div class="capability-stack">
      <article v-for="item in capabilities" :key="item.index" class="capability-row">
        <MediaFrame :src="item.image" :alt="item.alt" aspect="16 / 10" tone="quiet" />
        <div class="capability-row__content">
          <span>{{ item.index }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <dl>
            <div><dt>证据</dt><dd>{{ item.evidence }}</dd></div>
            <div><dt>产出</dt><dd>{{ item.outcome }}</dd></div>
          </dl>
        </div>
      </article>
    </div>
  </SectionShell>
</template>

<style scoped>
.capability-intro { display: flex; gap: 32px; align-items: end; justify-content: space-between; }
.capability-stack { display: grid; gap: 22px; margin-top: 42px; }
.capability-row { display: grid; grid-template-columns: minmax(260px, 0.78fr) minmax(0, 1.22fr); overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--bg-card); }
.capability-row:nth-child(even) { grid-template-columns: minmax(0, 1.22fr) minmax(260px, 0.78fr); }
.capability-row:nth-child(even) :deep(.media-frame) { order: 2; }
.capability-row :deep(.media-frame__viewport) { height: 100%; border: 0; border-radius: 0; }
.capability-row__content { display: grid; align-content: center; padding: clamp(28px, 4vw, 54px); }
.capability-row__content > span { color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.14em; }
h3 { margin: 14px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: clamp(28px, 3vw, 42px); font-weight: 600; line-height: 1.2; }
p { max-width: 600px; margin: 16px 0 0; color: var(--text-sub); font-size: var(--text-small); line-height: 1.85; }
dl { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; margin: 30px 0 0; border-top: 1px solid var(--border-soft); background: var(--border-soft); }
dl div { display: grid; gap: 6px; padding: 16px 14px 0 0; background: var(--bg-card); }
dt { color: var(--text-muted); font-size: var(--text-label); }
dd { margin: 0; color: var(--text-main); font-size: var(--text-small); line-height: 1.6; }

@media (max-width: 760px) {
  .capability-intro { display: grid; align-items: start; }
  .capability-row, .capability-row:nth-child(even) { grid-template-columns: 1fr; }
  .capability-row:nth-child(even) :deep(.media-frame) { order: initial; }
  .capability-row :deep(.media-frame__viewport) { aspect-ratio: 16 / 10; }
}
</style>
