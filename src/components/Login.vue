<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
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
    <Form-item>
      <Button type="primary" :loading="btnloading" @click="handleSubmit('formInline')">
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
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
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
      switch (typeof r.code !== 'undefined' ? r.code : r) {
        case 0:
          this.$Message.success('提交成功！')
          break
        default:
          this.$Message.error(r.desc || r)
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
            phone: this.formInline.user.trim(),
            password: this.$sha1(this.formInline.user.trim() + '@user@' + this.formInline.password)
          })
          this.login(identity)
        } else {
          this.$Message.error('表单验证失败！')
          this.btnloading = false
        }
      })
    }
  }
}
</script>

<style scoped>
  button { min-width: 95px; }
</style>
