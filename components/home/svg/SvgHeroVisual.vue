<template>
  <svg class="svg-hero" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <!-- 背景散点图样 -->
      <pattern id="hero-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="var(--brand-main)" opacity="0.16"/>
      </pattern>
      
      <!-- 柔和发光滤镜 -->
      <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="14" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <!-- 核心发光渐变 -->
      <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--brand-main)" stop-opacity="0.32"/>
        <stop offset="60%" stop-color="var(--brand-second)" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="var(--brand-main)" stop-opacity="0"/>
      </radialGradient>

      <!-- 流光线条渐变 -->
      <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--brand-main)" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="var(--brand-second)" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="var(--brand-main)" stop-opacity="0.05"/>
      </linearGradient>
    </defs>

    <!-- 散点网格背景层 -->
    <circle cx="260" cy="260" r="230" fill="url(#hero-dots)" />

    <!-- 环境氛围发光底色 -->
    <circle cx="260" cy="260" r="170" fill="url(#center-glow)" />

    <!-- 1. 外部装饰虚线环 (慢速顺时针旋转) -->
    <circle class="ring-exterior" cx="260" cy="260" r="210" 
      stroke="var(--brand-main)" stroke-width="0.8" stroke-opacity="0.22" 
      stroke-dasharray="12 10" />

    <!-- 2. 中层流动轨迹环 (慢速逆时针旋转) -->
    <circle class="ring-interior" cx="260" cy="260" r="150" 
      stroke="var(--brand-second)" stroke-width="1.2" stroke-opacity="0.18" 
      stroke-dasharray="160 80" />

    <!-- 3. 五阶段数据轨道与流动微粒 -->
    <!-- 需求输入轨道 -->
    <path d="M 260 260 L 260 80" stroke="url(#stream-gradient)" stroke-width="1.5" />
    <circle class="flow-particle p-1" cx="260" cy="80" r="3" fill="var(--brand-main)" filter="url(#glow-filter)" />

    <!-- 变量拆解轨道 -->
    <path d="M 260 260 L 410 170" stroke="url(#stream-gradient)" stroke-width="1.5" />
    <circle class="flow-particle p-2" cx="410" cy="170" r="3" fill="var(--brand-main)" filter="url(#glow-filter)" />

    <!-- 方向生成轨道 -->
    <path d="M 260 260 L 350 380" stroke="url(#stream-gradient)" stroke-width="1.5" />
    <circle class="flow-particle p-3" cx="350" cy="380" r="3" fill="var(--brand-second)" filter="url(#glow-filter)" />

    <!-- 人工判断轨道 -->
    <path d="M 260 260 L 170 380" stroke="url(#stream-gradient)" stroke-width="1.5" />
    <circle class="flow-particle p-4" cx="170" cy="380" r="3" fill="var(--brand-main)" filter="url(#glow-filter)" />

    <!-- 资产沉淀轨道 -->
    <path d="M 260 260 L 110 170" stroke="url(#stream-gradient)" stroke-width="1.5" />
    <circle class="flow-particle p-5" cx="110" cy="170" r="3" fill="var(--brand-second)" filter="url(#glow-filter)" />

    <!-- 4. 节点环与外边框 (带有毛玻璃卡片发光感) -->
    <!-- Node 1: 输入 -->
    <g class="pulse-node n1" transform="translate(260, 80)">
      <circle r="12" fill="var(--bg-card)" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4" />
      <circle r="4" fill="var(--brand-main)" />
      <text y="-20" text-anchor="middle" fill="var(--text-main)" font-size="9" font-weight="600" letter-spacing="1">输入</text>
    </g>

    <!-- Node 2: 拆解 -->
    <g class="pulse-node n2" transform="translate(410, 170)">
      <circle r="12" fill="var(--bg-card)" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4" />
      <circle r="4" fill="var(--brand-second)" />
      <text x="24" y="4" fill="var(--text-main)" font-size="9" font-weight="600" letter-spacing="1">拆解</text>
    </g>

    <!-- Node 3: 生成 -->
    <g class="pulse-node n3" transform="translate(350, 380)">
      <circle r="12" fill="var(--bg-card)" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4" />
      <circle r="4" fill="var(--brand-main)" />
      <text y="24" text-anchor="middle" fill="var(--text-main)" font-size="9" font-weight="600" letter-spacing="1">生成</text>
    </g>

    <!-- Node 4: 判断 -->
    <g class="pulse-node n4" transform="translate(170, 380)">
      <circle r="12" fill="var(--bg-card)" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4" />
      <circle r="4" fill="var(--brand-main)" />
      <text y="24" text-anchor="middle" fill="var(--text-main)" font-size="9" font-weight="600" letter-spacing="1">判断</text>
    </g>

    <!-- Node 5: 沉淀 -->
    <g class="pulse-node n5" transform="translate(110, 170)">
      <circle r="12" fill="var(--bg-card)" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4" />
      <circle r="4" fill="var(--brand-second)" />
      <text x="-48" y="4" fill="var(--text-main)" font-size="9" font-weight="600" letter-spacing="1">沉淀</text>
    </g>

    <!-- 5. 核心能量决策中枢 (Core Engine) -->
    <g class="center-hub">
      <!-- 多层同心发光圆环 -->
      <circle cx="260" cy="260" r="32" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.24" fill="var(--bg-card)" />
      <circle class="core-pulse" cx="260" cy="260" r="22" stroke="var(--brand-second)" stroke-width="1.5" stroke-opacity="0.4" fill="none" filter="url(#glow-filter)" />
      <circle cx="260" cy="260" r="14" fill="var(--brand-main)" />
      <circle cx="260" cy="260" r="5" fill="var(--button-primary-text)" />
    </g>
  </svg>
</template>

<style scoped>
.svg-hero {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* 外环顺时针旋转 */
.ring-exterior {
  transform-origin: 260px 260px;
  animation: rotate-cw 40s linear infinite;
}

/* 内轨逆时针旋转 */
.ring-interior {
  transform-origin: 260px 260px;
  animation: rotate-ccw 30s linear infinite;
}

/* 五轨道脉冲粒子沿着线路滑动的微光动效 */
.flow-particle {
  animation: particle-pulse 3s ease-in-out infinite alternate;
}
.p-1 { animation-delay: 0s; }
.p-2 { animation-delay: 0.6s; }
.p-3 { animation-delay: 1.2s; }
.p-4 { animation-delay: 1.8s; }
.p-5 { animation-delay: 2.4s; }

/* 核心中枢外发光波动 */
.core-pulse {
  transform-origin: 260px 260px;
  animation: hub-pulse 3.5s ease-out infinite;
}

/* 节点气泡微幅漂浮感 */
.pulse-node {
  animation: float-node 6s ease-in-out infinite alternate;
}
.n1 { animation-delay: 0s; }
.n2 { animation-delay: 1.2s; }
.n3 { animation-delay: 2.4s; }
.n4 { animation-delay: 3.6s; }
.n5 { animation-delay: 4.8s; }

@keyframes rotate-cw {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes rotate-ccw {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@keyframes particle-pulse {
  0% { opacity: 0.3; transform: scale(0.85); }
  100% { opacity: 1; transform: scale(1.2); }
}

@keyframes hub-pulse {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
}

@keyframes float-node {
  0% { transform: translateY(0px) scale(1); }
  100% { transform: translateY(-4px) scale(1.02); }
}

@media (prefers-reduced-motion: reduce) {
  .ring-exterior, .ring-interior, .flow-particle, .core-pulse, .pulse-node {
    animation: none;
  }
}
</style>
