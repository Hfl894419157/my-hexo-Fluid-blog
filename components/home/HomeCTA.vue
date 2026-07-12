<script setup>
import BaseButton from '../BaseButton.vue'
import SectionShell from '../SectionShell.vue'
</script>

<template>
  <SectionShell compact class="home-cta-shell">
    <section class="home-cta">
      <!-- Decorative background mesh -->
      <div class="cta-mesh" aria-hidden="true">
        <svg viewBox="0 0 800 320" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="cta-glow1" cx="30%" cy="50%" r="40%">
              <stop offset="0%" stop-color="var(--brand-main)" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="var(--brand-main)" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="cta-glow2" cx="70%" cy="50%" r="40%">
              <stop offset="0%" stop-color="var(--brand-second)" stop-opacity="0.15"/>
              <stop offset="100%" stop-color="var(--brand-second)" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <ellipse cx="240" cy="160" rx="280" ry="200" fill="url(#cta-glow1)"/>
          <ellipse cx="560" cy="160" rx="280" ry="200" fill="url(#cta-glow2)"/>
          <!-- Grid lines -->
          <line v-for="i in 16" :key="`v${i}`" :x1="i * 50" y1="0" :x2="i * 50" y2="320"
            stroke="var(--brand-main)" stroke-width="0.5" stroke-opacity="0.08"/>
          <line v-for="i in 8" :key="`h${i}`" x1="0" :y1="i * 40" x2="800" :y2="i * 40"
            stroke="var(--brand-main)" stroke-width="0.5" stroke-opacity="0.08"/>
          <!-- Corner marks -->
          <path d="M20 20 L20 44 M20 20 L44 20" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4" stroke-linecap="round"/>
          <path d="M780 20 L780 44 M780 20 L756 20" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4" stroke-linecap="round"/>
          <path d="M20 300 L20 276 M20 300 L44 300" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4" stroke-linecap="round"/>
          <path d="M780 300 L780 276 M780 300 L756 300" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Content -->
      <div class="cta-content">
        <h2>从一个高频视觉任务开始<br>把经验沉淀成系统</h2>
        <p class="cta-desc">适合从产品图、详情页、品牌内容、短视频脚本或资源库整理开始，先建立流程，再持续迭代资产。</p>
        <div class="cta-actions">
          <BaseButton href="mailto:1442855983@qq.com">讨论合作方向</BaseButton>
          <BaseButton href="/knowledge/" variant="secondary">继续探索知识库</BaseButton>
        </div>
      </div>
    </section>
  </SectionShell>
</template>

<style scoped>
.home-cta {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
}

/* Mesh background */
.cta-mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cta-mesh svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Content */
.cta-content {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  padding: clamp(48px, 7vw, 88px) clamp(32px, 6vw, 80px);
  text-align: center;
}

h2 {
  width: min(860px, 100%);
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: clamp(30px, 3.6vw, 52px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.home-cta-shell {
  padding-bottom: 24px;
}

.cta-desc {
  width: min(680px, 100%);
  margin: 22px 0 0;
  color: var(--text-sub);
  font-size: clamp(15px, 1.2vw, 17px);
  line-height: 1.9;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  margin-top: 32px;
}

@media (max-width: 560px) {
  .home-cta-shell { padding-bottom: 20px; }
  .cta-actions { display: grid; width: 100%; max-width: 320px; }
}
</style>
