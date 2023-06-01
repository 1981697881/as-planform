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
// 维修项目-获取列表
export function getRepairProjectList(params, query) {
  const url = '/repairProject/list/' + params.pageNum + '/' + params.pageSize
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

// 维修项目-新增
export function addRepairProject(params) {
  return request({
    url: '/repairProject/add',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 维修项目-删除
export function deleteRepairProject(params) {
  return request({
    url: '/repairProject/delete',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 物流公司-获取列表
export function getLogisricsCompanyList(params, query) {
  const url = '/logisricsCompany/list/' + params.pageNum + '/' + params.pageSize
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

// 物流公司-新增
export function addLogisricsCompany(params) {
  return request({
    url: '/logisricsCompany/add',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 物流公司-删除
export function deleteLogisricsCompany(params) {
  return request({
    url: '/logisricsCompany/delete',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 机身码查询-获取列表
export function getFuselageList(params, query) {
  const url = '/fuselage/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}// 产品信息-获取列表
export function getBarcodeList(params, query) {
  const url = '/barcode/list/' + params.pageNum + '/' + params.pageSize
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
// 产品信息-增加产品条码
export function addProductBarcode(params) {
  return request({
    url: '/inputData/addProductBarcode',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 工程师管理-获取列表
export function getEngineerList(params, query) {
  const url = '/engineer/list/' + params.pageNum + '/' + params.pageSize
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

// 工程师管理-新增
export function addEngineer(params) {
  return request({
    url: '/engineer/addEngineer',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 工程师管理-删除
export function deleteEngineer(params) {
  return request({
    url: '/engineer/deleteEngineer',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 工程师管理-下拉
export function engineerForm(params) {
  return request({
    url: '/engineer/engineerForm' + params,
    headers: {
      'authorization': getToken('aspanrx')
    },
    method: 'get',
    params
  })
}
// 故障分类-获取列表
export function getFaultList(params, query) {
  const url = '/fault/faultList/' + params.pageNum + '/' + params.pageSize
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

// 故障分类-新增
export function addFault(params) {
  return request({
    url: '/fault/addFault',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 故障分类-删除
export function deleteFault(params) {
  return request({
    url: '/fault/deleteFault',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 汇总表-汇总
export function mainTSumSummary(params) {
  return request({
    url: '/maintsum/summary',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 汇总表-汇总
export function mainTSumCostSummary(params) {
  return request({
    url: '/maintsum/costSummary',
    headers: {
      'authorization': getToken('aspanrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
