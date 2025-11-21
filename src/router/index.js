import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/Main.vue'
import ReadingLists from '../views/ReadingLists.vue'
import History from '../views/History.vue'
import Settings from '../views/Settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/readingLists',
      name: 'readingLists',
      component: ReadingLists
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})

export default router
