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
