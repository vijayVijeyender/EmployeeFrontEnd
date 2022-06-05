const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://employee--springboot.herokuapp.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
