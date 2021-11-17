import { IRoute } from './types'
import React from 'react'
// import UserLayout from '../layout/UserLayout'
// import Login from '../views/system/login'
// import Register from '../views/system/register'
// import RegisterResult from '../views/system/registerResult'
// import RecoveryPwd from '../views/system/recoveryPwd'
// import Layout from '../layout'
// import Intro from '../views/dashboard/intro'

// import Menu from '../views/auth/menu'
// import User from '../views/auth/user'
// import Role from '../views/auth/role'

// import Notfound from '../views/error/404'
// import UnAuthorized from '../views/error/403'

// import routeUtils from './utils'


/**
 * routes 第一级路由负责最外层的路由渲染，比如 userLayout 和 Layout 的区分
 * 所有系统内部存在的页面路由都要在此地申明引入，而菜单栏的控制是支持异步请求控制的
 */

const routes: IRoute[] = [
  {
    path: '/system',
    component: React.lazy(() => import('../layout/UserLayout')),
    meta: {
      title: '系统路由'
    },
    redirect: '/system/login',
    children: [
      {
        path: '/system/login',
        component: React.lazy(() => import('../views/system/login')),
        meta: {
          title: '登录'
        }
      },
      {
        path: '/system/register',
        component: React.lazy(() => import('../views/system/register')),
        meta: {
          title: '注册'
        }
      },
      {
        path: '/system/register-result/:id',
        auth: false,
        component: React.lazy(() => import('../views/system/registerResult')),
        meta: {
          title: '注册结果'
        }
      },
      {
        path: '/system/recovery-pwd',
        auth: false,
        component: React.lazy(() => import('../views/system/recoveryPwd')),
        meta: {
          title: '重置密码'
        }
      }
    ]
  },
  {
    path: '/',
    component: React.lazy(() => import("../layout")),
    // component: React.lazy(() => import('../layout/index')),
    meta: {
      title: '系统'
    },
    redirect: '/dashborad/intro',
    children: [
      {
        path: '/dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard'
        },
        redirect: '/dashborad/intro',
        children: [
          {
            path: '/dashborad/intro',
            component: React.lazy(() => import('../views/dashboard/intro')),
            meta: {
              title: '系统介绍',
              icon: 'read'
            }
          }
        ]
      },

      // 以下菜单为系统权限管理
      {
        path: '/auth',
        meta: {
          title: '权限管理',
          icon: 'setting'
        },
        redirect: '/auth/menu',
        children: [
          {
            path: '/auth/menu',
            meta: {
              title: '菜单管理',
              icon: 'menu'
            },
            component: React.lazy(() => import('../views/auth/menu'))
          },
          {
            path: '/auth/role',
            meta: {
              title: '角色管理',
              icon: 'team'
            },
            component: React.lazy(() => import('../views/auth/role'))
          },
          {
            path: '/auth/user',
            meta: {
              title: '用户管理',
              icon: 'user'
            },
            component: React.lazy(() => import('../views/auth/user'))
          }
        ]
      },

      // 以下的路由改动请小心，涉及权限校验模块
      {
        path: '/error',
        meta: {
          title: '错误页面'
        },
        redirect: '/error/404',
        children: [
          {
            path: '/error/404',
            auth: false,
            component: React.lazy(() => import('../views/error/404')),
            meta: {
              title: '页面不存在'
            }
          },
          {
            path: '/error/403',
            auth: false,
            component: React.lazy(() => import('../views/error/403')),
            meta: {
              title: '暂无权限'
            }
          }
        ]
      },
      {
        path: '/*',
        meta: {
          title: '错误页面'
        },
        redirect: '/error/404'
      }
    ]
  }
]



// const routes: IRoute[] = [
//   {
//     path: '/system',
//     component:UserLayout,
//     meta: {
//       title: '系统路由'
//     },
//     redirect: '/system/login',
//     children: [
//       {
//         path: '/system/login',
//         component: Login,
//         meta: {
//           title: '登录'
//         }
//       },
//       {
//         path: '/system/register',
//         component:Register,
//         meta: {
//           title: '注册'
//         }
//       },
//       {
//         path: '/system/register-result/:id',
//         auth: false,
//         component:RegisterResult, 
//         meta: {
//           title: '注册结果'
//         }
//       },
//       {
//         path: '/system/recovery-pwd',
//         auth: false,
//         component: RecoveryPwd,
//         meta: {
//           title: '重置密码'
//         }
//       }
//     ]
//   },
//   {
//     path: '/',
//     component:Layout,
//     // component: React.lazy(() => import('../layout/AntdLayout')),
//     meta: {
//       title: '系统'
//     },
//     redirect: '/dashborad/intro',
//     children: [
//       {
//         path: '/dashboard',
//         meta: {
//           title: '首页',
//           icon: 'dashboard'
//         },
//         redirect: '/dashborad/intro',
//         children: [
//           {
//             path: '/dashborad/intro',
//             component: Intro,
//             meta: {
//               title: '系统介绍',
//               icon: 'read'
//             }
//           }
//         ]
//       },

//       // 以下菜单为系统权限管理
//       {
//         path: '/auth',
//         meta: {
//           title: '权限管理',
//           icon: 'setting'
//         },
//         redirect: '/auth/menu',
//         children: [
//           {
//             path: '/auth/menu',
//             meta: {
//               title: '菜单管理',
//               icon: 'menu'
//             },
//             component: Menu
//           },
//           {
//             path: '/auth/role',
//             meta: {
//               title: '角色管理',
//               icon: 'team'
//             },
//             component:Role
//           },
//           {
//             path: '/auth/user',
//             meta: {
//               title: '用户管理',
//               icon: 'user'
//             },
//             component: User
//           }
//         ]
//       },

//       // 以下的路由改动请小心，涉及权限校验模块
//       {
//         path: '/error',
//         meta: {
//           title: '错误页面'
//         },
//         redirect: '/error/404',
//         children: [
//           {
//             path: '/error/404',
//             auth: false,
//             component: Notfound,
//             meta: {
//               title: '页面不存在'
//             }
//           },
//           {
//             path: '/error/403',
//             auth: false,
//             component: UnAuthorized,
//             meta: {
//               title: '暂无权限'
//             }
//           }
//         ]
//       },
//       {
//         path: '/*',
//         meta: {
//           title: '错误页面'
//         },
//         redirect: '/error/404'
//       }
//     ]
//   }
// ]




export default routes
