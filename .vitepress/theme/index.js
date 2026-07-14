import DefaultTheme from 'vitepress/theme'
import SiteLayout from '../../components/SiteLayout.vue'
import ImagePlaceholder from '../../components/ImagePlaceholder.vue'
import revealDirective from '../../components/revealDirective.js'
import '@fontsource-variable/noto-serif-sc/wght.css'
import '@fontsource-variable/noto-sans-sc/wght.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ImagePlaceholder', ImagePlaceholder)
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
  Layout: SiteLayout
}
