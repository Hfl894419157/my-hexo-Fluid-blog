import DefaultTheme from 'vitepress/theme'
import SiteLayout from '../../components/SiteLayout.vue'
import ImagePlaceholder from '../../components/ImagePlaceholder.vue'
import revealDirective from '../../components/revealDirective.js'
import './custom.css'

const managedArticlePattern = /^\/(?:portfolio|aigc|knowledge\/(?:learning-observation|methods|resources))\/[^/]+\/?$/
const copyTimers = new WeakMap()

const fallbackCopy = (text) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.append(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()
  return copied
}

const installManagedCodeCopy = () => {
  if (window.__managedCodeCopyInstalled) return
  window.__managedCodeCopyInstalled = true

  document.addEventListener('click', async (event) => {
    const button = event.target instanceof Element ? event.target.closest('.content-block--rich button.copy') : null
    if (!button) return
    const code = button.parentElement?.querySelector('pre code')
    if (!code) return

    event.preventDefault()
    event.stopImmediatePropagation()
    button.dataset.copyState = 'copying'
    const text = code.textContent || ''
    let copied = false
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable')
      await navigator.clipboard.writeText(text)
      copied = true
    } catch {
      copied = fallbackCopy(text)
    }
    if (!copied) {
      button.dataset.copyState = 'failed'
      button.title = '自动复制失败，请选择代码后按 Ctrl+C'
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(code)
      selection?.removeAllRanges()
      selection?.addRange(range)
      return
    }

    button.dataset.copyState = 'copied'
    button.classList.add('copied')
    window.clearTimeout(copyTimers.get(button))
    copyTimers.set(button, window.setTimeout(() => {
      button.classList.remove('copied')
      copyTimers.delete(button)
    }, 2000))
  }, { capture: true })
}

const installGeneratedImageFallback = () => {
  if (window.__generatedImageFallbackInstalled) return
  window.__generatedImageFallbackInstalled = true

  document.addEventListener('error', (event) => {
    const image = event.target instanceof HTMLImageElement ? event.target : null
    const picture = image?.closest('picture.responsive-image--content')
    const fallbackSrc = image?.getAttribute('src') || ''
    if (!picture || !fallbackSrc || image.dataset.originFallbackApplied === 'true') return

    image.dataset.originFallbackApplied = 'true'
    picture.querySelectorAll('source').forEach((source) => source.remove())
    image.src = fallbackSrc
  }, true)
}

const prefetchDocument = (href) => {
  if (!href || document.head.querySelector(`link[data-site-prefetch="${CSS.escape(href)}"]`)) return
  const url = new URL(href, window.location.href)
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = url.href
  link.dataset.sitePrefetch = href
  link.fetchPriority = 'low'
  document.head.append(link)
}

const installIntentPrefetch = () => {
  if (window.__siteIntentPrefetchInstalled) return
  window.__siteIntentPrefetchInstalled = true

  const prefetchArticleFromEvent = (event) => {
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null
    if (!anchor) return
    const url = new URL(anchor.href, window.location.href)
    if (url.origin === window.location.origin && managedArticlePattern.test(url.pathname)) {
      prefetchDocument(url.pathname)
    }
  }

  document.addEventListener('pointerover', prefetchArticleFromEvent, { passive: true })
  document.addEventListener('focusin', prefetchArticleFromEvent)

  window.setTimeout(() => {
    if (!document.body.classList.contains('ai-lab-home')) return
    document.querySelectorAll('.site-header__nav a[href]').forEach((anchor) => {
      prefetchDocument(anchor.getAttribute('href'))
    })
  }, 2400)
}

const scheduleDeferredEnhancements = () => {
  const loadFonts = () => {
    if (document.querySelector('link[data-site-fonts]')) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/_generated/fonts/fonts.css'
    link.dataset.siteFonts = ''
    document.head.append(link)
  }
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadFonts, { timeout: 1800 })
  } else {
    window.setTimeout(loadFonts, 450)
  }
  installIntentPrefetch()
  installManagedCodeCopy()
  installGeneratedImageFallback()
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ImagePlaceholder', ImagePlaceholder)
    app.directive('reveal', revealDirective)
    if (typeof window !== 'undefined') {
      window.setTimeout(scheduleDeferredEnhancements, 0)
    }
  },
  Layout: SiteLayout
}
