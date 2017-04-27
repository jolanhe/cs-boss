import md5 from 'md5'

export default {
  generateChainID () {
    const chain = Math.random() + ''
    return md5(chain)
  }
}
