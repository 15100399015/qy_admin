import request from "@/utils/request";
// 登录
export function login(data) {
  return request({
    url: "/auth/login",
    method: "post",
    data
  });
}
// 获取用户信息
export function getInfo() {
  return request({
    url: "/auth/getInfo",
    method: "get"
  });
}
// 退出登录
export function logout() {
  return request({
    url: "/auth/logout",
    method: "post"
  });
}
