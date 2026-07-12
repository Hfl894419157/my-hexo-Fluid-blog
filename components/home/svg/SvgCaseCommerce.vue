<template>
  <svg viewBox="0 0 700 440" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="commerce-surface" x1="80" y1="20" x2="620" y2="420" gradientUnits="userSpaceOnUse">
        <stop stop-color="var(--bg-card)"/>
        <stop offset="1" stop-color="var(--bg-soft)"/>
      </linearGradient>
      <linearGradient id="commerce-copper" x1="250" y1="92" x2="440" y2="348" gradientUnits="userSpaceOnUse">
        <stop stop-color="var(--brand-second)" stop-opacity=".94"/>
        <stop offset="1" stop-color="var(--brand-main)" stop-opacity=".62"/>
      </linearGradient>
      <filter id="commerce-shadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="var(--text-main)" flood-opacity=".13"/>
      </filter>
    </defs>
    <rect width="700" height="440" fill="url(#commerce-surface)"/>
    <g opacity=".48" stroke="var(--border-soft)">
      <path v-for="x in 14" :key="`x${x}`" :d="`M${x * 50} 0V440`"/>
      <path v-for="y in 9" :key="`y${y}`" :d="`M0 ${y * 50}H700`"/>
    </g>
    <rect x="46" y="42" width="150" height="74" rx="8" fill="var(--bg-card)" stroke="var(--border-soft)"/>
    <circle cx="72" cy="68" r="7" fill="var(--brand-main)" opacity=".78"/>
    <rect x="90" y="61" width="76" height="7" rx="3.5" fill="var(--text-main)" opacity=".7"/>
    <rect x="68" y="86" width="98" height="6" rx="3" fill="var(--text-main)" opacity=".16"/>
    <rect x="504" y="54" width="150" height="124" rx="10" fill="var(--bg-card)" stroke="var(--border-soft)"/>
    <rect x="528" y="78" width="102" height="54" rx="7" fill="var(--brand-main)" opacity=".08" stroke="var(--brand-main)" stroke-opacity=".34"/>
    <rect x="528" y="146" width="62" height="6" rx="3" fill="var(--text-main)" opacity=".18"/>
    <g filter="url(#commerce-shadow)">
      <ellipse cx="350" cy="356" rx="190" ry="35" fill="var(--text-main)" opacity=".12"/>
      <path d="M198 310H502L466 360H234L198 310Z" fill="var(--text-main)" opacity=".9"/>
      <rect x="227" y="282" width="246" height="35" rx="5" fill="var(--bg-card)" stroke="var(--brand-main)" stroke-opacity=".4"/>
      <rect x="287" y="92" width="126" height="196" rx="25" fill="url(#commerce-copper)"/>
      <rect x="303" y="108" width="94" height="164" rx="17" fill="var(--bg-card)" opacity=".9"/>
      <rect x="319" y="125" width="62" height="88" rx="14" fill="var(--text-main)" opacity=".9"/>
      <circle cx="350" cy="169" r="21" fill="var(--brand-main)" opacity=".68"/>
      <rect x="326" y="229" width="48" height="6" rx="3" fill="var(--text-main)" opacity=".25"/>
      <rect x="334" y="242" width="32" height="5" rx="2.5" fill="var(--text-main)" opacity=".14"/>
    </g>
    <g stroke="var(--brand-main)" stroke-width="1.5" opacity=".55">
      <path d="M252 98H222V151"/><path d="M448 98H478V151"/><path d="M252 275H222V222"/><path d="M448 275H478V222"/>
    </g>
    <circle cx="222" cy="151" r="4" fill="var(--brand-main)"/><circle cx="478" cy="222" r="4" fill="var(--brand-main)"/>
  </svg>
</template>

<style scoped>svg { background: var(--bg-soft); }</style>
