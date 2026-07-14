<script setup>
import OverviewPage from './OverviewPage.vue'
import knowledgeHubCards from '../.shared/content/knowledgeHubCards.json'

const items = knowledgeHubCards.items.map((item, index) => ({
  id: item.id || `knowledge-entry-${index + 1}`,
  title: item.title,
  summary: item.description,
  link: item.link || null,
  tags: item.tags || [],
  imageSubject: item.imageSubject || `${item.title}的栏目预览图`,
  imageFilename: item.imageFilename || `knowledge-${item.id || index + 1}-cover.jpg`,
  status: item.link ? 'published' : 'planned',
  cta: item.linkLabel || '进入栏目'
}))
</script>

<template>
  <OverviewPage
    :title-lines="['知识库']"
    description="把 AI 学习、设计实践与工作流，沉淀成能够被搜索、验证并再次复用的个人知识系统。"
    visual="knowledge"
    :topics="['个人品牌', '内容架构', 'AI 设计', 'AIGC', '工作流', '资产沉淀']"
    :items="items"
    section-title="三类知识入口"
    section-description="从观察形成判断，从方法稳定过程，再让资源重新进入实践与项目。"
  />
</template>
