<script setup>
import { computed, ref } from 'vue'
import ResponsiveImage from './ResponsiveImage.vue'

const props = defineProps({ block: { type: Object, required: true } })
const activated = ref(false)

const cover = computed(() => props.block.customCover || props.block.platformCover || '')

const youtubeId = (value) => {
  try {
    const url = new URL(value)
    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    if (host === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] || ''
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') return url.searchParams.get('v') || ''
      const match = url.pathname.match(/^\/(?:shorts|embed)\/([\w-]{6,})/)
      return match?.[1] || ''
    }
  } catch {}
  return ''
}

const bilibiliId = (value) => String(value || '').match(/\b(BV[\w]+)\b/i)?.[1] || ''
const bilibiliAid = (value) => String(value || '').match(/\bav(\d+)\b/i)?.[1] || ''

const embedUrl = computed(() => {
  const url = props.block.url || ''
  const platform = String(props.block.platform || '').toLowerCase()
  if (platform === 'youtube' || /youtu(?:\.be|be\.com)/i.test(url)) {
    const id = youtubeId(url)
    return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : ''
  }
  if (platform === 'bilibili' || /bilibili\.com|b23\.tv/i.test(url)) {
    const bvid = bilibiliId(url)
    const aid = bilibiliAid(url)
    if (bvid) return `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(bvid)}&high_quality=1`
    if (aid) return `https://player.bilibili.com/player.html?aid=${encodeURIComponent(aid)}&high_quality=1`
  }
  return ''
})

const aspect = computed(() => {
  const value = String(props.block.aspect || '16:9').replace(':', ' / ')
  return /^\d+\s*\/\s*\d+$/.test(value) ? value : '16 / 9'
})
</script>

<template>
  <article class="content-video">
    <div class="content-video__stage" :style="{ aspectRatio: aspect }">
      <iframe
        v-if="activated && embedUrl"
        :src="embedUrl"
        :title="block.title || '视频播放器'"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <button v-else-if="embedUrl" type="button" class="content-video__trigger" @click="activated = true">
        <ResponsiveImage v-if="cover" :src="cover" :alt="block.title || '视频封面'" sizes="(max-width: 640px) calc(100vw - 48px), 760px" />
        <span class="content-video__play" aria-hidden="true">▶</span>
        <span class="sr-only">点击加载并播放视频</span>
      </button>
      <a v-else-if="block.url" class="content-video__external" :href="block.url" target="_blank" rel="noopener noreferrer">
        <ResponsiveImage v-if="cover" :src="cover" :alt="block.title || '视频封面'" sizes="(max-width: 640px) calc(100vw - 48px), 760px" />
        <span>前往平台观看 ↗</span>
      </a>
      <div v-else class="content-video__empty">视频信息待补充</div>
    </div>
    <div v-if="block.title || block.summary || block.duration" class="content-video__copy">
      <h3 v-if="block.title">{{ block.title }}</h3>
      <p v-if="block.summary">{{ block.summary }}</p>
      <span v-if="block.duration">{{ block.duration }}</span>
    </div>
  </article>
</template>
