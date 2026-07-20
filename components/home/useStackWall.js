import { onMounted, onUnmounted, ref } from 'vue'

const DESKTOP_MIN_WIDTH = 900
const STICKY_TOP = 96
const LAYER_GAP = 20

export const getStackCardStyle = (index) => ({
  '--stack-index': index,
  '--sticky-offset': `${STICKY_TOP + index * LAYER_GAP}px`
})

export const useStackWall = (cardSelector) => {
  const wallRef = ref(null)

  let animationFrame = 0
  let reducedMotionQuery

  const getCards = () => wallRef.value
    ? [...wallRef.value.querySelectorAll(cardSelector)]
    : []

  const resetCardEffects = () => {
    getCards().forEach((card) => {
      card.style.setProperty('--stack-scale', '1')
      card.style.setProperty('--stack-lift', '0px')
      card.style.setProperty('--stack-brightness', '1')
      card.style.setProperty('--stack-blur', '0px')
    })
  }

  const updateCardEffects = () => {
    animationFrame = 0

    const cards = getCards()
    if (cards.length < 2 || window.innerWidth < DESKTOP_MIN_WIDTH || reducedMotionQuery?.matches) {
      resetCardEffects()
      return
    }

    const approachStart = window.innerHeight * 0.88

    cards.forEach((card, index) => {
      const nextCard = cards[index + 1]

      if (!nextCard) {
        card.style.setProperty('--stack-scale', '1')
        card.style.setProperty('--stack-lift', '0px')
        card.style.setProperty('--stack-brightness', '1')
        card.style.setProperty('--stack-blur', '0px')
        return
      }

      const nextTop = nextCard.getBoundingClientRect().top
      const nextStickyTop = STICKY_TOP + (index + 1) * LAYER_GAP
      const distance = Math.max(approachStart - nextStickyTop, 1)
      const progress = Math.min(Math.max((approachStart - nextTop) / distance, 0), 1)

      card.style.setProperty('--stack-scale', String(1 - progress * 0.025))
      card.style.setProperty('--stack-lift', `${progress * -8}px`)
      card.style.setProperty('--stack-brightness', String(1 - progress * 0.12))
      card.style.setProperty('--stack-blur', `${(progress * 12).toFixed(1)}px`)
    })
  }

  const requestCardUpdate = () => {
    if (animationFrame) return
    animationFrame = window.requestAnimationFrame(updateCardEffects)
  }

  onMounted(() => {
    reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    window.addEventListener('scroll', requestCardUpdate, { passive: true })
    window.addEventListener('resize', requestCardUpdate)
    reducedMotionQuery.addEventListener?.('change', requestCardUpdate)
    requestCardUpdate()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', requestCardUpdate)
    window.removeEventListener('resize', requestCardUpdate)
    reducedMotionQuery?.removeEventListener?.('change', requestCardUpdate)

    if (animationFrame) window.cancelAnimationFrame(animationFrame)
  })

  return wallRef
}
