<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
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
    <h2>{{ title }}</h2>
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
  font-size: var(--font-small);
  font-weight: 780;
  line-height: 1.2;
}

h2 {
  margin: 0;
  padding-top: 0 !important;
  border-top: 0 !important;
  color: var(--text-main);
  font-family: var(--font-title);
  font-size: var(--font-h2);
  font-weight: 760;
  line-height: 1.08;
  letter-spacing: 0.04em;
}

.section-header__desc {
  width: min(680px, 100%);
  margin: 18px auto 0;
  color: var(--text-sub);
  font-size: var(--font-body);
  line-height: 1.78;
}

.section-header--left .section-header__desc {
  margin-left: 0;
}
</style>
