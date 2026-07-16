<script setup>
import { computed, ref } from 'vue'
import OverviewPage from '../components/OverviewPage.vue'
import BaseButton from '../components/BaseButton.vue'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { visibleContent } from '../.shared/contentClient.js'

const activeType = ref('all')
const typeOptions = [
  ['all', '全部'], ['software', '软件'], ['ai-tool', 'AI 工具'], ['plugin', '插件'],
  ['prompt', 'Prompt'], ['template', '模板'], ['asset', '素材'], ['document', '文档'], ['other', '其他']
]

const source = visibleContent(contentCatalog.resources)
const items = computed(() => source
  .filter((item) => activeType.value === 'all' || item.resourceMeta.type === activeType.value)
  .map((item) => ({
  id: item.id,
  title: item.title,
  summary: item.desc,
  link: item.link,
  status: item.status,
  tags: item.tags,
  image: item.cover,
  alt: item.coverAlt,
  imageSubject: `${item.title}的资源预览图`,
  imageFilename: item.imageFilename,
  eyebrow: `${item.resourceTypeLabel} · ${item.resourceAccessLabel}`,
  cta: '查看资源'
})))
</script>

<template>
  <OverviewPage
    :title-lines="['工具与资源']"
    description="整理能够直接进入学习或项目的软件、平台、插件、Prompt、模板、素材和文件。"
    visual="knowledge"
    :topics="['AI 工具', '设计软件', '插件', 'Prompt', '模板', '素材']"
    :items="items"
    section-title="全部工具与资源"
    section-description="正版软件跳转官方网站，自制模板可通过网盘获取，受限资料会明确标注联系获取。"
  >
    <template #before-list>
      <div class="resources-page__filter" aria-label="资源类型筛选">
        <button
          v-for="([value, label]) in typeOptions"
          :key="value"
          type="button"
          :class="{ active: activeType === value }"
          @click="activeType = value"
        >{{ label }}</button>
        <BaseButton href="/faq#resources" variant="text">下载与版权说明 →</BaseButton>
      </div>
    </template>
  </OverviewPage>
</template>

<style scoped>
.resources-page__filter { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 36px; }
.resources-page__filter button { min-height: 34px; padding: 0 12px; border: 1px solid var(--border-soft); border-radius: 999px; background: var(--bg-card); color: var(--text-sub); font-size: 12px; font-weight: 600; cursor: pointer; }
.resources-page__filter button:hover,
.resources-page__filter button.active { border-color: var(--brand-main); color: var(--brand-main); background: var(--bg-soft); }
.resources-page__filter :deep(.base-button) { margin-left: auto; }
@media (max-width: 760px) {
  .resources-page__filter { margin-bottom: 28px; }
  .resources-page__filter :deep(.base-button) { width: 100%; margin-left: 0; justify-content: flex-start; }
}
</style>
