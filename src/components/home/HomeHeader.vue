<script setup lang="ts">
import HeaderIntro from './header/HeaderIntro.vue'
import HeaderNavigation from './header/HeaderNavigation.vue'
import HeaderSocialLinks from './header/HeaderSocialLinks.vue'
import HeaderContactLinks from './header/HeaderContactLinks.vue'
</script>

<template>
  <header
    class="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-[48%] lg:flex-col lg:justify-between lg:py-24"
  >
    <div>
      <HeaderIntro />
      <HeaderNavigation />
    </div>
    <div class="mt-8 flex items-center gap-4">
      <HeaderContactLinks />
      <div class="size-0.75 rounded-full bg-neutral-700 dark:bg-neutral-300"></div>
      <HeaderSocialLinks />
    </div>
  </header>
</template>
