<template>
  <svg class="about-ident" viewBox="0 0 320 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="ai-glow" cx="50%" cy="42%" r="50%">
        <stop offset="0%" stop-color="var(--brand-main)" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="var(--brand-main)" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="ai-clip">
        <rect x="0" y="0" width="320" height="380" rx="16"/>
      </clipPath>
    </defs>

    <!-- Background fill -->
    <rect width="320" height="380" rx="16"
      fill="var(--brand-main)" fill-opacity="0.04"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.18"/>

    <!-- Ambient glow -->
    <ellipse cx="160" cy="160" rx="160" ry="160" fill="url(#ai-glow)"/>

    <!-- Outer portrait circle -->
    <circle cx="160" cy="155" r="120"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.2"
      stroke-dasharray="6 5" fill="none"/>

    <!-- Middle circle -->
    <circle cx="160" cy="155" r="84"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.28" fill="none"/>

    <!-- Inner filled circle (head area) -->
    <circle cx="160" cy="130" r="42"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.45"
      fill="var(--brand-main)" fill-opacity="0.07"/>

    <!-- Shoulders/body arc -->
    <path d="M88 220 Q100 190 160 185 Q220 190 232 220"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.4"
      fill="var(--brand-main)" fill-opacity="0.05"/>

    <!-- Face geometry (abstract) -->
    <!-- Eyes -->
    <circle cx="144" cy="124" r="4" fill="var(--brand-main)" opacity="0.6"/>
    <circle cx="176" cy="124" r="4" fill="var(--brand-main)" opacity="0.6"/>
    <!-- Mouth line -->
    <path d="M148 144 Q160 152 172 144"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.5"
      stroke-linecap="round" fill="none"/>

    <!-- Decorative rings at top -->
    <circle class="ring-a" cx="160" cy="155" r="108"
      stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.12"
      stroke-dasharray="3 8" fill="none"/>

    <!-- Corner grid marks -->
    <line x1="16" y1="16" x2="40" y2="16" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35"/>
    <line x1="16" y1="16" x2="16" y2="40" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35"/>
    <line x1="304" y1="16" x2="280" y2="16" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35"/>
    <line x1="304" y1="16" x2="304" y2="40" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35"/>
    <line x1="16" y1="364" x2="40" y2="364" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35"/>
    <line x1="16" y1="364" x2="16" y2="340" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35"/>
    <line x1="304" y1="364" x2="280" y2="364" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35"/>
    <line x1="304" y1="364" x2="304" y2="340" stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.35"/>

    <!-- Bottom label area -->
    <rect x="90" y="290" width="140" height="28" rx="5"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.3"
      fill="var(--brand-main)" fill-opacity="0.06"/>
    <text x="160" y="309" text-anchor="middle" fill="var(--brand-main)"
      font-size="10" opacity="0.65" font-family="ui-monospace,monospace" letter-spacing="2">LIULI AI LAB</text>

    <!-- Dot accent row -->
    <circle cx="138" cy="345" r="2.5" fill="var(--brand-main)" opacity="0.35"/>
    <circle cx="148" cy="345" r="2.5" fill="var(--brand-main)" opacity="0.5"/>
    <circle cx="158" cy="345" r="2.5" fill="var(--brand-main)" opacity="0.7"/>
    <circle cx="168" cy="345" r="2.5" fill="var(--brand-main)" opacity="0.5"/>
    <circle cx="178" cy="345" r="2.5" fill="var(--brand-main)" opacity="0.35"/>
  </svg>
</template>

<style scoped>
.about-ident {
  width: 100%;
  height: auto;
  display: block;
}

.ring-a {
  transform-origin: 160px 155px;
  animation: slow-spin 28s linear infinite;
}

@keyframes slow-spin { to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) {
  .ring-a { animation: none; }
}
</style>
