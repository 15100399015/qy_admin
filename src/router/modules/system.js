/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const tableRouter = {
  path: "/system",
  component: Layout,
  redirect: "noRedirect",
  name: "System",
  meta: {
    title: "系统",
    icon: "system",
  },
  children: [
    {
      path: "config-user",
      component: () => import("@/views/system/configUser"),
      name: "configUser",
      meta: { title: "会员参数配置" },
    },
    {
      path: "config-comment",
      component: () => import("@/views/system/configComment"),
      name: "configComment",
      meta: { title: "评论留言配置" },
    },
    {
      path: "config-collect",
      component: () => import("@/views/system/configCollect"),
      name: "configCollect",
      meta: { title: "采集参数配置" },
    },
    {
      path: "config-email",
      component: () => import("@/views/system/configEmail"),
      name: "configEmail",
      meta: { title: "邮件发送配置" },
    },
    {
      path: "config-sms",
      component: () => import("@/views/system/configSms"),
      name: "configSms",
      meta: { title: "短信发送配置" },
    },
    {
      path: "config-upload",
      component: () => import("@/views/system/configUpload"),
      name: "configUpload",
      meta: { title: "附件参数配置" },
    },
  ],
};
export default tableRouter;
