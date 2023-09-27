import Vue from "vue";
import VueRouter from "vue-router";
import popup from "../components/popup.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "popup",
    component: popup,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
