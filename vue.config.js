/**
 * publicPath 部署应用包时的基本 URL
 * css 加载全局样式\全局变量
 */
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development'

}
