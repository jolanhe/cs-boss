<template>
  <div class="login-wrap mui-flex verticent horicent">
    <div class="hero shrink0">Business & Operation Support System</div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login shrink0">
      <h1>BOSS</h1>
      <Form-item prop="account">
        <Input type="text" v-model="formInline.account" size="large" placeholder="手机号">
        <Icon type="iphone" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="password">
        <Input type="password" v-model="formInline.password" size="large" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="code">
        <Input type="text" v-model="formInline.code" size="large" placeholder="暗号">
        <Icon type="ios-barcode" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item>
        <Button type="primary" :loading="btnloading" @click="handleSubmit('formInline')" size="large" long>
          <span v-if="!btnloading">登录</span>
          <span v-else>登录中...</span>
        </Button>
      </Form-item>
    </Form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      formInline: {
        account: '18688880000',
        password: 'abc123',
        code: '123123'
      },
      ruleInline: {
        account: this.$utils.rules.phone,
        password: this.$utils.rules.password,
        code: this.$utils.rules.code
      },
      btnloading: false
    }
  },
  computed: {
    ...mapState({
      loginResult: state => state.user.loginResult
    })
  },
  watch: {
    loginResult () {
      const r = this.loginResult
      switch (typeof r.status_code !== 'undefined' ? r.status_code : r) {
        case 0:
          this.$Message.success('登录成功！')

          // 跳转页面前判断 URL 查询参数中是否有 redirect，无则跳到首页，有则跳到 redirect 的路径
          const redirect = this.$route.query.redirect
          !redirect
            ? this.$router.replace({path: '/'})
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
          const account = {
            account: f.account.trim(),
            password: this.$utils.sha1(f.account.trim() + '@user@' + f.password),
            code: f.code
          }
          this.login(account)
        } else {
          this.$Message.error('输入信息格式有误！')
          this.btnloading = false
        }
      })
    }
  }
}
</script>
