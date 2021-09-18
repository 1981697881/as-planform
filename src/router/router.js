export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'shadow': () => import('@/views/basic/shadow'),
  'clerk': () => import('@/views/basic/clerk'),

  'receiving': () => import('@/views/studios/receiving'),
  'overhaul': () => import('@/views/studios/overhaul'),
  'message': () => import('@/views/studios/message'),
  'report': () => import('@/views/studios/report'),

  'users': () => import('@/views/system/users'),
}
