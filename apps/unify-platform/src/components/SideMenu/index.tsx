import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  DashboardOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import { IRoute, IRouteMeta } from '../../router/types'
import './index.less'
import config from '../../config'

const iconMap: Record<string, unknown> = {
  MenuUnfoldOutlined: <MenuUnfoldOutlined />,
  MenuOutlined: <MenuOutlined />,
  UserOutlined: <UserOutlined />,
  TeamOutlined: <TeamOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  ReadOutlined: <ReadOutlined />,
}

export function renderTitle(meta: IRouteMeta) {
  /* eslint-disable no-confusing-arrow */
  return (
    <span className="menu-item-inner">
      {meta.icon && iconMap[meta.icon]}
      <span className="menu-title">{meta.title}</span>
    </span>
  )
}

function renderMenuRoute(menu: IRoute) {
  return (
    <Menu.Item key={config.BASENAME ? config.BASENAME + menu.path : menu.path}>
      <Link to={menu.path}>{renderTitle(menu.meta)}</Link>
    </Menu.Item>
  )
}

function renderSubMenu(menu: IRoute) {
  return (
    <Menu.SubMenu title={renderTitle(menu.meta)} key={config.BASENAME ? config.BASENAME + menu.path : menu.path}>
      {menu.children &&
        menu.children.map((item: IRoute) => (item.children ? renderSubMenu(item) : renderMenuRoute(item)))}
    </Menu.SubMenu>
  )
}

export function renderMenu(menu: IRoute): React.ReactNode {
  if (menu.children) {
    return renderSubMenu(menu)
  }

  return renderMenuRoute(menu)
}

export default renderMenu
