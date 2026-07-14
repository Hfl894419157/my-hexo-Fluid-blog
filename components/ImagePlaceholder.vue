<script setup>
import { computed } from 'vue'
import ResponsiveImage from './ResponsiveImage.vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  subject: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  aspect: {
    type: String,
    default: '16 / 10'
  },
  position: {
    type: String,
    default: 'center'
  },
  eager: {
    type: Boolean,
    default: false
  },
  sizes: {
    type: String,
    default: '(max-width: 640px) calc(100vw - 32px), 760px'
  }
})

const uploadPath = computed(() => `/images/uploads/${props.filename}`)
</script>

<template>
  <figure class="image-slot" :style="{ '--slot-aspect': aspect }">
    <ResponsiveImage
      v-if="src"
      class="image-slot__image"
      :src="src"
      :alt="alt || subject"
      :sizes="sizes"
      :eager="eager"
      :style="{ objectPosition: position }"
    />
    <div v-else class="image-slot__placeholder" role="img" :aria-label="`图片占位：${subject}`">
      <span class="image-slot__index" aria-hidden="true">IMAGE SLOT</span>
      <span class="image-slot__frame" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span class="image-slot__subject">{{ subject }}</span>
      <span class="image-slot__spec">建议比例 {{ aspect.replace(' / ', ':') }}</span>
      <code>{{ uploadPath }}</code>
    </div>
  </figure>
</template>

<style scoped>
.image-slot {
  position: relative;
  width: 100%;
  aspect-ratio: var(--slot-aspect);
  min-height: 0;
  overflow: hidden;
  margin: 0;
  border: 1px solid var(--border-soft);
  background: var(--bg-soft);
}

.image-slot :deep(.image-slot__image) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--image-treatment);
}

.image-slot__placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 10px;
  padding: 28px;
  overflow: hidden;
  color: var(--text-sub);
  text-align: center;
  background:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
    linear-gradient(145deg, var(--bg-soft), color-mix(in srgb, var(--brand-main) 8%, var(--bg-card)));
  background-size: 28px 28px, 28px 28px, auto;
}

.image-slot__frame {
  position: absolute;
  inset: 18px;
  pointer-events: none;
}

.image-slot__frame i {
  position: absolute;
  width: 34px;
  height: 34px;
  border-color: color-mix(in srgb, var(--brand-main) 44%, transparent);
  border-style: solid;
}

.image-slot__frame i:nth-child(1) { top: 0; left: 0; border-width: 1px 0 0 1px; }
.image-slot__frame i:nth-child(2) { top: 0; right: 0; border-width: 1px 1px 0 0; }
.image-slot__frame i:nth-child(3) { right: 0; bottom: 0; border-width: 0 1px 1px 0; }
.image-slot__frame i:nth-child(4) { bottom: 0; left: 0; border-width: 0 0 1px 1px; }

.image-slot__index {
  color: var(--brand-main);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.image-slot__subject {
  max-width: 32ch;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(18px, 2.2vw, 28px);
  font-weight: 600;
  line-height: 1.35;
}

.image-slot__spec {
  font-size: var(--text-label);
}

.image-slot code {
  max-width: 100%;
  padding: 5px 8px;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: 4px;
  background: color-mix(in srgb, var(--bg-card) 84%, transparent);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 560px) {
  .image-slot__placeholder { gap: 7px; padding: 20px; }
  .image-slot__frame { inset: 12px; }
  .image-slot__subject { font-size: 18px; }
}
</style>
