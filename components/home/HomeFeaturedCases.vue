<script setup>
import { publishedPortfolioWorks } from '../../.shared/portfolioData.js'
import BaseButton from '../BaseButton.vue'
import BaseCard from '../BaseCard.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const cases = publishedPortfolioWorks.filter((item) => item.featured).slice(0, 3)
</script>

<template>
  <SectionShell id="featured-cases" compact>
    <div class="section-row">
      <SectionHeader
        title="用真实案例验证方法"
        desc="不只展示最终画面，也说明目标、判断、过程与结果证据。"
      />
      <BaseButton href="/portfolio/" variant="ghost">全部案例</BaseButton>
    </div>

    <div class="case-grid">
      <BaseCard v-for="work in cases" :key="work.id" :href="work.link" :padded="false">
        <div v-if="work.img" class="case-card__image">
          <img :src="work.img" :alt="work.title" loading="lazy" />
        </div>
        <div v-else class="case-card__cover" aria-hidden="true">{{ work.titleEn }}</div>
        <div class="case-card__body">
          <span>{{ work.category }}</span>
          <h3>{{ work.title }}</h3>
          <p>{{ work.desc }}</p>
          <BaseButton as="span" variant="text">查看详情 →</BaseButton>
        </div>
      </BaseCard>
    </div>
  </SectionShell>
</template>

<style scoped>
.section-row {
  display: grid;
  gap: 16px;
  justify-items: center;
  text-align: center;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 28px;
}

.case-card__image {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-soft);
}

.case-card__cover {
  display: grid;
  aspect-ratio: 4 / 3;
  align-items: end;
  padding: 24px;
  color: var(--text-main);
  background: linear-gradient(135deg, var(--bg-soft), var(--bg-card));
  font-family: var(--font-title);
  font-size: 18px;
  line-height: 1.2;
}

.case-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.92) contrast(1.04);
  transition: transform 0.42s ease, filter 0.42s ease;
}

:deep(.base-card:hover) .case-card__image img {
  transform: scale(1.04);
  filter: saturate(1.04) contrast(1.06);
}

.case-card__body {
  padding: 24px;
}

span {
  color: var(--brand-cyan);
  font-size: 13px;
  font-weight: 740;
}

h3 {
  margin: 12px 0 0;
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: 24px;
  font-weight: 760;
  line-height: 1.22;
  letter-spacing: var(--title-letter-spacing);
}

p {
  margin: 12px 0 22px;
  color: var(--text-sub);
  font-size: var(--font-small);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .section-row {
    justify-items: center;
  }

  .case-grid {
    grid-template-columns: 1fr;
  }
}
</style>
