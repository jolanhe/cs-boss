import axios from 'axios'
import api from '../../api'
import * as types from '../mutation-types'

export default {
  state: {
    props: JSON.parse(localStorage.getItem('csu')) || {},
    result: {}
  },
  mutations: {
    [types.LOGIN_SUCCESS] (state, { response, result }) {
      state.props = response
      localStorage.clear()
      localStorage.setItem('csu', JSON.stringify(response))
      state.result = result
    },
    [types.LOGIN_FAILED] (state, { result }) {
      state.result = result
    }
  },
  actions: {
    login ({ commit, state }, payload) {
      axios.all([api.user.login(payload, api.params(state.props))])
      .then(axios.spread(function (login) {
        switch (login.data.result.code) {
          case 0:
            commit(types.LOGIN_SUCCESS, login.data)
            break
          case 1002:
          case 1003:
            commit(types.LOGIN_FAILED, login.data)
            break
        }
      }))
    }
  }
}
