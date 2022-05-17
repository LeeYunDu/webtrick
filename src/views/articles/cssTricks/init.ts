
import { article, router } from '@/interface/articleConfig'

const articles:Array<article> = []
/**
 * 重要说明！！！
 *
 * 第一个参数不接收任何声明变量,想封装都不行 日噢！
 *
 * 第一个参数是指你读取文件的路径
 * 第二个参数是指是否遍历文件的子目录
 * 第三个参数是匹配对应文件的正则表达式(获取common文件夹下所有的.vue文件)
 */

const requireComponent = require.context('../cssTricks', true, /\.vue$/)

//  对获取到的文件进行遍历
requireComponent.keys().forEach(key => {
  // 截取到文件名
  const filname = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
  // 将文件路径赋值给对应名称的对象的属性
  const component = requireComponent(key).default || requireComponent(key)
  // 如果不想生成路由列表,不要添加name字段
  if (component.name) {
    const vueFile:article = {
      name: component.name,
      author: component.author,
      fileName: filname,
      components: component,
      sort: component.sort as number || 999,
      filePath:component['__file']

    }
    articles.push(vueFile)
  }
})

export default function() {
  const result:router = {
    title: 'CSS技巧',
    meta: {},
    children: articles,
    sort: 3
  }
  return result
}

