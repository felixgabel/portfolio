import { createRouter, createWebHistory } from 'vue-router'
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
      path: '/projekte',
      name: 'projekte',
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
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 96, // equals tailwind class scroll-mt-24 (24 * 4 = 96)
      }
    }

    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
