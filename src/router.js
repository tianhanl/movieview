import Vue from 'vue';
import Router from 'vue-router';
import ListView from './components/ListView.vue';
import DetailView from './components/DetailView.vue';
import DataView from './components/DataView.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/list/1',
  },
  {
    name: 'list',
    path: '/list/:page',
    component: ListView,
    meta: {
      title: 'Top Rated Movie List | Noir',
    },

  },
  {
    name: 'detail',
    path: '/detail/:id',
    component: DetailView,
    meta: {
      title: 'Movie Detail | Noir',
    },
  },
  {
    name: 'data',
    path: '/data',
    component: DataView,
    meta: {
      title: 'Movie Data | Noir',
    },
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
