<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  href: string
}>()

const linkElement = ref<HTMLAnchorElement | null>(null)
const slotTextContent = ref('')

onMounted(() => {
  slotTextContent.value = linkElement.value?.textContent?.trim() ?? ''
})
</script>

<template>
  <a
    ref="linkElement"
    :data-text="slotTextContent"
    class="relative inline-block px-1 font-medium whitespace-nowrap text-neutral-800 no-underline before:absolute before:inset-x-0 before:inset-y-[0.1rem] before:rounded-xs before:bg-neutral-800/5 before:transition-colors after:pointer-events-none after:absolute after:inset-0 after:px-1 after:text-transparent after:underline after:decoration-neutral-800 after:underline-offset-2 after:transition-[clip-path] after:content-[attr(data-text)] after:select-none after:[clip-path:inset(0_50%_0_50%)] before:motion-reduce:transition-none after:motion-reduce:transition-none dark:text-neutral-200 before:dark:bg-neutral-200/15 after:dark:decoration-neutral-200 [:is(:hover,:focus-visible)]:before:bg-neutral-800/10 [:is(:hover,:focus-visible)]:after:[clip-path:inset(0_0_0_0)] dark:[:is(:hover,:focus-visible)]:before:bg-neutral-200/20"
    target="_blank"
    rel="noreferrer noopener"
    :href="props.href"
    :aria-label="`${slotTextContent} (öffnet in neuem Tab)`"
  >
    <slot></slot>
  </a>
</template>
