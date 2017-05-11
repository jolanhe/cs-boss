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
  },
  queryAllRole (data, params) {
    return post('/boss_user/query_all_role', data, { params })
  },
  queryAllResource (data, params) {
    return post('/boss_user/query_all_resource', data, { params })
  },
  addUser (data, params) {
    return post('/boss_user/add_user', data, { params })
  }
}
