import Home from '@/components/pages/Home'
import Login from '@/components/pages/Login'
import Hello from '@/components/pages/Hello'
import NotFound from '@/components/pages/NotFound'
import Container from '@/components/container/Container'
import MainNav from '@/components/navigation/MainNav'
import StatsSideNav from '@/components/navigation/StatsSideNav'
import UserSideNav from '@/components/navigation/UserSideNav'
import Overview from '@/components/stats/Overview'
import User from '@/components/user/User'
import Role from '@/components/user/Role'
import Resource from '@/components/user/Resource'

export default {
  pages: {
    Home,
    Login,
    Hello,
    NotFound
  },
  container: {
    Container
  },
  navigation: {
    MainNav,
    StatsSideNav,
    UserSideNav
  },
  stats: {
    Overview
  },
  user: {
    User,
    Role,
    Resource
  }
}
