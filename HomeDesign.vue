<script setup>
import { onMounted, onUnmounted } from 'vue'
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
    <HomeHero />
    <HomeCapabilityGrid />
    <HomeFeaturedCases />
    <HomeWorkflowSection />
    <HomeResourceSection />
    <HomeAboutSection />
    <HomeCTA />
  </main>
</template>

<style scoped>
.home-design {
  overflow-x: hidden;
  min-height: 100vh;
  color: var(--text-main);
  background: var(--site-background);
  font-family: var(--font-site);
  letter-spacing: 0;
}
</style>
