<script setup>
import illustration from './assets/home-about-illustration.svg?raw'
</script>

<template>
  <div class="home-about-illustration" aria-hidden="true" v-html="illustration"></div>
</template>

<style scoped>
.home-about-illustration {
  width: 100%;
  color: var(--text-main);
}

.home-about-illustration :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.home-about-illustration :deep([fill="#231f20"]) { fill: var(--text-main); }
.home-about-illustration :deep([fill="#ff595e"]) { fill: var(--brand-main); }
.home-about-illustration :deep([fill="#d1d3d4"]) { fill: color-mix(in srgb, var(--text-muted) 48%, var(--bg-page)); }
.home-about-illustration :deep([fill="#e6e7e8"]) { fill: color-mix(in srgb, var(--border-strong) 44%, var(--bg-card)); }
.home-about-illustration :deep([fill="#ffffff"]) { fill: var(--bg-card); }
</style>
