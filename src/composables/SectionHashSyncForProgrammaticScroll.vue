<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useIntersectionObserver, useScroll, useEventListener } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { useProgrammaticScrollStore } from '../stores/programmaticScroll'
import { SectionIDs } from '../enums/SectionIDs'

const route = useRoute()
const router = useRouter()
const programmaticScrollStore = useProgrammaticScrollStore()

const allSectionIds = Object.values(SectionIDs)

const allSectionElements = computed<HTMLElement[]>(() =>
  allSectionIds
    .map((sectionId) => document.getElementById(sectionId))
    .filter((sectionElement): sectionElement is HTMLElement => sectionElement !== null),
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

function replaceRouteHashHandler() {
  if (programmaticScrollStore.isScrollingToHashProgrammatically) return

  const newHash = `#${idOfMostVisibleSection.value}`
  if (newHash === route.hash) return

  router.replace({
    hash: newHash,
  })
}

watch(useScroll(window).isScrolling, (isScrolling) => {
  // the replaceRouteHashHandler() should be called when I start scrolling as well. because if I programmatically scrolled to a section, which is not big enough to fit into the intersection observer's rootMargin, and then I start to scroll, the 'idOfMostVisibleSection' watcher will not fire, because the section is already intersecting. So I need to call the replaceRouteHashHandler() when scrolling starts as well.
  const endedScrolling = !isScrolling
  if (endedScrolling) return

  replaceRouteHashHandler()
})
watch(idOfMostVisibleSection, replaceRouteHashHandler)

// RESETTING THE isScrollingToHashProgrammatically FLAG WHEN THE USER INTERRUPTS A PROGRAMMATIC SCROLL
function setIsScrollingToHashProgrammaticallyFalse() {
  programmaticScrollStore.setIsScrollingToHashProgrammatically(false)
}

// 'scrollend' is the most important one, because after a programmatic scroll stops, it automatically sets the isScrollingToHashProgrammatically to false, which is what I want. The other event listeners are just for safety, in case the user interrupts the programmatic scroll with a mouse wheel, touch move, or key press.
useEventListener(window, 'scrollend', setIsScrollingToHashProgrammaticallyFalse)
useEventListener(window, 'wheel', setIsScrollingToHashProgrammaticallyFalse, { passive: true })
useEventListener(window, 'touchmove', setIsScrollingToHashProgrammaticallyFalse, { passive: true })
const keysThatCanTriggerScrolling = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
])
useEventListener(window, 'keydown', (event) => {
  if (!keysThatCanTriggerScrolling.has(event.key)) {
    return
  }

  setIsScrollingToHashProgrammaticallyFalse()
})
</script>

<template>
  <div class="hidden"></div>
</template>
