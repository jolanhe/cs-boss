import * as types from '../mutation-types'

export default {
  state: {
    result: {}
  },
  mutations: {
    [types.REQUEST_FAILED_HANDLER] (state, error) {
      state.result = error
    }
  }
}
