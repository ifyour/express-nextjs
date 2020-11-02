import httpProxyMiddleware from 'next-http-proxy-middleware'

// https://nextjs.org/docs/api-routes/dynamic-api-routes#optional-catch-all-api-routes
export default (req, res) => (
  httpProxyMiddleware(req, res, {
    target: 'http://localhost:5000',
    // pathRewrite: {
    //   '^/api': '/api',
    // },
  })
);
