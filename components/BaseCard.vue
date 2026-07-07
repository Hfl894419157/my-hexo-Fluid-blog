<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  href: {
    type: String,
    default: ''
  },
  as: {
    type: String,
    default: ''
  },
  interactive: {
    type: Boolean,
    default: true
  },
  padded: {
    type: Boolean,
    default: true
  }
})

const isExternal = computed(() => /^(https?:|mailto:|tel:)/.test(props.href))
const resolvedHref = computed(() => {
  if (!props.href) return undefined
  return isExternal.value ? props.href : withBase(props.href)
})
const tagName = computed(() => props.as || (props.href ? 'a' : 'article'))
</script>

<template>
  <component
    :is="tagName"
    class="base-card"
    :class="{ 'base-card--interactive': interactive, 'base-card--padded': padded }"
    :href="tagName === 'a' ? resolvedHref : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-card {
  display: block;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: var(--text-main);
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
  text-decoration: none !important;
  transition: border-color 0.24s ease, box-shadow 0.24s ease, transform 0.24s ease, background 0.24s ease;
}

.base-card--padded {
  padding: 28px;
}

.base-card--interactive:hover {
  transform: translateY(-4px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-glow);
}
</style>
