import request from '@/utils/request'

// 当前登录用户信息
export function UserInfo() {
  return request({
    url: '/api/userinfo/',
    method: 'get'
  })
}

// 用户列表
export function getUserList(params) {
  return request({
    url: '/api/users/',
    method: 'get',
    params
  })
}

export function deleteUser(userid) {
  return request({
    url: '/api/users/' + userid + '/',
    method: 'delete'
  })
}

export function addUser(params) {
  return request({
    url: '/api/userreg/',
    method: 'post',
    data: params
  })
}
export function updateUser(userid, params) {
  return request({
    url: '/api/users/' + userid + '/',
    method: 'put',
    data: params
  })
}
export function getUserGroupsList(uid, params) {
  return request({
    url: '/api/usergroups/' + uid + '/',
    method: 'get',
    params
  })
}

export function updateUserGroupsList(userid, params) {
  return request({
    url: '/api/usergroups/' + userid + '/',
    method: 'put',
    data: params
  })
}

// 角色列表
export function getGroupsList(params) {
  return request({
    url: '/api/groups/',
    method: 'get',
    params
  })
}
export function addRole(params) {
  return request({
    url: '/api/groups/',
    method: 'post',
    data: params
  })
}

export function getGroupPermissionsList(id, params) {
  return request({
    url: '/api/grouppermissions/' + id + '/',
    method: 'get',
    params
  })
}
export function deleteGroup(gid) {
  return request({
    url: '/api/groups/' + gid + '/',
    method: 'delete'
  })
}

// 成员列表
export function getGroupMembers(gid, params) {
  return request({
    url: '/api/groupmembers/' + gid + '/',
    method: 'get',
    params
  })
}

export function deleteGroupMember(gid, data) {
  return request({
    url: '/api/groupmembers/' + gid + '/',
    method: 'delete',
    data
  })
}

export function updateGroupPermissions(id, params) {
  return request({
    url: '/api/grouppermissions/' + id + '/',
    method: 'put',
    data: params
  })
}

export function deleteGroupPermissions(id, params) {
  return request({
    url: '/api/grouppermissions/' + id + '/',
    method: 'delete',
    data: params
  })
}

// 获取用户组的前端菜单
export function getGroupMenuList(id, params) {
  return request({
    url: '/api/groupmenus/' + id + '/',
    method: 'get',
    params
  })
}

// 给指定用户组增加新的前端菜单
export function updateGroupMenu(id, params) {
  return request({
    url: '/api/groupmenus/' + id + '/',
    method: 'put',
    data: params
  })
}

