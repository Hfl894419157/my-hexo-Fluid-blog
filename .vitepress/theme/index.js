import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import SiteHeader from '../../components/SiteHeader.vue'
import SiteFooter from '../../components/SiteFooter.vue'
import MediaFrame from '../../components/MediaFrame.vue'
import '@fontsource-variable/noto-serif-sc/wght.css'
import '@fontsource-variable/noto-sans-sc/wght.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MediaFrame', MediaFrame)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(SiteHeader),
      'layout-bottom': () => h(SiteFooter)
    })
  }
}
