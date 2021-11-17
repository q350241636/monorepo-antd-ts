import './NoticeTab.less'

import { Empty, List, Tabs, Typography } from 'antd'
import { NoticeMessageItem, NoticeState } from '../../store/module/notice'

import React from 'react'
import classnames from 'classnames'

function renderNoticeList(
  list: NoticeMessageItem[],
  key: keyof NoticeState,
  // eslint-disable-next-line no-shadow
  onMessageClick: (key: keyof NoticeState, index: number) => void,
) {
  return (
    <List
      className="notice__list"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item, index) => (
        <List.Item
          className={classnames('notice__item', {
            'notice__item--read': item.read === 1,
          })}
          onClick={() => onMessageClick(key, index)}
        >
          <List.Item.Meta
            className="notice__item-meta"
            title={
              <div className="notice__item-title">
                {item.title}
                {item.extra && (
                  <Typography.Text className="notice__item-extra" type={item.extra.level}>
                    {item.extra.text}
                  </Typography.Text>
                )}
              </div>
            }
            description={
              <div>
                <div className="notice__item-message">{item.message}</div>
                <div className="notice__item-time">{item.time}</div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  )
}

function renderNoticeTab(
  notices: NoticeState,
  onMessageClick: (key: keyof NoticeState, index: number) => void,
  onClear: (key: keyof NoticeState) => void,
  onMore: (key: keyof NoticeState) => void,
) {
  const noticeList = (Object.keys(notices) as (keyof NoticeState)[]).map((key: keyof NoticeState) => ({
    ...notices[key],
    key,
  }))

  return (
    <div className="navbar__notice">
      <Tabs size="middle">
        {noticeList.map(notice => (
          <Tabs.TabPane tab={`${notice.title} (${notice.count})`} key={notice.key}>
            {notice.list.length === 0 ? (
              <Empty description={`暂无新的${notice.title}`} />
            ) : (
              renderNoticeList(notice.list, notice.key, onMessageClick)
            )}
            {notice.list.length > 0 && (
              <div className="navbar__notice__footer">
                <div className="navbar__notice__footer-title" onClick={() => onClear(notice.key)}>
                  清空{notice.title}
                </div>
                <div className="navbar__notice__footer-title" onClick={() => onMore(notice.key)}>
                  查看更多
                </div>
              </div>
            )}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default renderNoticeTab
