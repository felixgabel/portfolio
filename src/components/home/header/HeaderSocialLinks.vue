<script setup lang="ts">
import type { Component } from 'vue'
import HeaderLinkIcon from './HeaderLinkIcon.vue'
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
  <ul class="flex gap-2 lg:gap-3" aria-label="Soziale Medien">
    <li v-for="socialLink in socialLinks" :key="socialLink.label">
      <HeaderLinkIcon
        :href="socialLink.href"
        :label="socialLink.label"
        :aria-label="`${socialLink.label} (öffnet in neuem Tab)`"
        :outline-icon="socialLink.outlineIcon"
        :filled-icon="socialLink.filledIcon"
      />
    </li>
  </ul>
</template>
