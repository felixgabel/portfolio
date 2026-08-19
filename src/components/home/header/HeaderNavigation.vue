<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useProgrammaticScrollStore } from '../../../stores/programmaticScroll'
import { SectionIDs } from '../../../enums/SectionIDs'

const route = useRoute()
const programmaticScrollStore = useProgrammaticScrollStore()

type SectionLink = {
  label: string
  hash: string
}
const sectionLinks: SectionLink[] = [
  { label: 'Über mich', hash: `#${SectionIDs.AboutMe}` },
  { label: 'Erfahrung', hash: `#${SectionIDs.Experience}` },
]
</script>

<template>
  <nav class="max-lg:hidden" aria-label="Navigationslinks zu Webseitenabschnitten">
    <ul class="mt-16 w-max">
      <li v-for="(sectionLink, indexOfSectionLink) in sectionLinks" :key="sectionLink.label">
        <RouterLink
          :to="{ name: 'home', hash: sectionLink.hash }"
          replace
          @click="programmaticScrollStore.setIsScrollingToHashProgrammatically(true)"
          :data-active="
            route.hash === sectionLink.hash || (!route.hash && indexOfSectionLink === 0)
              ? true
              : null
          "
          class="group flex items-center py-3"
          ><span
            class="mr-4 h-px w-8 bg-neutral-500 transition-all group-[&:hover,&:focus-visible,&[data-active]]:w-16 group-[&:hover,&:focus-visible,&[data-active]]:bg-neutral-800 motion-reduce:transition-none dark:group-[&:hover,&:focus-visible,&[data-active]]:bg-neutral-200"
          ></span
          ><span
            class="text-xs font-bold tracking-widest text-neutral-500 uppercase group-[&:hover,&:focus-visible,&[data-active]]:text-neutral-800 dark:group-[&:hover,&:focus-visible,&[data-active]]:text-neutral-200"
            >{{ sectionLink.label }}</span
          >
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
