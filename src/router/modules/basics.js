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
      path: "govern-type",
      component: () => import("@/views/basics/governType"),
      name: "governType",
      meta: { title: "分类管理" },
    },
    {
      path: "govern-topic",
      component: () => import("@/views/basics/governTopic"),
      name: "governTopic",
      meta: { title: "专题管理" },
    },
    {
      path: "govern-gbook",
      component: () => import("@/views/basics/governGbook"),
      name: "governGbook",
      meta: { title: "留言管理" },
    },
    {
      path: "govern-comment",
      component: () => import("@/views/basics/governComment"),
      name: "governComment",
      meta: { title: "评论管理" },
    },
    {
      path: "govern-link",
      component: () => import("@/views/basics/governLink"),
      name: "governLink",
      meta: { title: "友链管理" },
    },
  ],
};

export default userRouter;
