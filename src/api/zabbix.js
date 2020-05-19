import request from '@/utils/request'

// zabbix status
export function getZabbixStatus() {
  return request({
    url: '/api/zabbixStatus/',
    method: 'get'
  })
}
export function getZabbixProduct() {
  return request({
    url: '/api/zabbixProduct',
    method: 'get'
  })
}
