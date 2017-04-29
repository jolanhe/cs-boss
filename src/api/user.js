import { post } from 'axios'

export default {
  login (data, params) {
    return post('/user/login_internal', data, { params })
  }
}
