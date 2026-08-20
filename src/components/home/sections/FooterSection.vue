<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="max-w-md pb-16 text-sm text-neutral-500 sm:pb-0">
    <p>
      Wenn dich dieses Portfolio anspricht, schreib mir gerne eine
      <a
        href="mailto:gabelfelix.dev@icloud.com"
        class="font-medium text-neutral-600 dark:text-neutral-400"
        >Nachricht</a
      >. Alle rechtlichen Angaben und meine Kontaktdaten findest du im
      <RouterLink to="/impressum" class="font-medium text-neutral-600 dark:text-neutral-400"
        >Impressum</RouterLink
      >.
    </p>
  </footer>
</template>
