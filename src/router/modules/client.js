/** When your routing table is too long, you can split it into small modules**/
import Layout from "@/layout";

const userRouter = {
  path: "/client",
  component: Layout,
  redirect: "noRedirect",
  name: "Client",
  meta: {
    title: "客户端参数",
    icon: "client",
  },
  children: [
    {
      path: "ads",
      component: () => import("@/views/client/ads"),
      name: "ads",
      meta: { title: "广告管理" },
    },
  ],
};

export default userRouter;
