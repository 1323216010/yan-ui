import request from '@/utils/request'

// 查询文件预览列表
export function listReview(query) {
  return request({
    url: '/files/review/list',
    method: 'get',
    params: query
  })
}

// 查询文件预览详细
export function getReview(id) {
  return request({
    url: '/files/review/' + id,
    method: 'get'
  })
}

// 新增文件预览
export function addReview(data) {
  return request({
    url: '/files/review',
    method: 'post',
    data: data
  })
}

// 查询天气
export function getWeather() {
  return request({
    url: '/files/review/weather',
    method: 'get'
  })
}


// 修改文件预览
export function updateReview(data) {
  return request({
    url: '/files/review',
    method: 'put',
    data: data
  })
}

// 删除文件预览
export function delReview(id) {
  return request({
    url: '/files/review/' + id,
    method: 'delete'
  })
}
