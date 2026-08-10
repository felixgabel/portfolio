import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useScrollToHashStore = defineStore('scrollToHash', () => {
  const scrollToHashOnNextNavigation = ref(false)

  function setScrollToHashOnNextNavigation(value: boolean) {
    scrollToHashOnNextNavigation.value = value
  }

  return {
    scrollToHashOnNextNavigation,
    setScrollToHashOnNextNavigation,
  }
})
