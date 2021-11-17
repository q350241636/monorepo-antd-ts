// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  // ...
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.landluck.cn/react-ant-admin-api',
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      },
    })
  )
}
