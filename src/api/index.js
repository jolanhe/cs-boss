import user from './user'
import stats from './stats'
import utils from '../utils'

export default {
  user,
  stats,
  params (user) {
    return {
      uid: user.uid || '',
      token: user.token || '',
      chain: utils.generateChainID(),
      timestamp: utils.getTimestamp('YYYYMMDDhhmmss')
    }
  }
}
