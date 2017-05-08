<template>
  <Menu active-name="1-1" :open-names="['1']" @on-select="routeDispatch">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          用户管理
        </template>
        <Menu-item name="/user">用户管理</Menu-item>
        <Menu-item name="/user/role">角色管理</Menu-item>
        <Menu-item name="/user/Resource">资源管理</Menu-item>
      </Submenu>
  </Menu>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    routeDispatch (name) {
      this.$router.push(name)
    }
  }
}
</script>
