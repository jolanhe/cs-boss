<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login-wrap">
    <Form-item prop="user">
      <Input type="text" v-model="formInline.user" placeholder="手机号">
      <Icon type="iphone" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item prop="password">
      <Input type="password" v-model="formInline.password" placeholder="密码">
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
        user: this.$utils.rules.phone,
        password: this.$utils.rules.password,
        code: this.$utils.rules.code
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
          const f = this.formInline
          const identity = JSON.stringify({
            account: f.user.trim(),
            password: this.$utils.sha1(f.user.trim() + '@user@' + f.password),
            code: f.code
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

<style>
  .login-wrap { width: 280px; margin: 0 auto;}
  .login-wrap .ivu-input-group-prepend { min-width: 28px;}
  .login-wrap .ivu-icon { font-size: 16px;}
</style>
