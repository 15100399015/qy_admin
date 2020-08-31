import request from "@/utils/request";
// 登录
export function getSetting(path) {
  return request({
    url: "/setting/get",
    method: "get",
    params: { path },
  });
}
// 获取用户信息
export function setSetting(path, value) {
  return request({
    url: "/setting/set",
    method: "post",
    data: { path, value },
  });
}
