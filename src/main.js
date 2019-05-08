// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// import axios from 'axios'
// import qs from 'qs'
import store from './store/index'
import global from './global/global_properties'
import api from './httpConfig/install'


Vue.use(api)
Vue.use(iView)
// axios 并不是一个vue的插件，所以不能通过Vue.use 注册使用，应该通过设置Vue.prototype 原型链注册
// Vue.use(axios)
Vue.config.productionTip = false
// Vue.prototype.$ajax = axios
// Vue.prototype.$qs = qs
// 注册全局属性
Vue.prototype.$global = global
//解决跨域，后台需要相应更改
//axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
