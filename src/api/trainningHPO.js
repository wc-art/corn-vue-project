import request from './request.js';

// 获取HPO列表
export function listHPO() {
  return request({
    url: `/system/hyperparameter/list`,
    method: 'get'
  });
}

// 根据id获取详情
export function getHPOById(id) {
  return request({
    url: `/system/hyperparameter/${id}`,
    method: 'get'
  })
}

// 删除HPO
export function delHPO(idArr) {
  return request({
    url: `/system/hyperparameter/`+idArr,
    method: 'delete'
  });
}

// run接口
export function HPORun(data) {
  return request({
    url: '/system/hyperparameter',
    method: 'post',
    data
  })
}

