import Home from '@/components/pages/Home'
import Login from '@/components/pages/Login'
import Hello from '@/components/pages/Hello'
import NotFound from '@/components/pages/404'
import MainNav from '@/components/navigation/MainNav'
import SideNav from '@/components/navigation/SideNav'

export default {
  pages: {
    Home,
    Login,
    Hello,
    NotFound
  },
  navigation: {
    MainNav,
    SideNav
  }
}
