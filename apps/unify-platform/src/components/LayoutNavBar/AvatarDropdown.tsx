import { Avatar, Menu, message } from 'antd'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import React, { memo, useCallback } from 'react'
import { UserState, setUserInfo } from '../../store/module/user'

import { IStoreState } from '../../store/types'
import NavDropdown from './NavDropdown'
import { clearSideBarRoutes } from '../../store/module/app'
import { connect } from 'react-redux'
import { removeToken } from '../../utils/cookie'
import { useHistory } from 'react-router-dom'

interface AvatarDropdownProps {
  avatar?: string
  account: string
  classNames: string
  clearSideBarRoutes: () => void
  // eslint-disable-next-line no-unused-vars
  setUserInfo: (user: UserState) => void
}

function renderManageUser(onMenuClick: (params: { key: string }) => void) {
  return (
    <Menu className="avatar-dropdown" selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )
}

function AvatarDropdown(props: AvatarDropdownProps) {
  const history = useHistory()

  const onMenuClick = useCallback(({ key }: { key: string }) => {
    // console.log(key);
    message.success(key)
    if (key === 'logout') {
      removeToken()
      props.setUserInfo({ token: '', account: '', avatar: '', mobile: '', id: 0, role: 0 })
      props.clearSideBarRoutes()
      history.replace('/system/login')
    }
  }, [])

  return (
    <NavDropdown overlay={renderManageUser(onMenuClick)} trigger={['click']}>
      <div className={props.classNames}>
        <Avatar size="small" className="layout__navbar__avatar" src={props.avatar} alt="avatar" />
        <span className="layout__navbar__account">{props.account}</span>
      </div>
    </NavDropdown>
  )
}

export default connect(({ user: { avatar, account } }: IStoreState) => ({ avatar, account }), {
  clearSideBarRoutes,
  setUserInfo,
})(memo(AvatarDropdown))
