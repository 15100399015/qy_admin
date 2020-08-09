import Vue from "vue";
import Cookies from "js-cookie";
import "normalize.css/normalize.css"; // 重置css
import Element from "element-ui";
import "./styles/element-variables.scss"; // element css变量
import "@/styles/index.scss"; // 全局css
import App from "./App"; // 跟组件
import store from "./store"; //仓库
import router from "./router"; // 路由
import "./icons"; // 图标
import "./permission"; // 权限认证
import "./utils/error-log"; // error log
import * as filters from "./filters"; // 全局过滤器

// 使用element
Vue.use(Element, {
  size: Cookies.get("size") || "medium" // set element-ui default size
});

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
