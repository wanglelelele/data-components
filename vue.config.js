const path = require('path');

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/mixin.scss";',
      },
    },
  },
  configureWebpack: {
    module: {
      unknownContextCritical: false,
    },
    plugins: [],
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve('./src'));
  },
};
