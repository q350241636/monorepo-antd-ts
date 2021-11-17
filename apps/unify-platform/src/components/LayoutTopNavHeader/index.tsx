import './index.less'

import * as React from 'react'

import { AppState, setSideBarRoutes } from '@/store/module/app'
import { memo, useEffect, useState } from 'react'
import { renderMenu, renderTitle } from '../SideMenu'

import { IRoute } from '@/router/types'
import { IStoreState } from '@/store/types'
import { Menu } from 'antd'
import { Settings } from '@/store/module/settings'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { pathToRegexp } from 'path-to-regexp'
import { useHistory } from 'react-router-dom'

interface TopNavHeaderProps {
  // fixedHeader?: boolean
  layout?: Settings['layout']
  // sidebar: AppState['sidebar'];
  theme?: Settings['theme']
  routes?: AppState['routes']
  prefixCls?: AppState['prefixCls']
  className?: string
  currentPath: string
  style?: Record<string, unknown>
  setSideBarRoutes: (routes: IRoute[]) => void
}
const TopNav: React.FC<TopNavHeaderProps> = props => {
  const history = useHistory()
  /**
   * 侧边导航
   */
  const [sideRoutes, setSideRoutes] = useState<IRoute[]>([])

  // const ref = useRef(null);
  const { theme, className: propsClassName, style, layout, routes, currentPath } = props
  const prefixCls = `${props.prefixCls || 'layout'}__top-nav`

  const className = classNames(prefixCls, propsClassName, {
    light: theme === 'light',
  })

  /**
   * todo: remove
   *
   * @param key
   */
  const activeRoutes = (key: string): void => {
    console.log('activeRoutes-key', key)
    console.log('activeRoutes-sideRoutes', sideRoutes)

    const currentRoutes = sideRoutes.filter(s => s.parentKey === key)
    console.log('activeRoutes-sideRoutes', sideRoutes)
    console.log('activeRoutes-currentRoutes', currentRoutes)

    props.setSideBarRoutes(currentRoutes)
  }

  /**
   *顶部导航
   */
  const [topRoutes, setTopRoutes] = useState<IRoute[]>([])

  useEffect((): void => {
    if (!routes) return
    const tempRoutes: IRoute[] = JSON.parse(JSON.stringify(routes))
    setTopRoutes(tempRoutes)
  }, [routes])

  useEffect((): void => {
    const sidebarRoutes: IRoute[] = []
    topRoutes.forEach(router => {
      if (router.children && Array.isArray(router.children)) {
        router.children.forEach((child: IRoute) => {
          // eslint-disable-next-line no-param-reassign
          const key = router.key || router.path
          // if (key.includes('dashboard')) {
          //   key = key.replace('dashboard', 'dashborad')
          // }
          if (!child.parentKey) child.parentKey = key
          sidebarRoutes.push(child)
        })
        // eslint-disable-next-line no-param-reassign
        router.children = []
      }
    })
    console.log('sidebarRoutes', sidebarRoutes)
    setSideRoutes(sidebarRoutes)
  }, [topRoutes])

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const handleMenuOnclick = (router: IRoute) => {
    console.log(router.redirect, 'mix模式点击菜单')
    activeRoutes(router.path)
    setSelectedKeys([router.path])
    history.push(router.path)
  }
  const renderTopMenus = (): React.ReactNode =>
    topRoutes.map((route: IRoute) => {
      if (layout === 'mix') {
        return (
          <Menu.Item onClick={() => handleMenuOnclick(route)} key={route.path}>
            {renderTitle(route.meta)}
            {/* {route.redirect ? renderTitle(route.meta) : <Link to={route.path}>{renderTitle(route.meta)}</Link>} */}
          </Menu.Item>
        )
      }
      if (layout === 'top') {
        return renderMenu(route)
      }
      return undefined
    })

  /**
   * 页面加载激活菜单
   */
  useEffect((): void => {
    console.log('useEffect-sideRoutes')
    // eslint-disable-next-line no-restricted-globals
    const currentKey = location.pathname || '/'
    let activeTopKey = ''
    topRoutes.some(router => {
      let { path } = router
      const pathCopy = path
      if (path.includes('dashboard')) {
        path = path.replace('dashboard', 'dashborad')
      }
      const isSelected = currentKey.startsWith(path) || (path.includes(':') && pathToRegexp(path).exec(currentKey))
      console.log('path', path, 'currentKey', currentKey)
      if (isSelected) activeTopKey = pathCopy
      return isSelected
    })
    setSelectedKeys([activeTopKey])
    activeTopKey && activeRoutes(activeTopKey)
  }, [sideRoutes])

  /**
   * 页面加载激活菜单
   */
  useEffect((): void => {
    console.log('currentPath-changed')
    // eslint-disable-next-line no-restricted-globals
    const currentKey = location.pathname || '/'
    let activeTopKey = ''
    topRoutes.some(router => {
      let { path } = router
      const pathCopy = path
      if (path.includes('dashboard')) {
        path = path.replace('dashboard', 'dashborad')
      }
      const isSelected = currentKey.startsWith(path) || (path.includes(':') && pathToRegexp(path).exec(currentKey))
      console.log('path', path, 'currentKey', currentKey)
      if (isSelected) activeTopKey = pathCopy
      return isSelected
    })
    setSelectedKeys([activeTopKey])
    activeTopKey && activeRoutes(activeTopKey)
  }, [currentPath])

  /**
   * render函数
   */

  return (
    <div className={className} style={style}>
      <Menu mode="horizontal" theme={theme} selectedKeys={selectedKeys}>
        {renderTopMenus()}
      </Menu>
    </div>
  )
}

export default connect(
  ({ settings, app: { sidebar, init, routes, currentPath } }: IStoreState & TopNavHeaderProps) => ({
    ...settings,
    sidebar,
    routes,
    init,
    currentPath,
  }),
  { setSideBarRoutes },
)(memo(TopNav))
