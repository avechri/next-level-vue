import Vue from 'vue';
import VueRouter from 'vue-router';
import EventShow from '@/views/EventShow.vue';
import NProgress from 'nprogress';
import store from '@/store/index';
import NotFound from '@/views/NotFound.vue';
import EventCreate from '../views/EventCreate.vue';
import EventList from '../views/EventList.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true,
    },
    {
      path: '/event/create',
      name: 'event-create',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "event-create" */ '../views/EventCreate.vue'),
      component: EventCreate,
      alias: '/create',
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('event/fetchEvent', routeTo.params.id).then((event) => {
          // eslint-disable-next-line no-param-reassign
          routeTo.params.event = event;
          next();
        });
      },
    },
    {
      path: '*',
      redirect: { name: 'event-list' }, // redirect to home page
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
    },
    {
      path: '*',
      redirect: { name: '404' },
    },
  ],
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
