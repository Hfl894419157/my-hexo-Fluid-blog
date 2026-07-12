<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  /**
   * 'industry' | 'method' | 'tools'
   * 控制 SVG 背景构图变体
   */
  variant: { type: String, default: 'industry' }
})
</script>

<template>
  <header class="kph" :class="`kph--${variant}`" role="banner">
    <!-- 纯装饰 SVG 背景，每个变体使用不同构图 -->
    <div class="kph__bg" aria-hidden="true">

      <!-- 行业观察：脉冲环 + 散点网格 -->
      <svg v-if="variant === 'industry'" class="kph__svg" viewBox="0 0 1080 260" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <!-- 大型脉冲圆环 -->
        <circle cx="900" cy="130" r="200" stroke="var(--brand-main)" stroke-width="0.6" stroke-opacity="0.14"/>
        <circle cx="900" cy="130" r="148" stroke="var(--brand-main)" stroke-width="0.5" stroke-opacity="0.10"/>
        <circle cx="900" cy="130" r="96"  stroke="var(--brand-main)" stroke-width="0.5" stroke-opacity="0.08"/>
        <!-- 十字轴线 -->
        <line x1="700" y1="130" x2="1080" y2="130" stroke="var(--brand-main)" stroke-width="0.5" stroke-opacity="0.10"/>
        <line x1="900" y1="0"   x2="900"  y2="260" stroke="var(--brand-main)" stroke-width="0.5" stroke-opacity="0.10"/>
        <!-- 左侧散点网格 -->
        <g fill="var(--brand-main)" fill-opacity="0.12">
          <circle cx="60"  cy="48"  r="2"/>
          <circle cx="108" cy="48"  r="2"/>
          <circle cx="156" cy="48"  r="2"/>
          <circle cx="204" cy="48"  r="2"/>
          <circle cx="60"  cy="96"  r="2"/>
          <circle cx="108" cy="96"  r="2"/>
          <circle cx="156" cy="96"  r="2"/>
          <circle cx="204" cy="96"  r="2"/>
          <circle cx="60"  cy="144" r="2"/>
          <circle cx="108" cy="144" r="2"/>
          <circle cx="156" cy="144" r="2"/>
          <circle cx="204" cy="144" r="2"/>
          <circle cx="60"  cy="192" r="2"/>
          <circle cx="108" cy="192" r="2"/>
          <circle cx="156" cy="192" r="2"/>
        </g>
        <!-- 流动折线 -->
        <polyline points="0,180 120,140 240,165 380,120 520,148 660,100" stroke="var(--brand-main)" stroke-width="0.7" stroke-opacity="0.12" fill="none" stroke-linejoin="round"/>
        <!-- 小标注点 -->
        <circle cx="380" cy="120" r="3.5" fill="var(--brand-main)" fill-opacity="0.22"/>
        <circle cx="660" cy="100" r="2.5" fill="var(--brand-main)" fill-opacity="0.16"/>
      </svg>

      <!-- 设计方法：对角线网格 + 几何方块 -->
      <svg v-else-if="variant === 'method'" class="kph__svg" viewBox="0 0 1080 260" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <!-- 右侧大菱形 -->
        <rect x="820" y="30" width="180" height="180" rx="4" transform="rotate(45 910 120)" stroke="var(--brand-main)" stroke-width="0.6" stroke-opacity="0.13" fill="none"/>
        <rect x="850" y="58" width="124" height="124" rx="3" transform="rotate(45 912 120)" stroke="var(--brand-main)" stroke-width="0.5" stroke-opacity="0.09" fill="none"/>
        <!-- 对角线网格（右半） -->
        <line x1="700" y1="0"    x2="1080" y2="260" stroke="var(--brand-main)" stroke-width="0.4" stroke-opacity="0.07"/>
        <line x1="740" y1="0"    x2="1080" y2="218" stroke="var(--brand-main)" stroke-width="0.4" stroke-opacity="0.07"/>
        <line x1="780" y1="0"    x2="1080" y2="174" stroke="var(--brand-main)" stroke-width="0.4" stroke-opacity="0.07"/>
        <line x1="820" y1="0"    x2="1080" y2="130" stroke="var(--brand-main)" stroke-width="0.4" stroke-opacity="0.07"/>
        <line x1="860" y1="0"    x2="1080" y2="86"  stroke="var(--brand-main)" stroke-width="0.4" stroke-opacity="0.07"/>
        <line x1="900" y1="0"    x2="1080" y2="42"  stroke="var(--brand-main)" stroke-width="0.4" stroke-opacity="0.07"/>
        <!-- 左侧模块化方块组 -->
        <rect x="40"  y="40"  width="52" height="52" rx="6" stroke="var(--brand-main)" stroke-width="0.6" stroke-opacity="0.13" fill="none"/>
        <rect x="40"  y="108" width="52" height="52" rx="6" stroke="var(--brand-main)" stroke-width="0.5" stroke-opacity="0.09" fill="none"/>
        <rect x="108" y="40"  width="24" height="24" rx="4" fill="var(--brand-main)" fill-opacity="0.06"/>
        <rect x="108" y="74"  width="24" height="24" rx="4" fill="var(--brand-main)" fill-opacity="0.04"/>
        <rect x="108" y="108" width="24" height="52" rx="4" stroke="var(--brand-main)" stroke-width="0.5" stroke-opacity="0.10" fill="none"/>
        <!-- 连接箭头线 -->
        <path d="M 160 64 L 200 64 L 200 130 L 240 130" stroke="var(--brand-main)" stroke-width="0.7" stroke-opacity="0.13" fill="none" stroke-linejoin="round"/>
        <circle cx="240" cy="130" r="3" fill="var(--brand-main)" fill-opacity="0.18"/>
        <!-- 水平基准线 -->
        <line x1="0" y1="218" x2="600" y2="218" stroke="var(--brand-main)" stroke-width="0.4" stroke-opacity="0.08"/>
      </svg>

      <!-- 工具资源：电路板线路 + 节点 -->
      <svg v-else-if="variant === 'tools'" class="kph__svg" viewBox="0 0 1080 260" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <!-- 主电路路径（右侧） -->
        <path d="M 700 80 L 780 80 L 780 50 L 920 50 L 920 80 L 1040 80" stroke="var(--brand-main)" stroke-width="0.7" stroke-opacity="0.14" fill="none" stroke-linejoin="round"/>
        <path d="M 700 130 L 800 130 L 800 170 L 880 170 L 880 130 L 1080 130" stroke="var(--brand-main)" stroke-width="0.7" stroke-opacity="0.12" fill="none" stroke-linejoin="round"/>
        <path d="M 700 180 L 760 180 L 760 210 L 940 210 L 940 180 L 1080 180" stroke="var(--brand-main)" stroke-width="0.5" stroke-opacity="0.10" fill="none" stroke-linejoin="round"/>
        <!-- 电路节点 -->
        <g fill="none" stroke="var(--brand-main)" stroke-opacity="0.20">
          <rect x="770"  y="42"  width="16" height="16" rx="3" stroke-width="0.6"/>
          <rect x="910"  y="42"  width="16" height="16" rx="3" stroke-width="0.6"/>
          <rect x="870"  y="162" width="16" height="16" rx="3" stroke-width="0.6"/>
          <rect x="930"  y="172" width="8"  height="8"  rx="2" stroke-width="0.5"/>
        </g>
        <circle cx="920" cy="50"  r="3" fill="var(--brand-main)" fill-opacity="0.22"/>
        <circle cx="800" cy="130" r="3" fill="var(--brand-main)" fill-opacity="0.18"/>
        <circle cx="880" cy="130" r="2" fill="var(--brand-main)" fill-opacity="0.14"/>
        <!-- 左侧散点行 -->
        <g fill="var(--brand-main)" fill-opacity="0.10">
          <circle cx="44"  cy="50"  r="2.5"/>
          <circle cx="80"  cy="50"  r="1.8"/>
          <circle cx="116" cy="50"  r="2.5"/>
          <circle cx="152" cy="50"  r="1.8"/>
          <circle cx="188" cy="50"  r="2.5"/>
          <circle cx="44"  cy="90"  r="1.8"/>
          <circle cx="80"  cy="90"  r="2.5"/>
          <circle cx="116" cy="90"  r="1.8"/>
          <circle cx="44"  cy="130" r="2.5"/>
          <circle cx="80"  cy="130" r="1.8"/>
        </g>
        <!-- 左侧竖向虚线 -->
        <line x1="240" y1="20" x2="240" y2="240" stroke="var(--brand-main)" stroke-width="0.4" stroke-opacity="0.08" stroke-dasharray="4 6"/>
        <!-- 底部水平线 -->
        <line x1="0" y1="236" x2="680" y2="236" stroke="var(--brand-main)" stroke-width="0.4" stroke-opacity="0.07"/>
      </svg>
    </div>

    <!-- 文字内容 -->
    <div class="kph__content">
      <h1 class="kph__title">{{ title }}</h1>
      <p class="kph__desc">{{ description }}</p>
    </div>
  </header>
</template>

<style scoped>
/* ====================================================
   KnowledgePageHero — 知识库子页面共享页头
   ==================================================== */
.kph {
  position: relative;
  width: min(1080px, 100%);
  margin: 0 auto;
  padding: 52px 0 44px;
  overflow: hidden;
  border-bottom: 1px solid var(--border-soft);
}

/* SVG 装饰层 */
.kph__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.kph__svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* 文字内容 */
.kph__content {
  position: relative;
  z-index: 1;
  max-width: 640px;
}

/* 标题 */
.kph__title {
  margin: 0 !important;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-page-title);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

/* 说明文案 */
.kph__desc {
  margin: 18px 0 0 !important;
  color: var(--text-sub);
  font-family: var(--font-sans);
  font-size: clamp(15px, 1.4vw, 18px);
  line-height: 1.75;
  font-weight: 400;
}

/* ── 响应式 ── */
@media (max-width: 768px) {
  .kph {
    padding: 36px 0 32px;
  }

  .kph__svg {
    opacity: 0.7;
  }
}

@media (max-width: 480px) {
  .kph {
    padding: 28px 0 26px;
  }

  .kph__desc {
    font-size: 14px;
  }
}
</style>
