import request from './request.js';

// run接口
export function trainningModelsRun(data) {
  return request({
    url: '/system/models',
    method: 'post',
    data
  })
}