/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const tableRouter = {
  path: "/system",
  component: Layout,
  redirect: "noRedirect",
  name: "System",
  meta: {
    title: "系统",
    icon: "table",
  },
  children: [
    {
      path: "user-param",
      component: () => import("@/views/system/userParam"),
      name: "UserParam",
      meta: { title: "会员参数" },
    },
    {
      path: "user-param",
      component: () => import("@/views/system/userParam"),
      name: "UserParam",
      meta: { title: "会员参数" },
    },
  ],
};
export default tableRouter;
