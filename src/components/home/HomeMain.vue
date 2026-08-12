<script setup lang="ts">
import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { SectionIDs } from '../../enums/SectionIDs.ts'
import AboutMeSection from './sections/AboutMeSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import ResumeSection from './sections/ResumeSection.vue'

// --- SECTION HASH SYNC FOR PROGRAMMATIC SCROLL ---
// Only load the component when it is actually rendered.
const SectionHashSyncForProgrammaticScroll = defineAsyncComponent(
  () => import('../../composables/SectionHashSyncForProgrammaticScroll.vue'),
)
const breakpoints = useBreakpoints(breakpointsTailwind)
const twoColumnLayout = breakpoints.greaterOrEqual('lg')

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
  <SectionHashSyncForProgrammaticScroll v-if="twoColumnLayout" />

  <main class="flex flex-col gap-24 pt-24 lg:w-[52%] lg:py-24">
    <section v-for="homeSection in homeSections" :key="homeSection.id" :id="homeSection.id">
      <component :is="homeSection.component" />
    </section>
  </main>
</template>
