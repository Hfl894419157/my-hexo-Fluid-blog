<script setup>
import { allResources as toolsResources } from '../.shared/resourcesData.js'
import KnowledgePageHero from '../components/KnowledgePageHero.vue'
</script>

<template>
  <div class="resources-section">
    <KnowledgePageHero
      title="资源库"
      description="这里只收录来源明确、访问有效并能够进入真实项目的资源。每项内容都会说明适用场景、授权边界和最后验证时间。"
      variant="tools"
    />

    <div class="resource-grid">
      <a
        v-for="(tool, index) in toolsResources"
        :key="tool.id"
        class="resource-card"
        :href="tool.link"
        v-reveal="{ delay: (index % 3) * 80, y: 32 }"
      >
        <!-- Preview panel (top) -->
        <div class="resource-card__preview">
          <div class="resource-card__toprow">
            <span class="resource-card__cat">{{ tool.category }}</span>
            <strong class="resource-card__num">{{ String(index + 1).padStart(2, '0') }}</strong>
          </div>

          <h2>{{ tool.name }}</h2>

          <!-- Mock content lines -->
          <div class="resource-card__lines" aria-hidden="true">
            <i></i><i></i><i></i><i></i>
          </div>

          <div class="resource-card__preview-footer">
            <span v-if="tool.accessType">{{ tool.accessType }}</span>
            <span v-else>整理中</span>
            <span v-if="tool.verifiedAt">{{ tool.verifiedAt }}</span>
          </div>

        </div>

        <!-- Info panel (bottom) -->
        <div class="resource-card__info">
          <span class="resource-card__label">
            VERIFIED RESOURCE
          </span>
          <h3>{{ tool.name }}</h3>
          <p>{{ tool.desc }}</p>
          <dl>
            <div><dt>访问</dt><dd>{{ tool.accessType }}</dd></div>
            <div><dt>授权</dt><dd>{{ tool.license }}</dd></div>
          </dl>
          <strong class="resource-card__cta">查看内容预览 →</strong>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.resources-section {
  width: min(1080px, 100%);
  margin: 0 auto;
  padding: 44px 0 24px;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 42px;
}

.resource-card {
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

.resource-card:hover {
  border-color: color-mix(in srgb, var(--brand-main) 40%, transparent);
  box-shadow: 0 8px 36px color-mix(in srgb, var(--brand-main) 10%, transparent);
  transform: translateY(-3px);
}

/* Preview panel */
.resource-card__preview {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 220px;
  padding: 22px 22px 20px;
  border-bottom: 1px solid var(--border-soft);
  background: linear-gradient(145deg, var(--bg-soft), var(--bg-page));
}

.resource-card__toprow {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.resource-card__cat {
  color: var(--brand-cyan);
  font-size: var(--text-micro);
  letter-spacing: 0.1em;
}

.resource-card__num {
  color: var(--brand-main);
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  opacity: 0.25;
  line-height: 1;
}

h2 {
  max-width: 14ch;
  margin: 24px 0 0 !important;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(20px, 2vw, 28px);
  font-weight: 600;
  line-height: 1.2;
}

/* Mock lines */
.resource-card__lines {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 18px;
}

.resource-card__lines i {
  display: block;
  height: 4px;
  border-radius: 999px;
  background: var(--border-soft);
}

.resource-card__lines i:nth-child(2) { width: 78%; }
.resource-card__lines i:nth-child(3) { width: 92%; }
.resource-card__lines i:nth-child(4) { width: 55%; }

/* Preview footer */
.resource-card__preview-footer {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 18px;
  color: var(--text-muted);
  font-size: var(--text-micro);
  letter-spacing: 0.06em;
}

/* Info panel */
.resource-card__info {
  display: flex;
  flex-direction: column;
  padding: 20px 22px 22px;
  flex: 1;
}

.resource-card__label {
  color: var(--brand-cyan);
  font-size: var(--text-micro);
  letter-spacing: 0.12em;
}

h3 {
  margin: 10px 0 0 !important;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  font-weight: 600;
}

p {
  margin: 10px 0 0 !important;
  color: var(--text-sub);
  font-size: var(--text-label);
  line-height: 1.8;
  flex: 1;
}

dl {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0 0;
}

dl > div {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 10px;
}

dt {
  color: var(--text-muted);
  font-size: var(--text-micro);
}

dd {
  margin: 0;
  color: var(--text-main);
  font-size: var(--text-label);
  line-height: 1.6;
}

.resource-card__cta {
  display: inline-block;
  margin-top: 18px;
  color: var(--brand-main);
  font-size: var(--text-small);
}

@media (max-width: 960px) { .resource-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .resource-grid { grid-template-columns: 1fr; } }

@media (prefers-reduced-motion: reduce) {
  .resource-card { transition: none; }
  .resource-card:hover { transform: none; }
}
</style>
