import axios from 'axios'
import api from '../../api'
import * as types from '../mutation-types'

export default {
  state: {
    props: JSON.parse(localStorage.getItem('csu')) || {},
    // 存储 http 请求的响应结果，或请求失败的（网络）错误信息
    result: {}
  },
  mutations: {
    // 登录 mutation
    [types.LOGIN] (state, data) {
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
    },
    // 退出 mutation
    [types.LOGOUT] (state, data) {
      state.props = {}
      state.result = {
        status_code: data.status_code,
        status_txt: data.status_txt
      }
      localStorage.clear()
    },
    [types.LOGOUT_FAILED] (state, error) {
      state.result = error
    }
  },
  actions: {
    // 登录 action
    login ({ commit, state }, account) {
      axios.all([api.user.login(account, api.params(state.props))])
      .then(axios.spread(function ({ data }) {
        data.status_code === 0
          ? commit(types.LOGIN, data)
          : commit(types.LOGIN_FAILED, data)
      }))
      .catch(function (reason) {
        commit(types.LOGIN_FAILED, reason)
      })
    },
    // 退出 action
    logout ({ commit, state }, account) {
      axios.all([api.user.logout(account, api.params(state.props))])
      .then(axios.spread(function ({ data }) {
        data.status_code === 0
          ? commit(types.LOGOUT, data)
          : commit(types.LOGOUT_FAILED, data)
      }))
      .catch(function (reason) {
        commit(types.LOGOUT_FAILED, reason)
      })
    }
  }
}
