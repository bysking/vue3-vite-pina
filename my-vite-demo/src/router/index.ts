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
    component: Info,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
