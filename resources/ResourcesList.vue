<script setup>
import { publishedResources as toolsResources } from '../.shared/resourcesData.js'
</script>

<template>
  <div class="resource-library">
    <a v-for="(tool, index) in toolsResources" :key="tool.id" :href="tool.link" class="resource-item">
      <div class="resource-item__preview" aria-hidden="true">
        <div class="resource-item__topline">
          <span>{{ tool.category }}</span><strong>{{ String(index + 1).padStart(2, '0') }}</strong>
        </div>
        <h2>{{ tool.name }}</h2>
        <div class="resource-item__lines"><i></i><i></i><i></i><i></i></div>
        <div class="resource-item__footer"><span>{{ tool.accessType }}</span><span>{{ tool.verifiedAt }}</span></div>
      </div>
      <div class="resource-item__copy">
        <span>VERIFIED RESOURCE</span>
        <h3>{{ tool.name }}</h3>
        <p>{{ tool.desc }}</p>
        <dl>
          <div><dt>访问方式</dt><dd>{{ tool.accessType }}</dd></div>
          <div><dt>授权</dt><dd>{{ tool.license }}</dd></div>
        </dl>
        <strong>查看内容预览 →</strong>
      </div>
    </a>
  </div>
</template>

<style scoped>
.resource-library { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 46px; }
.resource-item { display: grid; overflow: hidden; border: 1px solid var(--border-soft); border-radius: var(--radius-card); color: inherit; text-decoration: none; background: var(--bg-card); }
.resource-item__preview { display: grid; min-height: 340px; align-content: start; padding: clamp(26px, 4vw, 44px); border-bottom: 1px solid var(--border-soft); background: linear-gradient(145deg, var(--bg-page), var(--bg-soft)); }
.resource-item__topline, .resource-item__footer { display: flex; justify-content: space-between; color: var(--text-muted); font-size: var(--text-label); letter-spacing: 0.08em; }
.resource-item__topline strong { color: var(--brand-main); font-family: var(--font-display); font-size: var(--text-card-large); }
.resource-item__preview h2 { max-width: 14ch; margin: 52px 0 0 !important; color: var(--text-main); font-family: var(--font-display); font-size: clamp(30px, 4vw, 48px); font-weight: 600; line-height: 1.2; }
.resource-item__lines { display: grid; gap: 8px; margin-top: 30px; }
.resource-item__lines i { display: block; height: 5px; border-radius: 999px; background: var(--border-soft); }
.resource-item__lines i:nth-child(2) { width: 78%; }
.resource-item__lines i:nth-child(3) { width: 92%; }
.resource-item__lines i:nth-child(4) { width: 58%; }
.resource-item__footer { margin-top: auto; padding-top: 36px; }
.resource-item__copy { display: grid; padding: 28px; }
.resource-item__copy > span { color: var(--brand-cyan); font-size: var(--text-label); letter-spacing: 0.1em; }
h3 { margin: 12px 0 0 !important; color: var(--text-main); font-family: var(--font-display); font-size: var(--text-card-large); font-weight: 600; }
p { margin: 14px 0 0 !important; color: var(--text-sub); font-size: var(--text-small); line-height: 1.8; }
dl { display: grid; gap: 10px; margin: 24px 0 0; }
dl div { display: grid; grid-template-columns: 76px 1fr; gap: 12px; }
dt { color: var(--text-muted); font-size: var(--text-label); }
dd { margin: 0; color: var(--text-main); font-size: var(--text-label); line-height: 1.65; }
.resource-item__copy > strong { margin-top: 24px; color: var(--brand-main); font-size: var(--text-small); }

@media (max-width: 760px) { .resource-library { grid-template-columns: 1fr; } }
</style>
