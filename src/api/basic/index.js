import request from '@/utils/request'
import {getToken} from '@/utils/auth'

// 配件-获取列表
export function getPartsList(params, data) {
  const url = '/partsList/list/' + params.pageNum + '/' + params.pageSize
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
// 配件系列-获取列表
export function getSeriesPageList(params, data) {
  const url = '/partsList/seriesPageList/' + params.pageNum + '/' + params.pageSize
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
// 配件-新增
export function addParts(params) {
  const url = '/partsList/addParts'
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
// 配件-系列
export function seriesList(params) {
  const url = '/partsList/seriesList'
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
// 配件-删除
export function deletePartsList(params) {
  return request({
    url: '/partsList/delete',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 产品信息
export function productList(params) {
  const url = '/productionMessage/productList'
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
// 职员管理-获取列表
export function getClerkList(params, query) {
  const url = '/Admin/employee/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 职员管理-新增
export function addClerk(params) {
  return request({
    url: '/employee/add',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 职员管理-修改
export function alterClerk(params) {
  return request({
    url: '/employee/update',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    data: params
  })
}

// 职员管理-获取详情
export function clerkInfo(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('aspanrx')
    },
    method: 'get'
  })
}

// 职员管理-获取部门下拉
export function clerkDepartment(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('aspanrx')
    },
    method: 'get',
    params
  })
}

// 职员管理-删除
export function delClerk(params) {
  return request({
    url: '/employee/del/' + params,
    headers: {
      'authorization': getToken('aspanrx')
    },
    method: 'delete',
  })
}
// 业务员管理-获取列表
export function getEmployeeList(params, query) {
  const url = '/employeeShouhou/employeeList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 业务员管理-新增
export function addEmployee(params) {
  return request({
    url: '/employeeShouhou/add',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 业务员管理-删除
export function deleteEmployee(params) {
  return request({
    url: '/employeeShouhou/delete',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 业务员管理-禁用或启用
export function updateEmployee(params) {
  return request({
    url: '/employeeShouhou/updateEmployee',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
