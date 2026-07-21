<script setup lang="ts">
import { useMouse } from '@vueuse/core'
const { x: mouseX, y: mouseY } = useMouse({ type: 'client' })
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 -z-1 mask-(--gradient-at-cursor-position) backdrop-blur-[1.5px] max-lg:mask-(--vignette-gradient-light) dark:backdrop-brightness-700 max-lg:dark:mask-(--vignette-gradient-dark)"
    :style="{
      '--gradient-at-cursor-position': `radial-gradient(500px at ${mouseX}px ${mouseY}px, black 0%, transparent 70%)`,
      '--vignette-gradient-light': 'radial-gradient(1000px at center, black 0%, transparent 50%)',
      '--vignette-gradient-dark': 'radial-gradient(1000px at center, transparent 0%, black 70%)',
    }"
  ></div>
</template>
