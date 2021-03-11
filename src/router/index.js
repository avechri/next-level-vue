import Vue from 'vue';
import VueRouter from 'vue-router';
// import EventCreate from '../views/EventCreate.vue';
import EventShow from '@/views/EventShow.vue';
import EventList from '../views/EventList.vue';
// import EventShow from '../views/EventShow.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
    },
    {
      path: '/event/create',
      name: 'event-create',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "event-create" */ '../views/EventCreate.vue'),
      alias: '/create',
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
    },
    {
      path: '*',
      redirect: { name: 'event-list' }, // redirect to home page
    },
  ],
});
