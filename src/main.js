// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import api from './api'
import utils from './assets/utils'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/main.sass'

iView.Message.config({ duration: 2.2 })
Vue.use(iView)
Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'production') {
  axios.defaults.baseURL = window.location.protocol + process.env.API_PATH
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

Object.defineProperty(Vue.prototype, '$axios', { value: axios })
Object.defineProperty(Vue.prototype, '$api', { value: api })
Object.defineProperty(Vue.prototype, '$utils', { value: utils })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
