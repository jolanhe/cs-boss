import { post } from 'axios'

export default {
  login (data, params) {
    return post('/boss_user/login', data, { params })
  },
  logout (data, params) {
    return post('/boss_user/logout', data, { params })
  },
  queryAllUser (data, params) {
    return post('/boss_user/query_all_user', data, { params })
  }
}
