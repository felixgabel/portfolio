<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useProgrammaticScrollStore } from '../../../stores/programmaticScroll'

const programmaticScrollStore = useProgrammaticScrollStore()
</script>

<template>
  <h1 class="text-4xl font-bold tracking-tight text-neutral-800 sm:text-5xl dark:text-neutral-200">
    <RouterLink
      to="/"
      replace
      @click="programmaticScrollStore.setIsScrollingToHashProgrammatically(true)"
      >Felix Gabel</RouterLink
    >
  </h1>
  <h2
    class="mt-3 text-lg font-medium tracking-tight text-neutral-800 sm:text-xl dark:text-neutral-200"
  >
    Frontend Entwickler
  </h2>
  <p
    class="mt-4 max-w-sm to-80% leading-normal lg:bg-linear-to-r lg:from-white/50 lg:to-transparent dark:lg:from-black/25"
  >
    Entwicklung von modernen Web-Anwendungen mit Fokus auf Exzellenz und Schönheit.
  </p>
</template>
