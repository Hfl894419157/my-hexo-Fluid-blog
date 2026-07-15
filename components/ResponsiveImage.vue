<script setup>
import { computed, useAttrs } from 'vue'
import { resolveResponsiveImage } from './responsiveImage.js'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  sizes: { type: String, default: '100vw' },
  eager: { type: Boolean, default: false },
  profile: { type: String, default: 'original' },
  desktopProfile: { type: String, default: '' },
  focalPoint: { type: String, default: 'center' }
})

const attrs = useAttrs()
const resolved = computed(() => resolveResponsiveImage(props.src, {
  profile: props.profile,
  focalPoint: props.focalPoint
}))
const desktop = computed(() => props.desktopProfile
  ? resolveResponsiveImage(props.src, { profile: props.desktopProfile, focalPoint: props.focalPoint })
  : null)
</script>

<template>
  <picture v-if="resolved.avifSrcset || resolved.webpSrcset || desktop?.avifSrcset || desktop?.webpSrcset" class="responsive-picture">
    <source v-if="desktop?.avifSrcset" media="(min-width: 900px)" type="image/avif" :srcset="desktop.avifSrcset" :sizes="sizes">
    <source v-if="desktop?.webpSrcset" media="(min-width: 900px)" type="image/webp" :srcset="desktop.webpSrcset" :sizes="sizes">
    <source v-if="resolved.avifSrcset" type="image/avif" :srcset="resolved.avifSrcset" :sizes="sizes">
    <source v-if="resolved.webpSrcset" type="image/webp" :srcset="resolved.webpSrcset" :sizes="sizes">
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
    :width="resolved.width"
    :height="resolved.height"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    :fetchpriority="eager ? 'high' : 'auto'"
  >
</template>
