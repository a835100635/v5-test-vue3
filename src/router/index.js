import { createRouter, createWebHashHistory } from 'vue-router'
import ChangeLanguage from '../views/ChangeLanguage.vue'

const routes = [
  {
    path: '/changeLanguage',
    name: 'changeLanguage',
    component: ChangeLanguage
  },
  {
    path: '/registerRenderElem',
    name: 'registerRenderElem',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterRenderElem.vue')
  },
  {
    path: '/registerPlugin',
    name: 'registerPlugin',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterPlugin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
