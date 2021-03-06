import * as React from 'react'
import { Suspense } from 'react'
import { Spin } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { IRoute } from './router/types'
import { layoutRouteList } from './router/utils'
import config from './config'

import './styles/index.less'

function App() {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Router basename={config.BASENAME}>
        <Switch>
          {layoutRouteList.map((route: IRoute) => (
            <Route
              key={config.BASENAME ? config.BASENAME + route.path : route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
