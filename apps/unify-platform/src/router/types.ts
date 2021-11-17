import React from 'react'

export interface IRouteBase {
  // 路由路径
  path: string
  // 路由组件
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>
  // 302 跳转
  redirect?: string
  // 路由信息
  meta: IRouteMeta
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean

  // router key
  key?: string

  // mix模式下顶部菜单
  topHeader?: boolean
}

export interface IRouteMeta {
  title: string
  icon?: string
}

export interface IRoute extends IRouteBase {
  children?: IRoute[]
  // 父元素key
  parentKey?: string
}
