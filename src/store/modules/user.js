import axios from 'axios'
import api from '../../api'
import * as types from '../mutation-types'

export default {
  state: {
    props: JSON.parse(localStorage.getItem('csu')) || {},
    // 存储 http 响应结果，或请求失败的（网络）错误信息
    result: {}
  },
  mutations: {
    [types.LOGIN_SUCCESS] (state, data) {
      state.props = data.data
      state.result = {
        status_code: data.status_code,
        status_txt: data.status_txt
      }
      localStorage.clear()
      localStorage.setItem('csu', JSON.stringify(data.data))
    },
    [types.LOGIN_FAILED] (state, error) {
      state.result = error
    }
  },
  actions: {
    login ({ commit, state }, identity) {
      axios.all([api.user.login(identity, api.params(state.props))])
      .then(axios.spread(function ({ data }) {
        data.status_code === 0
          ? commit(types.LOGIN_SUCCESS, data)
          : commit(types.LOGIN_FAILED, data)
      }))
      .catch(function (reason) {
        commit(types.LOGIN_FAILED, reason)
      })
    }
  }
}
