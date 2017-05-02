import user from './user'
import util from '../assets/util'

export default {
  user,
  params (user) {
    return {
      uid: user.uid || '',
      token: user.token || '',
      chain: util.generateChainID(),
      timestamp: util.getTimestamp('YYYYMMDDhhmmss')
    }
  }
}
