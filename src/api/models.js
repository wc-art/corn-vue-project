import request from './request.js';

// 获取models列表
export function listModel(queryParams) {
  return request({
    url: '/system/models/list',
    method: 'get',
    params: queryParams
  })
}

// 添加models列表
export function addModel(data) {
  return request({
    url: '/system/models',
    method: 'post',
    data
  })
}

// 删除models
export function delModel(idArr) {
  return request({
    url: '/system/models/'+idArr,
    method: 'delete'
  })
}