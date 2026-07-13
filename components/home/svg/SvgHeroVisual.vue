<template>
  <svg class="hero-system" viewBox="0 0 500 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <marker id="hero-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0l10 5-10 5Z" fill="currentColor" />
      </marker>
    </defs>

    <g class="hero-system__grid">
      <path d="M32 70H468M32 150H468M32 230H468M32 310H468M32 390H468M86 30V480M168 30V480M250 30V480M332 30V480M414 30V480" />
    </g>

    <g class="hero-system__input">
      <rect x="44" y="92" width="142" height="70" rx="10" />
      <circle cx="70" cy="117" r="7" />
      <path d="M92 116h66M70 139h88" />
      <text x="70" y="188">AI 学习</text>

      <rect x="44" y="286" width="142" height="70" rx="10" />
      <path d="M70 330l24-25 22 21 20-16 22 20" />
      <text x="70" y="382">设计实践</text>
    </g>

    <g class="hero-system__flow">
      <path d="M186 127c52 0 48 94 96 105" marker-end="url(#hero-arrow)" />
      <path d="M186 321c52 0 48-65 96-77" marker-end="url(#hero-arrow)" />
      <path d="M350 243h62" marker-end="url(#hero-arrow)" />
    </g>

    <g class="hero-system__core">
      <circle cx="316" cy="243" r="72" />
      <circle cx="316" cy="243" r="50" />
      <circle cx="316" cy="243" r="10" />
      <text x="316" y="232" text-anchor="middle">判断</text>
      <text x="316" y="258" text-anchor="middle">验证</text>
    </g>

    <g class="hero-system__outputs">
      <rect x="414" y="121" width="72" height="44" rx="8" />
      <rect x="414" y="221" width="72" height="44" rx="8" />
      <rect x="414" y="321" width="72" height="44" rx="8" />
      <text x="450" y="148" text-anchor="middle">方法</text>
      <text x="450" y="248" text-anchor="middle">工作流</text>
      <text x="450" y="348" text-anchor="middle">资源</text>
      <path d="M412 243c-16-58 2-100 2-100M412 243c-16 58 2 100 2 100" />
    </g>

    <g class="hero-system__loop">
      <path d="M450 365v70H116c-40 0-54-28-54-62" marker-end="url(#hero-arrow)" />
      <text x="258" y="459" text-anchor="middle">复用 · 反馈 · 再沉淀</text>
    </g>
  </svg>
</template>

<style scoped>
.hero-system {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  color: var(--brand-main);
}
.hero-system path,
.hero-system rect,
.hero-system circle {
  stroke: currentColor;
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}
.hero-system__grid { opacity: .16; }
.hero-system__grid path { stroke-width: 1; }
.hero-system text { fill: var(--text-main); font: 700 13px var(--font-sans); }
.hero-system__input circle,
.hero-system__core circle:last-of-type { fill: currentColor; }
.hero-system__core circle:first-of-type { stroke-width: 2.5; stroke-dasharray: 8 7; opacity: .72; transform-origin: 316px 243px; animation: system-ring 22s linear infinite; }
.hero-system__core circle:nth-of-type(2) { fill: color-mix(in srgb, var(--bg-card) 88%, transparent); stroke-width: 2.5; }
.hero-system__flow path,
.hero-system__loop path { stroke-width: 2.5; }
.hero-system__outputs rect { fill: var(--bg-card); stroke-width: 2.2; }
.hero-system__loop text { fill: var(--brand-main); font-size: 11px; letter-spacing: .12em; }
@keyframes system-ring { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .hero-system__core circle:first-of-type { animation: none; } }
</style>
