import request from '@/utils/request'
import {getToken} from '@/utils/auth'

// 检修管理-获取列表
export function getOverhaulListt(params, data) {
  const url = '/repair/overhaulList/' + params.pageNum + '/' + params.pageSize
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
// 客服接单-获取列表
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
// 工程师获取
export function getEngineerForm(data) {
  const url = '/employeeShouhou/engineerForm'
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
// 客服接单-发货2
export function deliver2(params) {
  const url = '/applet/repairDetail/add'
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
}
// 检修管理-维修
export function repairDetailUpdate(params) {
  console.log(params)
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
}
// 检修管理-维修费用
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
// 检修管理-维修完成
export function completeRepair(params) {
  const url = '/repair/completeRepair'
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
// 检修管理-支付完成
export function confirmRepair(params) {
  const url = '/repair/confirm'
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
// 客服管理-获取列表
export function getCustomerList(params, data) {
  const url = '/customerMessage/customerList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}// 客户聊天记录-获取列表
export function getCustomerMessageList(params, data) {
  const url = '/customerMessage/list/' + params.pageNum + '/' + params.pageSize
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
// 检修管理-发货修改地址，物流
export function updateRepairDetailExp(params) {
  const url = '/repairDetail/updateRepairDetailExp'
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
