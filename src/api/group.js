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

export function fetchGroup(id) {
  return request({
    url: "/group/findOne",
    method: "get",
    params: { id },
  });
}

export function createGroup(data) {
  return request({
    url: "/group/create",
    method: "post",
    data,
  });
}

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
