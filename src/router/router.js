export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'product': () => import('@/views/basic/product'),
  'shadow': () => import('@/views/basic/shadow'),
  'clerk': () => import('@/views/basic/clerk'),
  'salesman': () => import('@/views/basic/salesman'),
  'series': () => import('@/views/basic/series'),
  'project': () => import('@/views/basic/project'),
  'Transportation': () => import('@/views/basic/Transportation'),
  'fuselageCode': () => import('@/views/basic/fuselageCode'),
  'engineer': () => import('@/views/basic/engineer'),

  'advert': () => import('@/views/extension/advert'),
  'receiving': () => import('@/views/studios/receiving'),
  'overhaul': () => import('@/views/studios/overhaul'),
  'message': () => import('@/views/studios/message'),
  'report': () => import('@/views/studios/report'),
  'summary': () => import('@/views/reportform/summary'),
  'costAggregation': () => import('@/views/reportform/costAggregation'),
  'custBarcodeList': () => import('@/views/reportform/custBarcodeList'),

  'users': () => import('@/views/system/users'),
}
