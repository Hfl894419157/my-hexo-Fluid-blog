<script setup>
import { onMounted, onUnmounted } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomeHero from './components/home/HomeHero.vue'
import HomeCapabilityGrid from './components/home/HomeCapabilityGrid.vue'
import HomeFeaturedCases from './components/home/HomeFeaturedCases.vue'
import HomeWorkflowSection from './components/home/HomeWorkflowSection.vue'
import HomeResourceSection from './components/home/HomeResourceSection.vue'
import HomeAboutSection from './components/home/HomeAboutSection.vue'
import HomeCTA from './components/home/HomeCTA.vue'

onMounted(() => {
  document.body.classList.add('ai-lab-home')
})

onUnmounted(() => {
  document.body.classList.remove('ai-lab-home')
})
</script>

<template>
  <main class="home-design">
    <SiteHeader />
    <HomeHero />
    <HomeCapabilityGrid />
    <HomeFeaturedCases />
    <HomeWorkflowSection />
    <HomeResourceSection />
    <HomeAboutSection />
    <HomeCTA />
    <SiteFooter />
  </main>
</template>

<style scoped>
.home-design {
  overflow-x: hidden;
  min-height: 100vh;
  color: var(--text-main);
  background:
    radial-gradient(circle at 50% 0%, var(--glow-blue), transparent 24%),
    linear-gradient(180deg, var(--bg-page) 0%, var(--bg-section) 48%, var(--bg-page) 100%);
  font-family: var(--font-site);
  letter-spacing: 0;
}
</style>
