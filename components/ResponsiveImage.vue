<script setup>
import { computed, useAttrs } from 'vue'
import { resolveResponsiveImage } from './responsiveImage.js'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  sizes: { type: String, default: '100vw' },
  eager: { type: Boolean, default: false }
})

const attrs = useAttrs()
const resolved = computed(() => resolveResponsiveImage(props.src))
</script>

<template>
  <picture v-if="resolved.webpSrcset" class="responsive-picture">
    <source type="image/webp" :srcset="resolved.webpSrcset" :sizes="sizes">
    <img
      v-bind="attrs"
      :src="resolved.src"
      :alt="alt"
      :width="resolved.width"
      :height="resolved.height"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      :fetchpriority="eager ? 'high' : 'auto'"
    >
  </picture>
  <img
    v-else
    v-bind="attrs"
    :src="resolved.src"
    :alt="alt"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    :fetchpriority="eager ? 'high' : 'auto'"
  >
</template>
