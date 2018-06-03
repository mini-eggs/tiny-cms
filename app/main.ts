import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Vuetify from "vuetify";
import App from "./App.vue";
import Router from "./router";
import Store from "./store";
import RequestPlugin from "./plugins/request";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(RequestPlugin);

const store = new Vuex.Store({ ...Store });
const router = new VueRouter({ ...Router });

new Vue({ el: "#root", store, router, ...App });
