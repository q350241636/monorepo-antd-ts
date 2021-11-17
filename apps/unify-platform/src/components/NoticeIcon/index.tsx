import './index.less'

import {
  NoticeKeyAndIndexAndCount,
  NoticeMessageModule,
  NoticeState,
  clearNoticeByKey,
  readNoticeByKeyAndIndex,
} from '../../store/module/notice'
import React, { memo, useCallback, useEffect, useState } from 'react'

import { IStoreState } from '../../store/types'
import NavBarItem from '../LayoutNavBar/NavBarItem'
import NavDropdown from '../LayoutNavBar/NavDropdown'
import { Settings } from '../../store/module/settings'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { message } from 'antd'
import renderNoticeTab from './NoticeTab'

interface NoticeIconProps {
  theme: Settings['theme']
  notices: NoticeState
  clearNoticeByKey: (key: keyof NoticeState) => void
  readNoticeByKeyAndIndex: (action: NoticeKeyAndIndexAndCount) => void
}

function NoticeIcon(props: NoticeIconProps) {
  const [noticeVisible, setNoticeVisible] = useState(false)

  const onNoticeIconClick = useCallback((e: React.MouseEvent) => {
    console.log('onNoticeIconClick', e)
    // e.stopPropagation()
    setNoticeVisible(true)
  }, [])

  const closeNotice = useCallback((e: MouseEvent) => {
    console.log('closeNotice', e)
    setNoticeVisible(false)
  }, [])

  useEffect(() => {
    const root = window.document.getElementById('root')

    if (root) {
      root.addEventListener('click', (e: MouseEvent) => closeNotice(e), true)
    }
    return () => {
      if (root) {
        root.removeEventListener('click', (e: MouseEvent) => closeNotice(e))
      }
    }
  }, [])

  const onMessageClick = useCallback(
    (key: keyof NoticeState, index: number) => {
      const item = props.notices[key]
      if (item.list[index].read === 1) return

      props.readNoticeByKeyAndIndex({ key, index, count: item.count - 1 })
    },
    [props.notices, props.readNoticeByKeyAndIndex],
  )

  const onClear = useCallback(
    (key: keyof NoticeState) => {
      props.clearNoticeByKey(key)
    },
    [props.clearNoticeByKey],
  )

  const onMore = useCallback((key: keyof NoticeState) => {
    message.success(key)
  }, [])

  const noticeTotal = Object.values(props.notices)
    .map((notice: NoticeMessageModule) => notice.count)
    .reduce((a, b) => a + b)

  return (
    <NavDropdown
      visible={noticeVisible}
      overlay={renderNoticeTab(props.notices, onMessageClick, onClear, onMore)}
      trigger={['click']}
      placement="topLeft"
    >
      <div className={classnames('layout__navbar__menu-item', `layout__navbar__menu-item--${props.theme}`)}>
        <NavBarItem
          onClick={(e: React.MouseEvent<HTMLDivElement>) => onNoticeIconClick(e)}
          icon="bell"
          count={noticeTotal}
          overflowCount={99}
        />
      </div>
    </NavDropdown>
  )
}

export default connect(({ settings: { theme }, notices }: IStoreState) => ({ theme, notices }), {
  clearNoticeByKey,
  readNoticeByKeyAndIndex,
})(memo(NoticeIcon))
