<template>
  <Menu :active-name="activeName" :open-names="['1']" @on-select="routeDispatch">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          系统用户
        </template>
        <Menu-item name="/user">用户管理</Menu-item>
        <Menu-item name="/user/role">角色管理</Menu-item>
        <Menu-item name="/user/resource">资源管理</Menu-item>
      </Submenu>
  </Menu>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    activeName () {
      return /^\/([^/]*)\/?([^/]*)/.exec(this.$route.path)[0]
    }
  },
  methods: {
    routeDispatch (name) {
      this.$router.push(name)
    }
  }
}
</script>
