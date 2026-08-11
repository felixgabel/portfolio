<script setup lang="ts">
const props = defineProps<{
  href: string
  ariaLabel?: string
  title?: string
}>()
</script>

<template>
  <a
    :href="props.href"
    target="_blank"
    rel="noreferrer noopener"
    :aria-label="`${props.ariaLabel} (öffnet in neuem Tab)`"
    :title="props.title"
  >
    <slot></slot>
  </a>
</template>
