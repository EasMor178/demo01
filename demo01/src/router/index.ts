import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("@/pages/home/index.vue"),
    },
    {
      path: "/bench",
      component: () => import("@/pages/bench/index.vue"),
    },
    {
      path: "/other01",
      component: () => import("@/pages/other01/index.vue"),
    },
    {
      path: "/other02",
      component: () => import("@/pages/other02/index.vue"),
    },
    {
      path: "/",
      redirect: "/home",
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
