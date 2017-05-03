export default {
  phone: [
    { required: true, message: '请填写 手机号', trigger: 'blur' },
    { type: 'string', pattern: /^1\d{10}$/, message: '手机号 必须是以1开头的11位数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请填写 密码', trigger: 'blur' },
    { type: 'string', min: 6, message: '密码 长度不能小于6位', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请填写 暗号', trigger: 'blur' },
    { type: 'string', pattern: /^(\d{6}|\d{8})$/, message: '暗号 必须是6或8位数字', trigger: 'blur' }
  ]
}
