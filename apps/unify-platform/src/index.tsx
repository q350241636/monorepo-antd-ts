import 'antd/dist/antd.less'

// import React from 'react';
import * as React from 'react'
import * as serviceWorker from './serviceWorker'

import App from './App'
import ClientMonitor from 'skywalking-client-js'
import { ConfigProvider } from 'antd'
import ErrorBoundary from './views/error/ErrorBoundary'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import store from './store'
import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
)

// Report collected data to `http:// + window.location.host + /browser/perfData` in default
ClientMonitor.register({
  collector: 'http://192.168.64.78:8080/',
  service: 'test-ui',
  pagePath: '/current/page/name',
  serviceVersion: 'v1.0.0',
})

function foo() {
  console.log('foo')
  Promise.reject({
    message: 'promise test',
    stack: 'promise error',
  })
}
foo()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
