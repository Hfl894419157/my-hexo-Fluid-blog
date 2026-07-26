<script setup>
import OverviewPage from '../components/OverviewPage.vue'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { visibleContent } from '../.shared/contentClient.js'

const source = visibleContent(contentCatalog.resources)
const items = source.map((item) => ({
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
}))
</script>

<template>
  <OverviewPage
    :title-lines="['工具与资源']"
    description="整理能够直接进入学习或项目的软件、平台、插件、Prompt、模板、素材和文件。"
    visual="knowledge"
    :topics="['AI 工具', '设计软件', '插件', 'Prompt', '模板', '素材']"
    :show-hero="false"
    :items="items"
    section-title="全部工具与资源"
    section-description="正版软件跳转官方网站，自制模板可通过网盘获取，受限资料会明确标注联系获取。"
  />
</template>
