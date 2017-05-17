import { post } from 'axios'

export default {
  queryOrderTotal (data, params) {
    return post('/order/query_order_total', data, { params })
  }
}
