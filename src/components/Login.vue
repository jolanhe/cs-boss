<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <Form-item prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item prop="code">
      <Input type="text" v-model="formInline.code" placeholder="暗号">
      <Icon type="ios-barcode" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item>
      <Button type="primary" :loading="btnloading" @click="handleSubmit('formInline')" long>
        <span v-if="!btnloading">登录</span>
        <span v-else>登录中...</span>
      </Button>
    </Form-item>
  </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      formInline: {
        user: '',
        password: '',
        code: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
          { type: 'string', pattern: /^1\d{10}$/, message: '用户名必须是11位数的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写暗号', trigger: 'blur' },
          { type: 'string', pattern: /^(\d{6}|\d{8})$/, message: '暗号必须是6或8位数字', trigger: 'blur' }
        ]
      },
      btnloading: false
    }
  },
  computed: {
    ...mapState({
      result: state => state.user.result
    })
  },
  watch: {
    result () {
      const r = this.result
      switch (typeof r.status_code !== 'undefined' ? r.status_code : r) {
        case 0:
          this.$Message.success('登录成功！')

          // 跳转页面前判断 URL 查询参数中是否有 redirect，无则跳到首页，有则跳到 redirect 的路径
          const redirect = this.$route.query.redirect
          !redirect
            ? this.$router.replace({name: 'Home'})
            : this.$router.replace({path: redirect})

          break
        default:
          this.$Message.error(r.status_txt || r)
          this.btnloading = false
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    handleSubmit (name) {
      this.btnloading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          const identity = JSON.stringify({
            account: this.formInline.user.trim(),
            password: this.$util.sha1(this.formInline.user.trim() + '@user@' + this.formInline.password),
            code: this.formInline.code
          })
          this.login(identity)
        } else {
          this.$Message.error('输入信息格式有误！')
          this.btnloading = false
        }
      })
    }
  }
}
</script>

<style scoped>
  form { width: 280px; margin: 0 auto;}
  .ivu-input-group-prepend { min-width: 25px;}
</style>
