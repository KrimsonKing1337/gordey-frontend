import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from '@/views/Home';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('@/views/Edit'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Edit') {
    if (from.name === null) {
      router.push('/');
    }

    if (!store.state.authorized) {
      return;
    }
  }

  next();
});

export default router;
