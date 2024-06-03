import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import StartView from '../views/StartView.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/start',
      name: 'start',
      component: StartView
    }
  ]
});

export default router;
