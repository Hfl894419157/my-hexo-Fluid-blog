// 全局滚动相交渐显指令 (IntersectionObserver 优雅封装)

// 定义全局的 Observer 实例单例，复用连接池以获得最高运行性能
let globalObserver = null
const repeatTargets = new WeakSet()

function getObserver() {
  if (typeof window === 'undefined') return null
  if (globalObserver) return globalObserver

  globalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // 当元素至少有 10% 的面积进入视口时触发
      if (entry.isIntersecting) {
        const el = entry.target
        // 激活 CSS 过渡
        el.classList.add('is-revealed')
        // 默认只播放一次；repeat 元素保留观察，以便重新进入视口时再次播放
        if (!repeatTargets.has(el)) {
          globalObserver.unobserve(el)
        }
      } else if (entry.intersectionRatio === 0 && repeatTargets.has(entry.target)) {
        // 仅在完全离开观察区后复位，避免停留在视口边缘时闪烁
        entry.target.classList.remove('is-revealed')
      }
    })
  }, {
    root: null, // 默认是视口
    threshold: [0, 0.12], // 约 12% 相交时进入，完全离开时复位
    rootMargin: '0px 0px -10% 0px' // 底端稍微提前一些触发，视觉过渡更加平滑自然
  })

  return globalObserver
}

export default {
  // 当元素在客户端被挂载时触发 (仅限浏览器端执行，完全避开 SSR 错误)
  mounted(el, binding) {
    if (typeof window === 'undefined') return

    // 1. 设置动效自定义 CSS 变量参数 (通过指令传参：v-reveal="{ delay: 100, y: 32 }")
    const config = binding.value || {}
    const delay = config.delay !== undefined ? config.delay : 0
    const y = config.y !== undefined ? config.y : 28
    const blur = config.blur !== undefined ? config.blur : 6
    const duration = config.duration !== undefined ? config.duration : 800
    const repeat = config.repeat === true

    el.style.setProperty('--reveal-delay', `${delay}ms`)
    el.style.setProperty('--reveal-y', `${y}px`)
    el.style.setProperty('--reveal-blur', `${blur}px`)
    el.style.setProperty('--reveal-duration', `${duration}ms`)

    // 2. 注入动画基础类（这一步只在 JS 加载后的客户端执行，保障了 No-JS 情况下的完美可见容灾）
    el.classList.add('reveal-item')
    if (repeat) repeatTargets.add(el)

    // 3. 支持Reduced Motion（系统级减弱动画）或者不支持 IntersectionObserver 的降级直显
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }

    // 4. 将元素加入观察列表
    const observer = getObserver()
    if (observer) {
      observer.observe(el)
    }
  },

  // 当元素卸载时，确保清除观察，防止内存泄露
  unmounted(el) {
    if (typeof window === 'undefined') return
    const observer = getObserver()
    if (observer) {
      observer.unobserve(el)
    }
  }
}
