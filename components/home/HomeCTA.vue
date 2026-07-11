<script setup>
import BaseButton from '../BaseButton.vue'
import SectionShell from '../SectionShell.vue'
</script>

<template>
  <SectionShell compact>
    <section class="home-cta">
      <h2>从一个高频视觉任务开始，把经验沉淀成系统</h2>
      <p>适合从产品图、详情页、品牌内容、短视频脚本或资源库整理开始，先建立流程，再持续迭代资产。</p>
      <div class="home-cta__actions">
        <BaseButton href="mailto:1442855983@qq.com">讨论合作方向</BaseButton>
        <BaseButton href="/knowledge/" variant="secondary">继续探索知识库</BaseButton>
      </div>
    </section>
  </SectionShell>
</template>

<style scoped>
.home-cta {
  display: grid;
  justify-items: center;
  overflow: hidden;
  padding: clamp(44px, 7vw, 76px);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  text-align: center;
  background:
    radial-gradient(circle at 50% 0%, var(--surface-glow), transparent 36%),
    linear-gradient(135deg, var(--bg-card), var(--bg-soft));
}

h2 {
  width: min(820px, 100%);
  margin: 0;
  padding-top: 0 !important;
  border-top: 0 !important;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-cta);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

p {
  width: min(680px, 100%);
  margin: 20px 0 0;
  color: var(--text-sub);
  font-size: var(--text-lead);
  font-weight: 400;
  line-height: 1.85;
}

.home-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  margin-top: 26px;
}

@media (max-width: 640px) {
  .home-cta__actions {
    display: grid;
    width: 100%;
  }
}
</style>
