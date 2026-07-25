<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import videoContent from '../../.shared/content/videos.json'
import {
  buildBilibiliEmbedUrl,
  normalizeHomeVideoCases,
  normalizeHomeVideoPlaceholderCases
} from '../../.shared/videoClient.js'

const publishedCases = normalizeHomeVideoCases(videoContent.items)
const placeholderCases = publishedCases.length === 0
  ? normalizeHomeVideoPlaceholderCases(videoContent.items)
  : []
const cases = publishedCases.length ? publishedCases : placeholderCases
const isPlaceholder = placeholderCases.length > 0
const activeIndex = ref(0)
const stage = ref(null)
const videoList = ref(null)
const iframeSrc = ref('')
const playbackMode = ref('idle')
const isStageInView = ref(false)
const activeCase = computed(() => cases[activeIndex.value])
const cardColumns = computed(() => Math.max(1, cases.length))
let observer
let autoPlayTimer
let desktopQuery
let reducedMotionQuery
let connection
let stageVisibilityRatio = 0

const clearAutoPlayTimer = () => {
  if (!autoPlayTimer) return
  window.clearTimeout(autoPlayTimer)
  autoPlayTimer = undefined
}

const stopPlayback = () => {
  iframeSrc.value = ''
  playbackMode.value = 'idle'
}

const canAutoPlay = () => (
  !isPlaceholder
  && desktopQuery?.matches
  && !reducedMotionQuery?.matches
  && !connection?.saveData
)

const startPlayback = ({ muted, mode }) => {
  if (isPlaceholder || !activeCase.value) return
  const embedUrl = buildBilibiliEmbedUrl(activeCase.value.url, {
    autoplay: true,
    muted
  })
  if (!embedUrl) return
  iframeSrc.value = embedUrl
  playbackMode.value = mode
}

const scheduleAutoPlayback = () => {
  clearAutoPlayTimer()
  if (
    !isStageInView.value
    || stageVisibilityRatio < 0.5
    || !canAutoPlay()
    || iframeSrc.value
    || document.hidden
  ) return
  autoPlayTimer = window.setTimeout(() => {
    autoPlayTimer = undefined
    if (
      !isStageInView.value
      || stageVisibilityRatio < 0.5
      || !canAutoPlay()
      || iframeSrc.value
      || document.hidden
    ) return
    startPlayback({ muted: true, mode: 'auto' })
  }, 500)
}

const selectCase = (index) => {
  if (index === activeIndex.value) return
  activeIndex.value = index
}

const focusSelection = async (index) => {
  activeIndex.value = index
  await nextTick()
  videoList.value?.querySelectorAll('[role="tab"]')[activeIndex.value]?.focus()
}

const moveSelection = (offset) => {
  focusSelection((activeIndex.value + offset + cases.length) % cases.length)
}

const playInline = () => {
  clearAutoPlayTimer()
  startPlayback({ muted: false, mode: 'manual' })
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    clearAutoPlayTimer()
    stopPlayback()
    return
  }
  scheduleAutoPlayback()
}

const handlePlaybackPreferenceChange = () => {
  if (!canAutoPlay() && playbackMode.value === 'auto') stopPlayback()
  scheduleAutoPlayback()
}

watch(activeIndex, async () => {
  clearAutoPlayTimer()
  stopPlayback()
  await nextTick()
  scheduleAutoPlayback()
})

onMounted(() => {
  desktopQuery = window.matchMedia('(min-width: 900px)')
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  connection = navigator.connection

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      stageVisibilityRatio = entry.intersectionRatio
      if (entry.intersectionRatio >= 0.5) {
        isStageInView.value = true
        scheduleAutoPlayback()
      } else if (entry.intersectionRatio < 0.25) {
        isStageInView.value = false
        clearAutoPlayTimer()
        stopPlayback()
      } else {
        clearAutoPlayTimer()
      }
    }, { threshold: [0, 0.25, 0.5] })

    if (stage.value) observer.observe(stage.value)
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)
  desktopQuery.addEventListener?.('change', handlePlaybackPreferenceChange)
  reducedMotionQuery.addEventListener?.('change', handlePlaybackPreferenceChange)
  connection?.addEventListener?.('change', handlePlaybackPreferenceChange)
})

onBeforeUnmount(() => {
  clearAutoPlayTimer()
  stopPlayback()
  observer?.disconnect()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  desktopQuery?.removeEventListener?.('change', handlePlaybackPreferenceChange)
  reducedMotionQuery?.removeEventListener?.('change', handlePlaybackPreferenceChange)
  connection?.removeEventListener?.('change', handlePlaybackPreferenceChange)
})
</script>

<template>
  <SectionShell v-if="cases.length" id="video-showcase" compact>
    <div class="video-showcase__head" v-reveal="{ y: 24, repeat: true }">
      <SectionHeader
        :title-lines="['动态视觉作品', '让画面在时间里建立信息与情绪']"
        desc="三维渲染与 AI 视频实践，围绕产品、场景与传播目标组织镜头、材质和节奏。"
      />
    </div>

    <div class="video-showcase__layout">
      <article ref="stage" class="video-stage" v-reveal="{ y: 24, repeat: true }">
        <iframe
          v-if="iframeSrc"
          :src="iframeSrc"
          :title="`${activeCase.title}哔哩哔哩播放器`"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowfullscreen
          scrolling="no"
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
        <template v-else>
          <img
            :src="activeCase.poster"
            :alt="`${activeCase.title}视频封面`"
            width="1600"
            height="900"
            loading="lazy"
            decoding="async"
          >
          <div class="video-stage__shade" aria-hidden="true"></div>
          <div class="video-stage__copy">
            <span>{{ activeCase.category }}</span>
            <h3>{{ activeCase.title }}</h3>
            <p>{{ activeCase.description }}</p>
          </div>
          <button
            class="video-stage__play"
            type="button"
            :disabled="isPlaceholder"
            :aria-label="isPlaceholder ? `${activeCase.title}的视频内容准备中` : `在本页播放${activeCase.title}`"
            @click="playInline"
          >
            {{ isPlaceholder ? '视频内容准备中' : '在本页播放' }}
          </button>
          <span v-if="activeCase.duration" class="video-stage__duration">{{ activeCase.duration }}</span>
        </template>
      </article>

      <div
        ref="videoList"
        class="video-list"
        :class="{ 'video-list--single': cases.length === 1 }"
        role="tablist"
        aria-label="视频作品案例"
        :style="{ '--video-card-columns': cardColumns }"
      >
        <button
          v-for="(item, index) in cases"
          :key="item.id"
          class="video-card"
          :class="{ 'video-card--active': index === activeIndex }"
          type="button"
          role="tab"
          :aria-selected="index === activeIndex"
          :tabindex="index === activeIndex ? 0 : -1"
          v-reveal="{ delay: index * 70, y: 24, repeat: true }"
          @click="selectCase(index)"
          @keydown.left.prevent="moveSelection(-1)"
          @keydown.right.prevent="moveSelection(1)"
          @keydown.home.prevent="focusSelection(0)"
          @keydown.end.prevent="focusSelection(cases.length - 1)"
        >
          <span class="video-card__thumb">
            <img :src="item.poster" alt="" width="560" height="315" loading="lazy" decoding="async">
            <span v-if="item.duration">{{ item.duration }}</span>
          </span>
          <span class="video-card__copy">
            <small>{{ item.category }}</small>
            <strong>{{ item.title }}</strong>
          </span>
        </button>
      </div>
      <p v-if="isPlaceholder" class="video-showcase__preview-note">
        当前为案例版式预览，完整视频正在整理，后续将开放播放。
      </p>
    </div>
  </SectionShell>
</template>

<style scoped>
.video-showcase__head {
  display: grid;
  justify-items: center;
  text-align: center;
}

.video-showcase__head :deep(.section-header) {
  width: min(920px, 100%);
}

.video-showcase__layout {
  width: min(960px, 100%);
  margin: 48px auto 0;
}

.video-stage {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: 18px;
  background: var(--text-main);
  box-shadow: 0 28px 80px color-mix(in srgb, var(--text-main) 12%, transparent);
}

.video-stage > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-stage iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.video-stage__shade {
  position: absolute;
  inset: 32% 0 0;
  background: linear-gradient(transparent, rgb(16 13 11 / 84%));
  pointer-events: none;
}

.video-stage__copy {
  position: absolute;
  z-index: 2;
  right: clamp(24px, 4vw, 52px);
  bottom: clamp(26px, 4vw, 50px);
  left: clamp(24px, 4vw, 52px);
  width: min(680px, calc(100% - 180px));
  color: white;
}

.video-stage__copy > span {
  color: color-mix(in srgb, var(--brand-second) 54%, white);
  font-size: var(--text-micro);
  font-weight: 700;
  letter-spacing: .1em;
}

.video-stage__copy h3 {
  margin: 10px 0 0;
  font-family: var(--font-display);
  font-size: clamp(26px, 3vw, 40px);
  font-weight: 600;
  line-height: 1.2;
}

.video-stage__copy p {
  margin: 13px 0 0;
  color: rgb(255 255 255 / 78%);
  font-size: clamp(13px, 1.2vw, 16px);
  line-height: 1.75;
}

.video-stage__play {
  position: absolute;
  z-index: 3;
  right: clamp(24px, 4vw, 52px);
  bottom: clamp(30px, 4vw, 52px);
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid rgb(255 255 255 / 42%);
  border-radius: 999px;
  color: white;
  background: rgb(20 17 14 / 76%);
  font: 700 14px/1 var(--font-sans);
  backdrop-filter: blur(12px);
  cursor: pointer;
}

.video-stage__play:disabled {
  cursor: not-allowed;
  opacity: .72;
}

.video-showcase__preview-note {
  margin: 14px 0 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
}

.video-stage__duration {
  position: absolute;
  z-index: 3;
  top: 18px;
  right: 18px;
  padding: 7px 9px;
  border-radius: 6px;
  color: white;
  background: rgb(20 17 14 / 68%);
  font: 700 11px/1 var(--font-mono);
}

.video-list {
  display: grid;
  grid-template-columns: repeat(var(--video-card-columns), minmax(0, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.video-list--single {
  grid-template-columns: minmax(0, 320px);
  justify-content: center;
}

.video-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  min-width: 0;
  padding: 12px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: var(--text-main);
  background: var(--bg-card);
  text-align: left;
  transition:
    opacity var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    filter var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    transform var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    border-color var(--transition-smooth),
    box-shadow var(--transition-smooth);
  transition-delay: var(--reveal-delay, 0ms);
  cursor: pointer;
}

.video-card:hover,
.video-card--active {
  border-color: color-mix(in srgb, var(--brand-main) 46%, var(--border-soft));
  box-shadow: 0 10px 28px color-mix(in srgb, var(--brand-main) 9%, transparent);
}

.video-card--active {
  background: color-mix(in srgb, var(--brand-main) 5%, var(--bg-card));
}

.video-card__thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 9px;
  background: var(--bg-soft);
}

.video-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-card__thumb span {
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 5px 7px;
  border-radius: 5px;
  color: white;
  background: rgb(20 17 14 / 70%);
  font: 700 10px/1 var(--font-mono);
}

.video-card__copy {
  display: grid;
  min-width: 0;
  gap: 7px;
  padding: 0 3px 4px;
}

.video-card__copy small {
  color: var(--brand-main);
  font-size: 10px;
  font-weight: 700;
}

.video-card__copy strong {
  overflow: hidden;
  font-family: var(--font-display);
  font-size: clamp(16px, 1.5vw, 20px);
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 899px) {
  .video-showcase__head :deep(.section-header__line) {
    white-space: normal;
  }

  .video-list {
    display: flex;
    overflow-x: auto;
    gap: 12px;
    padding: 2px 2px 10px;
    scroll-snap-type: x mandatory;
  }

  .video-list--single {
    justify-content: flex-start;
  }

  .video-card {
    min-width: min(300px, 78vw);
    scroll-snap-align: start;
  }
}

@media (max-width: 640px) {
  .video-showcase__layout {
    margin-top: 36px;
  }

  .video-stage__copy {
    right: 20px;
    bottom: 70px;
    left: 20px;
    width: calc(100% - 40px);
  }

  .video-stage__copy h3 {
    font-size: 24px;
  }

  .video-stage__copy p {
    display: none;
  }

  .video-stage__play {
    right: auto;
    bottom: 18px;
    left: 20px;
    min-height: 40px;
    padding: 0 14px;
    font-size: 12px;
  }

}

@media (prefers-reduced-motion: reduce) {
  .video-card {
    transition: none;
  }
}
</style>
