import React, { memo } from 'react'
import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'
import { IRoute } from '../router/types'
import Auth from './Auth'
import { businessRouteList, getPageTitle } from '../router/utils'
import AsyncRoutes from './AsyncRoutes'

const renderRoute = (route: IRoute) => {
  const title = getPageTitle(businessRouteList)

  const { component: Component } = route
  return (
    <Route
      key={route.path}
      exact={route.path !== '*'}
      path={route.path}
      render={props => {
        return (
          <Auth {...props} route={route}>
            <Helmet>
              <title>{title}</title>
              <meta name="description" content={title} />
            </Helmet>
            {Component && <Component {...props} />}
          </Auth>
        )
      }}
    />
  )
}

const MainRoutes: React.FC = props => {
  console.log('MainRoutes-props', props)

  return <AsyncRoutes>{businessRouteList.map((child: IRoute) => renderRoute(child))}</AsyncRoutes>
}

export default memo(MainRoutes)
