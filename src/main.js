// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import api from './api'
import sha1 from 'sha1'
import util from './assets/util'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

iView.Message.config({ duration: 2.2 })
Vue.use(iView)
Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'production') {
  axios.defaults.baseURL = window.location.protocol + process.env.API_PATH
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

Object.defineProperty(Vue.prototype, '$axios', { value: axios })
Object.defineProperty(Vue.prototype, '$api', { value: api })
Object.defineProperty(Vue.prototype, '$sha1', { value: sha1 })
Object.defineProperty(Vue.prototype, '$util', { value: util })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
