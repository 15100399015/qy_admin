/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const videoRouter = {
  path: "/video",
  component: Layout,
  redirect: "noRedirect",
  name: "Video",
  meta: {
    title: "视频",
    icon: "lock",
  },
  children: [
    {
      path: "data",
      component: () => import("@/views/video/dataDisplay"),
      name: "video",
      meta: { title: "视频管理", icon: "eye-open" },
    },
    {
      path: "addData",
      component: () => import("@/views/video/addData"),
      name: "AddVideo",
      meta: { title: "添加视频", icon: "eye-open" },
    },
    {
      path: "repeat",
      component: () => import("@/views/video/repeatData"),
      name: "repeat",
      meta: { title: "重复数据", icon: "eye-open" },
    },
  ],
};

export default videoRouter;
