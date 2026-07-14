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
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top><SiteHeader /></template>
    <template #doc-before>
      <div v-if="isModular" class="modular-document">
        <header class="modular-document__header">
          <h1>{{ frontmatter.title }}</h1>
          <p v-if="frontmatter.description">{{ frontmatter.description }}</p>
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
