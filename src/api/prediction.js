import request from './request.js';

// 获取prediction列表
export function listPrediction(queryParams) {
  return request({
    url: `/system/prediction/list`,
    method: 'get',
    params: queryParams
  });
}

// 删除prediction
export function delPrediction(idArr) {
  return request({
    url: `/system/prediction/`+idArr,
    method: 'delete'
  });
}

// 更新prediction
export function updatePrediction(data) {
  return request({
    url: '/system/prediction',
    method: 'put',
    data
  })
}

// run接口
export function predictionRun(data) {
  return request({
    url: '/system/prediction',
    method: 'post',
    data
  })
}