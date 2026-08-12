<script setup lang="ts">
import type { Component } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useSectionHashSyncForProgrammaticScroll } from '../../composables/SectionHashSyncForProgrammaticScroll.ts'
import { SectionIDs } from '../../enums/SectionIDs.ts'
import AboutMeSection from './sections/AboutMeSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import ResumeSection from './sections/ResumeSection.vue'

// --- SECTION HASH SYNC FOR PROGRAMMATIC SCROLL ---
const breakpoints = useBreakpoints(breakpointsTailwind)
const twoColumnLayout = breakpoints.greaterOrEqual('lg')
useSectionHashSyncForProgrammaticScroll(twoColumnLayout)

// --- SECTIONS ---
type Section = {
  id: SectionIDs
  component: Component
}
const homeSections: Section[] = [
  { id: SectionIDs.AboutMe, component: AboutMeSection },
  { id: SectionIDs.Experience, component: ExperienceSection },
  { id: SectionIDs.Resume, component: ResumeSection },
]
</script>

<template>
  <main class="flex flex-col gap-24 pt-24 lg:w-[52%] lg:py-24">
    <section v-for="homeSection in homeSections" :key="homeSection.id" :id="homeSection.id">
      <component :is="homeSection.component" />
    </section>
  </main>
</template>
