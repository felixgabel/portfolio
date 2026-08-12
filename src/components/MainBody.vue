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
        Entwicklung von <span class="italic">übersichtlichen</span>,
        <span class="italic">ästhetisch ansprechenden</span> und
        <span class="italic">benutzerfreundlichen</span> Webanwendungen. Spezialisiert habe ich mich
        auf die Entwicklung mit <ExternalLink href="https://vuejs.org/">Vue</ExternalLink> und
        <ExternalLink href="https://www.typescriptlang.org/">TypeScript</ExternalLink>, jedoch bin
        ich immer bestrebt, mein Wissen zu erweitern und neue Technologien zu erlernen.
      </p>
      <p class="mt-4">
        Angefangen hat alles mit Kurzbefehlen auf meinem iPhone: Kleine Automatisierungen wie
        "Stoppe die Musik nach X Minuten". Ein befreundeter Softwareentwickler meinte damals zu mir,
        dass das dem Programmieren gar nicht so unähnlich sei. Das hat mein Interesse geweckt, und
        kurz darauf durfte ich ein Praktikum beginnen, aus dem eine knapp dreijährige Anstellung
        wurde. In dieser Zeit habe ich mit
        <ExternalLink href="https://vuejs.org/">Vue</ExternalLink>,
        <ExternalLink href="https://www.typescriptlang.org/">TypeScript</ExternalLink>,
        <ExternalLink href="https://vuetifyjs.com/">Vuetify</ExternalLink>,
        <ExternalLink href="https://vuex.vuejs.org/">Vuex</ExternalLink>,
        <ExternalLink href="https://git-scm.com/">Git</ExternalLink> und dem Umgang mit
        Server-Requests über
        <ExternalLink href="https://swagger.io/tools/swagger-ui/">Swagger UI</ExternalLink>
        gearbeitet. In dieser Zeit habe ich unglaublich viel gelernt.
      </p>
      <p class="mt-4">
        Nach dem Ende dieser Stelle habe ich mir eine Weile Zeit genommen, um herauszufinden, ob die
        Entwicklung wirklich der richtige Weg für mich ist. Diese Phase hat mir am Ende genau das
        bestätigt: Ich will Webanwendungen entwickeln. Also habe ich mich entschieden, wieder
        durchzustarten; und dieses Portfolio ist ein Teil davon. Für das Projekt habe ich mich
        bewusst für <ExternalLink href="https://pinia.vuejs.org/">Pinia</ExternalLink> statt Vuex
        und für <ExternalLink href="https://tailwindcss.com/">Tailwind CSS</ExternalLink> statt
        Vuetify entschieden, um mit modernen Ansätzen zu arbeiten, die mir inzwischen einfach besser
        gefallen.
      </p>
    </section>

    <section id="erfahrung" ref="erfahrungSection" class="mt-12 scroll-mt-24">
      <p class="mt-4">Erfahrung</p>
    </section>

    <section id="lebenslauf" ref="lebenslaufSection" class="mt-12 scroll-mt-24">
      <p>Lebenslauf</p>
    </section>
  </main>
</template>
