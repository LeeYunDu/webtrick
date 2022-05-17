// 自动加载 articles 目录下的 .ts 结尾的文件
const articlesComponents = {}
const componentsContext = require.context('./articles', true, /\init.ts$/)

componentsContext.keys().forEach(component => {
  // 计算出模块的名称
  const endIndex = component.indexOf('init.ts')
  const key = component.slice(2, endIndex - 1)
  const anchors = componentsContext(component).default()

  articlesComponents[key] = anchors
})
export default articlesComponents
