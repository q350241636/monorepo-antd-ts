import './index.less'

import React, { memo } from 'react'

import { IStoreState } from '../../store/types'
import { Layout } from 'antd'
import LayoutNavBar from '../LayoutNavBar'
import LayoutTopNavHeader from '../LayoutTopNavHeader'
import Logo from '../SidebarLogo'
import { Settings } from '../../store/module/settings'
import classNames from 'classnames'
import { connect } from 'react-redux'

// import { AppState } from '../../store/module/app';

const AntdHeader = Layout.Header

interface LayoutHeaderProps {
  fixedHeader?: boolean
  contentWidth?: Settings['contentWidth']
  layout?: Settings['layout']
  // sidebar: AppState['sidebar'];
  theme?: Settings['theme']
  // routes?: AppState['routes'];
}

const LayoutHeader: React.FC<LayoutHeaderProps> = (props: LayoutHeaderProps) => {
  // const { pathname } = window.location;

  const { layout, theme } = props
  console.log('LayoutHeader-props', props)
  /**
   * header是否需要fixed定位
   */
  const needFixedHeader = props.fixedHeader || props.layout === 'mix'

  const headerClassNames = classNames('layout__header', `layout__header--${layout}`, `layout__header--${theme}`, {
    'layout__header--fix': needFixedHeader,
    // close 情况只有在 layout 为 side 的时候存在
    // 'layout__header--close': !props.sidebar.opened && props.layout === 'side'
  })
  return (
    <AntdHeader className={headerClassNames}>
      <div
        className={classNames('layout__header__inner', {
          [`layout__header__inner--${props.contentWidth}`]: props.layout === 'top',
        })}
      >
        {(props.layout === 'top' || props.layout === 'mix') && (
          <div className="layout__header__main">
            <div className={`layout__side-bar__logo--${props.layout}`}>
              <Logo opened layout={props.layout} />
            </div>
            <LayoutTopNavHeader style={undefined} />
          </div>
        )}
        <LayoutNavBar />
      </div>
    </AntdHeader>
  )
}

export default connect(({ settings, app: { sidebar, init } }: IStoreState & LayoutHeaderProps) => ({
  ...settings,
  sidebar,
  init,
}))(memo(LayoutHeader))
