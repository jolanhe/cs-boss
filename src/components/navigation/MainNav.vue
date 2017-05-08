<template>
  <Menu mode="horizontal" theme="dark" active-name="1">
    <div class="logo shrink0"></div>
    <div class="w100">
      <Menu-item name="1">
        <Icon type="stats-bars"></Icon>
        统计分析
      </Menu-item>
      <Menu-item name="2">
        <Icon type="ios-paper"></Icon>
        内容管理
      </Menu-item>
      <Menu-item name="3">
        <Icon type="ios-people"></Icon>
        用户管理
      </Menu-item>
      <Menu-item name="4">
        <Icon type="settings"></Icon>
        综合设置
      </Menu-item>
    </div>
    <Dropdown class="shrink0">
        <a href="javascript:void(0)">
          <Icon type="person" class="i-marg"></Icon>
          Jolan He
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <Dropdown-menu slot="list">
          <Dropdown-item>驴打滚</Dropdown-item>
          <Dropdown-item>炸酱面</Dropdown-item>
          <Dropdown-item disabled>豆汁儿</Dropdown-item>
          <Dropdown-item>冰糖葫芦</Dropdown-item>
          <Dropdown-item divided :disabled="exiting" @click.native="handleLogout">退出登录</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
  </Menu>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      exiting: false
    }
  },
  computed: {
    ...mapState({
      result: state => state.user.result
    }),
    ...mapGetters([
      'userProps'
    ])
  },
  watch: {
    result () {
      const r = this.result
      switch (typeof r.status_code !== 'undefined' ? r.status_code : r) {
        case 0:
          this.$Message.success('退出成功！')
          this.$router.push({name: 'Login'})
          break
        default:
          this.$store.commit('ERROR_RESPONSE_HANDLER', r)
          this.exiting = false
      }
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    handleLogout () {
      if (this.exiting) {
        return
      }
      this.exiting = true
      this.logout(JSON.stringify({
        uid: this.userProps.uid,
        account: this.userProps.account,
        token: this.userProps.token
      }))
    }
  }
}
</script>
