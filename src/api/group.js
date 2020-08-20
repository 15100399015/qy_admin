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

export function fetchAllGroup(rule) {
  return request({
    url: "/group/findAll",
    method: "get",
    params: {
      query: JSON.stringify(rule),
    },
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
export function deleteGroup(id) {
  return request({
    url: "/group/delete/" + id,
    method: "delete",
  });
}
export function changStatus(id, status) {
  return request({
    url: "/group/changStatus/" + id,
    method: "put",
    data: { status },
  });
}
