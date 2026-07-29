<script setup>
import { computed, nextTick, ref } from 'vue'
import videoContent from '../../.shared/content/videos.json'
import ResponsiveImage from '../ResponsiveImage.vue'
import {
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
const videoList = ref(null)
const videoElement = ref(null)
const isPlaying = ref(false)
const playbackError = ref('')
const activeCase = computed(() => cases[activeIndex.value])
const cardColumns = computed(() => Math.max(1, cases.length))
const listMaxWidth = computed(() => cases.length < 3
  ? `${cases.length * 300 + Math.max(0, cases.length - 1) * 16}px`
  : '100%')

const selectCase = (index) => {
  if (index === activeIndex.value) return
  videoElement.value?.pause()
  isPlaying.value = false
  playbackError.value = ''
  activeIndex.value = index
}

const playOssVideo = async () => {
  playbackError.value = ''
  isPlaying.value = true
  await nextTick()
  try {
    await videoElement.value?.play()
  } catch {
    isPlaying.value = false
    playbackError.value = '视频暂时无法播放，请重试'
  }
}

const handlePlaybackError = () => {
  videoElement.value?.pause()
  isPlaying.value = false
  playbackError.value = '视频加载失败，请稍后重试'
}

const focusSelection = async (index) => {
  selectCase(index)
  await nextTick()
  videoList.value?.querySelectorAll('[role="tab"]')[activeIndex.value]?.focus()
}

const moveSelection = (offset) => {
  focusSelection((activeIndex.value + offset + cases.length) % cases.length)
}
</script>

<template>
  <section v-if="cases.length" id="video-showcase" class="video-showcase" aria-labelledby="video-showcase-title">
    <header class="video-showcase__head" v-reveal="{ y: 20, repeat: true }">
      <h3 id="video-showcase-title">让画面在时间里建立信息与情绪</h3>
      <p class="video-showcase__desc">三维动画与 AI 视频实践，围绕产品、场景与传播目标组织镜头、材质和节奏。</p>
    </header>

    <div class="video-showcase__layout">
      <article
        id="video-panel"
        class="video-stage"
        role="tabpanel"
        v-reveal="{ y: 20, repeat: true }"
      >
        <video
          v-if="isPlaying && activeCase.sourceType === 'oss'"
          ref="videoElement"
          class="video-stage__player"
          :src="activeCase.url"
          :poster="activeCase.poster"
          controls
          playsinline
          preload="metadata"
          autoplay
          @error="handlePlaybackError"
        ></video>
        <ResponsiveImage
          v-else
          :key="activeCase.id"
          :src="activeCase.poster"
          :alt="`${activeCase.title}视频封面`"
          profile="homeCase"
          sizes="(max-width: 899px) 100vw, 960px"
        />
        <div v-if="!isPlaying" class="video-stage__shade" aria-hidden="true"></div>
        <div v-if="!isPlaying" class="video-stage__copy">
          <h4>{{ activeCase.title }}</h4>
          <p v-if="activeCase.description">{{ activeCase.description }}</p>
        </div>
        <a
          v-if="!isPlaceholder && activeCase.sourceType === 'bilibili'"
          class="video-stage__play"
          :href="activeCase.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`在哔哩哔哩播放${activeCase.title}`"
        >
          <span class="video-stage__play-icon" aria-hidden="true">▶</span>
          播放视频
        </a>
        <button
          v-else-if="!isPlaceholder && activeCase.sourceType === 'oss' && !isPlaying"
          class="video-stage__play"
          type="button"
          :aria-label="`播放 ${activeCase.title}`"
          @click="playOssVideo"
        >
          <span class="video-stage__play-icon" aria-hidden="true">▶</span>
          播放视频
        </button>
        <span v-else-if="isPlaceholder" class="video-stage__play video-stage__play--disabled">视频内容准备中</span>
        <span v-if="playbackError && !isPlaying" class="video-stage__error" role="status">{{ playbackError }}</span>
        <span v-if="activeCase.duration && !isPlaying" class="video-stage__duration">{{ activeCase.duration }}</span>
      </article>

      <div
        v-if="cases.length > 1"
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
            <ResponsiveImage
              :src="item.poster"
              alt=""
              profile="card"
              sizes="(max-width: 899px) 76vw, 300px"
            />
            <span v-if="item.duration">{{ item.duration }}</span>
          </span>
          <span class="video-card__copy">
            <strong>{{ item.title }}</strong>
          </span>
        </button>
      </div>

      <p v-if="isPlaceholder" class="video-showcase__preview-note">
        当前为版式预览，完整视频正在整理，后续将开放播放。
      </p>
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
  display: grid;
  width: min(960px, 100%);
  justify-items: center;
  gap: 0;
  margin: 0 auto;
  text-align: center;
}

.video-showcase__head h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(30px, 3vw, 36px);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -.025em;
}

.video-showcase__desc {
  max-width: 640px;
  margin: 13px 0 0;
  color: var(--text-sub);
  font-size: 15px;
  line-height: 1.8;
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
  border-radius: var(--radius-card);
  background: var(--bg-card);
}

.video-stage > :deep(.responsive-picture) {
  display: block;
  width: 100%;
  height: 100%;
}

.video-stage__player {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: var(--bg-card);
  object-fit: contain;
}

.video-stage > :deep(.responsive-picture img),
.video-stage > :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: cover;
}

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
  font-size: clamp(24px, 2.4vw, 30px);
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 44px;
  padding: 0 17px;
  border: 1px solid rgb(255 255 255 / 42%);
  border-radius: 999px;
  color: white;
  background: rgb(20 17 14 / 76%);
  font: 700 13px/1 var(--font-sans);
  text-decoration: none;
  backdrop-filter: blur(12px);
  cursor: pointer;
}

.video-stage__play {
  right: clamp(24px, 4vw, 52px);
  bottom: clamp(30px, 4vw, 52px);
  transition: border-color var(--transition-smooth), background-color var(--transition-smooth), transform var(--transition-smooth);
}

.video-stage__play:hover {
  border-color: rgb(255 255 255 / 74%);
  background: rgb(20 17 14 / 90%);
  transform: translateY(-2px);
}

.video-stage__play-icon {
  font-size: 11px;
}

.video-stage__play--disabled {
  cursor: default;
  opacity: .72;
}

.video-stage__play--disabled:hover { transform: none; }

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

.video-stage__error {
  position: absolute;
  z-index: 3;
  top: 18px;
  left: 18px;
  max-width: calc(100% - 120px);
  padding: 7px 10px;
  border-radius: 6px;
  color: white;
  background: rgb(142 35 35 / 86%);
  font: 600 12px/1.4 var(--font-sans);
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

.video-card__thumb :deep(.responsive-picture) {
  display: block;
  width: 100%;
  height: 100%;
}

.video-card__thumb :deep(img) {
  display: block;
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

.video-showcase__preview-note {
  margin: 14px 0 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
}

@media (max-width: 899px) {
  .video-showcase { margin-top: 64px; }

  .video-showcase__head {
    padding-inline: 24px;
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

  .video-stage__copy h4 { font-size: 22px; }
  .video-stage__copy p { display: none; }

  .video-stage__play {
    right: auto;
    bottom: 16px;
    left: 20px;
    min-height: 40px;
    padding: 0 14px;
    font-size: 12px;
  }

}

@media (prefers-reduced-motion: reduce) {
  .video-card { transition: none; }
}
</style>
