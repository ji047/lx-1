const target='http://192.168.0.110:8085';
// const target='http://192.168.0.110:8085';
module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'docs',
  css:{
    loaderOptions:{
      sass:{
        data:`@import "@/assets/scss/index.scss";`
      }
    }
  },
  devServer:{
    port:8888,
    disableHostCheck: true,
    proxy:{
      '/proxy':{
        target:target,
        changeOrigin:true,
        pathRewrite:{
          '^/proxy':''
        }
      },
    },
    // host:'192.168.0.137'
  }
};