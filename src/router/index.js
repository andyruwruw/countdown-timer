import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Landing from '../views/Landing.vue';
import Authenticate from '../views/Authenticate.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/authenticate/',
    name: 'Authenticate',
    component: Authenticate
  },
  {
    path: '/landing',
    name: 'Landing',
    component: Landing,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
