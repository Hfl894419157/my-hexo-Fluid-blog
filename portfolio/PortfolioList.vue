<script setup>
import OverviewPage from '../components/OverviewPage.vue'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { visibleContent } from '../.shared/contentClient.js'

const items = visibleContent(contentCatalog.cases).map((item) => ({
  id: item.id,
  title: item.title,
  summary: item.desc,
  link: item.link,
  status: item.status,
  tags: item.tags,
  image: item.cover,
  alt: item.coverAlt,
  imageSubject: `${item.title}的项目主视觉或最终交付成果`,
  imageFilename: item.imageFilename,
  cta: '查看案例'
}))
</script>

<template>
  <OverviewPage
    :title-lines="['案例']"
    description="先看真实交付结果，再理解目标、角色、关键判断与执行过程为什么成立。"
    visual="cases"
    :topics="['电商视觉', '展会视觉', '品牌系统', '3D 渲染', '转化设计']"
    :items="items"
    section-title="全部案例"
    section-description="每张卡片只保留作品图、标题、简介、内容标签与进入入口。"
  />
</template>
