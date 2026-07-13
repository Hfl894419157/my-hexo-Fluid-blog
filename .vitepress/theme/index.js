import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import SiteHeader from '../../components/SiteHeader.vue'
import SiteFooter from '../../components/SiteFooter.vue'
import FloatingActions from '../../components/FloatingActions.vue'
import MediaFrame from '../../components/MediaFrame.vue'
import revealDirective from '../../components/revealDirective.js'
import '@fontsource-variable/noto-serif-sc/wght.css'
import '@fontsource-variable/noto-sans-sc/wght.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MediaFrame', MediaFrame)
    app.directive('reveal', revealDirective)
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister()
        }
      })
      if ('caches' in window) {
        caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name)
          }
        })
      }
    }
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(SiteHeader),
      'layout-bottom': () => [h(SiteFooter), h(FloatingActions)]
    })
  }
}
