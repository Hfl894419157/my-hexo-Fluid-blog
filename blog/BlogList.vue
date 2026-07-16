<script setup>
import { computed } from 'vue'
import OverviewPage from '../components/OverviewPage.vue'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { visibleContent } from '../.shared/contentClient.js'

const props = defineProps({
  title: { type: String, default: '方法指南' },
  description: { type: String, default: '把经过实践验证的设计判断、生产方法与复盘经验整理成可以反复使用的知识。' },
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
    :topics="variant === 'industry' ? ['AI 趋势', '行业观察', '学习记录', '工具实验'] : ['教程步骤', '分析框架', 'Prompt 方法', '实战经验']"
    :items="items"
    :section-title="variant === 'industry' ? '全部研究笔记' : '全部方法指南'"
    section-description="标题、正文和标签都可以通过上方搜索栏参与全站匹配。"
  />
</template>
