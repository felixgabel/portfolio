<script setup lang="ts">
import type { Component } from 'vue'
import HeaderLinkIcon from './HeaderLinkIcon.vue'
import MailIcon from '@iconify-vue/tabler/mail'
import MailFilledIcon from '@iconify-vue/tabler/mail-filled'

type ContactLink = {
  href: string
  label: string
  outlineIcon: Component
  filledIcon: Component
}
const contactLinks: ContactLink[] = [
  {
    href: 'mailto:gabelfelix.dev@icloud.com',
    label: 'Email',
    outlineIcon: MailIcon,
    filledIcon: MailFilledIcon,
  },
]
</script>

<template>
  <ul class="flex gap-2 lg:gap-3" aria-label="Kontaktmöglichkeiten">
    <li v-for="contactLink in contactLinks" :key="contactLink.label">
      <HeaderLinkIcon
        :href="contactLink.href"
        :label="contactLink.label"
        :aria-label="`${contactLink.label} (öffnet Mailprogramm)`"
        :outline-icon="contactLink.outlineIcon"
        :filled-icon="contactLink.filledIcon"
      />
    </li>
  </ul>
</template>
