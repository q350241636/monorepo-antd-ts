import { useState, memo, useEffect } from 'react'
import * as React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import './index.less'
import { useHistory } from 'react-router-dom'
import { Menu } from 'antd'
import pathToRegexp from 'path-to-regexp'
import { IRoute } from '../../router/config'
import { IStoreState } from '../../store/types'
import { Settings } from '../../store/module/settings'
import { AppState, setSideBarRoutes } from '../../store/module/app'
import { renderTitle, renderMenu } from '../SideMenu'

interface TopNavHeaderProps {
  // fixedHeader?: boolean
  layout?: Settings['layout']
  // sidebar: AppState['sidebar'];
  theme?: Settings['theme']
  routes?: AppState['routes']
  prefixCls?: AppState['prefixCls']
  className?: string
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
  const { theme, className: propsClassName, style, layout, routes } = props
  const prefixCls = `${props.prefixCls || 'layout'}__top-nav`

  const className = classNames(prefixCls, propsClassName, {
    light: theme === 'light',
  })
  const activeRoutes = (key: string): void => {
    console.log('activeRoutes-key', key)
    console.log('sideRoutes', sideRoutes)
    const currentRoutes = sideRoutes.filter(s => s.parentKey === key)
    console.log('activeRoutes-sideRoutes', sideRoutes)
    console.log('activeRoutes-currentRoutes', currentRoutes)

    // TODO commit currentRoute.children to sidebar
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
          if (!child.parentKey) child.parentKey = router.key || router.path
          sidebarRoutes.push(child)
        })
        // eslint-disable-next-line no-param-reassign
        router.children = []
      }
    })
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

  // const [openedKeys, setOpenedKeys] = useState<string[]>([]);

  /**
   * 页面加载激活菜单
   */
  useEffect((): void => {
    // eslint-disable-next-line no-restricted-globals
    const currentKey = location.pathname || '/'
    let activeTopKey = ''
    topRoutes.some(router => {
      const { path } = router
      const isSelected = currentKey.startsWith(path) || (path.includes(':') && pathToRegexp(path).exec(currentKey))
      console.log('path', path, 'currentKey', currentKey)
      if (isSelected) activeTopKey = path
      return true
    })
    setSelectedKeys([activeTopKey])
    activeTopKey && activeRoutes(activeTopKey)
  }, [sideRoutes])

  // useEffect((): void => {
  //   const currentKey = location.pathname;
  //   const defaultSelectedKeys = [];
  //   sideRoutes.forEach(router => {
  //     const { path } = router;
  //     const isSelected = currentKey.startsWith(path) || (path.includes(':') && pathToRegexp(path).exec(currentKey));
  //     console.log('path', path, 'currentKey', currentKey);
  //     if (isSelected) defaultSelectedKeys.push(path);
  //   });
  //   setSelectedkeys(defaultSelectedKeys);
  //   // props.setSideBarRoutes(currentRoutes);
  //   // activeRoutes(location.pathname);
  // }, [sideRoutes]);

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
  ({ settings, app: { sidebar, init, routes } }: IStoreState & TopNavHeaderProps) => ({
    ...settings,
    sidebar,
    routes,
    init,
  }),
  { setSideBarRoutes },
)(memo(TopNav))
