<script setup>
import OverviewPage from '../components/OverviewPage.vue'
import { data as contentCatalog } from '../.shared/content.data.mjs'
import { publishedContent } from '../.shared/contentClient.js'

const items = publishedContent(contentCatalog.cases)
  .slice()
  .sort((left, right) => String(right.createdAt || '').localeCompare(String(left.createdAt || '')))
  .map((item) => ({
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
  eyebrow: '作品方向',
  cta: '进入作品合集'
}))
</script>

<template>
  <OverviewPage
    :title-lines="['作品集']"
    description="按电商、3D 渲染、品牌系统、展会视觉等方向浏览作品合集。"
    visual="cases"
    :topics="['电商视觉', '展会视觉', '品牌系统', '3D 渲染', '转化设计']"
    :items="items"
    section-title="作品方向"
    section-description="每张卡片对应一个独立作品合集；进入后可连续浏览该方向的完整视觉成果。"
  />
</template>
