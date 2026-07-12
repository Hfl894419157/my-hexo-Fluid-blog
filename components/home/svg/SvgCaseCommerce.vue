<template>
  <svg viewBox="0 0 700 440" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="med-bg" x1="60" y1="22" x2="646" y2="420" gradientUnits="userSpaceOnUse">
        <stop stop-color="var(--bg-card)"/>
        <stop offset="1" stop-color="var(--bg-soft)"/>
      </linearGradient>
      <linearGradient id="med-body" x1="285" y1="82" x2="430" y2="332" gradientUnits="userSpaceOnUse">
        <stop stop-color="#fff"/>
        <stop offset=".48" stop-color="#e7e1db"/>
        <stop offset="1" stop-color="#b9aea5"/>
      </linearGradient>
      <linearGradient id="med-metal" x1="245" y1="292" x2="468" y2="365" gradientUnits="userSpaceOnUse">
        <stop stop-color="#f7f4f0"/>
        <stop offset=".5" stop-color="#9f958d"/>
        <stop offset="1" stop-color="#e7e0da"/>
      </linearGradient>
      <radialGradient id="med-screen" cx="45%" cy="38%" r="72%">
        <stop stop-color="var(--brand-second)" stop-opacity=".92"/>
        <stop offset=".55" stop-color="var(--brand-main)" stop-opacity=".72"/>
        <stop offset="1" stop-color="#171513"/>
      </radialGradient>
      <filter id="med-shadow" x="-30%" y="-30%" width="170%" height="190%">
        <feDropShadow dx="0" dy="22" stdDeviation="20" flood-color="#171310" flood-opacity=".22"/>
      </filter>
      <filter id="med-soft" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8"/>
      </filter>
    </defs>

    <rect width="700" height="440" fill="url(#med-bg)"/>
    <g opacity=".44" stroke="var(--border-soft)">
      <path v-for="x in 14" :key="`mx${x}`" :d="`M${x * 50} 0V440`"/>
      <path v-for="y in 9" :key="`my${y}`" :d="`M0 ${y * 50}H700`"/>
    </g>
    <ellipse cx="350" cy="382" rx="214" ry="28" fill="#171310" opacity=".15" filter="url(#med-soft)"/>

    <g filter="url(#med-shadow)">
      <path d="M206 326H494L458 374H242L206 326Z" fill="#211d1a"/>
      <path d="M230 318H470L494 326H206L230 318Z" fill="url(#med-metal)"/>
      <rect x="246" y="294" width="208" height="30" rx="9" fill="url(#med-metal)" stroke="#8f8379" stroke-opacity=".48"/>
      <rect x="276" y="72" width="148" height="232" rx="30" fill="url(#med-body)" stroke="#8f8379" stroke-opacity=".58"/>
      <path d="M292 96C292 84 302 80 316 80H384C401 80 408 87 408 101" stroke="#fff" stroke-width="4" opacity=".7"/>
      <rect x="296" y="104" width="108" height="104" rx="20" fill="#171513"/>
      <rect x="306" y="114" width="88" height="84" rx="15" fill="url(#med-screen)"/>
      <path d="M321 158C331 140 340 178 351 150C362 122 374 164 384 139" stroke="#f4e9df" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".88"/>
      <circle cx="350" cy="236" r="17" fill="#292420" stroke="#fff" stroke-opacity=".55"/>
      <circle cx="350" cy="236" r="7" fill="var(--brand-main)"/>
      <rect x="319" y="266" width="62" height="7" rx="3.5" fill="#625951" opacity=".48"/>
      <rect x="329" y="279" width="42" height="5" rx="2.5" fill="#625951" opacity=".25"/>
    </g>

    <g transform="translate(58 58)">
      <rect width="156" height="118" rx="12" fill="var(--bg-card)" stroke="var(--border-soft)"/>
      <ellipse cx="78" cy="60" rx="40" ry="17" fill="#1f1b18" opacity=".12"/>
      <path d="M53 70V43L78 29L103 43V70L78 84L53 70Z" fill="var(--brand-main)" opacity=".2" stroke="var(--brand-main)"/>
      <path d="M53 43L78 58L103 43M78 58V84" stroke="var(--brand-main)" stroke-width="1.5"/>
      <circle cx="25" cy="22" r="5" fill="var(--brand-main)"/>
      <rect x="38" y="18" width="66" height="7" rx="3.5" fill="var(--text-main)" opacity=".55"/>
      <rect x="38" y="94" width="82" height="5" rx="2.5" fill="var(--text-main)" opacity=".15"/>
    </g>

    <g transform="translate(502 64)">
      <rect width="142" height="162" rx="12" fill="var(--bg-card)" stroke="var(--border-soft)"/>
      <circle cx="71" cy="67" r="38" fill="var(--brand-main)" opacity=".08"/>
      <circle cx="71" cy="67" r="30" stroke="var(--brand-main)" stroke-width="2" opacity=".65"/>
      <circle cx="71" cy="67" r="18" stroke="var(--brand-main)" stroke-width="7" opacity=".35"/>
      <path d="M71 32V19M71 115V102M36 67H23M119 67H106" stroke="var(--brand-main)" stroke-width="2"/>
      <rect x="26" y="124" width="90" height="6" rx="3" fill="var(--text-main)" opacity=".18"/>
      <rect x="42" y="138" width="58" height="5" rx="2.5" fill="var(--text-main)" opacity=".12"/>
    </g>

    <g stroke="var(--brand-main)" stroke-width="1.5" opacity=".62">
      <path d="M276 91H244V139"/><path d="M424 91H456V139"/>
      <path d="M276 285H244V245"/><path d="M424 285H456V245"/>
      <path d="M214 116H250" stroke-dasharray="5 6"/><path d="M454 142H502" stroke-dasharray="5 6"/>
    </g>
    <circle cx="244" cy="139" r="4" fill="var(--brand-main)"/>
    <circle cx="456" cy="245" r="4" fill="var(--brand-main)"/>
  </svg>
</template>

<style scoped>
svg { display: block; background: var(--bg-soft); }
</style>
