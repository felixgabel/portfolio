<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, useEventListener } from '@vueuse/core'
import { useProgrammaticScrollStore } from './stores/programmaticScroll'
import BodyContainer from './components/BodyContainer.vue'
import MainHeader from './components/MainHeader.vue'
import MagneticDotGridCanvas from './components/MagneticDotGridCanvas.vue'
import MainBody from './components/MainBody.vue'

const programmaticScrollStore = useProgrammaticScrollStore()

function setIsScrollingToHashProgrammaticallyFalse() {
  programmaticScrollStore.setIsScrollingToHashProgrammatically(false)
}

// 'scrollend' is the most important one, because after a programmatic scroll stops, it automatically sets the isScrollingToHashProgrammatically to false, which is what I want. The other event listeners are just for safety, in case the user interrupts the programmatic scroll with a mouse wheel, touch move, or key press.
useEventListener(window, 'scrollend', setIsScrollingToHashProgrammaticallyFalse)
useEventListener(window, 'wheel', setIsScrollingToHashProgrammaticallyFalse, { passive: true })
useEventListener(window, 'touchmove', setIsScrollingToHashProgrammaticallyFalse, { passive: true })
const keysThatCanTriggerScrolling = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
])
useEventListener(window, 'keydown', (event) => {
  if (!keysThatCanTriggerScrolling.has(event.key)) {
    return
  }

  setIsScrollingToHashProgrammaticallyFalse()
})

const breakpoints = useBreakpoints(breakpointsTailwind)
// const showDotGridCanvas = breakpoints.greaterOrEqual('lg')
const showDotGridCanvas = false
</script>

<template>
  <MagneticDotGridCanvas v-if="showDotGridCanvas"></MagneticDotGridCanvas>

  <BodyContainer>
    <div class="lg:flex lg:justify-between lg:gap-4">
      <MainHeader></MainHeader>
      <MainBody></MainBody>
    </div>
  </BodyContainer>
</template>
