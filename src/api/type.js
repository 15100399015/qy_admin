import request from "@/utils/request";

export function fetchTypeList(rule) {
  return request({
    url: "/type/find",
    method: "get",
    params: {
      query: JSON.stringify(rule),
    },
  });
}

export function fetchType(id) {
  return request({
    url: "/type/findOne",
    method: "get",
    params: { id },
  });
}

export function createType(data) {
  return request({
    url: "/type/create",
    method: "post",
    data,
  });
}

export function updateType(id, data) {
  return request({
    url: "/type/update/" + id,
    method: "put",
    data,
  });
}
// 删除一条数据
export function deleteType(id) {
  return request({
    url: "/type/delete/" + id,
    method: "delete",
  });
}
