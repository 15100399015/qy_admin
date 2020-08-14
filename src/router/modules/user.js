/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const userRouter = {
  path: "/user",
  component: Layout,
  redirect: "noRedirect",
  name: "User",
  meta: {
    title: "用户管理",
    icon: "user",
  },
  children: [
    {
      path: "data",
      component: () => import("@/views/user/dataDisplay"),
      name: "user",
      meta: { title: "用户管理" },
    },
    {
      path: "group",
      component: () => import("@/views/user/group"),
      name: "group",
      meta: { title: "权限组" },
    },
  ],
};

export default userRouter;
