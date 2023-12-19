import request from './request.js';

// 添加数据集
export function addDataset(data) {
  return request({
    url: '/system/datasets',
    method: 'post',
    data
  })
}

// 获取数据集列表
export function listDataset(queryParams) {
  return request({
    url: '/system/datasets/list',
    method: 'get',
    params: queryParams
  })
}

// 删除数据集
export function delDatasets(idArr) {
  return request({
    url: `/system/datasets/`+idArr,
    method: 'delete'
  })
}

// 获取数据集详情
export function getDatasetDetails(id) {
  return request({
    url: `/system/datasets/${id}`,
    method: 'get'
  })
}

// 根据id获取name
// export function getDatasetIdByName(id) {
//   return request({
//     url: '/system'
//   })
// }

// 获取选项
export function getOptions(species) {
  return request({
    url: `/system/datasets/listFind/${species}`,
    method: 'get'
  })
}
