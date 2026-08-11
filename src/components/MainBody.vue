<script setup lang="ts">
import { computed, defineAsyncComponent, useTemplateRef } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import ExternalLink from './ExternalLink.vue'

// Only load the component when it is actually rendered.
const SectionHashSyncForProgrammaticScroll = defineAsyncComponent(
  () => import('./SectionHashSyncForProgrammaticScroll.vue'),
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

  <main class="pt-24 lg:w-[52%] lg:py-24">
    <section id="ueber-mich" ref="ueberMichSection" class="scroll-mt-24">
      <p>
        Hallo! Ich bin Felix. Ein erfahrener Frontend-Entwickler mit einer Leidenschaft für die
        Entwicklung von ästhetisch ansprechenden und benutzerfreundlichen Webanwendungen.
        <ExternalLink href="https://vuejs.org/">Vue</ExternalLink>
        und
        <ExternalLink href="https://www.typescriptlang.org/">TypeScript</ExternalLink>
        sind dabei meine bevorzugten Technologien. Ich bin immer bestrebt, mein Wissen zu erweitern
        und neue Technologien zu erlernen. Aus diesem Grund bin ich gerade dabei, meine Fähigkeiten
        in <ExternalLink href="https://reactjs.org/">React</ExternalLink> zu erweitern.
      </p>
    </section>

    <section id="erfahrung" ref="erfahrungSection" class="mt-12 scroll-mt-24">
      <p class="mt-4">
        Ich habe in den letzten Jahren an einer Vielzahl von Projekten gearbeitet, von kleinen
        Startups bis hin zu großen Unternehmen. Dabei habe ich umfangreiche Erfahrungen in der
        Entwicklung von Webanwendungen gesammelt und bin mit den neuesten Technologien und Trends
        vertraut.
      </p>
    </section>

    <section id="lebenslauf" ref="lebenslaufSection" class="mt-12 scroll-mt-24">
      <p>mitte</p>
    </section>
  </main>
</template>
