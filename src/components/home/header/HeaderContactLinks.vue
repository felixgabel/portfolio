<script setup lang="ts">
import type { Component } from 'vue'
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
    href: 'mailto:felix@example.com',
    label: 'Email',
    outlineIcon: MailIcon,
    filledIcon: MailFilledIcon,
  },
]
</script>

<template>
  <ul class="flex gap-2 lg:gap-3" aria-label="Kontaktmöglichkeiten">
    <li v-for="contactLink in contactLinks" :key="contactLink.label">
      <a
        class="group relative block text-neutral-700 dark:text-neutral-300"
        :href="contactLink.href"
        target="_blank"
        rel="noreferrer noopener"
        :aria-label="`${contactLink.label} (öffnet Mailprogramm)`"
        :title="contactLink.label"
        ><span class="sr-only">{{ contactLink.label }}</span
        ><span class="relative block size-7">
          <component
            :is="contactLink.outlineIcon"
            class="absolute transition-opacity duration-200 group-[:is(:hover,:focus-visible)]:opacity-0 motion-reduce:transition-none"
          />
          <component
            :is="contactLink.filledIcon"
            class="absolute opacity-0 transition-opacity duration-200 group-[:is(:hover,:focus-visible)]:opacity-100 motion-reduce:transition-none"
          />
        </span>
        <div
          class="absolute -inset-2 -z-1 hidden rounded-full opacity-0 shadow-[0_0_5px_0_rgb(0_0_0/.075)] inset-shadow-[0_0_22px_0_rgb(255_255_255/.75)] drop-shadow-sm/40 backdrop-blur-[1.1px] transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none lg:block dark:inset-shadow-[0_0_12px_0_rgb(60_60_60/.75)] dark:drop-shadow-white/25 dark:backdrop-brightness-130"
          aria-hidden="true"
        ></div>
      </a>
    </li>
  </ul>
</template>
