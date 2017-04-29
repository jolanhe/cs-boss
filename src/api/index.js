import user from './user'
import util from '../assets/util'

export default {
  user,
  params (user) {
    return {
      user_id: user.uid || '',
      user_type: user.user_type || '',
      token: user.token || '',
      chain_id: util.generateChainID(),
      client_device: 'web',
      client_channel: '0',
      client_version: '1.0.0.0',
      client_config_version: '0',
      timestamp: util.getTimestamp('YYYYMMDDhhmmss')
    }
  }
}
