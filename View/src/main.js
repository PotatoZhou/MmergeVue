import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import VueCytoscape from "vue-cytoscape";
import App from "./App.vue";
import "./assets/css/totalstyle.css";
import router from "./router";
import store from "./store";

Vue.use(ElementUI);
Vue.use(VueCytoscape);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
