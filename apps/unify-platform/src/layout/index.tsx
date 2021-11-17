import './index.less'

import React, { Suspense, useEffect } from 'react'

import Header from '../components/LayoutHeader'
import { IStoreState } from '../store/types'
import LayoutSettings from '../components/LayoutSettings'
import MainRoutes from './MainRoutes'
import { Settings } from '../store/module/settings'
import Sidebar from '@/components/LayoutSideBar'
import { Spin } from 'antd'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { setCurrentPath } from '@/store/module/app'

interface LayoutProps {
  layout: Settings['layout']

  colorWeak: boolean

  fixedHeader: boolean

  contentWidth: Settings['contentWidth']

  setCurrentPath: (path: string) => void
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { layout } = props

  /** 页面切换的时候触发 */
  useEffect((): void => {
    console.log('layout-切换切换', location.pathname)
    props.setCurrentPath(location.pathname)
  }, [location.pathname, location.pathname?.search])

  return (
    <>
      <section
        className={classnames({
          layout: true,
          'layout--side-bar': props.layout === 'side' || props.layout === 'mix',
          'layout--weak': props.colorWeak,
        })}
      >
        {['side', 'mix'].includes(layout) && <Sidebar />}
        <section className={classnames('layout__main')}>
          <Header />
          <div
            className={classnames('layout__container', {
              'layout__container--fix': props.fixedHeader,
              'layout__container--fixed': props.contentWidth === 'fixed' && props.layout === 'top',
            })}
          >
            <Suspense fallback={<Spin size="large" className="layout__loading" />}>
              <MainRoutes />
            </Suspense>
          </div>
        </section>
        <LayoutSettings />
      </section>
    </>
  ) as React.ReactElement
}

export default connect(
  ({ settings: { layout, colorWeak, fixedHeader, contentWidth } }: IStoreState) => ({
    layout,
    colorWeak,
    fixedHeader,
    contentWidth,
  }),
  { setCurrentPath },
)(Layout)
