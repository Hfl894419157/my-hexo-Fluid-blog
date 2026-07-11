<script setup>
import { allAigcWorks as aigcWorks } from '../.shared/aigcData.js'
import MediaFrame from '../components/MediaFrame.vue'
</script>

<template>
  <div class="aigc-grid">
    <a
      v-for="(work, index) in aigcWorks"
      :key="work.id"
      class="aigc-card"
      :class="{ 'aigc-card--draft': work.status === 'draft', 'aigc-card--lead': index === 0 }"
      :href="work.status === 'published' ? work.link : undefined"
      :aria-disabled="work.status === 'draft'"
    >
      <!-- Media / placeholder -->
      <div class="aigc-card__media">
        <MediaFrame
          v-if="work.cover"
          :src="work.cover"
          :alt="work.alt || work.title"
          aspect="16 / 9"
        />
        <div v-else class="aigc-card__placeholder" aria-hidden="true">
          <svg viewBox="0 0 160 90" fill="none">
            <rect x="20" y="20" width="120" height="50" rx="4"
              stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.3"
              stroke-dasharray="5 4" fill="none"/>
            <circle cx="80" cy="45" r="12"
              stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35" fill="none"/>
            <line x1="80" y1="33" x2="80" y2="57" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.25"/>
            <line x1="68" y1="45" x2="92" y2="45" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.25"/>
          </svg>
        </div>
        <span v-if="work.status === 'draft'" class="aigc-card__badge">更新中</span>
        <span v-else class="aigc-card__badge aigc-card__badge--live">AI WORKFLOW</span>
      </div>

      <!-- Copy -->
      <div class="aigc-card__body">
        <span class="aigc-card__category">{{ work.category || '内容工作流' }}</span>
        <h2>{{ work.title }}</h2>
        <p v-if="work.desc">{{ work.desc }}</p>
        <strong v-if="work.status === 'published'" class="aigc-card__cta">查看完整工作流 →</strong>
        <strong v-else class="aigc-card__cta aigc-card__cta--pending">敬请期待</strong>
      </div>
    </a>
  </div>
</template>

<style scoped>
.aigc-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 46px;
}

.aigc-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  color: inherit;
  text-decoration: none;
  background: var(--bg-card);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.aigc-card:not(.aigc-card--draft):hover {
  border-color: color-mix(in srgb, var(--brand-main) 40%, transparent);
  box-shadow: 0 8px 36px color-mix(in srgb, var(--brand-main) 10%, transparent);
  transform: translateY(-3px);
}

.aigc-card--draft {
  cursor: default;
  opacity: 0.58;
}

/* Media */
.aigc-card__media {
  position: relative;
  overflow: hidden;
  background: var(--bg-soft);
  flex-shrink: 0;
}

.aigc-card__media :deep(.media-frame__viewport) {
  border: 0;
  border-radius: 0;
  box-shadow: none;
  transition: transform 0.4s ease;
}

.aigc-card:not(.aigc-card--draft):hover :deep(.media-frame__viewport img) {
  transform: scale(1.04);
}

.aigc-card__media :deep(figcaption) { display: none; }

.aigc-card__placeholder {
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-soft), var(--bg-page));
}

.aigc-card__placeholder svg {
  width: 50%;
  height: auto;
}

/* Badge */
.aigc-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: var(--text-micro);
  letter-spacing: 0.08em;
  border: 1px solid var(--border-soft);
  background: color-mix(in srgb, var(--bg-card) 82%, transparent);
  backdrop-filter: blur(6px);
  color: var(--text-muted);
}

.aigc-card__badge--live {
  color: var(--brand-cyan);
  border-color: color-mix(in srgb, var(--brand-main) 30%, transparent);
}

/* Body */
.aigc-card__body {
  display: flex;
  flex-direction: column;
  padding: 22px 22px 24px;
  flex: 1;
}

.aigc-card__category {
  color: var(--brand-cyan);
  font-size: var(--text-label);
  letter-spacing: 0.08em;
}

h2 {
  margin: 10px 0 0 !important;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(17px, 1.6vw, 22px);
  font-weight: 600;
  line-height: 1.3;
}

p {
  margin: 10px 0 0 !important;
  color: var(--text-sub);
  font-size: var(--text-label);
  line-height: 1.8;
  flex: 1;
}

.aigc-card__cta {
  display: inline-block;
  margin-top: 18px;
  color: var(--brand-main);
  font-size: var(--text-small);
}

.aigc-card__cta--pending {
  color: var(--text-muted) !important;
}

@media (max-width: 900px) { .aigc-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .aigc-grid { grid-template-columns: 1fr; } }

@media (prefers-reduced-motion: reduce) {
  .aigc-card { transition: none; }
  .aigc-card:not(.aigc-card--draft):hover { transform: none; }
}
</style>
