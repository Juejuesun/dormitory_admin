import request from '@/utils/request2ns'

export function getList2ns() {
  return request({
    url: '/searchs',
    method: 'post',
    // data,
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
