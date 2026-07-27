<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { RouterView } from 'vue-router'
import BodyContainer from './components/BodyContainer.vue'
import MainHeader from './components/MainHeader.vue'
import MagneticDotGridCanvas from './components/MagneticDotGridCanvas.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const showMagneticGrid = breakpoints.greaterOrEqual('lg')
</script>

<template>
  <MagneticDotGridCanvas v-if="showMagneticGrid"></MagneticDotGridCanvas>

  <BodyContainer>
    <div class="lg:flex lg:justify-between lg:gap-4">
      <MainHeader></MainHeader>

      <main class="pt-24 lg:w-[52%] lg:py-24">
        <RouterView />
      </main>
    </div>
  </BodyContainer>
</template>
