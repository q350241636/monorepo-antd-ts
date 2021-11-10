import React, { memo } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { apiGetMenuList } from '../views/auth/user/service'
import { Menu } from '../views/auth/menu/service'
import { IRoute, flattenRoutes } from '../router/config'
import { IStoreState } from '../store/types'
import TransitionMain from '../components/TransitionMain'
import { setRoutes } from '../store/module/app'

interface AsyncRoutesProps {
  children: React.ReactNode
  init: boolean
  setRoutes: (routes: IRoute[]) => void
}

function formatMenuToRoute(menus: Menu[]): IRoute[] {
  const result: IRoute[] = []

  menus.forEach(menu => {
    console.log('flattenRoutes', flattenRoutes, menu)
    const staticRoute = flattenRoutes.find(s => s.path === menu.url)
    console.log('staticRoute', staticRoute)
    if (staticRoute) {
      const route: IRoute = {
        path: menu.url,
        meta: {
          title: menu.name,
          icon: menu.icon,
        },
        redirect: staticRoute.redirect,
      }
      if (menu.children) {
        route.children = formatMenuToRoute(menu.children)
      }
      result.push(route)
    }
  })

  return result
}

function AsyncRoutes(props: AsyncRoutesProps) {
  console.log('AsyncRoutes', props)
  if (!props.init) {
    apiGetMenuList()
      .then(({ data }) => {
        console.table(data.list)
        props.setRoutes(formatMenuToRoute(data.list))
      })
      .catch(e => {
        console.error(e)
      })

    return <Spin className="layout__loading" />
  }

  return <TransitionMain>{props.children}</TransitionMain>
}

export default connect(({ app: { init } }: IStoreState) => ({ init }), {
  setRoutes,
})(memo(AsyncRoutes))
