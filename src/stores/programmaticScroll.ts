import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProgrammaticScrollStore = defineStore('scrollToHash', () => {
  const isScrollingToHashProgrammatically = ref(false)

  function setIsScrollingToHashProgrammatically(value: boolean) {
    isScrollingToHashProgrammatically.value = value
  }

  return {
    isScrollingToHashProgrammatically,
    setIsScrollingToHashProgrammatically,
  }
})
