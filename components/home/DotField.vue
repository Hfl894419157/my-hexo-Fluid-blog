<!--
  DotField — 交互式点阵背景
  移植自 React Bits <DotField />（JavaScript + CSS 变体），动画逻辑与上游一一对应，
  便于日后对照上游 diff 升级。

  主题适配（与 React 版唯一的差异点）：
  - gradientFrom / gradientTo / glowColor 三个颜色 prop 默认为 null，
    表示自动读取 .vitepress/theme/custom.css 中的 CSS 变量：
      --dotfield-from / --dotfield-to / --dotfield-glow
    亮色（:root）与暗色（html.dark）各有一套，VitePress 切换主题时自动重读。
  - 显式传入 prop 可覆盖主题变量（例如在非首页场景自定义配色）。

  使用示例（定位交给包装层，避免组件内外 position 样式相互覆盖）：
    <div style="position: absolute; inset: 0; pointer-events: none;">
      <DotField
        :dot-radius="2.4"
        :dot-spacing="18"
        :bulge-strength="82"
        :glow-radius="160"
        :cursor-radius="550"
      />
    </div>
-->
<script>
// SSR 安全的递增 id（避免 Math.random 造成 hydration 不一致）
let dotFieldInstance = 0
</script>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  dotRadius: { type: Number, default: 1.5 },
  dotSpacing: { type: Number, default: 14 },
  cursorRadius: { type: Number, default: 500 },
  cursorForce: { type: Number, default: 0.1 },
  bulgeOnly: { type: Boolean, default: true },
  bulgeStrength: { type: Number, default: 67 },
  glowRadius: { type: Number, default: 160 },
  sparkle: { type: Boolean, default: false },
  waveAmplitude: { type: Number, default: 0 },
  gradientFrom: { type: String, default: null },
  gradientTo: { type: String, default: null },
  glowColor: { type: String, default: null },
})

defineOptions({ inheritAttrs: false })

const TWO_PI = Math.PI * 2

// ─── 主题颜色解析 ──────────────────────────────────────
const THEME_VARS = {
  gradientFrom: '--dotfield-from',
  gradientTo: '--dotfield-to',
  glowColor: '--dotfield-glow',
}

// 与 custom.css :root 保持一致的兜底值（CSS 变量缺失时使用）
const FALLBACK_COLORS = {
  gradientFrom: 'rgba(138, 79, 45, 0.55)',
  gradientTo: 'rgba(168, 108, 69, 0.35)',
  glowColor: 'rgba(168, 108, 69, 0.08)',
}

const { isDark } = useData()
const resolvedColors = ref({ ...FALLBACK_COLORS })

function resolveThemeColors() {
  const styles = getComputedStyle(document.documentElement)
  const next = {}
  for (const key of Object.keys(THEME_VARS)) {
    next[key] = props[key] || styles.getPropertyValue(THEME_VARS[key]).trim() || FALLBACK_COLORS[key]
  }
  resolvedColors.value = next
}

// ─── 画布与交互状态 ────────────────────────────────────
const canvasRef = ref(null)
const glowRef = ref(null)
const glowId = `dot-field-glow-${++dotFieldInstance}`

const dotsRef = ref([])
const mouseRef = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 }
const sizeRef = { w: 0, h: 0, offsetX: 0, offsetY: 0 }
const glowOpacity = { current: 0 }
const engagement = { current: 0 }
let rafId = null
let rebuildDots = null
let cleanupEffect = null

onMounted(() => {
  const canvas = canvasRef.value
  const glowEl = glowRef.value
  const container = canvas?.parentElement
  if (!canvas || !container) return

  resolveThemeColors()

  const ctx = canvas.getContext('2d', { alpha: true })
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let resizeTimer
  let resizeObserver

  function resize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(doResize, 100)
  }

  function doResize() {
    const rect = container.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    if (w <= 0 || h <= 0) return

    canvas.width = Math.max(1, Math.round(w * dpr))
    canvas.height = Math.max(1, Math.round(h * dpr))
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    sizeRef.w = w
    sizeRef.h = h
    sizeRef.offsetX = rect.left + window.scrollX
    sizeRef.offsetY = rect.top + window.scrollY

    buildDots(w, h)
  }

  function buildDots(w, h) {
    const step = props.dotRadius + props.dotSpacing
    const cols = Math.floor(w / step)
    const rows = Math.floor(h / step)
    const padX = (w % step) / 2
    const padY = (h % step) / 2
    const dots = new Array(rows * cols)
    let idx = 0

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const ax = padX + col * step + step / 2
        const ay = padY + row * step + step / 2
        dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay }
      }
    }
    dotsRef.value = dots
  }

  function onMouseMove(e) {
    mouseRef.x = e.pageX - sizeRef.offsetX
    mouseRef.y = e.pageY - sizeRef.offsetY
  }

  function updateMouseSpeed() {
    const m = mouseRef
    const dx = m.prevX - m.x
    const dy = m.prevY - m.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    m.speed += (dist - m.speed) * 0.5
    if (m.speed < 0.001) m.speed = 0
    m.prevX = m.x
    m.prevY = m.y
  }

  // 减少动态偏好：不监听鼠标，只静态绘制一帧
  const speedInterval = reduceMotion ? null : setInterval(updateMouseSpeed, 20)

  let frameCount = 0

  function tick() {
    frameCount++
    const dots = dotsRef.value
    const m = mouseRef
    const { w, h } = sizeRef
    const colors = resolvedColors.value
    const len = dots.length
    const t = frameCount * 0.02

    const targetEngagement = Math.min(m.speed / 5, 1)
    engagement.current += (targetEngagement - engagement.current) * 0.06
    if (engagement.current < 0.001) engagement.current = 0
    const eng = engagement.current

    glowOpacity.current += (eng - glowOpacity.current) * 0.08

    if (glowEl) {
      glowEl.setAttribute('cx', m.x)
      glowEl.setAttribute('cy', m.y)
      glowEl.style.opacity = glowOpacity.current
    }

    ctx.clearRect(0, 0, w, h)

    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, colors.gradientFrom)
    grad.addColorStop(1, colors.gradientTo)
    ctx.fillStyle = grad

    const cr = props.cursorRadius
    const crSq = cr * cr
    const rad = props.dotRadius / 2
    const isBulge = props.bulgeOnly

    ctx.beginPath()

    for (let i = 0; i < len; i++) {
      const d = dots[i]
      const dx = m.x - d.ax
      const dy = m.y - d.ay
      const distSq = dx * dx + dy * dy

      if (distSq < crSq && eng > 0.01) {
        const dist = Math.sqrt(distSq)
        if (isBulge) {
          const k = 1 - dist / cr
          const push = k * k * props.bulgeStrength * eng
          const angle = Math.atan2(dy, dx)
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15
        } else {
          const angle = Math.atan2(dy, dx)
          const move = (500 / dist) * (m.speed * props.cursorForce)
          d.vx += Math.cos(angle) * -move
          d.vy += Math.sin(angle) * -move
        }
      } else if (isBulge) {
        d.sx += (d.ax - d.sx) * 0.1
        d.sy += (d.ay - d.sy) * 0.1
      }

      if (!isBulge) {
        d.vx *= 0.9
        d.vy *= 0.9
        d.x = d.ax + d.vx
        d.y = d.ay + d.vy
        d.sx += (d.x - d.sx) * 0.1
        d.sy += (d.y - d.sy) * 0.1
      }

      let drawX = d.sx
      let drawY = d.sy
      if (props.waveAmplitude > 0) {
        drawY += Math.sin(d.ax * 0.03 + t) * props.waveAmplitude
        drawX += Math.cos(d.ay * 0.03 + t * 0.7) * props.waveAmplitude * 0.5
      }

      if (props.sparkle) {
        const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0
        if ((hash % 100) < 3) {
          ctx.moveTo(drawX + rad * 1.8, drawY)
          ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI)
        } else {
          ctx.moveTo(drawX + rad, drawY)
          ctx.arc(drawX, drawY, rad, 0, TWO_PI)
        }
      } else {
        ctx.moveTo(drawX + rad, drawY)
        ctx.arc(drawX, drawY, rad, 0, TWO_PI)
      }
    }

    ctx.fill()

    if (!reduceMotion) {
      rafId = requestAnimationFrame(tick)
    }
  }

  doResize()
  window.addEventListener('resize', resize)
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
  }
  if (!reduceMotion) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
  }
  rafId = requestAnimationFrame(tick)

  rebuildDots = () => {
    const { w, h } = sizeRef
    if (w > 0 && h > 0) buildDots(w, h)
  }

  cleanupEffect = () => {
    cancelAnimationFrame(rafId)
    if (speedInterval) clearInterval(speedInterval)
    clearTimeout(resizeTimer)
    resizeObserver?.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouseMove)
  }
})

onBeforeUnmount(() => {
  cleanupEffect?.()
})

// 网格密度变化时重建点阵
watch(() => [props.dotRadius, props.dotSpacing], () => rebuildDots?.())

// 主题切换或颜色 prop 覆盖时重新解析颜色
watch([isDark, () => props.gradientFrom, () => props.gradientTo, () => props.glowColor], () => {
  if (typeof window !== 'undefined') resolveThemeColors()
})
</script>

<template>
  <div class="dot-field-container" v-bind="$attrs">
    <canvas
      ref="canvasRef"
      style="position: absolute; inset: 0; width: 100%; height: 100%;"
    />
    <svg
      style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;"
    >
      <defs>
        <!-- 两端同一颜色、仅淡出透明度，避免插值出灰黑色（transparent = 透明黑） -->
        <radialGradient :id="glowId">
          <stop offset="0%" :stop-color="resolvedColors.glowColor" />
          <stop offset="100%" :stop-color="resolvedColors.glowColor" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle
        ref="glowRef"
        cx="-9999"
        cy="-9999"
        :r="glowRadius"
        :fill="`url(#${glowId})`"
        style="opacity: 0; will-change: opacity;"
      />
    </svg>
  </div>
</template>

<style scoped>
.dot-field-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
