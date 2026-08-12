<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import MagneticDotGridCanvas from './components/MagneticDotGridCanvas.vue'
import BodyContainer from './components/BodyContainer.vue'
import HomeHeader from './components/home/HomeHeader.vue'
import HomeMain from './components/home/HomeMain.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
void breakpoints
// const showDotGridCanvas = breakpoints.greaterOrEqual('lg')
const showDotGridCanvas = false
</script>

<template>
  <MagneticDotGridCanvas v-if="showDotGridCanvas"></MagneticDotGridCanvas>

  <BodyContainer>
    <div class="lg:flex lg:justify-between lg:gap-4">
      <HomeHeader></HomeHeader>
      <HomeMain></HomeMain>
    </div>
  </BodyContainer>
</template>
