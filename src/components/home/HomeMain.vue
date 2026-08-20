<script setup lang="ts">
import type { Component } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useSectionHashSyncForProgrammaticScroll } from '../../composables/SectionHashSyncForProgrammaticScroll.ts'
import { SectionIDs } from '../../enums/SectionIDs.ts'
import SectionDivider from './sections/SectionDivider.vue'
import AboutMeSection from './sections/AboutMeSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import FooterSection from './sections/FooterSection.vue'

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
]
</script>

<template>
  <main class="flex flex-col gap-24 pt-24 lg:w-[52%] lg:py-24">
    <template v-for="(homeSection, indexOfHomeSection) in homeSections" :key="homeSection.id">
      <section :id="homeSection.id" class="scroll-mt-24">
        <component :is="homeSection.component" />
      </section>
      <SectionDivider v-if="twoColumnLayout || indexOfHomeSection === homeSections.length - 1" />
      <!-- the last divider should always be visible, on all screen sizes -->
    </template>

    <FooterSection />
  </main>
</template>
