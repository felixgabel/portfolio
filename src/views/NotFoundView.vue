<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ChevronLeftIcon from '@iconify-vue/tabler/chevron-left'
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <RouterLink :to="{ name: 'home' }" class="-m-2.5">
      <ChevronLeftIcon class="size-15 hover:text-neutral-800 hover:drop-shadow-md/50" />
    </RouterLink>
    <div class="ml-4 flex flex-col gap-2 border-l border-neutral-500 pl-5">
      <h1 class="text-4xl font-bold text-neutral-800 dark:text-neutral-200">404</h1>
      <p class="leading-tight">Seite nicht gefunden.</p>
    </div>
  </div>
</template>
