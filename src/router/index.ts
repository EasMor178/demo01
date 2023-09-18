import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/Workbench',
      component: () => import('@/pages/Workbench/index.vue'),
      children: [],
    },
    {
      path: '/Terminal',
      component: () => import('@/pages/Terminal/index.vue'),
      children: [],
    },
    {
      path: '/Strategy',
      component: () => import('@/pages/Strategy/index.vue'),
    },
    {
      path: '/Section',
      component: () => import('@/pages/Section/index.vue'),
    },
    {
      path: '/Form',
      component: () => import('@/pages/Form/index.vue'),
    },
    {
      path: '/',
      redirect: '/Workbench',
    },
  ],
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
