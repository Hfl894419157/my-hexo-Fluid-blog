<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'
import FloatingActions from './FloatingActions.vue'
import ContentBlocks from './ContentBlocks.vue'

const { frontmatter } = useData()
const isModular = computed(() => frontmatter.value.modularContent === true)
const blocks = computed(() => frontmatter.value.contentBlocksRendered || [])
const detailFacts = computed(() => {
  if (frontmatter.value.pageClass === 'page-case-detail') {
    const project = frontmatter.value.project || {}
    return [
      ['我的角色', project.role],
      ['项目年份', project.year],
      ['客户 / 品牌', project.client],
      ['服务内容', Array.isArray(project.services) ? project.services.join(' / ') : ''],
      ['项目成果', project.outcome]
    ].filter(([, value]) => String(value || '').trim())
  }
  if (frontmatter.value.pageClass === 'page-resource-detail') {
    const resource = frontmatter.value.resourceMeta || {}
    const typeLabels = { software: '软件', 'ai-tool': 'AI 工具', plugin: '插件', prompt: 'Prompt', template: '模板', asset: '素材', document: '文档', other: '其他' }
    const accessLabels = { official: '访问官网', cloud: '网盘下载', contact: '联系获取' }
    return [
      ['资源类型', typeLabels[resource.type]],
      ['获取方式', accessLabels[resource.access]],
      ['平台 / 来源', resource.platform],
      ['授权说明', resource.licenseNote]
    ].filter(([, value]) => String(value || '').trim())
  }
  return []
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top><SiteHeader /></template>
    <template #doc-before>
      <div v-if="isModular" class="modular-document">
        <header class="modular-document__header">
          <h1>{{ frontmatter.title }}</h1>
          <p v-if="frontmatter.description">{{ frontmatter.description }}</p>
          <dl v-if="detailFacts.length" class="project-facts">
            <div v-for="([label, value]) in detailFacts" :key="label">
              <dt>{{ label }}</dt>
              <dd>{{ value }}</dd>
            </div>
          </dl>
        </header>
        <ContentBlocks :blocks="blocks" />
      </div>
    </template>
    <template #layout-bottom>
      <SiteFooter />
      <FloatingActions />
    </template>
  </DefaultTheme.Layout>
</template>
