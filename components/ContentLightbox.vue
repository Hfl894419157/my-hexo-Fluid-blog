<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { PhCaretLeft, PhCaretRight, PhX } from '@phosphor-icons/vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
  activeIndex: { type: Number, default: 0 }
})

const emit = defineEmits(['close', 'select'])

const dialog = ref(null)
const closeButton = ref(null)
const activeItem = computed(() => props.items[props.activeIndex] || null)
const hasMultiple = computed(() => props.items.length > 1)

const selectRelative = (offset) => {
  if (!hasMultiple.value) return
  emit('select', (props.activeIndex + offset + props.items.length) % props.items.length)
}

const handleKeydown = (event) => {
  if (!props.open) return
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowLeft') selectRelative(-1)
  if (event.key === 'ArrowRight') selectRelative(1)
  if (event.key === 'Tab') {
    const controls = [...(dialog.value?.querySelectorAll('button:not([disabled])') || [])]
    if (!controls.length) return
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

const syncPageScroll = (open) => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('content-lightbox-open', open)
}

watch(
  () => props.open,
  async (open) => {
    syncPageScroll(open)
    if (open) {
      await nextTick()
      closeButton.value?.focus()
    }
  },
  { immediate: true }
)

if (typeof window !== 'undefined') window.addEventListener('keydown', handleKeydown)

onBeforeUnmount(() => {
  syncPageScroll(false)
  if (typeof window !== 'undefined') window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="content-lightbox">
      <div
        v-if="open && activeItem"
        ref="dialog"
        class="content-lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="activeItem.alt || '图片预览'"
        @click.self="$emit('close')"
      >
        <div class="content-lightbox__toolbar">
          <span v-if="hasMultiple" class="content-lightbox__counter">
            {{ activeIndex + 1 }} / {{ items.length }}
          </span>
          <button ref="closeButton" class="content-lightbox__close" type="button" aria-label="关闭图片预览" @click="$emit('close')">
            <PhX :size="22" weight="bold" aria-hidden="true" />
          </button>
        </div>

        <button
          v-if="hasMultiple"
          class="content-lightbox__nav content-lightbox__nav--previous"
          type="button"
          aria-label="查看上一张图片"
          @click="selectRelative(-1)"
        >
          <PhCaretLeft :size="28" weight="bold" aria-hidden="true" />
        </button>

        <figure class="content-lightbox__figure">
          <img :src="activeItem.src" :alt="activeItem.alt || ''">
          <figcaption v-if="activeItem.caption">{{ activeItem.caption }}</figcaption>
        </figure>

        <button
          v-if="hasMultiple"
          class="content-lightbox__nav content-lightbox__nav--next"
          type="button"
          aria-label="查看下一张图片"
          @click="selectRelative(1)"
        >
          <PhCaretRight :size="28" weight="bold" aria-hidden="true" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
:global(body.content-lightbox-open) {
  overflow: hidden;
}

.content-lightbox {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  grid-template-columns: minmax(54px, 1fr) minmax(0, auto) minmax(54px, 1fr);
  grid-template-rows: minmax(64px, 1fr) minmax(0, auto) minmax(64px, 1fr);
  align-items: center;
  justify-items: center;
  padding: clamp(20px, 3vw, 44px);
  background: rgb(13 12 11 / 94%);
  backdrop-filter: blur(14px);
}

.content-lightbox__toolbar {
  position: absolute;
  z-index: 2;
  top: clamp(14px, 2.4vw, 28px);
  right: clamp(14px, 2.4vw, 28px);
  display: flex;
  align-items: center;
  gap: 12px;
}

.content-lightbox__counter {
  color: rgb(255 255 255 / 70%);
  font: 650 12px/1 var(--font-mono);
  letter-spacing: .08em;
}

.content-lightbox__close,
.content-lightbox__nav {
  display: grid;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 18%);
  color: white;
  background: rgb(24 22 20 / 76%);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition:
    border-color var(--transition-smooth),
    background-color var(--transition-smooth),
    transform var(--transition-smooth);
}

.content-lightbox__close {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}

.content-lightbox__nav {
  z-index: 2;
  width: 48px;
  height: 64px;
  border-radius: 999px;
}

.content-lightbox__nav--previous {
  grid-column: 1;
  grid-row: 2;
  justify-self: start;
}

.content-lightbox__nav--next {
  grid-column: 3;
  grid-row: 2;
  justify-self: end;
}

.content-lightbox__close:hover,
.content-lightbox__nav:hover {
  border-color: rgb(255 255 255 / 44%);
  background: rgb(38 34 30 / 94%);
}

.content-lightbox__close:hover { transform: rotate(4deg); }
.content-lightbox__nav--previous:hover { transform: translateX(-2px); }
.content-lightbox__nav--next:hover { transform: translateX(2px); }

.content-lightbox__close:focus-visible,
.content-lightbox__nav:focus-visible {
  outline: 2px solid white;
  outline-offset: 3px;
}

.content-lightbox__figure {
  grid-column: 2;
  grid-row: 2;
  display: grid;
  max-width: min(86vw, 1440px);
  max-height: 84vh;
  justify-items: center;
  gap: 12px;
  margin: 0;
}

.content-lightbox__figure img {
  display: block;
  max-width: 100%;
  max-height: calc(84vh - 42px);
  width: auto;
  height: auto;
  border-radius: 10px;
  object-fit: contain;
  box-shadow: 0 16px 52px rgb(0 0 0 / 30%);
}

.content-lightbox__figure figcaption {
  max-width: min(720px, 78vw);
  color: rgb(255 255 255 / 72%);
  font-size: 13px;
  line-height: 1.65;
  text-align: center;
}

.content-lightbox-enter-active,
.content-lightbox-leave-active {
  transition: opacity 180ms ease;
}

.content-lightbox-enter-active .content-lightbox__figure,
.content-lightbox-leave-active .content-lightbox__figure {
  transition: transform 180ms ease;
}

.content-lightbox-enter-from,
.content-lightbox-leave-to {
  opacity: 0;
}

.content-lightbox-enter-from .content-lightbox__figure,
.content-lightbox-leave-to .content-lightbox__figure {
  transform: scale(.985);
}

@media (max-width: 640px) {
  .content-lightbox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 68px 16px 56px;
  }

  .content-lightbox__figure {
    max-width: 100%;
    max-height: calc(100dvh - 124px);
  }

  .content-lightbox__figure img {
    max-height: calc(100dvh - 166px);
    border-radius: 8px;
  }

  .content-lightbox__nav {
    position: absolute;
    bottom: 12px;
    width: 44px;
    height: 40px;
  }

  .content-lightbox__nav--previous { left: calc(50% - 54px); }
  .content-lightbox__nav--next { right: calc(50% - 54px); }
}

@media (prefers-reduced-motion: reduce) {
  .content-lightbox-enter-active,
  .content-lightbox-leave-active,
  .content-lightbox-enter-active .content-lightbox__figure,
  .content-lightbox-leave-active .content-lightbox__figure,
  .content-lightbox__close,
  .content-lightbox__nav {
    transition: none;
  }
}
</style>
