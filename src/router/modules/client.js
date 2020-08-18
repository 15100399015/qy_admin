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
      path: "config-ads",
      component: () => import("@/views/client/configAds"),
      name: "configADs",
      meta: { title: "广告管理" },
    },
    {
      path: "config-play",
      component: () => import("@/views/client/configPlay"),
      name: "configPlay",
      meta: { title: "播放器配置" },
    },
  ],
};

export default userRouter;
