<script setup lang="ts">
import type { Component } from 'vue'

const props = withDefaults(
  defineProps<{
    href: string
    label: string
    ariaLabel?: string
    outlineIcon: Component
    filledIcon: Component
  }>(),
  {
    ariaLabel: undefined,
  },
)
</script>

<template>
  <a
    class="group relative block text-neutral-700 dark:text-neutral-300"
    :href="props.href"
    target="_blank"
    rel="noreferrer noopener"
    :aria-label="props.ariaLabel ?? props.label"
    :title="props.label"
  >
    <span class="sr-only">{{ props.label }}</span>
    <span class="relative block size-7">
      <component
        :is="props.outlineIcon"
        class="absolute transition-opacity duration-200 group-[:is(:hover,:focus-visible)]:opacity-0 motion-reduce:transition-none"
      />
      <component
        :is="props.filledIcon"
        class="absolute opacity-0 transition-opacity duration-200 group-[:is(:hover,:focus-visible)]:opacity-100 motion-reduce:transition-none"
      />
    </span>
    <div
      class="absolute -inset-2 -z-1 rounded-full opacity-0 shadow-[0_0_5px_0_rgb(0_0_0/.075)] inset-shadow-[0_0_22px_0_rgb(255_255_255/.75)] drop-shadow-sm/40 backdrop-blur-[1.1px] transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none dark:inset-shadow-[0_0_12px_0_rgb(60_60_60/.75)] dark:drop-shadow-white/25 dark:backdrop-brightness-130"
      aria-hidden="true"
    ></div>
  </a>
</template>
