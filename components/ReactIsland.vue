<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    required: true
  },
  tone: {
    type: String,
    default: 'default'
  },
  density: {
    type: String,
    default: 'medium'
  }
})

const host = ref(null)
let root = null

const mountReact = async () => {
  if (!host.value) return

  const [{ createElement }, { createRoot }, module] = await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('./react-bits/BitsEffects.jsx')
  ])

  if (!root) {
    root = createRoot(host.value)
  }

  root.render(createElement(module.default, {
    variant: props.variant,
    tone: props.tone,
    density: props.density
  }))
}

onMounted(mountReact)

watch(
  () => [props.variant, props.tone, props.density],
  () => mountReact()
)

onBeforeUnmount(() => {
  root?.unmount()
  root = null
})
</script>

<template>
  <div
    ref="host"
    class="react-island"
    :data-variant="variant"
    :data-tone="tone"
    :data-density="density"
  />
</template>

<style scoped>
.react-island {
  width: 100%;
  min-width: 0;
}
</style>
