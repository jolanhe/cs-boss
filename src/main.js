// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Mui from '@/components/_mui'
import axios from 'axios'
import api from './api'
import utils from './utils'
import IEcharts from 'vue-echarts-v3/src/lite'
import './utils/echarts-lite'
import 'iview/dist/styles/iview.css'
import './assets/css/main.scss'

Vue.config.productionTip = false

Mui.Message.config({ duration: 2.2 })
Vue.use(Mui)

Vue.component('IEcharts', IEcharts)

if (typeof process.env.API_PATH !== 'undefined') {
  axios.defaults.baseURL = window.location.protocol + process.env.API_PATH
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
// axios 拦截器，设置进度条
axios.interceptors.request.use(function (config) {
  Mui.LoadingBar.start()
  return config
}, function (error) {
  Mui.LoadingBar.error()
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  Mui.LoadingBar.finish()
  return response
}, function (error) {
  Mui.LoadingBar.error()
  return Promise.reject(error)
})

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
