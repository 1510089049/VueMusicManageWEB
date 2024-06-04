import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    /*{
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/start',
      name: 'start',
      component: StartView
    }, */
    {
      path: '/login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      component: () =>  import('@/views/Layout.vue'),
      redirect: '/user',
      children: [
        {path: '/user', component: () => import('@/views/user/index.vue')},
        {path: '/music/artist', component: () => import('@/views/music/Artist.vue')},
        {path: '/music/album', component: () => import('@/views/music/Album.vue')},
        {path: '/music/musicList', component: () => import('@/views/music/Music.vue')},
        {path: '/advertising/launchAdvertising', component: () => import('@/views/advertisement/LaunchAdvertising.vue')},
        {path: '/home', component: () => import('@/views/Home.vue')}
      ]
    },
    {path: '/*', component: import('@/views/error.vue')}
  ]
});

export default router;
