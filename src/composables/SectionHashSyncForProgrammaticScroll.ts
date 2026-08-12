import { type MaybeRefOrGetter, onMounted, onScopeDispose, ref, toValue, watch } from 'vue'
import { useIntersectionObserver, useScroll, useEventListener } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { useProgrammaticScrollStore } from '../stores/programmaticScroll'
import { SectionIDs } from '../enums/SectionIDs'

// Syncs the current route hash with whichever section is most visible in the
// viewport as the user scrolls. Call this once from a top-level setup
// function (e.g. App.vue's <script setup>).

// @param enabled Reactive on/off switch (boolean, ref, or getter). While
// disabled, no IntersectionObserver, watchers, or event listeners are
// active. they're torn down and re-created as this toggles.

export function useSectionHashSyncForProgrammaticScroll(enabled: MaybeRefOrGetter<boolean> = true) {
  const route = useRoute()
  const router = useRouter()
  const programmaticScrollStore = useProgrammaticScrollStore()

  const allSectionIds = Object.values(SectionIDs)

  // NOTE: this must be populated in onMounted (not a computed) because
  // document.getElementById() is not a reactive dependency. A computed
  // would only ever run once, on first access, and if that happens before
  // the section elements exist in the DOM (e.g. this composable is called
  // from a parent component that mounts before its children), it would
  // cache an empty result forever.
  const allSectionElements = ref<HTMLElement[]>([])

  onMounted(() => {
    allSectionElements.value = allSectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((sectionElement): sectionElement is HTMLElement => sectionElement !== null)
  })

  const idOfMostVisibleSection = ref<string | null>(null)
  const intersectionObserverEntriesBySectionElementId = new Map<string, IntersectionObserverEntry>()

  function replaceRouteHashHandler() {
    if (programmaticScrollStore.isScrollingToHashProgrammatically) return
    if (idOfMostVisibleSection.value === null) {
      throw new Error(
        'idOfMostVisibleSection.value is null, but it should never be null when this function is called.',
      )
    }

    const newHash = `#${idOfMostVisibleSection.value}`
    if (newHash === route.hash) return

    router.replace({
      hash: newHash,
    })
  }

  function setIsScrollingToHashProgrammaticallyFalse() {
    programmaticScrollStore.setIsScrollingToHashProgrammatically(false)
  }

  const keysThatCanTriggerScrolling = new Set([
    'ArrowUp',
    'ArrowDown',
    'PageUp',
    'PageDown',
    'Home',
    'End',
    ' ',
  ])

  // Holds the teardown functions for everything set up in startListening(),
  // so stopListening() can cleanly undo it when `enabled` flips to false.
  let stopFunctions: Array<() => void> = []

  function startListening() {
    const { stop: stopIntersectionObserver } = useIntersectionObserver(
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

    const stopScrollStartWatch = watch(useScroll(window).isScrolling, (isScrolling) => {
      // the replaceRouteHashHandler() should be called when I start scrolling as well. because if I programmatically scrolled to a section, which is not big enough to fit into the intersection observer's rootMargin, and then I start to scroll, the 'idOfMostVisibleSection' watcher will not fire, because the section is already intersecting. So I need to call the replaceRouteHashHandler() when scrolling starts as well.
      const endedScrolling = !isScrolling
      if (endedScrolling) return

      replaceRouteHashHandler()
    })
    const stopMostVisibleSectionWatch = watch(idOfMostVisibleSection, replaceRouteHashHandler)

    // 'scrollend' is the most important one, because after a programmatic scroll stops, it automatically sets the isScrollingToHashProgrammatically to false, which is what I want. The other event listeners are just for safety, in case the user interrupts the programmatic scroll with a mouse wheel, touch move, or key press.
    const stopScrollendListener = useEventListener(
      window,
      'scrollend',
      setIsScrollingToHashProgrammaticallyFalse,
    )
    const stopWheelListener = useEventListener(
      window,
      'wheel',
      setIsScrollingToHashProgrammaticallyFalse,
      { passive: true },
    )
    const stopTouchmoveListener = useEventListener(
      window,
      'touchmove',
      setIsScrollingToHashProgrammaticallyFalse,
      { passive: true },
    )
    const stopKeydownListener = useEventListener(window, 'keydown', (event) => {
      if (!keysThatCanTriggerScrolling.has(event.key)) {
        return
      }

      setIsScrollingToHashProgrammaticallyFalse()
    })

    stopFunctions = [
      stopIntersectionObserver,
      stopScrollStartWatch,
      stopMostVisibleSectionWatch,
      stopScrollendListener,
      stopWheelListener,
      stopTouchmoveListener,
      stopKeydownListener,
    ]
  }

  function stopListening() {
    stopFunctions.forEach((stop) => stop())
    stopFunctions = []
    intersectionObserverEntriesBySectionElementId.clear()
    idOfMostVisibleSection.value = null
  }

  watch(
    () => toValue(enabled),
    (isEnabled) => {
      if (isEnabled) {
        startListening()
      } else {
        stopListening()
      }
    },
    { immediate: true },
  )

  onScopeDispose(stopListening)

  return {
    idOfMostVisibleSection,
  }
}
