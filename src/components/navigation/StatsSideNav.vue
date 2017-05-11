<template>
  <Menu active-name="1" :open-names="['2','3','4']" width="200px">
      <Menu-item name="1">
        <Icon type="clipboard"></Icon>
        十二翻概况
      </Menu-item>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-paper"></Icon>
          内容管理
        </template>
        <Menu-item name="2-1">文章管理</Menu-item>
        <Menu-item name="2-2">评论管理</Menu-item>
        <Menu-item name="2-3">举报管理</Menu-item>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          用户管理
        </template>
        <Menu-item name="3-1">新增用户</Menu-item>
        <Menu-item name="3-2">活跃用户</Menu-item>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="stats-bars"></Icon>
          统计分析
        </template>
        <Menu-group title="使用">
          <Menu-item name="4-1">新增和启动</Menu-item>
          <Menu-item name="4-2">活跃分析</Menu-item>
          <Menu-item name="4-3">时段分析</Menu-item>
        </Menu-group>
        <Menu-group title="留存">
          <Menu-item name="4-4">用户留存</Menu-item>
          <Menu-item name="4-5">流失用户</Menu-item>
        </Menu-group>
      </Submenu>
  </Menu>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
