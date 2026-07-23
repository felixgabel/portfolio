<script setup lang="ts">
import { RouterView } from 'vue-router'
import BodyContainer from './components/BodyContainer.vue'
import MainHeader from './components/MainHeader.vue'

import BranchingBackground from './components/background-canvas/BranchingBackground.vue'
import DottedBackground from './components/background-canvas/DottedBackground.vue'
import BackdropFilter from './components/background-canvas/BackdropFilter.vue'
import DottedGravityBackground from './components/background-canvas/DottedGravityBackground.vue'
</script>

<template>
  <!-- <BranchingBackground></BranchingBackground> -->
  <!-- <DottedBackground></DottedBackground> -->
  <!-- <BackdropFilter></BackdropFilter> -->
  <DottedGravityBackground></DottedGravityBackground>

  <BodyContainer>
    <div class="lg:flex lg:justify-between lg:gap-4">
      <MainHeader></MainHeader>

      <main class="pt-24 lg:w-[52%] lg:py-24">
        <RouterView />
      </main>
    </div>
  </BodyContainer>
</template>
