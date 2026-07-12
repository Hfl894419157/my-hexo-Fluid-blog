<script setup>
import SectionShell from '../SectionShell.vue'
import SectionHeader from '../SectionHeader.vue'
import BaseButton from '../BaseButton.vue'

const items = [
  {
    title: '学习与观察',
    subtitle: 'LEARNING & OBSERVATION',
    desc: '记录我学习 AI 的过程笔记、行业趋势观察与具体的工具实验测试结论。',
    latest: 'AI 冲击下，设计师网站应该展示什么',
    latestLink: '/knowledge/learning-observation/ai-designer-positioning',
    date: '2026-07-11',
    status: '已整理',
    href: '/knowledge/learning-observation'
  },
  {
    title: '方法体系',
    subtitle: 'METHODS SYSTEM',
    desc: '把成熟的商业设计经验和决策规则沉淀为结构化方法，让判断有据可依。',
    latest: '从提示词到交付：AIGC 工作流如何沉淀',
    latestLink: '/knowledge/learning-observation/aigc-workflow-system',
    date: '2026-07-08',
    status: '已验证',
    href: '/knowledge/methods'
  },
  {
    title: '资源库',
    subtitle: 'RESOURCES LIBRARY',
    desc: '统一管理我实战验证过的 Prompt 结构、项目检查清单、快捷工具和参考资源。',
    latest: '商业视觉 Prompt 结构',
    latestLink: '/knowledge/resources/mj-prompt',
    date: '2026-07-12',
    status: '长期维护',
    href: '/knowledge/resources'
  }
]
</script>

<template>
  <SectionShell id="home-knowledge">
    <div class="kr-head">
      <SectionHeader
        :title-lines="['知识不是链接仓库', '而是下一次项目的起点']"
        desc="方法解释为什么这样做，资源预览让你先判断它是否值得进入真实项目。"
      />
    </div>

    <div class="kr-grid">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="kr-card"
      >
        <div class="kr-card__body">
          <span class="kr-card__subtitle">{{ item.subtitle }}</span>
          <h3 class="kr-card__title">{{ item.title }}</h3>
          <p class="kr-card__desc">{{ item.desc }}</p>
          
          <!-- 最近内容小纸条 -->
          <div class="kr-card__latest">
            <span class="kr-card__latest-label">最新内容：</span>
            <a :href="item.latestLink" class="kr-card__latest-link">{{ item.latest }}</a>
          </div>

          <div class="kr-card__meta">
            <span class="kr-card__status">
              <span class="kr-card__dot"></span>
              {{ item.status }}
            </span>
            <span class="kr-card__date">更新：{{ item.date }}</span>
          </div>

          <div class="kr-card__footer">
            <BaseButton :href="item.href" variant="text">查看全部 →</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.kr-head {
  display: grid;
  width: 100%;
  justify-items: center;
  gap: 24px;
  text-align: center;
}

.kr-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.kr-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  transition: border-color var(--transition-smooth), box-shadow var(--transition-smooth), transform var(--transition-smooth);
}

.kr-card:hover {
  border-color: color-mix(in srgb, var(--brand-main) 30%, transparent);
  box-shadow: var(--shadow-card);
  transform: translateY(-4px);
}

.kr-card__body {
  display: flex;
  flex-direction: column;
  padding: 32px;
  flex: 1;
}

.kr-card__subtitle {
  display: block;
  color: var(--brand-main);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.kr-card__title {
  margin: 0 0 16px;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
}

.kr-card__desc {
  margin: 0 0 24px;
  color: var(--text-sub);
  font-size: var(--text-small);
  line-height: 1.7;
  flex: 1;
}

.kr-card__latest {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: baseline;
  padding: 14px 16px;
  border-radius: var(--radius-control);
  background: var(--bg-soft);
  margin-bottom: 20px;
}

.kr-card__latest-label {
  color: var(--text-muted);
  font-size: var(--text-label);
  white-space: nowrap;
}

.kr-card__latest-link {
  color: var(--text-main);
  font-size: var(--text-label);
  font-weight: 500;
  text-decoration: none;
}

.kr-card__latest-link:hover {
  color: var(--brand-main);
}

.kr-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed var(--border-soft);
  padding-top: 16px;
  margin-bottom: 20px;
  font-size: var(--text-label);
}

.kr-card__status {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-sub);
}

.kr-card__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--status-verified);
}

.kr-card__date {
  color: var(--text-muted);
}

.kr-card__footer {
  margin-top: auto;
}

.kr-card__footer :deep(.base-button) {
  padding: 0;
  font-weight: 600;
}

@media (max-width: 900px) {
  .kr-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
