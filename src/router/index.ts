import { createRouter, createWebHistory } from 'vue-router'
import { useScrollToHashStore } from '../stores/scrollToHash'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ueber-mich',
      name: 'ueber_mich',
      component: HomeView,
    },
    {
      path: '/erfahrung',
      name: 'erfahrung',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/lebenslauf',
      name: 'lebenslauf',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    const scrollToHashStore = useScrollToHashStore()

    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      const isInitialNavigation = from.matched.length === 0
      const shouldScrollToHash =
        isInitialNavigation || scrollToHashStore.scrollToHashOnNextNavigation

      scrollToHashStore.setScrollToHashOnNextNavigation(false)

      if (!shouldScrollToHash) {
        return false
      }

      return {
        el: to.hash,
        top: 96, // equals tailwind class scroll-mt-24 (24 * 4 = 96). I need this, but also the tailwind class, otherwise it sometimes doesn't apply the scroll-margin-top correctly on on page load.
      }
    }

    scrollToHashStore.setScrollToHashOnNextNavigation(false)

    return {
      top: 0,
    }
  },
})

export default router
