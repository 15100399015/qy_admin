/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const userRouter = {
  path: "/collection",
  component: Layout,
  redirect: "/collection/index",
  children: [
    {
      path: "index",
      component: () => import("@/views/collection"),
      name: "Collection",
      meta: { title: "采集", icon: "client" },
    },
  ],
};

export default userRouter;
