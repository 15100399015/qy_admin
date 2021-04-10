import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['/login', '/auth-redirect'] // 不需要重定向的路由

// 路由跳转之前
router.beforeEach(async (to, from, next) => {
  // 显示进度条
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 获取token确定用户是否已经登录
  const hasToken = getToken()
  // 如果登录了
  if (hasToken) {
    // 如果要去往登录页
    if (to.path === '/login') {
      // 如果已经登陆 login 重定向到 /
      next({ path: '/' })
      NProgress.done() //终止进度条
    } else {
      // 如果不是登录页
      // 获取当前的权限/如果有权限则直接进入
      const hasRoles = store.getters.roles
      if (hasRoles) {
        next()
      } else {
        try {
          // 拿到用户身份信息
          const { roles } = await store.dispatch('user/getInfo')
          // 过滤权限路由
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          // 动态添加路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          //  移除token
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
// 路由跳转之后
router.afterEach(() => {
  NProgress.done()
})
