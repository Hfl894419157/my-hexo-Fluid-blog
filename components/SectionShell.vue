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
  padding: clamp(56px, 7vw, 92px) 24px;
}

.section-shell--compact {
  padding-top: clamp(42px, 6vw, 68px);
  padding-bottom: clamp(42px, 6vw, 68px);
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
