/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const articleRouter = {
  path: "/article",
  component: Layout,
  redirect: "noRedirect",
  name: "Article",
  meta: {
    title: "文章",
    icon: "article"
  },
  children: [
    {
      path: "data",
      component: () => import("@/views/video/components/data"),
      name: "article",
      meta: { title: "视频管理", icon: "eye-open" }
    },
    {
      path: "addData",
      component: () => import("@/views/video/components/addData"),
      name: "AddVideo",
      meta: { title: "添加视频", icon: "eye-open" }
    },
    {
      path: "repeat",
      component: () => import("@/views/video/components/repeat"),
      name: "repeat",
      meta: { title: "重复数据", icon: "eye-open" }
    }
  ]
};

export default articleRouter;
