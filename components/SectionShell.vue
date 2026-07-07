<script setup>
defineProps({
  id: {
    type: String,
    default: ''
  },
  tone: {
    type: String,
    default: 'plain'
  },
  compact: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <section :id="id" class="section-shell" :class="[`section-shell--${tone}`, { 'section-shell--compact': compact }]">
    <div class="section-shell__inner">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section-shell {
  position: relative;
  padding: clamp(86px, 10vw, 136px) 24px;
}

.section-shell--compact {
  padding-top: clamp(62px, 8vw, 96px);
  padding-bottom: clamp(62px, 8vw, 96px);
}

.section-shell--soft {
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--bg-soft), transparent 18%), transparent);
}

.section-shell__inner {
  width: min(1180px, 100%);
  margin: 0 auto;
}

@media (max-width: 640px) {
  .section-shell {
    padding-right: 16px;
    padding-left: 16px;
  }
}
</style>
