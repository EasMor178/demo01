import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/workspace',
      component: () => import('@/pages/workspace/index.vue'),
      children: [],
    },
    {
      path: '/automate',
      component: () => import('@/pages/automate/index.vue'),
      children: [],
    },
    {
      path: '/other01',
      component: () => import('@/pages/other01/index.vue'),
    },
    {
      path: '/other02',
      component: () => import('@/pages/other02/index.vue'),
    },
    {
      path: '/xlsx',
      component: () => import('@/pages/xlsx/index.vue'),
    },
    {
      path: '/',
      redirect: '/workspace',
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
