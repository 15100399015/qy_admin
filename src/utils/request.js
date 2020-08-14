import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

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
    Message({
      message: response.data.message,
      type: "error",
    });
    return Promise.reject(error);
  }
);

export default service;
