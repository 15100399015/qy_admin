import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */
import componentsRouter from "./modules/components";
import chartsRouter from "./modules/charts";
import tableRouter from "./modules/table";
import nestedRouter from "./modules/nested";
import videoRouter from "./modules/video";
import articleRouter from "./modules/article";

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
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true
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
        meta: { title: "仪表盘", icon: "dashboard", affix: true }
      }
    ]
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
        meta: { title: "Profile", icon: "user" }
      }
    ]
  },
  // 视频
  videoRouter,
  // 文章
  articleRouter
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/icon",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/icons/index"),
        name: "Icons",
        meta: { title: "图标", icon: "icon", noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: "/example",
    component: Layout,
    redirect: "/example/list",
    name: "Example",
    meta: {
      title: "Example",
      icon: "el-icon-s-help"
    },
    children: [
      {
        path: "create",
        component: () => import("@/views/example/create"),
        name: "CreateArticle",
        meta: { title: "Create Article", icon: "edit" }
      },
      {
        path: "edit/:id(\\d+)",
        component: () => import("@/views/example/edit"),
        name: "EditArticle",
        meta: {
          title: "Edit Article",
          noCache: true,
          activeMenu: "/example/list"
        },
        hidden: true
      },
      {
        path: "list",
        component: () => import("@/views/example/list"),
        name: "ArticleList",
        meta: { title: "Article List", icon: "list" }
      }
    ]
  },

  {
    path: "/tab",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/tab/index"),
        name: "Tab",
        meta: { title: "Tab", icon: "tab" }
      }
    ]
  },

  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    meta: {
      title: "Error Pages",
      icon: "404"
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401"),
        name: "Page401",
        meta: { title: "401", noCache: true }
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404"),
        name: "Page404",
        meta: { title: "404", noCache: true }
      }
    ]
  },

  {
    path: "/error-log",
    component: Layout,
    children: [
      {
        path: "log",
        component: () => import("@/views/error-log/index"),
        name: "ErrorLog",
        meta: { title: "Error Log", icon: "bug" }
      }
    ]
  },

  {
    path: "/excel",
    component: Layout,
    redirect: "/excel/export-excel",
    name: "Excel",
    meta: {
      title: "Excel",
      icon: "excel"
    },
    children: [
      {
        path: "export-excel",
        component: () => import("@/views/excel/export-excel"),
        name: "ExportExcel",
        meta: { title: "Export Excel" }
      },
      {
        path: "export-selected-excel",
        component: () => import("@/views/excel/select-excel"),
        name: "SelectExcel",
        meta: { title: "Export Selected" }
      },
      {
        path: "export-merge-header",
        component: () => import("@/views/excel/merge-header"),
        name: "MergeHeader",
        meta: { title: "Merge Header" }
      },
      {
        path: "upload-excel",
        component: () => import("@/views/excel/upload-excel"),
        name: "UploadExcel",
        meta: { title: "Upload Excel" }
      }
    ]
  },

  {
    path: "/zip",
    component: Layout,
    redirect: "/zip/download",
    alwaysShow: true,
    name: "Zip",
    meta: { title: "Zip", icon: "zip" },
    children: [
      {
        path: "download",
        component: () => import("@/views/zip/index"),
        name: "ExportZip",
        meta: { title: "Export Zip" }
      }
    ]
  },

  {
    path: "/pdf",
    component: Layout,
    redirect: "/pdf/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/pdf/index"),
        name: "PDF",
        meta: { title: "PDF", icon: "pdf" }
      }
    ]
  },
  {
    path: "/pdf/download",
    component: () => import("@/views/pdf/download"),
    hidden: true
  },

  {
    path: "/theme",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/theme/index"),
        name: "Theme",
        meta: { title: "Theme", icon: "theme" }
      }
    ]
  },

  {
    path: "/clipboard",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/clipboard/index"),
        name: "ClipboardDemo",
        meta: { title: "Clipboard", icon: "clipboard" }
      }
    ]
  },
  // 未匹配到的路由全部冲定向到 404
  { path: "*", redirect: "/404", hidden: true }
];

function createRouter() {
  return new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

const router = createRouter();
export default router;
