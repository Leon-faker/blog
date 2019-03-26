// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import qs from 'qs'

Vue.use(iView)
Vue.use(axios)
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs
//解决跨域，后台需要相应更改
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    quanju: 'quanju'
  },
  router,
  components: { App },
  template: '<App/>'
})
