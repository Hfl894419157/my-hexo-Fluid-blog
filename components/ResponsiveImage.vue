<script setup>
import { computed, ref, useAttrs, watch } from 'vue'
import { resolveResponsiveImage } from './responsiveImage.js'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  sizes: { type: String, default: '100vw' },
  eager: { type: Boolean, default: false },
  profile: { type: String, default: 'original' },
  desktopProfile: { type: String, default: '' },
  focalPoint: { type: String, default: 'center' },
  assetOrigin: {
    type: String,
    default: 'configured',
    validator: (value) => ['configured', 'site'].includes(value)
  }
})

const attrs = useAttrs()
const fallbackActive = ref(false)
const fallbackAttempted = ref(false)
const resolved = computed(() => resolveResponsiveImage(props.src, {
  profile: props.profile,
  focalPoint: props.focalPoint,
  assetOrigin: props.assetOrigin
}))
const desktop = computed(() => props.desktopProfile
  ? resolveResponsiveImage(props.src, {
      profile: props.desktopProfile,
      focalPoint: props.focalPoint,
      assetOrigin: props.assetOrigin
    })
  : null)
const hasOptimizedSources = computed(() => Boolean(
  resolved.value.avifSrcset
  || resolved.value.webpSrcset
  || desktop.value?.avifSrcset
  || desktop.value?.webpSrcset
))

watch(() => [props.src, props.profile, props.desktopProfile, props.focalPoint, props.assetOrigin], () => {
  fallbackActive.value = false
  fallbackAttempted.value = false
})

const activateFallback = () => {
  const canFallback = hasOptimizedSources.value || resolved.value.fallbackSrc !== resolved.value.src
  if (!fallbackAttempted.value && resolved.value.fallbackSrc && canFallback) {
    fallbackAttempted.value = true
    fallbackActive.value = true
  }
}
</script>

<template>
  <picture v-if="!fallbackActive && hasOptimizedSources" class="responsive-picture">
    <source v-if="desktop?.avifSrcset" media="(min-width: 900px)" type="image/avif" :srcset="desktop.avifSrcset" :sizes="sizes">
    <source v-if="desktop?.webpSrcset" media="(min-width: 900px)" type="image/webp" :srcset="desktop.webpSrcset" :sizes="sizes">
    <source v-if="resolved.avifSrcset" type="image/avif" :srcset="resolved.avifSrcset" :sizes="sizes">
    <source v-if="resolved.webpSrcset" type="image/webp" :srcset="resolved.webpSrcset" :sizes="sizes">
    <img
      v-bind="attrs"
      :src="resolved.fallbackSrc"
      :alt="alt"
      :width="resolved.width"
      :height="resolved.height"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      :fetchpriority="eager ? 'high' : 'auto'"
      @error="activateFallback"
    >
  </picture>
  <img
    v-else
    v-bind="attrs"
    :src="fallbackActive ? resolved.fallbackSrc : resolved.src"
    :alt="alt"
    :width="resolved.width"
    :height="resolved.height"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    :fetchpriority="eager ? 'high' : 'auto'"
    @error="activateFallback"
  >
</template>
