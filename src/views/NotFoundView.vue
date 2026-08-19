<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ChevronLeftIcon from '@iconify-vue/tabler/chevron-left'
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <RouterLink
      :to="{ name: 'home' }"
      class="group relative -m-2.5"
      aria-label="Zurück zur Homepage"
    >
      <span class="sr-only">Zurück zur Homepage</span>
      <ChevronLeftIcon class="size-15 text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
      <div
        class="absolute inset-0 -z-1 translate-x-px rounded-xl opacity-0 shadow-[0_0_5px_0_rgb(0_0_0/.075)] inset-shadow-[0_0_12px_0_rgb(255_255_255/.75)] drop-shadow-sm/25 backdrop-blur-[1.2px] transition-opacity duration-200 group-[:is(:hover,:focus-visible)]:opacity-100 motion-reduce:transition-none dark:inset-shadow-[0_0_12px_0_rgb(60_60_60/.75)] dark:drop-shadow-white/75 dark:backdrop-brightness-130"
        aria-hidden="true"
      ></div>
    </RouterLink>
    <div class="ml-4 flex flex-col gap-2 border-l border-neutral-500 pl-5">
      <h1 class="text-4xl font-bold text-neutral-800 dark:text-neutral-200">404</h1>
      <p class="leading-tight">Seite nicht gefunden.</p>
    </div>
  </div>
</template>
