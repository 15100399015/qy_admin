import request from "@/utils/request";

export function fetchGroupList(rule) {
  return request({
    url: "/group/find",
    method: "get",
    params: {
      query: JSON.stringify(rule),
    },
  });
}
// 根据id获取一条数据
export function fetchOneGroup(_id) {
  return request({
    url: "/group/findOne",
    method: "get",
    params: {
      query: JSON.stringify({
        where: {
          _id,
        },
      }),
    },
  });
}
// 获取所有数据
export function fetchAllGroup(rule) {
  return request({
    url: "/group/findAll",
    method: "get",
    params: {
      query: JSON.stringify(rule),
    },
  });
}
// 创建一条数据
export function createGroup(data) {
  return request({
    url: "/group/create",
    method: "post",
    data,
  });
}
// 更新一条数据
export function updateGroup(id, data) {
  return request({
    url: "/group/update/" + id,
    method: "put",
    data,
  });
}
// 删除一条数据
export function deleteGroup(id) {
  return request({
    url: "/group/delete/" + id,
    method: "delete",
  });
}
