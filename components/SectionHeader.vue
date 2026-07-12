<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  titleLines: {
    type: Array,
    default: () => []
  },
  desc: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: 'center'
  }
})
</script>

<template>
  <header class="section-header" :class="`section-header--${align}`">
    <p v-if="eyebrow" class="section-header__eyebrow">{{ eyebrow }}</p>
    <h2>
      <template v-if="titleLines.length">
        <span v-for="line in titleLines" :key="line" class="section-header__line">{{ line }}</span>
      </template>
      <template v-else>{{ title }}</template>
    </h2>
    <p v-if="desc" class="section-header__desc">{{ desc }}</p>
  </header>
</template>

<style scoped>
.section-header {
  width: min(760px, 100%);
}

.section-header--center {
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.section-header--left {
  text-align: left;
}

.section-header__eyebrow {
  margin: 0 0 14px;
  color: var(--brand-main);
  font-size: var(--text-label);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.18em;
}

h2 {
  margin: 0;
  padding-top: 0 !important;
  border-top: 0 !important;
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: var(--text-section-title);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.section-header__line {
  display: block;
  white-space: nowrap;
}

.section-header__desc {
  width: min(680px, 100%);
  margin: 18px auto 0;
  color: var(--text-sub);
  font-size: var(--text-lead);
  font-weight: 400;
  line-height: 1.9;
}

.section-header--left .section-header__desc {
  margin-left: 0;
}
</style>
