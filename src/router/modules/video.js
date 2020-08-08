/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const videoRouter = {
  path: "/video",
  component: Layout,
  redirect: "noRedirect",
  name: "Video",
  meta: {
    title: "视频",
    icon: "video"
  },
  children: [
    {
      path: "keyboard",
      component: () => import("@/views/charts/keyboard"),
      name: "KeyboardChart",
      meta: { title: "视频数据", noCache: true }
    },
    {
      path: "line",
      component: () => import("@/views/charts/line"),
      name: "LineChart",
      meta: { title: "Line Chart", noCache: true }
    },
    {
      path: "mix-chart",
      component: () => import("@/views/charts/mix-chart"),
      name: "MixChart",
      meta: { title: "Mix Chart", noCache: true }
    }
  ]
};

export default chartsRouter;
