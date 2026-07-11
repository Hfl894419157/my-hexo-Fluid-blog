<script setup>
import MediaFrame from './MediaFrame.vue'

const lanes = [
  { label: '方法与洞察', title: '把经验整理成可复用的方法', desc: '记录 AI 时代的设计判断、工作流建设、个人知识系统与项目复盘。', href: '/blog/', image: '/aigc-3.jpg', alt: '蓝紫色数字粒子视觉，代表相互连接的方法与知识系统', action: '阅读方法与洞察' },
  { label: '资源库', title: '只保留真正能进入项目的资源', desc: '按使用场景整理提示词结构、检查清单和工具资料，并明确来源与使用边界。', href: '/resources/', image: '/aigc-2.jpg', alt: 'AI 电路视觉，代表经过验证的数字资源', action: '进入资源库' }
]
</script>

<template>
  <section class="knowledge-hub">
    <header class="knowledge-hub__hero">
      <div>
        <p>Knowledge System</p>
        <h1>知识库</h1>
      </div>
      <blockquote>内容只有两个标准：经过判断，并且能够重新回到真实项目中复用。</blockquote>
    </header>

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

    <div class="knowledge-hub__principles">
      <p>COLLECTION RULES</p>
      <ol>
        <li><span>01</span><strong>方法说明适用场景与限制，不把工具参数包装成普遍结论。</strong></li>
        <li><span>02</span><strong>资源标明来源、访问方式和验证时间，不提供失效或虚构下载。</strong></li>
        <li><span>03</span><strong>每篇内容连接到案例或工作流，让知识最终回到实践。</strong></li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.knowledge-hub { width: min(1080px, 100%); margin: 0 auto; padding: 44px 0 24px; }
.knowledge-hub__hero { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; align-items: end; padding-bottom: 40px; border-bottom: 1px solid var(--border-soft); }
.knowledge-hub__hero p, .knowledge-hub__principles > p { margin: 0; color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.18em; text-transform: uppercase; }
h1 { margin: 12px 0 0; color: var(--text-main); font-family: var(--font-display); font-size: var(--text-page-title); font-weight: 600; line-height: 1.2; }
blockquote { margin: 0; padding-left: 28px; border-left: 2px solid var(--brand-main); color: var(--text-sub); font-family: var(--font-display); font-size: clamp(20px, 2.5vw, 30px); line-height: 1.6; }
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
.knowledge-hub__principles { display: grid; grid-template-columns: 0.4fr 1.6fr; gap: 46px; margin-top: 70px; }
.knowledge-hub__principles ol { display: grid; gap: 0; padding: 0; margin: 0; list-style: none; border-top: 1px solid var(--border-soft); }
.knowledge-hub__principles li { display: grid; grid-template-columns: 56px minmax(0, 1fr); gap: 18px; padding: 22px 0; border-bottom: 1px solid var(--border-soft); }
.knowledge-hub__principles li span { color: var(--brand-cyan); font-size: var(--text-label); }
.knowledge-hub__principles li strong { color: var(--text-main); font-size: var(--text-small); font-weight: 500; line-height: 1.8; }

@media (max-width: 700px) {
  .knowledge-hub__hero, .knowledge-hub__principles { grid-template-columns: 1fr; gap: 28px; }
  .knowledge-lane, .knowledge-lane:nth-child(even) { grid-template-columns: 1fr; }
  .knowledge-lane:nth-child(even) :deep(.media-frame) { order: initial; }
  .knowledge-lane :deep(.media-frame__viewport) { aspect-ratio: 16 / 10; }
}
</style>
