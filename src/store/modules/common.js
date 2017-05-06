import * as types from '../mutation-types'

export default {
  state: {
    // 存储公共的 http 错误信息
    result: {}
  },
  mutations: {
    [types.ERROR_RESPONSE_HANDLER] (state, error) {
      state.result = error
    }
  }
}
