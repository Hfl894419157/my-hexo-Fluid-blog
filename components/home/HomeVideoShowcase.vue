<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import videoContent from '../../.shared/content/videos.json'
import { buildBilibiliEmbedUrl, normalizeHomeVideoCases } from '../../.shared/videoClient.js'

const publishedCases = normalizeHomeVideoCases(videoContent.items)
const draftPreviewCases = import.meta.env.DEV && publishedCases.length === 0
  ? videoContent.items
      .filter((item) => item?.title && item?.category && item?.description && item?.poster)
      .slice(0, 4)
      .map((item) => ({
        id: item.id,
        title: item.title.trim(),
        category: item.category.trim(),
        description: item.description.trim(),
        poster: item.poster.trim(),
        url: item.url?.trim() || '',
        duration: item.duration?.trim() || ''
      }))
  : []
const cases = publishedCases.length ? publishedCases : draftPreviewCases
const isDraftPreview = draftPreviewCases.length > 0
const activeIndex = ref(0)
const dialog = ref(null)
const playButton = ref(null)
const videoList = ref(null)
const iframeSrc = ref('')
const activeCase = computed(() => cases[activeIndex.value])
const cardColumns = computed(() => Math.max(1, cases.length))

const selectCase = (index) => {
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

const openDialog = async () => {
  if (!activeCase.value || !dialog.value) return
  const embedUrl = buildBilibiliEmbedUrl(activeCase.value.url)
  if (!embedUrl) return
  iframeSrc.value = embedUrl
  dialog.value.showModal()
  await nextTick()
  dialog.value.querySelector('.video-dialog__close')?.focus()
}

const closeDialog = () => {
  dialog.value?.close()
  iframeSrc.value = ''
  nextTick(() => playButton.value?.focus())
}

const handleDialogClick = (event) => {
  if (event.target === dialog.value) closeDialog()
}

watch(activeIndex, () => {
  if (dialog.value?.open) closeDialog()
})

onBeforeUnmount(() => {
  iframeSrc.value = ''
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
      <article class="video-stage" v-reveal="{ y: 24, repeat: true }">
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
          ref="playButton"
          class="video-stage__play"
          type="button"
          :disabled="isDraftPreview && !activeCase.url"
          :aria-label="isDraftPreview && !activeCase.url ? `${activeCase.title}的视频链接待配置` : `播放${activeCase.title}`"
          @click="openDialog"
        >
          {{ isDraftPreview && !activeCase.url ? '视频链接待配置' : '播放完整案例' }}
        </button>
        <span v-if="activeCase.duration" class="video-stage__duration">{{ activeCase.duration }}</span>
      </article>

      <div
        ref="videoList"
        class="video-list"
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
      <p v-if="isDraftPreview" class="video-showcase__preview-note">
        本地草稿预览：封面与版式已生效，填入有效的 B 站 BV 链接并开启显示后即可正式播放。
      </p>
    </div>

    <dialog ref="dialog" class="video-dialog" @click="handleDialogClick" @cancel.prevent="closeDialog">
      <div class="video-dialog__panel">
        <button class="video-dialog__close" type="button" aria-label="关闭视频" @click="closeDialog">×</button>
        <div class="video-dialog__player">
          <iframe
            v-if="iframeSrc"
            :src="iframeSrc"
            :title="`${activeCase.title}哔哩哔哩播放器`"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
        <div class="video-dialog__footer">
          <div>
            <span>{{ activeCase.category }}</span>
            <h3>{{ activeCase.title }}</h3>
          </div>
          <div class="video-dialog__actions">
            <BaseButton :href="activeCase.url" variant="secondary">前往哔哩哔哩观看</BaseButton>
            <BaseButton href="mailto:1442855983@qq.com?subject=咨询动态视觉项目">咨询类似项目</BaseButton>
          </div>
        </div>
      </div>
    </dialog>
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

.video-stage__copy > span,
.video-dialog__footer span {
  color: color-mix(in srgb, var(--brand-second) 54%, white);
  font-size: var(--text-micro);
  font-weight: 700;
  letter-spacing: .1em;
}

.video-stage__copy h3,
.video-dialog__footer h3 {
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

.video-dialog {
  width: min(1060px, calc(100vw - 32px));
  max-width: none;
  padding: 0;
  border: 0;
  border-radius: 18px;
  background: transparent;
}

.video-dialog::backdrop {
  background: rgb(17 14 12 / 78%);
  backdrop-filter: blur(10px);
}

.video-dialog__panel {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: 18px;
  background: var(--bg-card);
  box-shadow: 0 36px 120px rgb(0 0 0 / 32%);
}

.video-dialog__player {
  aspect-ratio: 16 / 9;
  background: #000;
}

.video-dialog iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.video-dialog__close {
  position: absolute;
  z-index: 3;
  top: 14px;
  right: 14px;
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 28%);
  border-radius: 50%;
  color: white;
  background: rgb(20 17 14 / 68%);
  font-size: 26px;
  cursor: pointer;
}

.video-dialog__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px 28px;
}

.video-dialog__footer h3 {
  color: var(--text-main);
  font-size: clamp(22px, 1.8vw, 26px);
}

.video-dialog__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
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

  .video-dialog__footer {
    align-items: stretch;
    flex-direction: column;
  }

  .video-dialog__actions {
    display: grid;
  }
}

@media (prefers-reduced-motion: reduce) {
  .video-card {
    transition: none;
  }
}
</style>
