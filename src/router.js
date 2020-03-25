import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Live from './views/Live.vue'
import BetHistory from './views/BetHistory.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/betHistory',
      name: 'betHistory',
      component: BetHistory
    },
    {
      path: '/live',
      name: 'live',
      component: Live
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
