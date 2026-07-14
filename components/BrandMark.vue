<script setup>
defineProps({
  size: {
    type: Number,
    default: 22
  }
})
</script>

<template>
  <span
    class="brand-mark"
    :style="{ '--brand-mark-size': `${size}px` }"
    aria-hidden="true"
  />
</template>

<style scoped>
.brand-mark {
  display: inline-block;
  width: var(--brand-mark-size);
  height: calc(var(--brand-mark-size) * 1.12);
  flex: 0 0 auto;
  background: currentColor;
  -webkit-mask: url('/images/brand/liuli-mark.png') center / contain no-repeat;
  mask: url('/images/brand/liuli-mark.png') center / contain no-repeat;
}
</style>
