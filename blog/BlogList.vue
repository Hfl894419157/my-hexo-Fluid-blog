<script setup>
import { computed } from 'vue'
import OverviewPage from '../components/OverviewPage.vue'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { visibleContent } from '../.shared/contentClient.js'

const props = defineProps({
  title: { type: String, default: '方法指南' },
  description: { type: String, default: '把经过验证的判断标准、操作步骤、工作流程、Prompt 方法与检查表整理成可重复使用的指南。' },
  variant: { type: String, default: 'methods' }
})

const source = computed(() => {
  const items = props.variant === 'industry' ? contentCatalog.learning : contentCatalog.methods
  return visibleContent(items)
})

const items = computed(() => source.value.map((item) => ({
  id: item.id,
  title: item.title,
  summary: item.summary,
  link: item.link,
  status: item.status,
  tags: item.tags,
  image: item.cover,
  alt: item.coverAlt,
  imageSubject: `${item.title}的文章头图`,
  imageFilename: item.imageFilename,
  cta: '阅读全文'
})))
</script>

<template>
  <OverviewPage
    :title-lines="[title]"
    :description="description"
    visual="knowledge"
    :topics="variant === 'industry' ? ['趋势观察', '工具测试', '对比分析', '阶段结论'] : ['判断标准', '操作步骤', '工作流程', '检查表']"
    :show-hero="false"
    :items="items"
    :section-title="variant === 'industry' ? '全部研究笔记' : '全部方法指南'"
    :section-description="description"
  />
</template>
