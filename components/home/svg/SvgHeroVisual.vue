<template>
  <svg class="svg-hero" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <!-- 背景雷达极简网格 -->
      <pattern id="radar-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1" fill="var(--brand-main)" opacity="0.12"/>
      </pattern>
    </defs>

    <!-- 极简背景点阵 -->
    <rect width="520" height="520" fill="url(#radar-dots)" />

    <!-- 1. 十字准星与参考线 (工业线图感) -->
    <line x1="60" y1="260" x2="460" y2="260" stroke="var(--brand-main)" stroke-width="0.6" stroke-opacity="0.16" />
    <line x1="260" y1="60" x2="260" y2="460" stroke="var(--brand-main)" stroke-width="0.6" stroke-opacity="0.16" />

    <!-- 2. 外部细刻度环 (慢速顺时针旋转) -->
    <circle class="ring-exterior" cx="260" cy="260" r="200" 
      stroke="var(--brand-main)" stroke-width="0.8" stroke-opacity="0.18" 
      stroke-dasharray="6 8 2 8" />

    <!-- 3. 中部参考环 -->
    <circle cx="260" cy="260" r="150" 
      stroke="var(--brand-main)" stroke-width="0.8" stroke-opacity="0.14" />

    <!-- 4. 内部核心刻度圈 (慢速逆时针旋转) -->
    <circle class="ring-interior" cx="260" cy="260" r="90" 
      stroke="var(--brand-main)" stroke-width="0.8" stroke-opacity="0.22" 
      stroke-dasharray="20 15 4 15" />

    <circle cx="260" cy="260" r="45" 
      stroke="var(--brand-main)" stroke-width="0.6" stroke-opacity="0.18" />

    <!-- 5. 扫描线 (顺时针扫动细线) -->
    <line class="radar-scan" x1="260" y1="260" x2="366" y2="154" 
      stroke="var(--brand-main)" stroke-width="0.8" stroke-opacity="0.28" />

    <!-- 6. 五等分对称核心网状连接线 -->
    <polygon points="260,110 403,214 348,381 172,381 117,214" 
      stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.16" />

    <!-- 7. 五等分节点核心小圆点 -->
    <circle cx="260" cy="110" r="4" fill="var(--brand-main)" />
    <circle cx="403" cy="214" r="4" fill="var(--brand-main)" />
    <circle cx="348" cy="381" r="4" fill="var(--brand-main)" />
    <circle cx="172" cy="381" r="4" fill="var(--brand-main)" />
    <circle cx="117" cy="214" r="4" fill="var(--brand-main)" />

    <!-- 8. 引线与大字号扁平卡片组 -->
    <!-- 胶囊 1: 输入 BRIEF -->
    <g class="flat-tag" transform="translate(205, 30)">
      <rect width="110" height="26" rx="4" stroke="var(--brand-main)" stroke-width="0.8" stroke-opacity="0.32" fill="var(--bg-card)" />
      <text x="55" y="17" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="600" letter-spacing="1">输入 BRIEF</text>
      <!-- 连接到节点 (260, 110) -->
      <line x1="55" y1="26" x2="55" y2="80" stroke="var(--brand-main)" stroke-width="0.6" stroke-dasharray="3 3" stroke-opacity="0.22" />
    </g>

    <!-- 胶囊 2: 拆解 VARS -->
    <g class="flat-tag" transform="translate(415, 201)">
      <rect width="100" height="26" rx="4" stroke="var(--brand-main)" stroke-width="0.8" stroke-opacity="0.32" fill="var(--bg-card)" />
      <text x="50" y="17" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="600" letter-spacing="1">拆解 VARS</text>
      <!-- 连接到节点 (403, 214) -->
      <line x1="0" y1="13" x2="-12" y2="13" stroke="var(--brand-main)" stroke-width="0.6" stroke-dasharray="3 3" stroke-opacity="0.22" />
    </g>

    <!-- 胶囊 3: 生成 GEN -->
    <g class="flat-tag" transform="translate(345, 415)">
      <rect width="90" height="26" rx="4" stroke="var(--brand-main)" stroke-width="0.8" stroke-opacity="0.32" fill="var(--bg-card)" />
      <text x="45" y="17" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="600" letter-spacing="1">生成 GEN</text>
      <!-- 连接到节点 (348, 381) -->
      <line x1="45" y1="0" x2="3" y2="-34" stroke="var(--brand-main)" stroke-width="0.6" stroke-dasharray="3 3" stroke-opacity="0.22" />
    </g>

    <!-- 胶囊 4: 判断 JUDGE -->
    <g class="flat-tag" transform="translate(85, 415)">
      <rect width="90" height="26" rx="4" stroke="var(--brand-main)" stroke-width="0.8" stroke-opacity="0.32" fill="var(--bg-card)" />
      <text x="45" y="17" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="600" letter-spacing="1">判断 JUDGE</text>
      <!-- 连接到节点 (172, 381) -->
      <line x1="45" y1="0" x2="87" y2="-34" stroke="var(--brand-main)" stroke-width="0.6" stroke-dasharray="3 3" stroke-opacity="0.22" />
    </g>

    <!-- 胶囊 5: 沉淀 ASSETS -->
    <g class="flat-tag" transform="translate(5, 201)">
      <rect width="100" height="26" rx="4" stroke="var(--brand-main)" stroke-width="0.8" stroke-opacity="0.32" fill="var(--bg-card)" />
      <text x="50" y="17" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="600" letter-spacing="1">沉淀 ASSETS</text>
      <!-- 连接到节点 (117, 214) -->
      <line x1="100" y1="13" x2="112" y2="13" stroke="var(--brand-main)" stroke-width="0.6" stroke-dasharray="3 3" stroke-opacity="0.22" />
    </g>

    <!-- 9. 核心决策同心枢 -->
    <circle cx="260" cy="260" r="14" fill="var(--bg-card)" stroke="var(--brand-main)" stroke-width="1.2" stroke-opacity="0.4" />
    <circle cx="260" cy="260" r="4" fill="var(--brand-main)" />
  </svg>
</template>

<style scoped>
.svg-hero {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* 外环刻度顺时针慢速旋转 */
.ring-exterior {
  transform-origin: 260px 260px;
  animation: rotate-cw 50s linear infinite;
}

/* 内环刻度逆时针慢速旋转 */
.ring-interior {
  transform-origin: 260px 260px;
  animation: rotate-ccw 35s linear infinite;
}

/* 扫描细线顺时针扫动 */
.radar-scan {
  transform-origin: 260px 260px;
  animation: rotate-cw 12s linear infinite;
}

@keyframes rotate-cw {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes rotate-ccw {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .ring-exterior, .ring-interior, .radar-scan {
    animation: none;
  }
}
</style>
