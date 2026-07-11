<script setup>
import { publishedAigcWorks as aigcWorks } from '../.shared/aigcData.js'
import MediaFrame from '../components/MediaFrame.vue'

const outputs = ['可执行简报', '变量地图', '方向方案池', '精修清单', '资产包']
</script>

<template>
  <div class="workflow-showcase">
    <a v-for="work in aigcWorks" :key="work.id" :href="work.link" class="workflow-showcase__feature">
      <MediaFrame :src="work.cover" :alt="work.alt" :caption="work.caption" aspect="16 / 9" eyebrow="AI WORKFLOW" />
      <div>
        <span>{{ work.category }}</span>
        <h2>{{ work.title }}</h2>
        <p>{{ work.desc }}</p>
        <strong>查看完整工作流 →</strong>
      </div>
    </a>

    <div class="workflow-output" aria-label="工作流产出">
      <div v-for="(output, index) in outputs" :key="output">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ output }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workflow-showcase { display: grid; gap: 24px; margin-top: 46px; }
.workflow-showcase__feature { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr); overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); color: inherit; text-decoration: none; background: var(--bg-card); }
.workflow-showcase__feature :deep(.media-frame__viewport) { height: 100%; border: 0; border-radius: 0; box-shadow: none; }
.workflow-showcase__feature :deep(figcaption) { display: none; }
.workflow-showcase__feature > div { display: grid; align-content: center; padding: clamp(32px, 5vw, 64px); }
.workflow-showcase__feature span { color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.08em; }
h2 { margin: 16px 0 0 !important; color: var(--text-main); font-family: var(--font-display); font-size: clamp(32px, 4vw, 54px); font-weight: 600; line-height: 1.2; }
p { margin: 18px 0 0 !important; color: var(--text-sub); font-size: var(--text-small); line-height: 1.85; }
.workflow-showcase__feature strong { margin-top: 28px; color: var(--brand-main); font-size: var(--text-small); }
.workflow-output { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); background: var(--border-soft); }
.workflow-output div { display: grid; min-height: 140px; align-content: space-between; padding: 22px; background: var(--bg-card); }
.workflow-output span { color: var(--brand-cyan); font-size: var(--text-label); }
.workflow-output strong { color: var(--text-main); font-size: var(--text-small); }

@media (max-width: 800px) {
  .workflow-showcase__feature { grid-template-columns: 1fr; }
  .workflow-showcase__feature :deep(.media-frame__viewport) { aspect-ratio: 16 / 9; }
  .workflow-output { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) { .workflow-output { grid-template-columns: 1fr; } }
</style>
