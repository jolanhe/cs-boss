import axios from 'axios'
import api from '../../api'
import * as types from '../mutation-types'

export default {
  state: {
    props: JSON.parse(localStorage.getItem('csu')) || {},
    // 存储 http 响应结果，或请求失败的网络错误信息
    result: {}
  },
  mutations: {
    [types.LOGIN_SUCCESS] (state, { response, result }) {
      state.props = response
      state.result = result
      localStorage.clear()
      localStorage.setItem('csu', JSON.stringify(response))
    },
    // 处理 http 响应结果的非 0 错误，或请求失败的网络错误
    [types.LOGIN_FAILED] (state, error) {
      state.result = error
    }
  },
  actions: {
    login ({ commit, state }, identity) {
      axios.all([api.user.login(identity, api.params(state.props))])
      .then(axios.spread(function ({ data }) {
        data.result.code === 0
          ? commit(types.LOGIN_SUCCESS, data)
          : commit(types.LOGIN_FAILED, data.result)
      }))
      .catch(function (reason) {
        commit(types.LOGIN_FAILED, reason)
      })
    }
  }
}
