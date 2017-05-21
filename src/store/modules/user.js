import axios from 'axios'
import api from '../../api'
import * as types from '../mutation-types'

export default {
  state: {
    props: JSON.parse(localStorage.getItem('csu')) || {},
    loginResult: {},
    logoutResult: {}
  },
  mutations: {
    // 登录 mutation
    [types.LOGIN_SUCCESS] (state, data) {
      state.props = data.data
      state.loginResult = {
        status_code: data.status_code,
        status_txt: data.status_txt
      }
      localStorage.clear()
      localStorage.setItem('csu', JSON.stringify(data.data))
    },
    [types.LOGIN_FAILED] (state, error) {
      state.loginResult = error
    },
    // 退出 mutation
    [types.LOGOUT_SUCCESS] (state, data) {
      state.props = {}
      state.logoutResult = {
        status_code: data.status_code,
        status_txt: data.status_txt
      }
      localStorage.clear()
    },
    [types.LOGOUT_FAILED] (state, error) {
      state.logoutResult = error
    },
    // 清楚登录状态 mutation
    [types.CLEAR_LOGIN_STATUS] (state) {
      state.props = {}
      localStorage.clear()
    }
  },
  actions: {
    // 登录 action
    login ({ commit, state }, account) {
      axios.all([api.user.login(account, api.params(state.props))])
        .then(axios.spread(function ({ data }) {
          data.status_code === 0
            ? commit(types.LOGIN_SUCCESS, data)
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
            ? commit(types.LOGOUT_SUCCESS, data)
            : commit(types.LOGOUT_FAILED, data)
        }))
        .catch(function (reason) {
          commit(types.LOGOUT_FAILED, reason)
        })
    }
  }
}
