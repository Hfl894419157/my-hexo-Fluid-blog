<script setup>
import { data as contentCatalog } from '../../.shared/content.data.mjs'
import { formatCardNumber, normalizeHomeSelections, resolveSelections } from '../../.shared/contentClient.js'
import homeSelectionsRaw from '../../.shared/content/home.json'
import BaseButton from '../BaseButton.vue'
import SectionHeader from '../SectionHeader.vue'
import SectionShell from '../SectionShell.vue'
import ImagePlaceholder from '../ImagePlaceholder.vue'
import { getStackCardStyle, useStackWall } from './useStackWall.js'

const homeSelections = normalizeHomeSelections(homeSelectionsRaw)
const cases = resolveSelections(contentCatalog.cases, homeSelections.featuredCases)
const caseWall = useStackWall('.case-wall__card')
</script>

<template>
  <SectionShell id="featured-cases" compact>
    <div class="case-wall__head">
      <SectionHeader
        :title-lines="['先看结果', '再理解它为什么成立']"
        desc="每个案例把作品、判断和上下文放在同一条证据链上。向下滚动，案例会依次进入视野。"
      />
      <BaseButton href="/portfolio/" variant="ghost">全部案例</BaseButton>
    </div>

    <div ref="caseWall" class="case-wall" :class="{ 'case-wall--static': cases.length < 2 }">
      <template v-for="(item, index) in cases" :key="item.id">
        <article
          class="case-wall__card"
          :style="getStackCardStyle(index)"
        >
          <a class="case-wall__media" :href="item.link" :aria-label="`查看案例：${item.title}`">
            <ImagePlaceholder
              :src="item.homeCover"
              :alt="item.coverAlt"
              :subject="`${item.title}的项目主视觉或最终成果`"
              :filename="item.imageFilename"
              aspect="16 / 10"
              profile="homeMobile"
              desktop-profile="homeDesktop"
              :focal-point="item.coverFocalPoint"
              sizes="(max-width: 899px) calc(100vw - 48px), 648px"
            />
          </a>
          <div class="case-wall__copy">
            <span class="case-wall__number">{{ formatCardNumber(index + 1) }} / {{ formatCardNumber(cases.length) }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="case-wall__tags">
              <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
            </div>
            <a class="case-wall__link" :href="item.link">查看完整案例 <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <div
          class="case-wall__spacer"
          :class="{ 'case-wall__spacer--last': index === cases.length - 1 }"
          aria-hidden="true"
        />
      </template>
      <div v-if="!cases.length" class="case-wall__empty" role="status">内容整理中</div>
    </div>
  </SectionShell>
</template>

<style scoped>
.case-wall__head { display: grid; justify-items: center; gap: 24px; text-align: center; }
.case-wall {
  --case-card-height: clamp(520px, calc(100vh - 180px), 640px);
  width: min(1080px, 100%);
  margin: 48px auto 0;
}
.case-wall__card {
  --stack-scale: 1;
  --stack-lift: 0px;
  --stack-brightness: 1;
  position: sticky;
  top: var(--sticky-offset);
  z-index: calc(10 + var(--stack-index));
  display: grid;
  grid-template-columns: minmax(0, 60%) minmax(0, 40%);
  width: 100%;
  height: var(--case-card-height);
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: 18px;
  background:
    linear-gradient(var(--bg-card), var(--bg-card)),
    var(--bg-page);
  box-shadow: 0 28px 80px color-mix(in srgb, var(--text-main) 12%, transparent);
  filter: brightness(var(--stack-brightness));
  transform: translateY(var(--stack-lift)) scale(var(--stack-scale));
  transform-origin: center top;
  will-change: transform, filter;
}
.case-wall__spacer { height: clamp(300px, 52vh, 480px); }
.case-wall__spacer--last { height: clamp(240px, 34vh, 340px); }
.case-wall--static { display: grid; gap: 20px; }
.case-wall__empty { display: grid; min-height: 220px; place-content: center; border: 1px dashed var(--border-soft); border-radius: 18px; background: var(--bg-soft); color: var(--text-muted); font-size: 15px; letter-spacing: .08em; }
.case-wall--static .case-wall__card {
  position: static;
  filter: none;
  transform: none;
  will-change: auto;
}
.case-wall--static .case-wall__spacer { display: none; }
.case-wall__media { display: block; min-width: 0; overflow: hidden; background: var(--bg-soft); }
.case-wall__media :deep(.image-slot) { height: 100%; border: 0; border-right: 1px solid var(--border-soft); }
.case-wall__copy { display: flex; min-width: 0; flex-direction: column; justify-content: center; padding: 46px 42px; }
.case-wall__number { color: var(--brand-main); font: 700 11px/1 var(--font-mono); letter-spacing: .14em; }
.case-wall h3 { margin: 20px 0 0; font-size: 34px; line-height: 1.3; }
.case-wall p { margin: 18px 0 0; color: var(--text-sub); font-size: 14px; line-height: 1.85; }
.case-wall__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
.case-wall__tags span { padding: 7px 9px; border: 1px solid var(--border-soft); border-radius: 7px; background: var(--bg-soft); color: var(--text-sub); font-size: 11px; font-weight: 600; }
.case-wall__link { width: fit-content; margin-top: 34px; color: var(--brand-main); font-size: 14px; font-weight: 700; text-decoration: none; }
.case-wall__link span { display: inline-block; margin-left: 5px; transition: transform 180ms ease; }
.case-wall__link:hover span { transform: translateX(4px); }
@media (max-width: 899px) {
  .case-wall { display: grid; gap: 20px; }
  .case-wall__card {
    position: static;
    height: auto;
    grid-template-columns: 1fr;
    filter: none;
    transform: none;
    will-change: auto;
  }
  .case-wall__spacer { display: none; }
  .case-wall__media :deep(.image-slot) { height: auto; aspect-ratio: 16 / 10; border-right: 0; border-bottom: 1px solid var(--border-soft); }
  .case-wall__copy { padding: 30px 26px 34px; }
  .case-wall h3 { font-size: 27px; }
}
@media (prefers-reduced-motion: reduce) {
  .case-wall { display: grid; gap: 20px; }
  .case-wall__card {
    position: static;
    height: auto;
    filter: none;
    transform: none;
    will-change: auto;
  }
  .case-wall__spacer { display: none; }
}
@supports not (position: sticky) {
  .case-wall { display: grid; gap: 20px; }
  .case-wall__card {
    position: static;
    height: auto;
    filter: none;
    transform: none;
    will-change: auto;
  }
  .case-wall__spacer { display: none; }
}
</style>
