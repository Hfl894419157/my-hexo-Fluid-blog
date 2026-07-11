<script setup>
import BaseCard from '../BaseCard.vue'
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const steps = [
  ['01', '需求输入', '把目标、受众、场景、限制和交付物整理成 AI 能理解的简报。'],
  ['02', '变量拆解', '定义风格、构图、材质、镜头和文案变量，形成可控生成范围。'],
  ['03', '批量生成', '用多方向探索替代单点试错，让初稿变成可筛选方案池。'],
  ['04', '人工判断', '用审美、策略、转化和执行成本筛选真正有价值的结果。'],
  ['05', '资产沉淀', '把案例、Prompt、模板和复盘记录回收到下一次工作流。']
]
</script>

<template>
  <SectionShell id="workflow" tone="soft">
    <SectionHeader
      title="AI 视觉工作流"
      desc="AI 不替代设计判断，而是把重复探索、变量试验和资产整理变成更稳定的生产流程。"
    />

    <div class="workflow-line">
      <BaseCard v-for="step in steps" :key="step[0]">
        <span>{{ step[0] }}</span>
        <h3>{{ step[1] }}</h3>
        <p>{{ step[2] }}</p>
      </BaseCard>
    </div>
    <div class="workflow-action">
      <BaseButton href="/aigc/commercial-visual-system" variant="ghost">查看完整工作流</BaseButton>
    </div>
  </SectionShell>
</template>

<style scoped>
.workflow-line {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1px;
  margin-top: 34px;
  padding: 1px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--border-soft);
}

:deep(.base-card) {
  min-height: 260px;
  border: 0;
  box-shadow: none;
}

span {
  color: var(--brand-cyan);
  font-size: var(--text-label);
  font-weight: 400;
  letter-spacing: 0.12em;
}

h3 {
  margin: 34px 0 0;
  color: var(--text-main);
  font-family: var(--font-sans);
  font-size: var(--text-lead);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0;
}

p {
  margin: 14px 0 0;
  color: var(--text-sub);
  font-size: var(--text-caption);
  font-weight: 400;
  line-height: 1.75;
}

.workflow-action { display: flex; justify-content: center; margin-top: 24px; }

@media (max-width: 1040px) {
  .workflow-line {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .workflow-line {
    grid-template-columns: 1fr;
  }
}
</style>
