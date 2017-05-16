// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import api from './api'
import utils from './assets/utils'
import iViewex from '@/components/iviewex'
import IEcharts from 'vue-echarts-v3/src/full'
import 'iview/dist/styles/iview.css'
import './assets/css/main.scss'

Vue.config.productionTip = false

iViewex.Message.config({ duration: 2.2 })
Vue.use(iViewex)
Vue.component('IEcharts', IEcharts)

if (typeof process.env.API_PATH !== 'undefined') {
  axios.defaults.baseURL = window.location.protocol + process.env.API_PATH
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
// axios 拦截器，设置进度条
axios.interceptors.request.use(function (config) {
  iViewex.LoadingBar.start()
  return config
}, function (error) {
  iViewex.LoadingBar.error()
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  iViewex.LoadingBar.finish()
  return response
}, function (error) {
  iViewex.LoadingBar.error()
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
