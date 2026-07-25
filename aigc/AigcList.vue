<script setup>
import OverviewPage from '../components/OverviewPage.vue'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { visibleContent } from '../.shared/contentClient.js'

const items = visibleContent(contentCatalog.workflows).map((item) => ({
  id: item.id,
  title: item.title,
  summary: item.desc,
  link: item.link,
  status: item.status,
  tags: item.tags,
  image: item.cover,
  alt: item.coverAlt,
  imageSubject: `${item.title}的流程总览图或关键节点图`,
  imageFilename: item.imageFilename,
  cta: '进入工作流'
}))
</script>

<template>
  <OverviewPage
    :title-lines="['工作流']"
    description="从真实商业项目出发，把输入、变量、生成、人工判断与复盘沉淀为稳定可复用的生产系统。"
    visual="workflow"
    :topics="['需求输入', '变量拆解', '方向生成', '人工判断', '资产沉淀']"
    :show-hero="false"
    :items="items"
    section-title="可复用工作流"
    section-description="工作流页面记录可以直接进入下一次项目的结构、判断标准与交付方法。"
  />
</template>
