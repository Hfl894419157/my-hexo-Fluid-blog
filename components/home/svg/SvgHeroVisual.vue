<template>
  <svg class="svg-hero" viewBox="0 0 520 560" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <pattern id="hv-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="var(--brand-main)" opacity="0.18"/>
      </pattern>
      <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--brand-main)" stop-opacity="0.13"/>
        <stop offset="100%" stop-color="var(--brand-main)" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="hv-fade" cx="50%" cy="50%" r="50%">
        <stop offset="50%" stop-color="white" stop-opacity="1"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>
      <mask id="hv-dot-mask">
        <rect width="520" height="560" fill="url(#hv-fade)"/>
      </mask>
    </defs>

    <!-- Dot grid (faded at edges) -->
    <rect width="520" height="560" fill="url(#hv-dots)" mask="url(#hv-dot-mask)"/>

    <!-- Ambient center glow -->
    <ellipse cx="260" cy="280" rx="230" ry="230" fill="url(#hv-glow)"/>

    <!-- Outer dashed orbital ring (rotates) -->
    <circle class="ring-outer" cx="260" cy="280" r="205"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.22"
      stroke-dasharray="10 7" fill="none"/>

    <!-- Middle circle -->
    <circle cx="260" cy="280" r="145"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.16" fill="none"/>

    <!-- Inner circle -->
    <circle cx="260" cy="280" r="88"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.24" fill="none"/>

    <!-- Hexagonal connection frame (6 nodes on r=200 hex) -->
    <!-- Positions: top(260,80), rt(433,180), rb(433,380), bot(260,480), lb(87,380), lt(87,180) -->
    <polygon class="hex-frame"
      points="260,80 433,180 433,380 260,480 87,380 87,180"
      stroke="var(--brand-main)" stroke-width="1" stroke-opacity="0.18" fill="none"/>

    <!-- Inner hexagon (counter-rotates) -->
    <polygon class="hex-inner"
      points="260,232 303,256 303,304 260,328 217,304 217,256"
      stroke="var(--brand-main)" stroke-width="1.5" stroke-opacity="0.32" fill="none"/>

    <!-- Spokes center → nodes -->
    <line x1="260" y1="280" x2="260" y2="80" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.18"/>
    <line x1="260" y1="280" x2="433" y2="180" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.18"/>
    <line x1="260" y1="280" x2="433" y2="380" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.18"/>
    <line x1="260" y1="280" x2="260" y2="480" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.18"/>
    <line x1="260" y1="280" x2="87" y2="380" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.18"/>
    <line x1="260" y1="280" x2="87" y2="180" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.18"/>

    <!-- Node dots -->
    <circle cx="260" cy="80"  r="5.5" fill="var(--brand-main)" opacity="0.8"/>
    <circle cx="433" cy="180" r="5.5" fill="var(--brand-main)" opacity="0.8"/>
    <circle cx="433" cy="380" r="5.5" fill="var(--brand-main)" opacity="0.8"/>
    <circle cx="260" cy="480" r="5.5" fill="var(--brand-main)" opacity="0.8"/>
    <circle cx="87"  cy="380" r="5.5" fill="var(--brand-main)" opacity="0.8"/>
    <circle cx="87"  cy="180" r="5.5" fill="var(--brand-main)" opacity="0.8"/>

    <!-- Node pulse halos (staggered animation) -->
    <circle class="halo h1" cx="260" cy="80"  r="14" stroke="var(--brand-main)" stroke-width="1" fill="none"/>
    <circle class="halo h2" cx="433" cy="180" r="14" stroke="var(--brand-main)" stroke-width="1" fill="none"/>
    <circle class="halo h3" cx="433" cy="380" r="14" stroke="var(--brand-main)" stroke-width="1" fill="none"/>
    <circle class="halo h4" cx="260" cy="480" r="14" stroke="var(--brand-main)" stroke-width="1" fill="none"/>
    <circle class="halo h5" cx="87"  cy="380" r="14" stroke="var(--brand-main)" stroke-width="1" fill="none"/>
    <circle class="halo h6" cx="87"  cy="180" r="14" stroke="var(--brand-main)" stroke-width="1" fill="none"/>

    <!-- Label tags -->
    <g transform="translate(222,50)">
      <rect width="76" height="22" rx="4" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.5"
        fill="var(--brand-main)" fill-opacity="0.07"/>
      <text x="38" y="15" text-anchor="middle" fill="var(--brand-main)" font-size="9"
        opacity="0.75" font-family="ui-monospace,monospace" letter-spacing="1.5">BRIEF</text>
    </g>
    <g transform="translate(442,162)">
      <rect width="72" height="22" rx="4" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.5"
        fill="var(--brand-main)" fill-opacity="0.07"/>
      <text x="36" y="15" text-anchor="middle" fill="var(--brand-main)" font-size="9"
        opacity="0.75" font-family="ui-monospace,monospace" letter-spacing="1.5">VARS</text>
    </g>
    <g transform="translate(442,362)">
      <rect width="72" height="22" rx="4" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.5"
        fill="var(--brand-main)" fill-opacity="0.07"/>
      <text x="36" y="15" text-anchor="middle" fill="var(--brand-main)" font-size="9"
        opacity="0.75" font-family="ui-monospace,monospace" letter-spacing="1.5">GEN</text>
    </g>
    <g transform="translate(218,488)">
      <rect width="84" height="22" rx="4" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.5"
        fill="var(--brand-main)" fill-opacity="0.07"/>
      <text x="42" y="15" text-anchor="middle" fill="var(--brand-main)" font-size="9"
        opacity="0.75" font-family="ui-monospace,monospace" letter-spacing="1.5">JUDGE</text>
    </g>
    <g transform="translate(4,362)">
      <rect width="76" height="22" rx="4" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.5"
        fill="var(--brand-main)" fill-opacity="0.07"/>
      <text x="38" y="15" text-anchor="middle" fill="var(--brand-main)" font-size="9"
        opacity="0.75" font-family="ui-monospace,monospace" letter-spacing="1.5">ASSETS</text>
    </g>
    <g transform="translate(4,162)">
      <rect width="76" height="22" rx="4" stroke="var(--brand-main)" stroke-width="0.75" stroke-opacity="0.5"
        fill="var(--brand-main)" fill-opacity="0.07"/>
      <text x="38" y="15" text-anchor="middle" fill="var(--brand-main)" font-size="9"
        opacity="0.75" font-family="ui-monospace,monospace" letter-spacing="1.5">POLISH</text>
    </g>

    <!-- Center hub -->
    <circle cx="260" cy="280" r="20" stroke="var(--brand-main)" stroke-width="1.5"
      stroke-opacity="0.38" fill="var(--brand-main)" fill-opacity="0.09"/>
    <circle cx="260" cy="280" r="7"  fill="var(--brand-main)" opacity="0.9"/>
    <circle class="hub-pulse" cx="260" cy="280" r="20"
      stroke="var(--brand-main)" stroke-width="1.5" fill="none"/>
  </svg>
</template>

<style scoped>
.svg-hero {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* Outer ring slow rotation */
.ring-outer {
  transform-origin: 260px 280px;
  animation: spin-cw 32s linear infinite;
}

/* Inner hex counter-rotation */
.hex-inner {
  transform-origin: 260px 280px;
  animation: spin-ccw 22s linear infinite;
}

/* Hex frame subtle pulse */
.hex-frame {
  animation: fade-pulse 5s ease-in-out infinite;
}

/* Node halos — staggered pulse */
.halo {
  animation: halo-out 3.6s ease-out infinite;
  opacity: 0;
}
.h1 { animation-delay: 0s;    transform-origin: 260px 80px;  }
.h2 { animation-delay: 0.6s;  transform-origin: 433px 180px; }
.h3 { animation-delay: 1.2s;  transform-origin: 433px 380px; }
.h4 { animation-delay: 1.8s;  transform-origin: 260px 480px; }
.h5 { animation-delay: 2.4s;  transform-origin: 87px 380px;  }
.h6 { animation-delay: 3.0s;  transform-origin: 87px 180px;  }

/* Hub center pulse */
.hub-pulse {
  transform-origin: 260px 280px;
  animation: hub-ring 2.8s ease-out infinite;
}

@keyframes spin-cw  { to { transform: rotate(360deg);  } }
@keyframes spin-ccw { to { transform: rotate(-360deg); } }

@keyframes fade-pulse {
  0%, 100% { stroke-opacity: 0.18; }
  50%       { stroke-opacity: 0.38; }
}

@keyframes halo-out {
  0%   { transform: scale(1);   opacity: 0.55; }
  100% { transform: scale(2.6); opacity: 0;    }
}

@keyframes hub-ring {
  0%   { transform: scale(1);   opacity: 0.5; }
  100% { transform: scale(2.2); opacity: 0;   }
}

@media (prefers-reduced-motion: reduce) {
  .ring-outer, .hex-inner, .hex-frame,
  .halo, .hub-pulse { animation: none; }
}
</style>
