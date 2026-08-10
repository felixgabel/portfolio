import { createRouter, createWebHistory } from 'vue-router'
import { useProgrammaticScrollStore } from '../stores/programmaticScroll.ts'
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
    const programmaticScrollStore = useProgrammaticScrollStore()

    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      const isInitialNavigation = from.matched.length === 0

      if (isInitialNavigation) {
        programmaticScrollStore.setIsScrollingToHashProgrammatically(true)
      } // it's important to have it as an if statement instead of an assignment, otherwise it will be set to false on every other navigation, even if the user clicked on a link with a hash.

      if (!programmaticScrollStore.isScrollingToHashProgrammatically) {
        return false
      }

      return {
        el: to.hash,
        top: 96, // equals tailwind class scroll-mt-24 (24 * 4 = 96). I need this, but also the tailwind class, otherwise it sometimes doesn't apply the scroll-margin-top correctly on on page load.
      }
    }

    programmaticScrollStore.setIsScrollingToHashProgrammatically(false)

    return {
      top: 0,
    }
  },
})

export default router
