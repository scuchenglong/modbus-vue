module.exports = {
  //路径前缀
  publicPath: "/",
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    });
    const entry = config.entry('app');
    entry.add('babel-polyfill').end();
    entry.add('classlist-polyfill').end();
    entry.add('@/mock').end();
  },
  devServer: {
    port: 9527,
    proxy: {
      '/api': {
        //本地服务接口地址
        // target: 'http://118.190.173.21:80',
        target: 'http://127.0.0.1:8080',
        //远程演示服务地址,可用于直接启动项目
        //target: 'https://saber.memox.vip/api',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
};
