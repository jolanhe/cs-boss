<template>
  <div class="column-layout mui-flex col">
    <router-view class="main-nav shrink0 mui-flex verticent" name="mainNav"></router-view>
    <div class="flex1 mui-flex">
      <div class="side-nav shrink0 bod-r-1px">
        <router-view class="mui-scroll scrollbox" name="sideNav"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    result () {
      return this.$store.state.common.result
    }
  },
  watch: {
    result () {
      const r = this.result
      switch (typeof r.status_code !== 'undefined' ? r.status_code : r) {
        case 0: break
        case 1004:
          this.$Message.error(r.status_txt || r)
          this.$store.commit('CLEAR_LOGIN_STATUS')
          this.$router.push({name: 'Login'})
          break
        default:
          this.$Message.error(r.status_txt || r)
      }
    }
  }
}
</script>
