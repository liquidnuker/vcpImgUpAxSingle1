// import Vue from "vue";
// import VueRouter from "vue-router";

import vcRouterView from "../vue-components/RouterView.vue";

Vue.use(VueRouter);

const vcHome = () => import('../vue-components/Home.vue');
// const vcHome = require('../vue-components/Home.vue').default

const routes = [
  {
    path: "/",
    component: vcHome
  }
];

const router = new VueRouter({
  routes
});

new Vue({
  el: "#app",
  router,
  render: h => h(vcRouterView)
});

export {router};