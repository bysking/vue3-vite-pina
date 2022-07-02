import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/home/Home.vue";
import Info from "../views/info/Info.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/info",
    name: "Info",
    beforeEnter(to, from, next) {
      console.log("luyou jinru");
      next();
    },
    component: Info,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("全局路由导航守卫", to, from, next);
  next();
});

export default router;
