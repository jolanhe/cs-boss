import axios from 'axios'

export default {
  install (Vue, option) {
    Object.defineProperty(Vue.prototype, '$axios', { value: axios })
  }
}
