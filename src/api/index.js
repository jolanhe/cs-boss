import user from './user'
import util from '../assets/util'

export default {
  user,
  params (userProps) {
    return {
      user_id: userProps.uid || '',
      user_type: userProps.user_type || '',
      token: userProps.token || '',
      chain_id: util.generateChainID(),
      client_device: 'web',
      client_channel: '0',
      client_version: '1.0.0.0',
      client_config_version: '0',
      timestamp: util.getTimestamp('YYYYMMDDhhmmss')
    }
  }
}
