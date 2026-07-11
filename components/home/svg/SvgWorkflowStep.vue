<script setup>
const props = defineProps({
  step: { type: Number, default: 1 }
})
</script>

<template>
  <!-- Step 1: Document / Brief -->
  <svg v-if="step === 1" class="step-icon" viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <rect x="18" y="10" width="44" height="56" rx="5"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4"
      fill="var(--brand-main)" fill-opacity="0.06"/>
    <rect x="26" y="22" width="28" height="3" rx="1.5" fill="var(--brand-main)" opacity="0.5"/>
    <rect x="26" y="32" width="22" height="3" rx="1.5" fill="var(--brand-main)" opacity="0.35"/>
    <rect x="26" y="42" width="26" height="3" rx="1.5" fill="var(--brand-main)" opacity="0.35"/>
    <rect x="26" y="52" width="16" height="3" rx="1.5" fill="var(--brand-main)" opacity="0.25"/>
    <!-- Arrow in -->
    <path d="M10 40 L18 40" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5"
      stroke-linecap="round" marker-end="url(#arr)"/>
    <path d="M62 40 L70 40" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5"
      stroke-linecap="round"/>
  </svg>

  <!-- Step 2: Variable grid -->
  <svg v-else-if="step === 2" class="step-icon" viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <rect x="14" y="14" width="15" height="15" rx="3"
      fill="var(--brand-main)" fill-opacity="0.7" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.6"/>
    <rect x="33" y="14" width="15" height="15" rx="3"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35" fill="var(--brand-main)" fill-opacity="0.07"/>
    <rect x="52" y="14" width="15" height="15" rx="3"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35" fill="var(--brand-main)" fill-opacity="0.07"/>
    <rect x="14" y="33" width="15" height="15" rx="3"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35" fill="var(--brand-main)" fill-opacity="0.07"/>
    <rect x="33" y="33" width="15" height="15" rx="3"
      fill="var(--brand-main)" fill-opacity="0.35" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.5"/>
    <rect x="52" y="33" width="15" height="15" rx="3"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35" fill="var(--brand-main)" fill-opacity="0.07"/>
    <rect x="14" y="52" width="15" height="15" rx="3"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35" fill="var(--brand-main)" fill-opacity="0.07"/>
    <rect x="33" y="52" width="15" height="15" rx="3"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35" fill="var(--brand-main)" fill-opacity="0.07"/>
    <rect x="52" y="52" width="15" height="15" rx="3"
      fill="var(--brand-main)" fill-opacity="0.45" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.5"/>
  </svg>

  <!-- Step 3: Branching generation -->
  <svg v-else-if="step === 3" class="step-icon" viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <circle cx="40" cy="16" r="6" fill="var(--brand-main)" fill-opacity="0.7"/>
    <path d="M40 22 L40 38" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4"/>
    <path d="M40 38 L20 54" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4"/>
    <path d="M40 38 L40 54" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4"/>
    <path d="M40 38 L60 54" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4"/>
    <circle cx="20" cy="62" r="6" fill="var(--brand-main)" fill-opacity="0.45"/>
    <circle cx="40" cy="62" r="6" fill="var(--brand-main)" fill-opacity="0.6"/>
    <circle cx="60" cy="62" r="6" fill="var(--brand-main)" fill-opacity="0.35"/>
  </svg>

  <!-- Step 4: Funnel / Judge -->
  <svg v-else-if="step === 4" class="step-icon" viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <path d="M12 20 H68 L52 42 L52 62 L28 56 L28 42 Z"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.45"
      fill="var(--brand-main)" fill-opacity="0.08" stroke-linejoin="round"/>
    <line x1="20" y1="28" x2="60" y2="28" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.3"/>
    <line x1="25" y1="36" x2="55" y2="36" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.3"/>
    <circle cx="40" cy="68" r="4" fill="var(--brand-main)" opacity="0.8"/>
  </svg>

  <!-- Step 5: Stacked layers / Assets -->
  <svg v-else class="step-icon" viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <rect x="20" y="52" width="40" height="12" rx="3"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4"
      fill="var(--brand-main)" fill-opacity="0.09"/>
    <rect x="16" y="38" width="48" height="12" rx="3"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5"
      fill="var(--brand-main)" fill-opacity="0.13"/>
    <rect x="12" y="24" width="56" height="12" rx="3"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.65"
      fill="var(--brand-main)" fill-opacity="0.2"/>
    <!-- Upward arrow -->
    <path d="M40 20 L40 10 M36 14 L40 10 L44 14"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-linecap="round"
      stroke-linejoin="round" opacity="0.7"/>
  </svg>
</template>

<style scoped>
.step-icon {
  width: 80px;
  height: 80px;
  display: block;
  flex-shrink: 0;
}
</style>
