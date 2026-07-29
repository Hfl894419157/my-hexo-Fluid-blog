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
    description="汇总可以直接用于学习或项目的软件、平台、插件、Prompt、模板、素材和下载文件。"
    visual="knowledge"
    :topics="['软件', 'AI 工具', '插件', 'Prompt', '模板', '下载']"
    :show-hero="false"
    :items="items"
    section-title="全部工具与资源"
    section-description="每项资源都会说明用途、适用对象、获取方式、使用限制与验证情况；正版软件跳转官网，自制模板与文件提供合规下载。"
  />
</template>
