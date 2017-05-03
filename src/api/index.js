import user from './user'
import utils from '../assets/utils'

export default {
  user,
  params (user) {
    return {
      uid: user.uid || '',
      token: user.token || '',
      chain: utils.generateChainID(),
      timestamp: utils.getTimestamp('YYYYMMDDhhmmss')
    }
  }
}
