<script setup lang="ts">
import HeaderIntro from './header/HeaderIntro.vue'
import HeaderNavigation from './header/HeaderNavigation.vue'
import HeaderSocialLinks from './header/HeaderSocialLinks.vue'
</script>

<template>
  <header
    class="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-[48%] lg:flex-col lg:justify-between lg:py-24"
  >
    <div>
      <HeaderIntro />
      <HeaderNavigation />
    </div>
    <HeaderSocialLinks />
  </header>
</template>
