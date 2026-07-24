<script setup>
import SectionShell from '../SectionShell.vue'

const paths = [
  {
    key: 'outcomes',
    title: '看成果',
    desc: '查看真实项目、个人角色、关键判断和最终交付。',
    href: '/portfolio/',
    label: '查看实践作品 →',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>`
  },
  {
    key: 'process',
    title: '看过程',
    desc: '查看需求如何拆解、变量如何控制、结果如何筛选。',
    href: '/aigc/',
    label: '探索生产流程 →',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
  },
  {
    key: 'accumulation',
    title: '看积累',
    desc: '查看研究笔记、方法指南、软件、模板和验证资源。',
    href: '/knowledge/',
    label: '进入知识系统 →',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z"></path></svg>`
  }
]
</script>

<template>
  <SectionShell id="home-paths" compact>
    <div class="paths-grid">
      <a
        v-for="(path, index) in paths"
        :key="path.key"
        :href="path.href"
        class="path-card"
        v-reveal="{ delay: index * 70, y: 24, repeat: true }"
      >
        <div class="path-card__icon" v-html="path.icon" />
        <div class="path-card__content">
          <h3>{{ path.title }}</h3>
          <p>{{ path.desc }}</p>
          <strong class="path-card__cta">{{ path.label }}</strong>
        </div>
      </a>
    </div>
  </SectionShell>
</template>

<style scoped>
.paths-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.path-card {
  display: flex;
  flex-direction: column;
  padding: 36px;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  color: inherit;
  text-decoration: none;
  transition:
    opacity var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    filter var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    transform var(--reveal-duration, 700ms) cubic-bezier(0.2, 0.7, 0.2, 1),
    border-color var(--transition-smooth),
    box-shadow var(--transition-smooth);
  transition-delay: var(--reveal-delay, 0ms);
}

.path-card:hover {
  border-color: color-mix(in srgb, var(--brand-main) 35%, transparent);
  box-shadow: var(--shadow-card);
  transform: translateY(-4px);
}

.path-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  background: var(--bg-soft);
  color: var(--brand-main);
  margin-bottom: 24px;
  transition: background-color var(--transition-smooth), color var(--transition-smooth);
}

.path-card:hover .path-card__icon {
  background: var(--brand-main);
  color: var(--button-primary-text);
  border-color: var(--brand-main);
}

.path-card__icon :deep(svg) {
  width: 24px;
  height: 24px;
}

h3 {
  margin: 0;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
}

p {
  margin: 12px 0 0;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.7;
  flex: 1;
}

.path-card__cta {
  display: inline-block;
  margin-top: 24px;
  color: var(--brand-main);
  font-size: var(--text-small);
  font-weight: 600;
}

@media (max-width: 900px) {
  .paths-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .path-card {
    padding: 28px;
  }
}
</style>
