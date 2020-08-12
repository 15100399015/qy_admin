import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */
import videoRouter from "./modules/video";
import userRouter from "./modules/user";
import articleRouter from "./modules/article";
import tableRouter from "./modules/table";
import basicsRouter from "./modules/basics";
import clientRouter from "./modules/client";
import systemRouter from "./modules/system";

/**
 * Note: 子菜单仅在子路由长度>=1的时出现.
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则不会在侧边栏中显示该项（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果未设置alwaysShow，则当项目有多个子路径时，
 *                                它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果set noRedirect将不会在breadcrumb中重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                如果设置为true，则不会缓存该页（默认值为false）
    affix: true                  如果设置为true，则会固定到导航中
    breadcrumb: false            如果设置为false 则不会显示在路径导航中
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  // 跟路由=>仪表盘
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "仪表盘", icon: "dashboard", affix: true },
      },
    ],
  },
  // 个人页
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: { title: "Profile", icon: "user" },
      },
    ],
  },
  videoRouter,
  userRouter,
  articleRouter,
  tableRouter,
  basicsRouter,
  clientRouter,
  systemRouter,
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 未匹配到的路由全部冲定向到 404
  { path: "*", redirect: "/404", hidden: true },
];

function createRouter() {
  return new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });
}

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

const router = createRouter();
export default router;
