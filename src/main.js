import '@babel/polyfill'
import 'mutationobserver-shim'
// import store from "@/store/store";
import Vue from 'vue'
// import "@/plugins/axios";
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "font-awesome/css/font-awesome.min.css";
 
// Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
 
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
