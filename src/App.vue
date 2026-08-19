<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import MagneticDotGridCanvas from './components/MagneticDotGridCanvas.vue'
import AppContainer from './components/AppContainer.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
void breakpoints
// const showDotGridCanvas = breakpoints.greaterOrEqual('lg')
const showDotGridCanvas = false
</script>

<template>
  <MagneticDotGridCanvas v-if="showDotGridCanvas" />

  <AppContainer>
    <RouterView />
  </AppContainer>
</template>
