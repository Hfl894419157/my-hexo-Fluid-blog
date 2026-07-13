<script setup>
import SectionShell from '../SectionShell.vue'
import SectionHeader from '../SectionHeader.vue'
import { data as contentCatalog } from '../../.shared/content.data.mjs'

const updates = contentCatalog.recent.map((item) => ({
  date: item.updatedAtLabel,
  type: item.type,
  title: item.title,
  link: item.url,
  status: item.verificationStatus,
  statusClass: ['已验证', '长期维护'].includes(item.verificationStatus) ? 'verified' : 'checking',
  topic: item.tags.slice(0, 2).join(' / ')
}))
</script>

<template>
  <SectionShell id="home-recent-updates" tone="soft" compact>
    <div class="updates-inner" v-reveal="{ delay: 0, y: 16 }">
      <SectionHeader
        title="网站最近维护更新"
        desc="这里记录我近期对个人能力系统、工作流和资源库的维护动态。所有内容均会标注验证状态。"
      />

      <div class="updates-list">
        <div
          v-for="(update, idx) in updates"
          :key="idx"
          class="update-row"
          v-reveal="{ delay: idx * 80, y: 20 }"
        >
          <div class="update-row__date">{{ update.date }}</div>
          <div class="update-row__type">
            <span class="update-type-tag">{{ update.type }}</span>
          </div>
          <div class="update-row__title">
            <a :href="update.link"><strong>{{ update.title }}</strong></a>
            <span class="update-topic">{{ update.topic }}</span>
          </div>
          <div class="update-row__status">
            <span :class="['status-badge', `status-badge--${update.statusClass}`]">
              {{ update.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.updates-inner {
  display: grid;
  justify-items: center;
  gap: 36px;
}

.updates-list {
  width: min(840px, 100%);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-card);
  background: var(--bg-card);
  overflow: hidden;
}

.update-row {
  display: grid;
  grid-template-columns: 154px 110px 1fr 100px;
  align-items: center;
  padding: 20px 28px;
  border-bottom: 1px solid var(--border-soft);
}

.update-row:last-child {
  border-bottom: 0;
}

.update-row__date {
  color: var(--text-muted);
  font-size: var(--text-small);
  font-family: var(--font-mono);
}

.update-type-tag {
  display: inline-flex;
  padding: 4px 8px;
  border-radius: var(--radius-control);
  background: var(--bg-soft);
  color: var(--text-sub);
  font-size: var(--text-micro);
  font-weight: 500;
}

.update-row__title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.update-row__title strong {
  color: var(--text-main);
  font-size: var(--text-small);
  font-weight: 600;
}

.update-row__title a { width: fit-content; color: inherit; text-decoration: none; }
.update-row__title a:hover strong { color: var(--brand-main); }

.update-topic {
  color: var(--text-muted);
  font-size: var(--text-micro);
  letter-spacing: 0.04em;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: var(--text-micro);
  font-weight: 600;
  border: 1px solid transparent;
}

.status-badge--verified {
  color: var(--status-verified);
  background: color-mix(in srgb, var(--status-verified) 8%, transparent);
  border-color: color-mix(in srgb, var(--status-verified) 15%, transparent);
}

.status-badge--checking {
  color: var(--status-checking);
  background: color-mix(in srgb, var(--status-checking) 8%, transparent);
  border-color: color-mix(in srgb, var(--status-checking) 15%, transparent);
}

@media (max-width: 768px) {
  .update-row {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 20px 24px;
  }
  .update-row__date {
    order: 1;
  }
  .update-row__type {
    order: 2;
  }
  .update-row__title {
    order: 3;
  }
  .update-row__status {
    order: 4;
    width: fit-content;
  }
}
</style>
