import { Menu } from 'antd'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SelectInfo } from 'rc-menu/lib/interface'
import { IRoute } from '../../router/types'
import { getPagePathList } from '../../router/utils'
import { AppState } from '../../store/module/app'
import { Settings } from '../../store/module/settings'
import { IStoreState } from '../../store/types'
import Hamburger from '../Hamburger'
import Logo from '../SidebarLogo'
import renderMenu from '../SideMenu'
import './index.less'

interface LayoutSideBarProps extends Settings {
  sidebar: AppState['sidebar']
  routes?: AppState['routes']
  init?: boolean
}

function LayoutSideBar({ theme, layout, sidebar }: LayoutSideBarProps) {
  const { opened, sidebarRoutes } = sidebar
  const inlineCollapsed: {
    inlineCollapsed?: boolean
  } = {}

  if (layout === 'side') {
    inlineCollapsed.inlineCollapsed = !opened
  }

  const { pathname } = window.location

  const [defaultSelectedKeys, seDefaultSelectedKeys] = useState<string[]>()

  useEffect(() => {
    console.log('layoutsidebar-useEffect-pathname', pathname)
    seDefaultSelectedKeys([pathname])
  }, [pathname])

  const handleMenuItemSelected = ({ key }: SelectInfo) => {
    seDefaultSelectedKeys([key])
  }
  return (
    <aside
      className={classnames('layout__side-bar', `layout__side-bar--${theme}`, `layout__side-bar--${layout}`, {
        'layout__side-bar--close': !sidebar.opened && layout === 'side',
      })}
    >
      <div className={`layout__side-bar__logo--${layout}`}>
        {layout === 'side' && <Logo opened={!sidebar.opened} layout={layout} />}
      </div>
      <div className="layout__side-bar__menu">
        <Menu
          defaultOpenKeys={layout === 'side' && sidebar.opened ? getPagePathList(pathname) : []}
          mode={layout === 'side' || layout === 'mix' ? 'inline' : 'horizontal'}
          theme={theme}
          onSelect={handleMenuItemSelected}
          selectedKeys={defaultSelectedKeys}
          {...inlineCollapsed}
        >
          {sidebarRoutes.map((menu: IRoute) => renderMenu(menu))}
        </Menu>
        {layout === 'mix' && (
          <Hamburger
            isActive={false}
            onTrigger={() => {
              console.log('123')
            }}
          />
        )}
      </div>
    </aside>
  )
}

export default connect(({ settings, app: { sidebar, init } }: IStoreState) => ({
  ...settings,
  sidebar,
  init,
}))(LayoutSideBar)

// export default LayoutSideBar;
