<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ChevronLeftIcon from '@iconify-vue/tabler/chevron-left'
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <RouterLink :to="{ name: 'home' }" class="group -m-2.5" aria-label="Zurück zur Homepage">
      <span class="sr-only">Zurück zur Homepage</span>
      <ChevronLeftIcon
        class="size-15 group-[:is(:hover,:focus-visible)]:text-neutral-800 group-[:is(:hover,:focus-visible)]:drop-shadow-md/50 dark:group-[:is(:hover,:focus-visible)]:text-neutral-100 dark:group-[:is(:hover,:focus-visible)]:drop-shadow-white"
        aria-hidden="true"
      />
    </RouterLink>
    <div class="ml-4 flex flex-col gap-2 border-l border-neutral-500 pl-5">
      <h1 class="text-4xl font-bold text-neutral-800 dark:text-neutral-200">404</h1>
      <p class="leading-tight">Seite nicht gefunden.</p>
    </div>
  </div>
</template>
