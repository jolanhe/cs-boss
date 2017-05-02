import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NotFound from '@/components/404'
import Hello from '@/components/Hello'
import login from '../views/login'
import index from '../views'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      // login 路由增加 meta 字段表明除此之外的所有路由都需要验证
      meta: { exclude: true }
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
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
