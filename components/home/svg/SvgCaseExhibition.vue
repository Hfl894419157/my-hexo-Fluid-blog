<template>
  <svg viewBox="0 0 700 440" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="exhibition-bg" x1="70" y1="28" x2="650" y2="420" gradientUnits="userSpaceOnUse">
        <stop stop-color="var(--bg-soft)"/><stop offset="1" stop-color="var(--bg-card)"/>
      </linearGradient>
      <linearGradient id="exhibition-panel" x1="300" y1="80" x2="446" y2="340" gradientUnits="userSpaceOnUse">
        <stop stop-color="var(--brand-second)" stop-opacity=".9"/><stop offset="1" stop-color="var(--brand-main)" stop-opacity=".62"/>
      </linearGradient>
    </defs>
    <rect width="700" height="440" fill="url(#exhibition-bg)"/>
    <path d="M0 382L190 287H510L700 382" fill="var(--brand-main)" opacity=".055"/>
    <g stroke="var(--border-soft)" opacity=".72">
      <path d="M0 382L350 208L700 382"/><path d="M94 440L350 208L606 440"/>
      <path v-for="n in 6" :key="n" :d="`M${n * 100} 440L350 208`"/>
    </g>
    <g stroke="var(--text-main)" stroke-width="5" stroke-linecap="square" opacity=".88">
      <path d="M104 330V94H596V330"/><path d="M104 94H596"/><path d="M196 330V154H504V330"/>
    </g>
    <g stroke="var(--brand-main)" stroke-width="2" opacity=".62">
      <path d="M126 330V116H574V330"/><path d="M126 116H574"/>
    </g>
    <rect x="232" y="132" width="236" height="176" rx="5" fill="var(--bg-card)" stroke="var(--border-soft)"/>
    <rect x="258" y="158" width="184" height="98" rx="4" fill="url(#exhibition-panel)"/>
    <path d="M290 220L328 180L354 208L386 172L422 220" stroke="var(--bg-card)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".82"/>
    <rect x="287" y="274" width="126" height="7" rx="3.5" fill="var(--text-main)" opacity=".22"/>
    <rect x="38" y="178" width="116" height="154" rx="6" fill="var(--bg-card)" stroke="var(--border-soft)"/>
    <rect x="55" y="196" width="82" height="82" rx="4" fill="var(--brand-main)" opacity=".12"/>
    <path d="M76 257L116 217M76 217L116 257" stroke="var(--brand-main)" stroke-width="3" opacity=".72"/>
    <rect x="546" y="178" width="116" height="154" rx="6" fill="var(--bg-card)" stroke="var(--border-soft)"/>
    <circle cx="604" cy="236" r="35" stroke="var(--brand-main)" stroke-width="2" opacity=".6"/>
    <path d="M582 236H626M604 214V258" stroke="var(--brand-main)" stroke-width="2" opacity=".6"/>
    <path d="M154 365C232 328 298 390 370 354C433 322 490 352 546 330" stroke="var(--brand-main)" stroke-width="3" stroke-dasharray="8 10"/>
    <path d="M536 324L551 329L539 339" stroke="var(--brand-main)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="var(--text-main)" opacity=".72">
      <circle cx="246" cy="338" r="8"/><path d="M234 370C235 351 240 346 246 346C252 346 257 351 258 370H234Z"/>
      <circle cx="458" cy="348" r="8"/><path d="M446 380C447 361 452 356 458 356C464 356 469 361 470 380H446Z"/>
    </g>
  </svg>
</template>

<style scoped>svg { background: var(--bg-soft); }</style>
