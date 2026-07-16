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
  cta: '查看作品'
}))
</script>

<template>
  <OverviewPage
    :title-lines="['作品集']"
    description="查看真实项目、我的角色、关键判断与最终交付，再理解结果为什么成立。"
    visual="cases"
    :topics="['电商视觉', '展会视觉', '品牌系统', '3D 渲染', '转化设计']"
    :items="items"
    section-title="全部作品"
    section-description="每个项目都以结果、角色、过程与可验证成果组成完整证据链。"
  />
</template>
