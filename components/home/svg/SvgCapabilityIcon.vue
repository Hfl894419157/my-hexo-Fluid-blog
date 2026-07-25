<script setup>
const props = defineProps({
  variant: { type: Number, default: 1 }
})
</script>

<template>
  <!-- Variant 1: Aperture / Commercial Visual -->
  <svg v-if="variant === 1" class="cap-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <!-- Outer ring -->
    <circle cx="32" cy="32" r="28" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.35"/>
    <!-- Inner ring -->
    <circle cx="32" cy="32" r="18" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.5"/>
    <!-- Center dot -->
    <circle cx="32" cy="32" r="5" fill="var(--brand-main)" opacity="0.8"/>
    <!-- Aperture blades (6) -->
    <path d="M32 14 L36 26 L28 26 Z" fill="var(--brand-main)" fill-opacity="0.3"/>
    <path d="M46 19 L38 29 L42 36 Z" fill="var(--brand-main)" fill-opacity="0.25"/>
    <path d="M50 35 L38 35 L42 28 Z" fill="var(--brand-main)" fill-opacity="0.3"/>
    <path d="M46 49 L36 38 L28 38 Z" fill="var(--brand-main)" fill-opacity="0.2"/>
    <path d="M18 49 L26 38 L22 32 Z" fill="var(--brand-main)" fill-opacity="0.3"/>
    <path d="M14 35 L26 35 L22 42 Z" fill="var(--brand-main)" fill-opacity="0.25"/>
    <!-- Tick marks -->
    <line x1="32" y1="4"  x2="32" y2="10" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5" stroke-linecap="round"/>
    <line x1="56" y1="20" x2="50" y2="23" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5" stroke-linecap="round"/>
    <line x1="56" y1="44" x2="50" y2="41" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5" stroke-linecap="round"/>
    <line x1="32" y1="60" x2="32" y2="54" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5" stroke-linecap="round"/>
    <line x1="8"  y1="44" x2="14" y2="41" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5" stroke-linecap="round"/>
    <line x1="8"  y1="20" x2="14" y2="23" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5" stroke-linecap="round"/>
  </svg>

  <!-- Variant 2: Motion / Dynamic Visual -->
  <svg v-else-if="variant === 2" class="cap-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="7" y="13" width="50" height="38" rx="7"
      fill="var(--brand-main)" fill-opacity="0.08"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.45"/>
    <path d="M27 24.5 L42 32 L27 39.5 Z"
      fill="var(--brand-main)" fill-opacity="0.72"/>
    <path d="M13 9 C23 3 41 3 51 9"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.45"/>
    <path d="M47 5 L52 9 L47 12"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55"/>
    <line x1="14" y1="56" x2="50" y2="56"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.35"/>
    <circle cx="24" cy="56" r="3" fill="var(--brand-main)" fill-opacity="0.7"/>
  </svg>

  <!-- Variant 3: Knowledge / Stacked Library -->
  <svg v-else-if="variant === 3" class="cap-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <!-- Base layers -->
    <rect x="8"  y="46" width="48" height="10" rx="3"
      fill="var(--brand-main)" fill-opacity="0.12"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4"/>
    <rect x="12" y="33" width="40" height="10" rx="3"
      fill="var(--brand-main)" fill-opacity="0.2"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5"/>
    <rect x="16" y="20" width="32" height="10" rx="3"
      fill="var(--brand-main)" fill-opacity="0.35"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.65"/>
    <!-- Upward growth arrow -->
    <path d="M32 16 L32 6"
      stroke="var(--brand-main)" stroke-width="2" stroke-linecap="round" opacity="0.75"/>
    <path d="M28 10 L32 6 L36 10"
      stroke="var(--brand-main)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.75"/>
    <!-- Small accent lines on each layer -->
    <line x1="22" y1="25" x2="42" y2="25" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4"/>
    <line x1="18" y1="38" x2="46" y2="38" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.4"/>
  </svg>

  <!-- Variant 4: Code & Window / Web & Tool Building -->
  <svg v-else class="cap-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <!-- Window frame -->
    <rect x="8" y="12" width="48" height="40" rx="4" stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5"/>
    <line x1="8" y1="22" x2="56" y2="22" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35"/>
    <!-- Window dots -->
    <circle cx="14" cy="17" r="1.5" fill="var(--brand-main)" fill-opacity="0.6"/>
    <circle cx="20" cy="17" r="1.5" fill="var(--brand-main)" fill-opacity="0.6"/>
    <circle cx="26" cy="17" r="1.5" fill="var(--brand-main)" fill-opacity="0.6"/>
    <!-- Code tags < > -->
    <path d="M22 32 L16 37 L22 42" stroke="var(--brand-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.7"/>
    <path d="M42 32 L48 37 L42 42" stroke="var(--brand-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.7"/>
    <line x1="35" y1="28" x2="29" y2="46" stroke="var(--brand-main)" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.5"/>
  </svg>
</template>

<style scoped>
.cap-icon {
  width: 64px;
  height: 64px;
  display: block;
}
</style>
