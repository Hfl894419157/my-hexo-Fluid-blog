<script setup>
import ResponsiveImage from './ResponsiveImage.vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  caption: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  aspect: { type: String, default: '16 / 10' },
  position: { type: String, default: 'center' },
  eager: { type: Boolean, default: false },
  sizes: { type: String, default: '(max-width: 640px) calc(100vw - 32px), 760px' },
  tone: { type: String, default: 'default' }
})
</script>

<template>
  <figure class="media-frame" :class="`media-frame--${tone}`" :style="{ '--media-aspect': aspect }">
    <div class="media-frame__viewport">
      <ResponsiveImage
        :src="src"
        :alt="alt"
        :sizes="sizes"
        :eager="eager"
        :style="{ objectPosition: position }"
      />
      <span v-if="eyebrow" class="media-frame__eyebrow">{{ eyebrow }}</span>
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.media-frame {
  margin: 0;
}

.media-frame__viewport {
  position: relative;
  aspect-ratio: var(--media-aspect);
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-soft);
  box-shadow: var(--shadow-card);
}

.media-frame__viewport::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background: linear-gradient(180deg, transparent 58%, color-mix(in srgb, var(--bg-page) 48%, transparent));
}

.media-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--image-treatment, saturate(0.92) contrast(1.02));
  transition: transform 0.55s ease, filter 0.3s ease;
}

.media-frame:hover img {
  transform: scale(1.025);
}

.media-frame__eyebrow {
  position: absolute;
  bottom: 18px;
  left: 18px;
  z-index: 1;
  padding: 7px 10px;
  border: 1px solid color-mix(in srgb, var(--border-soft) 70%, transparent);
  border-radius: var(--radius-control);
  color: #fff;
  font-size: var(--text-label);
  letter-spacing: 0.08em;
  background: rgba(12, 13, 18, 0.56);
}

figcaption {
  margin-top: 10px;
  color: var(--text-muted);
  font-size: var(--text-label);
  line-height: 1.7;
}

.media-frame--quiet .media-frame__viewport {
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .media-frame img {
    transition: none;
  }

  .media-frame:hover img {
    transform: none;
  }
}
</style>
