import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    children: [
      { path: '/start_star', component: () => import('@/views/candle/StartStar.vue') },
      { path: '/pre_start_star', component: () => import('@/views/candle/PreStartStar.vue') },
      { path: '/hammer', component: () => import('@/views/candle/Hammer.vue') },
      { path: '/origin', component: () => import('@/views/origin/index.vue') },
      { path: '/rising_correction', component: () => import('@/views/entanglement/RisingCorrection.vue') },
      { path: '/two_year_high', component: () => import('@/views/investment_path/TwoYearHighStocks.vue') },
      { path: '/investment_path', component: () => import('@/views/investment_path/TwoYearHighStocks.vue') },
      { path: '/show', component: () => import('@/views/origin/show.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
