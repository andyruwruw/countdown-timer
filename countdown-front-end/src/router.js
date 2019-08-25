import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Edit from './views/Edit.vue'
import Counter from './views/Counter.vue'
import Settings from './views/Settings.vue'

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
      path: '/counter/:title',
      name: 'counter',
      component: Counter
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/edit/:title',
      name: 'edit',
      component: Edit
    },
  ]
})
