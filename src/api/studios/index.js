import request from '@/utils/request'
import {getToken} from '@/utils/auth'

// 检修管理-获取列表
export function getRepairList(params, data) {
  const url = '/repair/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 检修管理-分配工程师
export function appointEngineer(params) {
  const url = '/repair/appointEngineer '
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 上报管理-获取列表
export function getReportList(params, data) {
  const url = '/report/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 上报管理-处理
export function updateReport(params) {
  const url = '/report/updateReport'
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 工程师管理-获取列表
export function getEngineerList(params, data) {
  const url = '/engineer/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 客服接单-发货
export function deliver(params) {
  const url = '/logistics/deliver'
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 客服接单-收货
export function receiving(params) {
  const url = '/logistics/receiving'
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 检修管理-维修
export function repairDetailUpdate(params) {
  const url = '/repairDetail/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 检修管理-维修费用
export function determineLastPrice(params) {
  const url = '/repair/determineLastPrice'
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
