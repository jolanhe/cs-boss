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
    return {
      msg: 'Home',
      theme: 'primary'
    }
  }
}
</script>
