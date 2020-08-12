/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const articleRouter = {
  path: "/article",
  component: Layout,
  redirect: "noRedirect",
  name: "Article",
  meta: {
    title: "文章",
    icon: "eye-open",
  },
  children: [
    {
      path: "data",
      component: () => import("@/views/article/dataDisplay"),
      name: "article",
      meta: { title: "文章管理", icon: "eye-open" },
    },
  ],
};

export default articleRouter;
