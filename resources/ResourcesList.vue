<script setup>
import OverviewPage from '../components/OverviewPage.vue'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { visibleContent } from '../.shared/contentClient.js'

const items = visibleContent(contentCatalog.resources).map((item) => ({
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
  cta: '查看资源'
}))
</script>

<template>
  <OverviewPage
    :title-lines="['资源库']"
    description="集中管理经过项目验证的 Prompt 结构、检查清单、模板与参考资源，让它们能够重新进入下一次实践。"
    visual="knowledge"
    :topics="['Prompt', '检查清单', '项目复盘', '模板', '资源验证']"
    :items="items"
    section-title="全部资源"
    section-description="资源卡片会根据实际内容展示标签，不再附加无关状态与字段。"
  />
</template>
