<script setup>
import SectionShell from '../SectionShell.vue'
import SectionHeader from '../SectionHeader.vue'
import BaseButton from '../BaseButton.vue'
import { data as contentCatalog } from '../../.shared/content.data.mjs'
import { resolveSelections } from '../../.shared/contentClient.js'
import homeSelections from '../../.shared/content/home.json'

const items = [
  {
    title: '学习与观察',
    desc: '记录我学习 AI 的过程笔记、行业趋势观察与具体的工具实验测试结论。',
    featured: resolveSelections(contentCatalog.learning, homeSelections.knowledge.learning, 3),
    href: '/knowledge/learning-observation'
  },
  {
    title: '方法体系',
    desc: '把成熟的商业设计经验和决策规则沉淀为结构化方法，让判断有据可依。',
    featured: resolveSelections(contentCatalog.methods, homeSelections.knowledge.methods, 3),
    href: '/knowledge/methods'
  },
  {
    title: '资源库',
    desc: '统一管理我实战验证过的 Prompt 结构、项目检查清单、快捷工具和参考资源。',
    featured: resolveSelections(contentCatalog.resources, homeSelections.knowledge.resources, 3),
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
          <h3 class="kr-card__title">{{ item.title }}</h3>
          <p class="kr-card__desc">{{ item.desc }}</p>
          
          <div class="kr-card__featured">
            <span class="kr-card__featured-label">精选内容</span>
            <div v-if="item.featured.length" class="kr-card__featured-list">
              <a v-for="entry in item.featured" :key="entry.sourcePath" :href="entry.url">
                <span>{{ entry.title }}</span>
                <em aria-hidden="true">→</em>
              </a>
            </div>
            <p v-else class="kr-card__empty">暂未选择首页精选内容</p>
          </div>

          <div class="kr-card__meta">
            <span class="kr-card__status">
              <span class="kr-card__dot"></span>
              {{ item.featured.length }} 条精选
            </span>
            <span v-if="item.featured[0]" class="kr-card__date">更新：{{ item.featured[0].updatedAtLabel }}</span>
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

.kr-card__featured {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  border-radius: var(--radius-control);
  background: var(--bg-soft);
  margin-bottom: 20px;
}

.kr-card__featured-label {
  color: var(--text-muted);
  font-size: var(--text-micro);
  font-weight: 700;
  letter-spacing: .08em;
  white-space: nowrap;
}

.kr-card__featured-list { display: grid; gap: 4px; }

.kr-card__featured-list a {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  padding: 7px 0;
  border-top: 1px dashed var(--border-soft);
  color: var(--text-main);
  font-size: var(--text-label);
  font-weight: 500;
  text-decoration: none;
}

.kr-card__featured-list a span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.kr-card__featured-list a em { color: var(--brand-main); font-style: normal; }
.kr-card__featured-list a:hover {
  color: var(--brand-main);
}

.kr-card__empty { margin: 0; color: var(--text-muted); font-size: var(--text-label); }

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
