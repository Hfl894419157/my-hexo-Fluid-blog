<script setup>
import BaseCard from '../BaseCard.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const capabilities = [
  ['AI 视觉生成', '把商业目标、产品卖点和视觉风格拆成可执行的生成策略。'],
  ['产品图流程', '沉淀从素材、Prompt、精修到批量输出的可复用方法。'],
  ['案例系统化', '不只展示结果，也展示判断标准、过程资产和复盘结论。'],
  ['资源库建设', '把提示词、模型、模板和组件变成持续迭代的数字资产。'],
  ['内容方法论', '记录 AI 时代设计师的定位、工作流和商业视觉经验。'],
  ['协作交付', '让需求、方向、版本和交付边界在项目开始前变清晰。']
]
</script>

<template>
  <SectionShell id="capabilities" tone="soft">
    <SectionHeader
      title="AI 设计系统"
      desc="案例负责证明，工作流负责解释，知识库负责复用。三者共同构成一套持续迭代的 AI 实践系统。"
    />

    <div class="capability-grid">
      <BaseCard v-for="item in capabilities" :key="item[0]">
        <h3>{{ item[0] }}</h3>
        <p>{{ item[1] }}</p>
      </BaseCard>
    </div>
  </SectionShell>
</template>

<style scoped>
.capability-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 34px;
}

h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: var(--font-h3);
  font-weight: 760;
  line-height: 1.18;
  letter-spacing: var(--title-letter-spacing);
}

p {
  margin: 16px 0 0;
  color: var(--text-sub);
  font-size: var(--font-small);
  line-height: 1.76;
}

@media (max-width: 960px) {
  .capability-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .capability-grid {
    grid-template-columns: 1fr;
  }
}
</style>
