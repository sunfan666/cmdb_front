import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api-token-auth/',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/userinfo/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}
