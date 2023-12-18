import request from './request.js';

// 获取prediction列表
export function listPrediction() {
  return request({
    url: `/poem/selectByDynasty/${dynasty}`,
    method: 'get'
  });
}

// 删除prediction
export function delPrediction(id) {
  return request({
    url: ``,
    method: 'post'
  });
}

// 更新prediction
export function updatePrediction(data) {
  return request({
    url: '',
    method: 'post',
    data
  })
}

// run接口
export function predictionRun(data) {
  return request({
    url: '',
    method: 'post',
    data
  })
}