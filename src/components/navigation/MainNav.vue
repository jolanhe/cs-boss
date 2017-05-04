<template>
  <Menu mode="horizontal" theme="primary" active-name="1">
    <div class="logo shrink0"></div>
    <div class="w100">
      <Menu-item name="1">
          <Icon type="ios-paper"></Icon>
          内容管理
      </Menu-item>
      <Menu-item name="2">
          <Icon type="ios-people"></Icon>
          用户管理
      </Menu-item>
      <Menu-item name="3">
          <Icon type="stats-bars"></Icon>
          统计分析
      </Menu-item>
      <Menu-item name="4">
          <Icon type="settings"></Icon>
          综合设置
      </Menu-item>
    </div>
    <Dropdown class="shrink0">
        <a href="javascript:void(0)">
            <Icon type="person"></Icon>&nbsp;
            Jolan He
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item>驴打滚</Dropdown-item>
            <Dropdown-item>炸酱面</Dropdown-item>
            <Dropdown-item disabled>豆汁儿</Dropdown-item>
            <Dropdown-item>冰糖葫芦</Dropdown-item>
            <Dropdown-item divided>退出登录</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
  </Menu>
</template>

<script>
export default {
  name: 'MainNav',
  data () {
    return {}
  }
}
</script>
