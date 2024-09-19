const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy all '/auth' requests to the backend
  app.use(
    '/auth', 
    createProxyMiddleware({
      target: 'https://nittappdev.spider-nitt.org',
      changeOrigin: true,
      secure: false,
    })
  );

  // Proxy all '/api' requests to the backend
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://nittappdev.spider-nitt.org',
      changeOrigin: true,
      secure: false,
    })
  );

  // Proxy any additional specific paths if needed
  app.use(
    '/fetchOTP', 
    createProxyMiddleware({
      target: 'https://restapis.lcas.spider-nitt.org',
      changeOrigin: true,
      secure: false,
    })
  );

  // If there are any other specific endpoints, add them similarly
};
