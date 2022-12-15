import request from '@/utils/request'

// 查询导航树列表
export function listNav(query) {
  return request({
    url: '/files/nav/list',
    method: 'get',
    params: query
  })
}

// 查询导航树详细
export function getNav(id) {
  return request({
    url: '/files/nav/' + id,
    method: 'get'
  })
}

// 新增导航树
export function addNav(data) {
  return request({
    url: '/files/nav',
    method: 'post',
    data: data
  })
}

// 修改导航树
export function updateNav(data) {
  return request({
    url: '/files/nav',
    method: 'put',
    data: data
  })
}

// 删除导航树
export function delNav(id) {
  return request({
    url: '/files/nav/' + id,
    method: 'delete'
  })
}
