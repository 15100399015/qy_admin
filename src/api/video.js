import request from "@/utils/request";
// 获取总数
export function getCount() {
  return request({
    url: "/vod/count",
    method: "get",
  });
}
// 根据规则获取视频
export function getData({}) {
  // where = get(this.crudOptions, 'routes.find.where', {}),
  // limit = get(this.crudOptions, 'routes.find.limit', 10),
  // page = 1,
  // skip = 0,
  // populate = get(this.crudOptions, 'routes.find.populate', undefined),
  // sort = get(this.crudOptions, 'routes.find.sort', undefined),

  return request({
    url: "/vod/find",
    method: "get",
    data,
  });
}
// 获取视频详细信息
export function getDetails() {
  return request({
    url: "/auth/getInfo",
    method: "get",
  });
}
// 添加一条数据
export function addOneData(data) {
  return request({
    url: "/auth/create",
    method: "post",
    data,
  });
}
// 更新一条数据
export function upDate() {
  return request({
    url: "/auth/logout",
    method: "post",
  });
}

// 更新一条数据e
export function delOneDate() {
  return request({
    url: "/auth/logout",
    method: "post",
  });
}

// 删除多条数据
export function delManyDate() {
  return request({
    url: "/auth/logout",
    method: "post",
  });
}
