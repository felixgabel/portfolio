<script setup lang="ts">
import type { Component } from 'vue'
import BrandLinkedinIcon from '@iconify-vue/tabler/brand-linkedin'
import BrandLinkedinFilledIcon from '@iconify-vue/tabler/brand-linkedin-filled'
import BrandGithubIcon from '@iconify-vue/tabler/brand-github'
import BrandGithubFilledIcon from '@iconify-vue/tabler/brand-github-filled'

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
</template>
