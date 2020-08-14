/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const userRouter = {
  path: "/collection",
  component: Layout,
  redirect: "noRedirect",
  name: "Collection",
  component: () => import("@/views/collection"),
  meta: {
    title: "采集",
    icon: "collection",
  },
};

export default userRouter;
