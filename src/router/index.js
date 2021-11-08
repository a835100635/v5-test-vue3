import { createRouter, createWebHashHistory } from 'vue-router'
import ChangeLanguage from '../views/ChangeLanguage.vue'

const routes = [
  {
    path: '/changeLanguage',
    name: 'changeLanguage',
    component: () => import('../views/pages/ChangeLanguage.vue')
  },
  {
    path: '/registerRenderElem',
    name: 'registerRenderElem',
    component: () => import('../views/pages/RegisterRenderElem.vue')
  },
  {
    path: '/registerPlugin',
    name: 'registerPlugin',
    component: () => import('../views/pages/RegisterPlugin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
