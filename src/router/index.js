import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    children: [
      { path: '/start_star', component: () => import('../views/candle/StartStar.vue') },
      { path: '/origin', component: () => import('../views/origin/index.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
