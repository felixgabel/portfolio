<script setup lang="ts">
const props = defineProps<{
  href: string
  ariaLabel?: string
  title?: string
}>()
</script>

<template>
  <a
    class="inline-block rounded-xs bg-neutral-800/5 px-1 font-medium text-neutral-800 dark:bg-neutral-200/15 dark:text-neutral-200"
    target="_blank"
    rel="noreferrer noopener"
    :href="props.href"
    :aria-label="`${props.ariaLabel} (öffnet in neuem Tab)`"
    :title="props.title"
  >
    <slot></slot>
  </a>
</template>
