<script setup lang="ts">
import { useMouse } from '@vueuse/core'
const { x: mouseX, y: mouseY } = useMouse()
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-30 bg-(image:--cursor-light) transition duration-300 lg:absolute dark:bg-(image:--cursor-dark)"
    :style="{
      '--cursor-light': `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(204, 196, 102, 0.15), transparent 80%)`,
      '--cursor-dark': `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
    }"
  ></div>
</template>
