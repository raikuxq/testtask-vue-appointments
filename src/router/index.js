import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "PageHome",
    component: () => import("@/views/PageHome")
  },
  {
    path: "/create-appointment",
    name: "PageCreateAppointment",
    component: () => import("@/views/PageCreateAppointment")
  },
  {
    path: "/update-appointment/:id",
    name: "PageUpdateAppointment",
    component: () => import("@/views/PageUpdateAppointment")
  },
  {
    path: "*",
    name: "PageError",
    component: () => import("@/views/PageError")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
