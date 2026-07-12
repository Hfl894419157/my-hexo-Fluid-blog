<script setup>
import { publishedPortfolioWorks } from '../../.shared/portfolioData.js'
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import MediaFrame from '../MediaFrame.vue'

const cases = publishedPortfolioWorks.filter((item) => item.featured).slice(0, 2)
</script>

<template>
  <SectionShell id="featured-cases" compact>
    <div class="section-row">
      <SectionHeader
        title="先看结果，再理解它为什么成立"
        desc="每个案例都把目标、角色、关键判断与最终结果放在同一条证据链上。"
      />
      <BaseButton href="/portfolio/" variant="ghost">全部案例</BaseButton>
    </div>

    <div class="case-list">
      <article v-for="(item, index) in cases" :key="item.id" class="case-row" :class="{ 'case-row--reverse': index % 2 }">
        <a class="case-row__media" :href="item.link" :aria-label="`查看案例：${item.title}`">
          <MediaFrame :src="item.cover" :alt="item.alt || item.title" aspect="1.6 / 1" />
        </a>
        <div class="case-row__copy">
          <span class="case-row__category">{{ item.category }}</span>
          <h3>{{ item.title }}</h3>
          
          <div class="case-row__details">
            <p><strong>挑战：</strong>{{ item.challenge }}</p>
            <p><strong>角色：</strong>{{ item.role }}</p>
            <p><strong>核心交付：</strong>{{ item.deliverables }}</p>
          </div>
          
          <a class="case-row__link" :href="item.link">查看完整案例 <span aria-hidden="true">→</span></a>
        </div>
      </article>
    </div>
  </SectionShell>
</template>

<style scoped>
.section-row {
  display: grid;
  justify-items: center;
  gap: 24px;
  text-align: center;
}

.case-list {
  display: grid;
  gap: 24px;
  margin-top: 44px;
}

.case-row {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(320px, 5fr);
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  box-shadow: 0 16px 48px color-mix(in srgb, var(--text-main) 5%, transparent);
}

.case-row--reverse {
  grid-template-columns: minmax(320px, 5fr) minmax(0, 7fr);
}

.case-row--reverse .case-row__media { order: 2; }
.case-row--reverse .case-row__copy { order: 1; }

.case-row__media {
  display: block;
  min-width: 0;
  overflow: hidden;
  background: var(--bg-soft);
}

.case-row__media :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 390px;
  transition: transform 0.5s ease;
}

.case-row__media:hover :deep(svg) { transform: scale(1.018); }

.case-row__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(34px, 5vw, 66px);
}

.case-row__category {
  color: var(--brand-main);
  font-size: var(--text-label);
  letter-spacing: 0.12em;
}

h3 {
  margin: 14px 0 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(26px, 2.6vw, 38px);
  font-weight: 600;
  line-height: 1.3;
}

.case-row__details {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.case-row__details p {
  margin: 0 !important;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.6;
}

.case-row__details strong {
  color: var(--text-main);
  font-weight: 600;
}

.case-row__link {
  width: fit-content;
  margin-top: 28px;
  color: var(--brand-main);
  font-size: var(--text-small);
  font-weight: 600;
  text-decoration: none;
}

.case-row__link span { display: inline-block; margin-left: 5px; transition: transform 0.2s ease; }
.case-row__link:hover span { transform: translateX(4px); }

@media (max-width: 820px) {
  .case-row,
  .case-row--reverse { grid-template-columns: 1fr; }
  .case-row--reverse .case-row__media { order: 1; }
  .case-row--reverse .case-row__copy { order: 2; }
  .case-row__media :deep(svg) { min-height: 0; aspect-ratio: 16 / 10; }
}

@media (max-width: 520px) {
  .case-list { margin-top: 34px; }
  .case-row__copy { padding: 28px 24px 32px; }
}

@media (prefers-reduced-motion: reduce) {
  .case-row__media :deep(svg),
  .case-row__link span { transition: none; }
  .case-row__media:hover :deep(svg),
  .case-row__link:hover span { transform: none; }
}
</style>
