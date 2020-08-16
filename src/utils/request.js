import axios from "axios";
import { Message, Notification } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { syntaxHighlight } from "@/utils/syntaxHighlight";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["token"] = getToken();
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    Message({
      message: error.message,
      type: "error",
    });
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  ({ data }) => data,
  (error) => {
    const { response } = error;
    console.error(response.data.message);
    Notification.error({
      title: "错误",
      dangerouslyUseHTMLString: true,
      message: syntaxHighlight(response.data, {
        height: "180px",
        indent: 1,
      }),
    });
    return Promise.reject(error);
  }
);

export default service;
