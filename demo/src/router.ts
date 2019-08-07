import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('./views/Detail.vue'),
    },
    {
      path: '/person',
      name: 'person',
      component: () => import('./views/Person.vue'),
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('./views/AddArticle.vue'),
    },
    
  ],
});
