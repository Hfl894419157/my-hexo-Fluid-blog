<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import BaseButton from './BaseButton.vue'

const isDark = ref(false)
let observer

const syncTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

const setTheme = (dark) => {
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  localStorage.setItem('vitepress-theme-appearance', dark ? 'dark' : 'light')
  syncTheme()
}

const toggleTheme = () => {
  setTheme(!isDark.value)
}

onMounted(() => {
  syncTheme()
  observer = new MutationObserver(syncTheme)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <BaseButton class="theme-toggle" type="button" variant="ghost" size="sm" :aria-pressed="isDark" aria-label="切换主题" @click="toggleTheme">
    <span class="theme-toggle__track">
      <span class="theme-toggle__thumb" />
    </span>
  </BaseButton>
</template>

<style scoped>
.theme-toggle {
  display: inline-grid;
  width: 44px;
  height: 36px;
  place-items: center;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  color: var(--text-main);
  background: color-mix(in srgb, var(--bg-card), transparent 12%);
  cursor: pointer;
}

.theme-toggle__track {
  position: relative;
  width: 24px;
  height: 14px;
  border-radius: 999px;
  background: var(--bg-soft);
}

.theme-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--brand-main), var(--brand-second));
  transition: transform 0.22s ease;
}

.theme-toggle[aria-pressed="true"] .theme-toggle__thumb {
  transform: translateX(10px);
}
</style>
