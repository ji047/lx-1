const target='http://192.168.0.127:8081';
// const target='http://localhost:8080';
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
      '/':{
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