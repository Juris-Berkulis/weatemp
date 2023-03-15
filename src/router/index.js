import { createRouter, createWebHistory } from 'vue-router'
import WeatherView from '@/views/WeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'weather',
      component: WeatherView
    },
    {
      path: '/weather_on_five_days',
      name: 'weatherOnFiveDays',
      component: () => import('../views/WeatherOnFiveDaysView.vue') //* Route level code-splitting this generates a separate chunk (About.[hash].js) for this route which is lazy-loaded when the route is visited.
    },
    {
      path: '/air_pollution_data',
      name: 'airPollutionData',
      component: () => import('../views/AirPollutionDataView.vue') //* Route level code-splitting this generates a separate chunk (About.[hash].js) for this route which is lazy-loaded when the route is visited.
    },
  ]
})

export default router
