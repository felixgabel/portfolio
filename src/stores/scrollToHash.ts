import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useScrollToHashStore = defineStore('scrollToHash', () => {
  const scrollToHashEnabled = ref(false)

  function setScrollToHashEnabled(value: boolean) {
    scrollToHashEnabled.value = value
  }

  return {
    scrollToHashEnabled,
    setScrollToHashEnabled,
  }
})
