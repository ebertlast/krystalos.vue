import Vue from 'vue'
import App from './App.vue'

// #region Vuetify
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
// #endregion

// #region Vuex
import store from "./common/store";
console.log("Módulos: ", store._modules);
// #endregion

// #region Router
// import router from "./common/router";
import { router } from './common/router'
// #endregion

// #region Axios
import { http } from './common/http';
Vue.prototype.$http = http;
// #endregion

// #region Directives
import directives from "./common/directives";
// #endregion

// #region VeeValidate
import VeeValidate from "vee-validate";
const VueValidationEs = require('vee-validate/dist/locale/es');
Vue.use(VeeValidate, {
  locale: 'es',
  dictionary: {
    es: VueValidationEs
  }
});
// #endregion

const moment = require('moment')
require('moment/locale/es')
Vue.use(require('vue-moment'), {
  moment
})
// console.log(Vue.moment().locale())

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
})
