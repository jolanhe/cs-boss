import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import CompLib from '@/components'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: CompLib.pages.NotFound
    },
    {
      path: '/',
      component: CompLib.pages.Home,
      children: [
        {
          path: '',
          components: {
            mainNav: CompLib.navigation.MainNav,
            sideNav: CompLib.navigation.SideNav
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: CompLib.pages.Login,
      // login 路由增加 meta 字段表明除此之外的所有路由都需要验证
      meta: { exclude: true }
    },
    {
      path: '/hello',
      name: 'Hello',
      component: CompLib.pages.Hello
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 判断进入的路由是否有 meta.exclude 属性，没有则表明需要验证登录状态
  if (!to.matched.some(record => record.meta.exclude)) {
    store.getters.userProps.token
      ? next()
      : next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
  } else {
    next()
  }
})

export default router
