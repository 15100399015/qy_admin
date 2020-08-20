import request from "@/utils/request";
// 获取所有
export function fetchAllType() {
  return request({
    url: "/type/findAll",
    method: "get",
  });
}
// 获取单个
export function fetchTypeOne(id) {
  return request({
    url: "/type/findOne/" + id,
    method: "get",
  });
}
// 创建
export function createType(data) {
  return request({
    url: "/type/create",
    method: "post",
    data,
  });
}
// 更新状态
export function changStatus(id, status) {
  return request({
    url: "/type/changStatus/" + id,
    method: "put",
    data: { status },
  });
}
// 删除一条数据
export function deleteType(id) {
  return request({
    url: "/type/delete/" + id,
    method: "delete",
  });
}

// 删除多条数据
export function deleteManyType(_idArr) {
  return request({
    url: "/type/deleteMany",
    method: "delete",
    data: _idArr,
  });
}

// 获取一级分类
export function findType1(mid) {
  return request({
    url: "/type/findType1/" + mid,
    method: "get",
  });
}

export function updateType(id, doc) {
  return request({
    url: "/type/update/" + id,
    method: "put",
    data: doc,
  });
}
