<template>
  <svg viewBox="0 0 700 440" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="booth-bg" x1="84" y1="24" x2="620" y2="428" gradientUnits="userSpaceOnUse">
        <stop stop-color="var(--bg-card)"/>
        <stop offset="1" stop-color="var(--bg-soft)"/>
      </linearGradient>
      <linearGradient id="booth-wall" x1="250" y1="104" x2="438" y2="325" gradientUnits="userSpaceOnUse">
        <stop stop-color="#f8f5f1"/>
        <stop offset="1" stop-color="#cfc6be"/>
      </linearGradient>
      <linearGradient id="booth-accent" x1="260" y1="115" x2="440" y2="286" gradientUnits="userSpaceOnUse">
        <stop stop-color="var(--brand-second)"/>
        <stop offset="1" stop-color="var(--brand-main)"/>
      </linearGradient>
      <linearGradient id="booth-glass" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#fff" stop-opacity=".82"/>
        <stop offset="1" stop-color="var(--brand-main)" stop-opacity=".1"/>
      </linearGradient>
      <filter id="booth-shadow" x="-30%" y="-30%" width="170%" height="180%">
        <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#171310" flood-opacity=".18"/>
      </filter>
    </defs>

    <rect width="700" height="440" fill="url(#booth-bg)"/>
    <path d="M30 388L188 278H512L670 388L574 428H126L30 388Z" fill="var(--brand-main)" opacity=".08"/>
    <g stroke="var(--border-soft)" opacity=".78">
      <path d="M30 388L350 206L670 388"/>
      <path d="M126 428L350 206L574 428"/>
      <path v-for="n in 7" :key="`floor${n}`" :d="`M${n * 100} 440L350 206`"/>
      <path d="M70 368H630M106 342H594M150 312H550"/>
    </g>

    <g filter="url(#booth-shadow)">
      <rect x="118" y="82" width="464" height="18" rx="4" fill="#292521"/>
      <rect x="132" y="100" width="14" height="252" fill="#3a342f"/>
      <rect x="554" y="100" width="14" height="252" fill="#3a342f"/>
      <path d="M146 112H554V336H146V112Z" fill="url(#booth-wall)" stroke="#8f857d"/>
      <path d="M160 126H540V322H160V126Z" fill="var(--bg-card)" opacity=".58"/>

      <rect x="238" y="126" width="224" height="122" rx="7" fill="url(#booth-accent)"/>
      <path d="M268 209C295 165 318 224 350 176C379 134 402 203 432 155" stroke="#f8f5f1" stroke-width="6" stroke-linecap="round" opacity=".92"/>
      <circle cx="286" cy="171" r="18" stroke="#fff" stroke-width="2" opacity=".55"/>
      <circle cx="414" cy="205" r="25" stroke="#fff" stroke-width="2" opacity=".36"/>
      <rect x="286" y="261" width="128" height="8" rx="4" fill="#3b342f" opacity=".28"/>
      <rect x="312" y="278" width="76" height="6" rx="3" fill="#3b342f" opacity=".16"/>

      <g transform="translate(164 168)">
        <rect width="58" height="136" rx="12" fill="url(#booth-glass)" stroke="var(--brand-main)" stroke-opacity=".5"/>
        <ellipse cx="29" cy="22" rx="22" ry="8" fill="#fff" opacity=".7"/>
        <ellipse cx="29" cy="112" rx="22" ry="8" fill="var(--brand-main)" opacity=".15"/>
        <path d="M15 38C39 52 18 72 42 89" stroke="var(--brand-main)" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      </g>
      <g transform="translate(478 168)">
        <rect width="58" height="136" rx="12" fill="url(#booth-glass)" stroke="var(--brand-main)" stroke-opacity=".5"/>
        <ellipse cx="29" cy="22" rx="22" ry="8" fill="#fff" opacity=".7"/>
        <ellipse cx="29" cy="112" rx="22" ry="8" fill="var(--brand-main)" opacity=".15"/>
        <path d="M14 85C38 72 18 51 43 38" stroke="var(--brand-main)" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      </g>

      <path d="M268 316H432L454 360H246L268 316Z" fill="#2b2622"/>
      <path d="M280 304H420L432 316H268L280 304Z" fill="#f4efe9" stroke="#a59b92"/>
      <rect x="305" y="318" width="90" height="36" rx="4" fill="url(#booth-accent)" opacity=".9"/>
    </g>

    <g stroke="#3a342f" stroke-width="5" stroke-linecap="square">
      <path d="M104 350V70H596V350"/>
      <path d="M104 70H596"/>
    </g>
    <g fill="#f6eadf" stroke="#6e6259" stroke-opacity=".55">
      <path d="M172 70L188 96H156L172 70Z"/><path d="M350 70L366 96H334L350 70Z"/><path d="M528 70L544 96H512L528 70Z"/>
    </g>

    <g fill="#2d2925">
      <circle cx="214" cy="344" r="9"/>
      <path d="M199 390C201 363 206 354 214 354C222 354 228 363 230 390H199Z"/>
      <circle cx="491" cy="352" r="9"/>
      <path d="M476 398C478 371 483 362 491 362C499 362 505 371 507 398H476Z"/>
    </g>
    <path d="M190 407C264 370 308 418 370 391C426 367 470 386 528 356" stroke="var(--brand-main)" stroke-width="3" stroke-dasharray="8 10"/>
    <path d="M517 351L532 355L521 366" stroke="var(--brand-main)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<style scoped>
svg { display: block; background: var(--bg-soft); }
</style>
