// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import sha1 from 'sha1'
import comm from './assets/js/common'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
axios.defaults.baseURL = 'http://172.16.0.101:51515/cloud_sales/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
Object.defineProperty(Vue.prototype, '$axios', { value: axios })
Object.defineProperty(Vue.prototype, '$sha1', { value: sha1 })
Object.defineProperty(Vue.prototype, '$comm', { value: comm })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
