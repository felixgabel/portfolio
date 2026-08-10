<script setup lang="ts">
import type { Component } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useScrollToHashStore } from '../stores/scrollToHash'
import BrandLinkedinIcon from '@iconify-vue/tabler/brand-linkedin'
import BrandLinkedinFilledIcon from '@iconify-vue/tabler/brand-linkedin-filled'
import BrandGithubIcon from '@iconify-vue/tabler/brand-github'
import BrandGithubFilledIcon from '@iconify-vue/tabler/brand-github-filled'

const route = useRoute()
const scrollToHashStore = useScrollToHashStore()

type SectionLink = {
  label: string
  hash: string
}

const sectionLinks: SectionLink[] = [
  { label: 'Über mich', hash: '#ueber-mich' },
  { label: 'Erfahrung', hash: '#erfahrung' },
  { label: 'Lebenslauf', hash: '#lebenslauf' },
]

type SocialLink = {
  href: string
  label: string
  outlineIcon: Component
  filledIcon: Component
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/felixgabel',
    label: 'GitHub',
    outlineIcon: BrandGithubIcon,
    filledIcon: BrandGithubFilledIcon,
  },
  {
    href: 'https://www.linkedin.com/in/fgabel/',
    label: 'LinkedIn',
    outlineIcon: BrandLinkedinIcon,
    filledIcon: BrandLinkedinFilledIcon,
  },
]
</script>

<template>
  <header
    class="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-[48%] lg:flex-col lg:justify-between lg:py-24"
  >
    <!-- HEADINGS -->
    <div>
      <h1
        class="text-4xl font-bold tracking-tight text-neutral-800 sm:text-5xl dark:text-neutral-200"
      >
        <!-- <a href="/">Felix Gabel</a> -->
        <RouterLink to="/">Felix Gabel</RouterLink>
      </h1>
      <h2
        class="mt-3 text-lg font-medium tracking-tight text-neutral-800 sm:text-xl dark:text-neutral-200"
      >
        Frontend Entwickler
      </h2>
      <p class="mt-4 max-w-sm leading-normal">
        Entwicklung von modernen Web-Anwendungen mit Fokus auf Exzellenz und Schönheit.
      </p>

      <!-- NAVIGATION -->
      <nav class="max-lg:hidden" aria-label="Navigationslinks zu Webseitenabschnitten">
        <ul class="mt-16 w-max">
          <li v-for="(sectionLink, indexOfSectionLink) in sectionLinks" :key="sectionLink.label">
            <RouterLink
              :to="{ name: 'home', hash: sectionLink.hash }"
              @click="scrollToHashStore.setScrollToHashOnNextNavigation(true)"
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
    </div>

    <!-- LINKS -->
    <ul class="mt-8 flex gap-2 lg:gap-3" aria-label="Soziale Medien">
      <li v-for="socialLink in socialLinks" :key="socialLink.label">
        <a
          class="group block text-neutral-700 dark:text-neutral-300"
          :href="socialLink.href"
          target="_blank"
          rel="noreferrer noopener"
          :aria-label="`${socialLink.label} (öffnet in neuem Tab)`"
          :title="socialLink.label"
          ><span class="sr-only">{{ socialLink.label }}</span
          ><span class="relative block size-7">
            <component
              :is="socialLink.outlineIcon"
              class="absolute transition-opacity duration-200 group-[:is(:hover,:focus-visible)]:opacity-0 motion-reduce:transition-none"
            />
            <component
              :is="socialLink.filledIcon"
              class="absolute opacity-0 transition-opacity duration-200 group-[:is(:hover,:focus-visible)]:opacity-100 motion-reduce:transition-none"
            />
          </span>
        </a>
      </li>
    </ul>
  </header>
</template>
