import request from '@/utils/request2ns'

//获取用户列表
export function getUserList() {
  return request({
    url: '/backStage/getUserStatus',
    method: 'post',
    // data,
  })
}

//修改真实姓名和学号
export function updateUserInfo(data) {
  return request({
    url: '/backStage/updateUserInfo',
    method: 'post',
    data,
  })
}

//获取所有树洞
export function getAllPosts() {
  return request({
    url: 'backStage/getAllPosts',
    method: 'post',
    // data,
  })
}

//获取所有被举报的树洞
export function getAllReported() {
  return request({
    url: '/backStage/getAllReported',
    method: 'post',
    // data,
  })
}

//禁言用户
export function silent(data) {
  return request({
    url: '/backStage/silent',
    method: 'post',
    data,
  })
}

//解除禁言
export function cancelSilent(data) {
  return request({
    url: '/backStage/cancelSilent',
    method: 'post',
    data,
  })
}

//删帖
export function deletePost(data) {
  return request({
    url: '/backStage/deletePost',
    method: 'post',
    data,
  })
}

//取消举报状态
export function reportedCancel(data) {
  return request({
    url: '/backStage/reportedCancel',
    method: 'post',
    data,
  })
}

export function getListrpo2() {
  return request({
    url: '/mus',
    method: 'post'
  })
}

export function doDelete(data) {
  return request({
    url: '/table/doDelete',
    method: 'post',
    data,
  })
}
