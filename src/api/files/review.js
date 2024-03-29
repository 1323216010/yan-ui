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

// 上传文件
export function fileUpload(data) {
  return request({
    url: '/files/review/fileUpload',
    method: 'post',
    data: data
  })
}

// 下载文件
export function fileDownload(fileName, filePath) {
  return request({
    url: '/files/review/download?fileName=' + fileName + '&filePath=' + filePath,
    method: 'get'
  })
}