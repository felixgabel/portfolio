<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import BodyContainer from './components/BodyContainer.vue'
import MainHeader from './components/MainHeader.vue'
import MagneticDotGridCanvas from './components/MagneticDotGridCanvas.vue'
import MainBody from './components/MainBody.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
void breakpoints
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
