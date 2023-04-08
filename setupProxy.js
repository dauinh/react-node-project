const config = require('./config')
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: `http://localhost:${config.PORT}`,
      changeOrigin: true,
    })
  );
};