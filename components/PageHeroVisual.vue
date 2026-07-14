<script setup>
defineProps({
  variant: {
    type: String,
    default: 'system'
  }
})
</script>

<template>
  <svg class="page-visual" viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g class="page-visual__grid" opacity=".28">
      <path d="M28 42H392M28 94H392M28 146H392M28 198H392M80 22V238M158 22V238M236 22V238M314 22V238" />
    </g>

    <template v-if="variant === 'cases'">
      <rect x="50" y="52" width="198" height="132" rx="8" />
      <rect x="116" y="78" width="198" height="132" rx="8" class="page-visual__strong" />
      <path d="M144 176l46-48 34 32 34-26 29 42" class="page-visual__strong" />
      <circle cx="266" cy="112" r="13" class="page-visual__node" />
      <path d="M314 102h50M314 126h36M314 150h50" />
    </template>

    <template v-else-if="variant === 'workflow'">
      <path d="M46 130H374" class="page-visual__strong" />
      <g v-for="(x, index) in [60, 134, 208, 282, 356]" :key="x">
        <circle :cx="x" cy="130" r="20" :class="index === 4 ? 'page-visual__node' : ''" />
        <text :x="x" y="135" text-anchor="middle">{{ index + 1 }}</text>
      </g>
      <path d="M356 164c0 42-58 54-148 54S60 206 60 164" stroke-dasharray="6 7" />
    </template>

    <template v-else-if="variant === 'knowledge'">
      <path d="M210 55v52M210 153v52M88 130h94M238 130h94" class="page-visual__strong" />
      <rect x="176" y="107" width="68" height="46" rx="8" class="page-visual__node" />
      <rect x="166" y="30" width="88" height="38" rx="6" />
      <rect x="44" y="111" width="88" height="38" rx="6" />
      <rect x="288" y="111" width="88" height="38" rx="6" />
      <rect x="166" y="192" width="88" height="38" rx="6" />
    </template>

    <template v-else-if="variant === 'about'">
      <circle cx="210" cy="104" r="48" class="page-visual__strong" />
      <path d="M126 218c13-48 42-72 84-72s71 24 84 72" class="page-visual__strong" />
      <circle cx="78" cy="74" r="7" class="page-visual__node" />
      <circle cx="342" cy="74" r="7" class="page-visual__node" />
      <path d="M84 78l74 30M336 78l-74 30M108 218h204" stroke-dasharray="6 7" />
    </template>

    <template v-else>
      <circle cx="210" cy="130" r="44" class="page-visual__strong" />
      <circle cx="210" cy="130" r="88" />
      <path d="M210 24v62M210 174v62M104 130h62M254 130h62" />
      <circle cx="210" cy="24" r="8" class="page-visual__node" />
      <circle cx="316" cy="130" r="8" class="page-visual__node" />
      <circle cx="210" cy="236" r="8" class="page-visual__node" />
      <circle cx="104" cy="130" r="8" class="page-visual__node" />
    </template>
  </svg>
</template>

<style scoped>
.page-visual {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  color: var(--brand-main);
}

.page-visual :deep(path),
.page-visual :deep(rect),
.page-visual :deep(circle) {
  stroke: currentColor;
  stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
}

.page-visual__grid path { stroke-width: 1; }
.page-visual__strong { stroke-width: 2.4 !important; }
.page-visual__node { fill: currentColor; }
.page-visual text {
  fill: var(--text-main);
  font: 700 12px var(--font-sans);
}
</style>
