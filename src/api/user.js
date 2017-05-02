import { post } from 'axios'

export default {
  login (data, params) {
    return post('/boss_user/login', data, { params })
  }
}
