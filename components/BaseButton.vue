<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  href: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  as: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button'
  }
})

const isExternal = computed(() => /^(https?:|mailto:|tel:)/.test(props.href))
const resolvedHref = computed(() => {
  if (!props.href) return undefined
  return isExternal.value ? props.href : withBase(props.href)
})
const tagName = computed(() => props.as || (props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tagName"
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`]"
    :href="tagName === 'a' ? resolvedHref : undefined"
    :type="tagName === 'button' ? type : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-control);
  font-size: var(--font-small);
  font-weight: 760;
  line-height: 1;
  letter-spacing: 0;
  text-decoration: none !important;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 0.22s ease, box-shadow 0.22s ease, color 0.22s ease, background 0.22s ease, transform 0.22s ease;
}

.base-button:hover {
  transform: translateY(-2px);
}

.base-button--md {
  padding: 0 22px;
}

.base-button--sm {
  min-height: 36px;
  padding: 0 16px;
  font-size: 13px;
}

.base-button--primary {
  color: var(--button-primary-text);
  background: linear-gradient(135deg, var(--brand-main), var(--brand-second));
  box-shadow: 0 18px 58px var(--glow-blue);
}

.base-button--secondary {
  color: var(--button-secondary-text);
  background: color-mix(in srgb, var(--bg-card), transparent 14%);
  box-shadow: 0 16px 48px var(--glow-purple);
}

.base-button--ghost {
  color: var(--text-main);
  background: transparent;
}

.base-button--text {
  min-height: auto;
  padding: 0;
  border-color: transparent;
  color: var(--brand-main);
  background: transparent;
  box-shadow: none;
}

.base-button--primary:hover,
.base-button--secondary:hover,
.base-button--ghost:hover {
  border-color: var(--border-strong);
}
</style>
