<template>
  <div
    class="sticky top-0 z-1 -mx-6 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only"
  >
    <h2
      class="text-sm font-bold tracking-widest text-neutral-800 uppercase lg:sr-only dark:text-neutral-200"
    >
      <slot></slot>
    </h2>
  </div>
  <div class="h-4">
    <!-- I rather use this solution instead of a simple margin, because otherwise when scrolling the section out of view would cause layout shift and look kinda weird -->
  </div>
</template>
