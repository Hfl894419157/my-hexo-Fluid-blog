<script setup>
import MediaFrame from './MediaFrame.vue'
import KnowledgePageHero from './KnowledgePageHero.vue'

const lanes = [
  { label: '设计方法', title: '把经验整理成可复用的方法', desc: '记录 AI 时代的设计判断、工作流建设、个人知识系统与项目复盘。', href: '/blog/', image: '/aigc-3.jpg', alt: '蓝紫色数字粒子视觉，代表相互连接的方法与知识系统', action: '阅读设计方法' },
  { label: '工具资源', title: '只保留真正能进入项目的资源', desc: '按使用场景整理提示词结构、检查清单和工具资料，并明确来源与使用边界。', href: '/resources/', image: '/aigc-2.jpg', alt: 'AI 电路视觉，代表经过验证的数字资源', action: '进入工具资源' }
]
</script>

<template>
  <section class="knowledge-hub">
    <KnowledgePageHero
      title="行业观察"
      description="记录 AI、设计与商业视觉领域的变化，并将趋势转化为可验证、可行动的判断。"
      variant="industry"
    />

    <div class="knowledge-hub__lanes">
      <a v-for="(lane, index) in lanes" :key="lane.label" :href="lane.href" class="knowledge-lane">
        <MediaFrame :src="lane.image" :alt="lane.alt" :aspect="index === 0 ? '16 / 10' : '4 / 3'" tone="quiet" />
        <div>
          <span>{{ String(index + 1).padStart(2, '0') }} · {{ lane.label }}</span>
          <h2>{{ lane.title }}</h2>
          <p>{{ lane.desc }}</p>
          <strong>{{ lane.action }} →</strong>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.knowledge-hub { width: min(1080px, 100%); margin: 0 auto; padding: 44px 0 24px; }
.knowledge-hub__lanes { display: grid; gap: 24px; margin-top: 42px; }
.knowledge-lane { display: grid; grid-template-columns: minmax(280px, 0.86fr) minmax(0, 1.14fr); overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); color: inherit; text-decoration: none; background: var(--bg-card); }
.knowledge-lane:nth-child(even) { grid-template-columns: minmax(0, 1.14fr) minmax(280px, 0.86fr); }
.knowledge-lane:nth-child(even) :deep(.media-frame) { order: 2; }
.knowledge-lane :deep(.media-frame__viewport) { height: 100%; border: 0; border-radius: 0; }
.knowledge-lane > div { display: grid; align-content: center; padding: clamp(30px, 5vw, 58px); }
.knowledge-lane span { color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.12em; }
.knowledge-lane h2 { margin: 14px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: clamp(28px, 3.2vw, 44px); font-weight: 600; line-height: 1.25; }
.knowledge-lane p { margin: 16px 0 0; color: var(--text-sub); font-size: var(--text-small); line-height: 1.8; }
.knowledge-lane strong { margin-top: 26px; color: var(--brand-main); font-size: var(--text-small); }

@media (max-width: 700px) {
  .knowledge-lane, .knowledge-lane:nth-child(even) { grid-template-columns: 1fr; }
  .knowledge-lane:nth-child(even) :deep(.media-frame) { order: initial; }
  .knowledge-lane :deep(.media-frame__viewport) { aspect-ratio: 16 / 10; }
}
</style>
