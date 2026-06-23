<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

const updateMousePosition = (event: MouseEvent) => {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition)
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-30 bg-(image:--cursor-light) transition duration-300 lg:absolute dark:bg-(image:--cursor-dark)"
    :style="{
      '--cursor-light': `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(255, 215, 0, 0.06), transparent 80%)`,
      '--cursor-dark': `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
    }"
  ></div>
</template>
