<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
const playButton = ref(null)
const playerFrame = ref(null)
const videoList = ref(null)
const iframeSrc = ref('')
const playbackMode = ref('idle')
const isStageInView = ref(false)
const activeCase = computed(() => cases[activeIndex.value])
const cardColumns = computed(() => Math.max(1, cases.length))
const listMaxWidth = computed(() => cases.length < 3
  ? `${cases.length * 300 + Math.max(0, cases.length - 1) * 16}px`
  : '100%')

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

const startPlayback = async ({ muted, mode, focus = false }) => {
  if (isPlaceholder || !activeCase.value) return
  const embedUrl = buildBilibiliEmbedUrl(activeCase.value.url, {
    autoplay: true,
    muted
  })
  if (!embedUrl) return
  iframeSrc.value = embedUrl
  playbackMode.value = mode
  if (focus) {
    await nextTick()
    playerFrame.value?.focus()
  }
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
  clearAutoPlayTimer()
  stopPlayback()
  if (index === activeIndex.value) return
  activeIndex.value = index
}

const focusSelection = async (index) => {
  selectCase(index)
  await nextTick()
  videoList.value?.querySelectorAll('[role="tab"]')[activeIndex.value]?.focus()
}

const moveSelection = (offset) => {
  focusSelection((activeIndex.value + offset + cases.length) % cases.length)
}

const playInline = () => {
  clearAutoPlayTimer()
  startPlayback({ muted: false, mode: 'manual', focus: true })
}

const stopInline = () => {
  clearAutoPlayTimer()
  stopPlayback()
  nextTick(() => playButton.value?.focus())
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
  <section v-if="cases.length" id="video-showcase" class="video-showcase" aria-labelledby="video-showcase-title">
    <header class="video-showcase__head" v-reveal="{ y: 20, repeat: true }">
      <div>
        <h3 id="video-showcase-title">让画面在时间里建立信息与情绪</h3>
        <p class="video-showcase__desc">三维动画与 AI 视频实践，围绕产品、场景与传播目标组织镜头、材质和节奏。</p>
      </div>
      <span v-if="cases.length > 1" class="video-showcase__index">
        {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(cases.length).padStart(2, '0') }}
      </span>
    </header>

    <div class="video-showcase__layout">
      <article
        id="video-panel"
        ref="stage"
        class="video-stage"
        :class="{ 'video-stage--playing': iframeSrc }"
        role="tabpanel"
        v-reveal="{ y: 20, repeat: true }"
      >
        <template v-if="iframeSrc">
          <iframe
            ref="playerFrame"
            :key="activeCase.id"
            :src="iframeSrc"
            :title="`${activeCase.title}哔哩哔哩播放器`"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            scrolling="no"
            referrerpolicy="strict-origin-when-cross-origin"
            tabindex="0"
          ></iframe>
          <button class="video-stage__stop" type="button" @click="stopInline">返回封面</button>
        </template>

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
            <h4>{{ activeCase.title }}</h4>
            <p>{{ activeCase.description }}</p>
          </div>
          <button
            ref="playButton"
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
        role="tablist"
        aria-label="动态作品切换"
        :style="{
          '--video-card-columns': cardColumns,
          '--video-list-max-width': listMaxWidth
        }"
      >
        <button
          v-for="(item, index) in cases"
          :key="item.id"
          class="video-card"
          :class="{ 'video-card--active': index === activeIndex }"
          type="button"
          role="tab"
          aria-controls="video-panel"
          :aria-selected="index === activeIndex"
          :tabindex="index === activeIndex ? 0 : -1"
          v-reveal="{ delay: index * 60, y: 18, repeat: true }"
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
            <strong>{{ item.title }}</strong>
          </span>
        </button>
      </div>

      <div class="video-showcase__foot">
        <p v-if="isPlaceholder" class="video-showcase__preview-note">
          当前为版式预览，完整视频正在整理，后续将开放播放。
        </p>
        <a
          v-else
          :href="activeCase.url"
          target="_blank"
          rel="noreferrer"
        >在哔哩哔哩打开 <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-showcase {
  width: 100%;
  margin: clamp(64px, 8vw, 96px) auto 0;
  padding-top: clamp(36px, 5vw, 52px);
  border-top: 1px solid var(--border-soft);
}

.video-showcase__head {
  display: flex;
  width: min(960px, 100%);
  align-items: end;
  justify-content: space-between;
  gap: 32px;
  margin: 0 auto;
}

.video-showcase__head > div { max-width: 720px; }

.video-showcase__head h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -.025em;
}

.video-showcase__desc {
  margin: 13px 0 0;
  color: var(--text-sub);
  font-size: 15px;
  line-height: 1.8;
}

.video-showcase__index {
  flex: 0 0 auto;
  padding-bottom: 5px;
  color: var(--brand-main);
  font: 700 11px/1 var(--font-mono);
  letter-spacing: .12em;
}

.video-showcase__layout {
  width: min(960px, 100%);
  margin: 28px auto 0;
}

.video-stage {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: 18px;
  background: #0f0d0b;
  box-shadow: 0 24px 64px color-mix(in srgb, var(--text-main) 11%, transparent);
}

.video-stage > img,
.video-stage > iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.video-stage > img { object-fit: cover; }
.video-stage--playing { background: #000; }

.video-stage__shade {
  position: absolute;
  inset: 28% 0 0;
  background: linear-gradient(transparent, rgb(16 13 11 / 86%));
  pointer-events: none;
}

.video-stage__copy {
  position: absolute;
  z-index: 2;
  right: clamp(24px, 4vw, 52px);
  bottom: clamp(26px, 4vw, 50px);
  left: clamp(24px, 4vw, 52px);
  width: min(640px, calc(100% - 190px));
  color: white;
}

.video-stage__copy h4 {
  margin: 0;
  color: white;
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

.video-stage__play,
.video-stage__stop {
  position: absolute;
  z-index: 3;
  min-height: 44px;
  padding: 0 17px;
  border: 1px solid rgb(255 255 255 / 42%);
  border-radius: 999px;
  color: white;
  background: rgb(20 17 14 / 76%);
  font: 700 13px/1 var(--font-sans);
  backdrop-filter: blur(12px);
  cursor: pointer;
}

.video-stage__play {
  right: clamp(24px, 4vw, 52px);
  bottom: clamp(30px, 4vw, 52px);
}

.video-stage__stop {
  top: 14px;
  left: 14px;
  min-height: 38px;
  padding: 0 14px;
  font-size: 12px;
}

.video-stage__play:disabled {
  cursor: not-allowed;
  opacity: .72;
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
  width: min(var(--video-list-max-width), 100%);
  margin: 18px auto 0;
}

.video-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 11px;
  min-width: 0;
  padding: 10px;
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
    box-shadow var(--transition-smooth),
    background-color var(--transition-smooth);
  transition-delay: var(--reveal-delay, 0ms);
  cursor: pointer;
}

.video-card:hover,
.video-card--active {
  border-color: color-mix(in srgb, var(--brand-main) 46%, var(--border-soft));
  box-shadow: 0 10px 28px color-mix(in srgb, var(--brand-main) 9%, transparent);
}

.video-card--active { background: color-mix(in srgb, var(--brand-main) 5%, var(--bg-card)); }

.video-card__thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  background: var(--bg-soft);
}

.video-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-card__thumb span {
  position: absolute;
  right: 7px;
  bottom: 7px;
  padding: 5px 7px;
  border-radius: 5px;
  color: white;
  background: rgb(20 17 14 / 70%);
  font: 700 10px/1 var(--font-mono);
}

.video-card__copy {
  display: grid;
  min-width: 0;
  gap: 5px;
  padding: 0 2px 3px;
}

.video-card__copy strong {
  overflow: hidden;
  font-family: var(--font-display);
  font-size: clamp(15px, 1.4vw, 18px);
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-showcase__foot {
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
}

.video-showcase__foot a {
  color: var(--brand-main);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.video-showcase__preview-note {
  margin: 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.6;
}

@media (max-width: 899px) {
  .video-showcase { margin-top: 64px; }

  .video-showcase__head {
    align-items: start;
    flex-direction: column;
    gap: 12px;
  }

  .video-list {
    display: flex;
    width: 100%;
    max-width: none;
    overflow-x: auto;
    gap: 12px;
    padding: 2px 2px 10px;
    scroll-snap-type: x mandatory;
  }

  .video-card {
    min-width: min(280px, 76vw);
    scroll-snap-align: start;
  }
}

@media (max-width: 640px) {
  .video-showcase__head h3 { font-size: 26px; }
  .video-showcase__desc { font-size: 14px; }
  .video-showcase__layout { margin-top: 24px; }

  .video-stage__copy {
    right: 20px;
    bottom: 68px;
    left: 20px;
    width: calc(100% - 40px);
  }

  .video-stage__copy h4 { font-size: 23px; }
  .video-stage__copy p { display: none; }

  .video-stage__play {
    right: auto;
    bottom: 16px;
    left: 20px;
    min-height: 40px;
    padding: 0 14px;
    font-size: 12px;
  }

  .video-stage__stop {
    top: 10px;
    left: 10px;
    min-height: 34px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .video-card { transition: none; }
}
</style>
