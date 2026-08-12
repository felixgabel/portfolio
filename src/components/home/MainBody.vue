<script setup lang="ts">
import { computed, defineAsyncComponent, useTemplateRef } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import AboutSection from './sections/AboutSection.vue'

// Only load the component when it is actually rendered.
const SectionHashSyncForProgrammaticScroll = defineAsyncComponent(
  () => import('../../composables/SectionHashSyncForProgrammaticScroll.vue'),
)

const breakpoints = useBreakpoints(breakpointsTailwind)
const twoColumnLayout = breakpoints.greaterOrEqual('lg')

const ueberMichSection = useTemplateRef<HTMLElement>('ueberMichSection')
const erfahrungSection = useTemplateRef<HTMLElement>('erfahrungSection')
const lebenslaufSection = useTemplateRef<HTMLElement>('lebenslaufSection')
const allSectionElements = computed<HTMLElement[]>(() =>
  [ueberMichSection.value, erfahrungSection.value, lebenslaufSection.value].filter(
    (sectionElement): sectionElement is HTMLElement => sectionElement !== null,
  ),
)
</script>

<template>
  <SectionHashSyncForProgrammaticScroll v-if="twoColumnLayout" :sections="allSectionElements" />

  <main class="flex flex-col gap-24 pt-24 lg:w-[52%] lg:py-24">
    <section id="ueber-mich" ref="ueberMichSection"><AboutSection /></section>

    <section id="erfahrung" ref="erfahrungSection"><AboutSection /></section>

    <section id="lebenslauf" ref="lebenslaufSection"><AboutSection /></section>
  </main>
</template>
