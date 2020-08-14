/** When your routing table is too long, you can split it into small modules**/
import Layout from "@/layout";

const userRouter = {
  path: "/basics",
  component: Layout,
  redirect: "noRedirect",
  name: "Basics",
  meta: {
    title: "基本设定",
    icon: "basics",
  },
  children: [
    {
      path: "type",
      component: () => import("@/views/basics/type"),
      name: "type",
      meta: { title: "分类管理" },
    },
    {
      path: "topic",
      component: () => import("@/views/basics/topic"),
      name: "topic",
      meta: { title: "专题管理" },
    },
  ],
};

export default userRouter;
