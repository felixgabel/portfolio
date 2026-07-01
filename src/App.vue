<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BodyContainer from './components/BodyContainer.vue'

// import CursorGradient from './components/CursorGradient.vue'
// import BranchingBackground from './components/background-canvas/BranchingBackground.vue'
// import DottedBackground from './components/background-canvas/DottedBackground.vue'
// import DottedGravityBackground from './components/background-canvas/RepulsiveDottedBackground.vue'

// // if I want to use a toggle, use useDark instead. It pairs nicely with tailwind as well.
// import { usePreferredDark } from '@vueuse/core'
// const isPreferredDark = usePreferredDark()
</script>

<template>
  <!-- <CursorGradient></CursorGradient> -->
  <!-- <BranchingBackground></BranchingBackground> -->
  <!-- <DottedBackground></DottedBackground> -->
  <!-- <DottedGravityBackground></DottedGravityBackground> -->
  <!-- <dot-wave
    class="flex h-dvh!"
    num-dots="800"
    :dot-color="isPreferredDark ? '#333333' : '#cccccc'"
    background-color="transparent"
    dot-min-size="1.4"
    dot-max-size="1.4"
    dot-min-opacity="0.1"
    dot-max-opacity="1"
    random-factor="0.02"
    dot-stretch="false"
  > -->

  <div class="lg:flex lg:justify-between lg:gap-4">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <main>
      <BodyContainer class="overflow-auto">
        <!-- overflow-auto is only necesarry when I use dot-wave -->
        <RouterView />
      </BodyContainer>
    </main>
  </div>

  <!-- </dot-wave> -->
</template>
