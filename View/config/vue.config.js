const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    public: "183.6.153.226:8080",
    open: true,
    https: false,
    port: '8080',
    historyApiFallback: true,
    allowedHosts: "all",
    public: 'app-home.viomi.com.cn'
  },
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: './'
});
