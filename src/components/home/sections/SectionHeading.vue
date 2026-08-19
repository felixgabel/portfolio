<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementBounding } from '@vueuse/core'

const stickyHeader = ref<HTMLElement | null>(null)
const { top } = useElementBounding(stickyHeader)

const isStuck = computed(() => top.value <= 0)
</script>

<template>
  <div
    ref="stickyHeader"
    class="sticky top-0 z-1 -mx-6 -mb-15 flex h-15 w-screen items-center bg-linear-to-b from-white to-white/10 to-80% px-6 backdrop-blur transition-shadow md:-mx-12 md:px-12 lg:sr-only dark:from-black dark:to-black/10 dark:shadow-white/12 dark:backdrop-brightness-120"
    :class="{
      'shadow-sm': isStuck,
    }"
  >
    <h2
      class="text-sm font-bold tracking-widest text-neutral-800 uppercase lg:sr-only dark:text-neutral-200"
    >
      <slot></slot>
    </h2>
  </div>
  <div class="h-19 lg:hidden">
    <!-- this spacer actually just adds 'h-4' but I have to account for the negative margin on the sticky header, which is '-mb-15' -->
  </div>
</template>
