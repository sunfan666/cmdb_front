import request from '@/utils/request'

// 获取所有的节点列表
export function getProductTree() {
  return request({
    url: '/api/productmanage/',
    method: 'get'
  })
}

// 获取指定用户组的节点列表
export function getGroupNodeList(id, params) {
  return request({
    url: '/api/groupnode/' + id + '/',
    method: 'get',
    params
  })
}

// 给指定用户组增加新的节点
export function updateGroupNode(id, params) {
  return request({
    url: '/api/groupnode/' + id + '/',
    method: 'put',
    data: params
  })
}

export function getProductLevel(params) {
  return request({
    url: '/api/products/',
    method: 'get',
    params
  })
}

export function getProductLevel2(params) {
  return request({
    url: '/api/productss/',
    method: 'get',
    params
  })
}

export function addProduct(params) {
  return request({
    url: '/api/productss/',
    method: 'post',
    data: params
  })
}

export function getProductLevelInfo(id) {
  return request({
    url: '/api/productss/' + id + '/',
    method: 'get'
  })
}

export function updateProduct(id, params) {
  return request({
    url: '/api/productss/' + id + '/',
    method: 'put',
    data: params
  })
}
export function deleteProductLevelInfo(id) {
  return request({
    url: '/api/products/' + id + '/',
    method: 'delete'
  })
}

export function getServerList(params) {
  return request({
    url: '/api/servers/',
    method: 'get',
    params
  })
}

export function addServer(data) {
  return request({
    url: '/api/servers/',
    method: 'post',
    data
  })
}

export function kuorongServer(data) {
  return request({
    url: '/api/kuorongserver/',
    method: 'post',
    data
  })
}

export function addIdcServer(data) {
  return request({
    url: '/api/addidcserver/',
    method: 'post',
    data
  })
}

export function countServer() {
  return request({
    url: '/api/ServerCount/',
    method: 'get'
  })
}

export function userInfo() {
  return request({
    url: '/api/userinfo/',
    method: 'get'
  })
}

export function deleteServer(id) {
  return request({
    url: '/api/servers/' + id + '/',
    method: 'delete'
  })
}

export function flushServer(id, data) {
  return request({
    url: '/api/flushserverinfo/' + id + '/',
    method: 'PATCH',
    data
  })
}

export function flushServer2(id, data) {
  return request({
    url: '/api/flushserver/' + id + '/',
    method: 'PATCH',
    data
  })
}

export function getIdcsList(params) {
  return request({
    url: '/api/idcs/',
    method: 'get',
    params
  })
}

export function getVpcsInfo() {
  return request({
    url: '/api/Vpcinfos/',
    method: 'get'
  })
}

export function getInsTypes(params) {
  return request({
    url: '/api/instypes/',
    method: 'get',
    params
  })
}

export function getResMatsList(params) {
  return request({
    url: '/api/resmats/',
    method: 'get',
    params
  })
}

export function getVpcsList(params) {
  return request({
    url: '/api/vpcs/',
    method: 'get',
    params
  })
}

export function getSwitchList(params) {
  return request({
    url: '/api/Switches/',
    method: 'get',
    params
  })
}

export function getSeGList(params) {
  return request({
    url: '/api/segs/',
    method: 'get',
    params
  })
}

export function getimageList(params) {
  return request({
    url: '/api/images/',
    method: 'get',
    params
  })
}

export function updateServer(id, data) {
  return request({
    url: '/api/servers/' + id + '/',
    method: 'PATCH',
    data
  })
}

/*
 * 制造商
 */
export function getManufacturerList(params) {
  return request({
    url: '/api/manufacturer/',
    method: 'get',
    params
  })
}

export function addManufacturer(data) {
  return request({
    url: '/api/manufacturer/',
    method: 'post',
    data
  })
}

export function updateManufacturer(id, data) {
  return request({
    url: '/api/manufacturer/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteManufacturer(id) {
  return request({
    url: '/api/manufacturer/' + id + '/',
    method: 'delete'
  })
}

/*
 * 机器型号
 */
export function getProductModelList(params) {
  return request({
    url: '/api/product_model/',
    method: 'get',
    params
  })
}

export function addProductModel(data) {
  return request({
    url: '/api/product_model/',
    method: 'post',
    data
  })
}

export function updateProductModel(id, data) {
  return request({
    url: '/api/product_model/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteProductModel(id) {
  return request({
    url: '/api/product_model/' + id + '/',
    method: 'delete'
  })
}

/*
 * idcs
 */
export function getIdcList(params) {
  return request({
    url: '/api/idcs/',
    method: 'get',
    params
  })
}

export function addIdc(data) {
  return request({
    url: '/api/idcs/',
    method: 'post',
    data
  })
}

export function updateIdc(id, data) {
  return request({
    url: '/api/idcs/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteIdc(id) {
  return request({
    url: '/api/idcs/' + id + '/',
    method: 'delete'
  })
}

/*
 * 机柜
 */
export function getCabinetList(params) {
  return request({
    url: '/api/cabinet/',
    method: 'get',
    params
  })
}

export function addCabinet(data) {
  return request({
    url: '/api/cabinet/',
    method: 'post',
    data
  })
}

export function updateCabinet(id, data) {
  return request({
    url: '/api/cabinet/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteCabinet(id) {
  return request({
    url: '/api/cabinet/' + id + '/',
    method: 'delete'
  })
}

/*
 * 网卡管理
 */
export function getNetworkDeviceList(params) {
  return request({
    url: '/api/network_device/',
    method: 'get',
    params
  })
}

export function addNetworkDevice(data) {
  return request({
    url: '/api/network_device/',
    method: 'post',
    data
  })
}

export function updateNetworkDevice(id, data) {
  return request({
    url: '/api/network_device/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteNetworkDevice(id) {
  return request({
    url: '/api/network_device/' + id + '/',
    method: 'delete'
  })
}

/*
 * IP管理
 */
export function getIpList(params) {
  return request({
    url: '/api/ip/',
    method: 'get',
    params
  })
}

export function addIP(data) {
  return request({
    url: '/api/ip/',
    method: 'post',
    data
  })
}

export function updateIP(id, data) {
  return request({
    url: '/api/ip/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteIP(id) {
  return request({
    url: '/api/ip/' + id + '/',
    method: 'delete'
  })
}
