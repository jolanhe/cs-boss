import md5 from 'md5'
import sha1 from 'sha1'
import rules from './validation-rules'
import city from './city'

/**
 * prototype extend
 */
(function (objC) {
  var desc = { enumerable: false }

  // 在对象上添加方法
  function addMethod (name, func) {
    if (this[name]) return
    this[name] = func
    objC.defineProperty(this, name, desc)
  }
  // 在对象原型添加方法
  function addProtoMethod () {
    addMethod.apply(this.prototype, arguments)
  }

  // 在Object.prototype注册添加方法
  addProtoMethod.call(objC, 'addProtoMethod', addProtoMethod)
  addProtoMethod.call(objC, 'addMethod', addMethod)
})(Object)

/**
 * 输出指定宽度的整数，默认填充'0'
 * 注意：超出部分不进行截取
 */
Number.addProtoMethod('setFill', function (w, c) {
  c || (c = '0')
  var s = Math.round(this).toString()
  for (var i = s.length; i < w; i++) {
    s = c + s
  }
  return s
})

// option: 'YYYY-MM-DD hh:mm:ss.SSS'
Date.addProtoMethod('format', function (fmt) {
  var o = {
    '(M+)': this.getMonth() + 1,
    '(D+)': this.getDate(),
    '(h+)': this.getHours(),
    '(m+)': this.getMinutes(),
    '(s+)': this.getSeconds(),
    '(S+)': this.getMilliseconds()
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ('' + this.getFullYear()).substring(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (o.hasOwnProperty(k) && new RegExp(k).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, o[k].setFill(RegExp.$1.length))
    }
  }
  return fmt
})

export default {
  sha1,
  rules,
  city,

  generateChainID () {
    const chain = Math.random() + ''
    return md5(chain)
  },
  getTimestamp (fmt) {
    return new Date().format(fmt)
  }
}
