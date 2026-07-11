<script setup>
import { publishedPortfolioWorks } from '../../.shared/portfolioData.js'
import BaseButton from '../BaseButton.vue'
import MediaFrame from '../MediaFrame.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'

const cases = publishedPortfolioWorks.filter((item) => item.featured).slice(0, 3)
</script>

<template>
  <SectionShell id="featured-cases" compact>
    <div class="section-row">
      <SectionHeader
        eyebrow="Selected Cases"
        title="先看结果，再理解它为什么成立"
        desc="每个案例都把目标、角色、关键判断与最终结果放在同一条证据链上。"
      />
      <BaseButton href="/portfolio/" variant="ghost">全部案例</BaseButton>
    </div>

    <div class="case-bento">
      <!-- Lead case (large) -->
      <a v-if="cases[0]" class="case-lead" :href="cases[0].link">
        <div class="case-lead__media">
          <MediaFrame :src="cases[0].cover" :alt="cases[0].alt" :caption="cases[0].caption" aspect="16 / 10" />
          <div class="case-lead__overlay">
            <span>{{ cases[0].category }}</span>
          </div>
        </div>
        <div class="case-lead__copy">
          <h3>{{ cases[0].title }}</h3>
          <p>{{ cases[0].desc }}</p>
          <strong>查看完整案例 →</strong>
        </div>
      </a>

      <!-- Side stack -->
      <div class="case-stack">
        <!-- Secondary case -->
        <a v-if="cases[1]" class="case-item" :href="cases[1].link">
          <div class="case-item__thumb">
            <img :src="cases[1].cover" :alt="cases[1].alt" loading="lazy" />
          </div>
          <div class="case-item__copy">
            <span>{{ cases[1].category }}</span>
            <h3>{{ cases[1].title }}</h3>
            <p>{{ cases[1].desc }}</p>
          </div>
        </a>

        <!-- Method card -->
        <a class="case-method" href="/aigc/commercial-visual-system">
          <div class="case-method__top">
            <span>METHOD BEHIND THE WORK</span>
            <div class="case-method__dots" aria-hidden="true">
              <i v-for="n in 9" :key="n"></i>
            </div>
          </div>
          <strong>从需求到交付，查看案例背后的五阶段工作流</strong>
          <em>进入工作流 →</em>
        </a>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.section-row {
  display: flex;
  gap: 30px;
  align-items: flex-end;
  justify-content: space-between;
}

/* ─── Bento layout ───────────────────────────────────── */
.case-bento {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.6fr);
  gap: 20px;
  margin-top: 36px;
}

/* ─── Lead case ──────────────────────────────────────── */
.case-lead {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: var(--bg-card);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.case-lead:hover {
  border-color: color-mix(in srgb, var(--brand-main) 35%, transparent);
  box-shadow: 0 8px 40px color-mix(in srgb, var(--brand-main) 10%, transparent);
}

.case-lead__media {
  position: relative;
  overflow: hidden;
}

.case-lead :deep(.media-frame__viewport) {
  border: 0;
  border-radius: 0;
  box-shadow: none;
  transition: transform 0.5s ease;
}

.case-lead:hover :deep(.media-frame__viewport img) {
  transform: scale(1.03);
}

.case-lead :deep(figcaption) { display: none; }

.case-lead__overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
}

.case-lead__overlay span {
  padding: 6px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg-card) 80%, transparent);
  backdrop-filter: blur(8px);
  color: var(--brand-cyan);
  font-size: var(--text-label);
  letter-spacing: 0.1em;
  border: 1px solid var(--border-soft);
}

.case-lead__copy {
  padding: clamp(22px, 3.5vw, 40px);
}

h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(22px, 2.2vw, 32px);
  font-weight: 600;
  line-height: 1.25;
}

p {
  margin: 12px 0 0;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.8;
}

.case-lead__copy strong {
  display: inline-block;
  margin-top: 20px;
  color: var(--brand-main);
  font-size: var(--text-small);
  transition: letter-spacing 0.2s;
}

.case-lead:hover .case-lead__copy strong {
  letter-spacing: 0.04em;
}

/* ─── Side stack ─────────────────────────────────────── */
.case-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Secondary case item */
.case-item {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: var(--bg-card);
  transition: border-color 0.25s, transform 0.25s;
  flex: 1;
}

.case-item:hover {
  border-color: color-mix(in srgb, var(--brand-main) 35%, transparent);
  transform: translateY(-2px);
}

.case-item__thumb {
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.case-item__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--image-treatment);
  transition: transform 0.45s ease;
}

.case-item:hover .case-item__thumb img { transform: scale(1.04); }

.case-item__copy {
  padding: 20px 22px 22px;
}

.case-item__copy > span {
  display: block;
  color: var(--brand-cyan);
  font-size: var(--text-label);
  letter-spacing: 0.1em;
}

.case-item__copy h3 {
  font-size: var(--text-card-title);
  margin-top: 8px;
}

.case-item__copy p {
  font-size: var(--text-caption);
  margin-top: 8px;
}

/* Method card */
.case-method {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 180px;
  padding: 26px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: linear-gradient(145deg,
    color-mix(in srgb, var(--brand-main) 6%, var(--bg-soft)),
    var(--bg-card));
  color: inherit;
  text-decoration: none;
  transition: border-color 0.25s, transform 0.25s;
}

.case-method:hover {
  border-color: color-mix(in srgb, var(--brand-main) 40%, transparent);
  transform: translateY(-2px);
}

.case-method__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.case-method__top > span {
  color: var(--brand-cyan);
  font-size: var(--text-micro);
  letter-spacing: 0.14em;
}

.case-method__dots {
  display: grid;
  grid-template-columns: repeat(3, 6px);
  gap: 5px;
}

.case-method__dots i {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--brand-main);
  opacity: 0.25;
}

.case-method strong {
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-large);
  line-height: 1.45;
  flex: 1;
}

.case-method em {
  color: var(--brand-main);
  font-size: var(--text-small);
  font-style: normal;
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 960px) {
  .case-bento { grid-template-columns: 1fr; }
  .case-stack { display: grid; grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .section-row { display: grid; align-items: flex-start; }
  .case-stack { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .case-lead, .case-item, .case-method { transition: none; }
  .case-lead:hover, .case-item:hover, .case-method:hover { transform: none; }
}
</style>
