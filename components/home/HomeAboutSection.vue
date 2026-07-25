<script setup>
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import aboutPage from '../../.shared/content/aboutPage.json'

const homeAbout = aboutPage.home
const manifestos = (homeAbout.highlights || []).map((item) => ({
  metric: item.metric,
  title: item.title,
  desc: item.description
}))
</script>

<template>
  <SectionShell id="about" tone="soft">
    <div class="ab-layout" v-reveal="{ y: 24, repeat: true }">
      <div class="ab-copy">
        <SectionHeader
          align="left"
          :title="homeAbout.title"
          :desc="homeAbout.description"
        />
        <div class="ab-actions">
          <BaseButton href="/resume" variant="ghost">了解关于我</BaseButton>
        </div>
      </div>
      <div class="ab-manifestos">
        <article v-for="item in manifestos" :key="item.title" class="ab-manifestos__card">
          <strong>{{ item.metric }}</strong>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.ab-layout {
  display: grid;
  grid-template-columns: minmax(280px, .82fr) minmax(0, 1.5fr);
  gap: clamp(36px, 5vw, 72px);
  align-items: center;
}

.ab-copy {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.ab-copy :deep(.section-header) {
  width: 100%;
}

.ab-manifestos {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.ab-manifestos__card {
  min-height: 190px;
  padding: 26px 24px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
}

.ab-manifestos__card strong {
  color: var(--brand-main);
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1.2;
}

.ab-manifestos__card h3 {
  margin: 22px 0 0;
  color: var(--text-main);
  font-size: var(--text-body);
  font-weight: 600;
  line-height: 1.4;
}

.ab-manifestos__card p {
  margin: 8px 0 0;
  color: var(--text-sub);
  font-size: var(--text-label);
  line-height: 1.7;
}

.ab-actions {
  display: flex;
  justify-content: flex-start;
}

/* ─── 响应式 ─────────────────────────────────────── */
@media (max-width: 900px) {
  .ab-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .ab-manifestos {
    grid-template-columns: repeat(3, minmax(220px, 1fr));
    overflow-x: auto;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
  }

  .ab-manifestos__card { scroll-snap-align: start; }
}
</style>
