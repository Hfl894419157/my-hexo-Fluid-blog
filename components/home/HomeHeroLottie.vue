<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import SvgHeroVisual from './svg/SvgHeroVisual.vue'

const animationHost = ref(null)
const ready = ref(false)
const isDark = ref(false)

const animationCache = new Map()
let animationInstance = null
let lottiePlayer = null
let motionQuery = null
let themeObserver = null
let renderSequence = 0

const cloneAnimation = (value) => typeof structuredClone === 'function'
  ? structuredClone(value)
  : JSON.parse(JSON.stringify(value))

const loadAnimationData = async (theme) => {
  if (animationCache.has(theme)) return animationCache.get(theme)
  const request = fetch(withBase(`/_generated/animations/home-hero-${theme}.json`), { cache: 'force-cache' })
    .then((response) => {
      if (!response.ok) throw new Error(`Lottie request failed: ${response.status}`)
      return response.json()
    })
  animationCache.set(theme, request)
  return request
}

const loadPlayer = async () => {
  if (lottiePlayer) return lottiePlayer
  const module = await import('lottie-web/build/player/lottie_light')
  lottiePlayer = module.default || module
  return lottiePlayer
}

const destroyAnimation = () => {
  animationInstance?.destroy()
  animationInstance = null
  if (animationHost.value) animationHost.value.replaceChildren()
}

const renderAnimation = async () => {
  const sequence = ++renderSequence
  ready.value = false
  destroyAnimation()
  await nextTick()
  if (!animationHost.value) return

  try {
    const theme = isDark.value ? 'dark' : 'light'
    const [player, animationData] = await Promise.all([
      loadPlayer(),
      loadAnimationData(theme)
    ])
    if (sequence !== renderSequence || !animationHost.value) return

    const reduceMotion = motionQuery?.matches === true
    animationInstance = player.loadAnimation({
      container: animationHost.value,
      renderer: 'svg',
      loop: !reduceMotion,
      autoplay: !reduceMotion,
      animationData: cloneAnimation(animationData),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
        progressiveLoad: true
      }
    })
    animationInstance.addEventListener('DOMLoaded', () => {
      if (sequence !== renderSequence) return
      if (reduceMotion) animationInstance?.goToAndStop(0, true)
      ready.value = true
    })
  } catch (error) {
    console.warn('首页 Lottie 加载失败，已使用原视觉回退。', error)
  }
}

const onMotionChange = () => renderAnimation()

const syncTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

watch(isDark, renderAnimation)

onMounted(() => {
  syncTheme()
  themeObserver = new MutationObserver(syncTheme)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener?.('change', onMotionChange)
  renderAnimation()
})

onUnmounted(() => {
  renderSequence += 1
  themeObserver?.disconnect()
  motionQuery?.removeEventListener?.('change', onMotionChange)
  destroyAnimation()
})
</script>

<template>
  <div class="home-hero-lottie" :class="{ 'home-hero-lottie--ready': ready }">
    <div ref="animationHost" class="home-hero-lottie__animation"></div>
    <SvgHeroVisual v-if="!ready" class="home-hero-lottie__fallback" />
  </div>
</template>

<style scoped>
.home-hero-lottie {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.home-hero-lottie__animation,
.home-hero-lottie__fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.home-hero-lottie__animation { opacity: 0; }
.home-hero-lottie--ready .home-hero-lottie__animation { opacity: 1; }
.home-hero-lottie__fallback { opacity: 0.46; }

@media (prefers-reduced-motion: reduce) {
  .home-hero-lottie__animation { transition: none; }
}
</style>
