import request from "@/utils/request";

export function fetchTypeList() {
  return request({
    url: "/type/find",
    method: "get",
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

export function deleteType(id) {
  return request({
    url: "/type/remove",
    method: "delete",
    data,
  });
}
