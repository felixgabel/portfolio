<script setup lang="ts">
import { computed, ref, watch, useTemplateRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const ueberMichSection = useTemplateRef<HTMLElement>('ueberMichSection')
const erfahrungSection = useTemplateRef<HTMLElement>('erfahrungSection')
const lebenslaufSection = useTemplateRef<HTMLElement>('lebenslaufSection')

const allSectionElements = computed(() =>
  [ueberMichSection.value, erfahrungSection.value, lebenslaufSection.value].filter(
    (sectionElement): sectionElement is HTMLElement => sectionElement !== null,
  ),
)

const idOfMostVisibleSection = ref<string | null>(null)
const intersectionObserverEntriesBySectionElementId = new Map<string, IntersectionObserverEntry>()

useIntersectionObserver(
  allSectionElements,
  (intersectionEntriesOfSectionElementsThatCrossedTheThreshold) => {
    // usually called with only one entry, but can be called with multiple entries if multiple sections cross the threshold at the same time

    intersectionEntriesOfSectionElementsThatCrossedTheThreshold.forEach((entry) => {
      intersectionObserverEntriesBySectionElementId.set(entry.target.id, entry)
    })

    const visibleEntries = Array.from(
      intersectionObserverEntriesBySectionElementId.values(),
    ).filter((entry) => entry.isIntersecting)

    const mostVisibleEntry = visibleEntries.reduce<IntersectionObserverEntry | null>(
      (mostVisibleEntry, currentEntry) => {
        if (!mostVisibleEntry) return currentEntry

        return currentEntry.intersectionRatio > mostVisibleEntry.intersectionRatio
          ? currentEntry
          : mostVisibleEntry
      },
      null,
    )

    if (!mostVisibleEntry) {
      return
    }

    idOfMostVisibleSection.value = mostVisibleEntry.target.id
  },
  {
    root: null, // Not specifying a root element means the viewport is used as the root
    rootMargin: '-30% 0px -55% 0px', // This basically ensures that the section is considered "visible" when it's the one between top: 30% and bottom: 55% of the viewport
    threshold: [0, 0.25, 0.5, 0.75, 1], // Trigger the callback at various visibility thresholds
  },
)

watch(idOfMostVisibleSection, (sectionId) => {
  if (!sectionId) {
    return
  }

  const newHash = `#${sectionId}`
  if (newHash === route.hash) {
    return
  }

  router.replace({
    hash: newHash,
  })
})
</script>

<template>
  <main class="pt-24 lg:w-[52%] lg:py-24">
    <section id="ueber-mich" ref="ueberMichSection" class="scroll-mt-24">
      <p>
        Hallo! Ich bin Felix. Ein erfahrener Frontend-Entwickler mit einer Leidenschaft für die
        Entwicklung von ästhetisch ansprechenden und benutzerfreundlichen Webanwendungen.
        <a>Vue</a> und <a>TypeScript</a> sind dabei meine bevorzugten Technologien. Ich bin immer
        bestrebt, mein Wissen zu erweitern und neue Technologien zu erlernen. Aus diesem Grund bin
        ich gerade dabei, meine Fähigkeiten in <a>React</a> zu erweitern.
      </p>
      <p>
        Hallo! Ich bin Felix. Ein erfahrener Frontend-Entwickler mit einer Leidenschaft für die
        Entwicklung von ästhetisch ansprechenden und benutzerfreundlichen Webanwendungen.
        <a>Vue</a> und <a>TypeScript</a> sind dabei meine bevorzugten Technologien. Ich bin immer
        bestrebt, mein Wissen zu erweitern und neue Technologien zu erlernen. Aus diesem Grund bin
        ich gerade dabei, meine Fähigkeiten in <a>React</a> zu erweitern.
      </p>
      <p>
        Hallo! Ich bin Felix. Ein erfahrener Frontend-Entwickler mit einer Leidenschaft für die
        Entwicklung von ästhetisch ansprechenden und benutzerfreundlichen Webanwendungen.
        <a>Vue</a> und <a>TypeScript</a> sind dabei meine bevorzugten Technologien. Ich bin immer
        bestrebt, mein Wissen zu erweitern und neue Technologien zu erlernen. Aus diesem Grund bin
        ich gerade dabei, meine Fähigkeiten in <a>React</a> zu erweitern.
      </p>
      <p>
        Hallo! Ich bin Felix. Ein erfahrener Frontend-Entwickler mit einer Leidenschaft für die
        Entwicklung von ästhetisch ansprechenden und benutzerfreundlichen Webanwendungen.
        <a>Vue</a> und <a>TypeScript</a> sind dabei meine bevorzugten Technologien. Ich bin immer
        bestrebt, mein Wissen zu erweitern und neue Technologien zu erlernen. Aus diesem Grund bin
        ich gerade dabei, meine Fähigkeiten in <a>React</a> zu erweitern.
      </p>
    </section>
    <section id="erfahrung" ref="erfahrungSection" class="mt-12 scroll-mt-24">
      <h3 class="text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200">
        Erfahrung
      </h3>
      <p class="mt-4">
        Ich habe in den letzten Jahren an einer Vielzahl von Projekten gearbeitet, von kleinen
        Startups bis hin zu großen Unternehmen. Dabei habe ich umfangreiche Erfahrungen in der
        Entwicklung von Webanwendungen gesammelt und bin mit den neuesten Technologien und Trends
        vertraut.
      </p>
      <p class="mt-4">
        Ich habe in den letzten Jahren an einer Vielzahl von Projekten gearbeitet, von kleinen
        Startups bis hin zu großen Unternehmen. Dabei habe ich umfangreiche Erfahrungen in der
        Entwicklung von Webanwendungen gesammelt und bin mit den neuesten Technologien und Trends
        vertraut.
      </p>
      <p class="mt-4">
        Ich habe in den letzten Jahren an einer Vielzahl von Projekten gearbeitet, von kleinen
        Startups bis hin zu großen Unternehmen. Dabei habe ich umfangreiche Erfahrungen in der
        Entwicklung von Webanwendungen gesammelt und bin mit den neuesten Technologien und Trends
        vertraut.
      </p>
      <p class="mt-4">
        Ich habe in den letzten Jahren an einer Vielzahl von Projekten gearbeitet, von kleinen
        Startups bis hin zu großen Unternehmen. Dabei habe ich umfangreiche Erfahrungen in der
        Entwicklung von Webanwendungen gesammelt und bin mit den neuesten Technologien und Trends
        vertraut.
      </p>
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
