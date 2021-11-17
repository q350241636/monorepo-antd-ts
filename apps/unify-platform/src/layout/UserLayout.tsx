import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch, Link } from 'react-router-dom'
import { Spin, Result, Button, Layout, Typography } from 'antd'
import { getPageTitle, systemRouteList } from '../router/utils'
import { IRoute } from '../router/types'
import './UserLayout.less'

interface UserLayoutState {
  isError: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class UserLayout extends React.PureComponent<any, UserLayoutState> {
  state: UserLayoutState = {
    isError: false,
  }

  static getDerivedStateFromError() {
    return { isError: true }
  }

  componentDidCatch() {
    // 上报错误
  }

  render() {
    if (this.state.isError) {
      return (
        <Result
          status="warning"
          title="系统错误，请联系管理员"
          extra={
            <Button type="primary" key="console">
              Go Contact
            </Button>
          }
        />
      )
    }

    const title = getPageTitle(systemRouteList)

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>

        <div className="container">
          <div className="content">
            <div className="top">
              <Typography.Title className="header">
                <Link to="/">
                  <span className="title">React Ant Admin </span>
                </Link>
              </Typography.Title>
              <div className="desc">React Ant Admin 是 Admin 这条街最靓的仔</div>
            </div>
            <Suspense fallback={<Spin className="layout__loading" />}>
              <Switch>
                {systemRouteList.map((menu: IRoute) => (
                  <Route exact key={menu.path} path={menu.path} component={menu.component} />
                ))}
              </Switch>
            </Suspense>
          </div>
          <Layout.Footer style={{ textAlign: 'center' }}>React Ant Admin 是 Admin 这条街最靓的仔</Layout.Footer>
        </div>
      </>
    )
  }
}

export default UserLayout
