<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

type SectionLink = {
  label: string
  routeName: string
}

type SocialLink = {
  href: string
  label: string
  viewBox: string
  fill: string
  path: string
  stroke?: string
  strokeWidth?: string
  strokeLinecap?: 'round' | 'inherit' | 'butt' | 'square'
  strokeLinejoin?: 'round' | 'inherit' | 'miter' | 'bevel'
  pathStrokeWidth?: string
  pathFill?: string
}

const sectionLinks: SectionLink[] = [
  { label: 'Über mich', routeName: 'ueber_mich' },
  { label: 'Erfahrung', routeName: 'erfahrung' },
  { label: 'Projekte', routeName: 'projekte' },
]

const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/felixgabel',
    label: 'GitHub',
    viewBox: '0 0 16 16',
    fill: 'currentColor',
    path: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
  },
  {
    href: 'https://www.linkedin.com/in/fgabel/',
    label: 'LinkedIn',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    path: 'M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z',
  },
]
</script>

<template>
  <header
    class="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-[48%] lg:flex-col lg:justify-between lg:py-24"
  >
    <!-- HEADINGS -->
    <div>
      <h1 class="text-4xl font-bold tracking-tight text-mist-700 sm:text-5xl dark:text-slate-200">
        <!-- <a href="/">Felix Gabel</a> -->
        <RouterLink to="/">Felix Gabel</RouterLink>
      </h1>
      <h2
        class="mt-3 text-lg font-medium tracking-tight text-mist-700 sm:text-xl dark:text-slate-200"
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
              :to="{ name: sectionLink.routeName }"
              :data-active="
                route.name === sectionLink.routeName ||
                (indexOfSectionLink === 0 && route.name === 'home')
                  ? true
                  : null
              "
              class="group flex items-center py-3"
              ><span
                class="mr-4 h-px w-8 bg-mist-400 transition-all group-[&:hover,&:focus-visible,&[data-active]]:w-16 group-[&:hover,&:focus-visible,&[data-active]]:bg-mist-700 motion-reduce:transition-none dark:bg-slate-600 dark:group-[&:hover,&:focus-visible,&[data-active]]:bg-slate-200"
              ></span
              ><span
                class="text-xs font-bold tracking-widest text-mist-400 uppercase group-[&:hover,&:focus-visible,&[data-active]]:text-mist-700 dark:text-slate-600 dark:group-[&:hover,&:focus-visible,&[data-active]]:text-slate-200"
                >{{ sectionLink.label }}</span
              >
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- LINKS -->
    <ul class="mt-8 ml-1 flex items-center" aria-label="Soziale Medien">
      <li v-for="socialLink in socialLinks" :key="socialLink.label" class="mr-5 shrink-0 text-xs">
        <a
          class="block"
          :href="socialLink.href"
          target="_blank"
          rel="noreferrer noopener"
          :aria-label="`${socialLink.label} (öffnet in neuem Tab)`"
          :title="socialLink.label"
          ><span class="sr-only">{{ socialLink.label }}</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            :viewBox="socialLink.viewBox"
            :fill="socialLink.fill"
            :stroke="socialLink.stroke"
            :stroke-width="socialLink.strokeWidth"
            :stroke-linecap="socialLink.strokeLinecap"
            :stroke-linejoin="socialLink.strokeLinejoin"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <path
              :d="socialLink.path"
              :fill="socialLink.pathFill"
              :stroke-width="socialLink.pathStrokeWidth"
            ></path></svg
        ></a>
      </li>
    </ul>
  </header>
</template>
