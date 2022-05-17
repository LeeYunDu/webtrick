/**
*作者:李云都
*时间:2021年4月21日21:30:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <h4>mement 应用实例</h4>
    <HighlightCode lang-type="javascriptString" :code="code2"></HighlightCode>

    <h4>实例</h4>
    <h5>格式   yyyy-MM-dd:    {{ example1 }}</h5>
    <h5>格式   yyyy-MM-dd hh:mm:ss:    {{ example2 }}</h5>
    <h4>代码</h4>
    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import moment from 'moment'
export default defineComponent({
  name: '时间戳转换',
  author: '李云都',
  setup() {
    const content = ref(`
## 时间戳
### 介绍
应用场景：时间格式转换
* 传入 new Date()转换
* 支持格式yyyy-MM-dd hh:mm:ss
* 关于时间的转换插件  [Moment.js](http://momentjs.cn/)
`)
    const timestamp = (data, format) => {
      var args = {
        'M+': data.getMonth() + 1,
        'd+': data.getDate(),
        'h+': data.getHours(),
        'm+': data.getMinutes(),
        's+': data.getSeconds(),
        'q+': Math.floor((data.getMonth() + 3) / 3), // quarter
        'S': data.getMilliseconds()
      }
      if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      for (var i in args) {
        var n = args[i]
        if (new RegExp('(' + i + ')').test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length)) }
      }
      return format
    }
    const example1 = timestamp(new Date(), 'yyyy-MM-dd')
    const example2 = timestamp(new Date(), 'yyyy-MM-dd  hh:mm:ss')

    const code1 = ref(`
const timestamp = (data, format) => {
  var args = {
    'M+': data.getMonth() + 1,
    'd+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds(),
    'q+': Math.floor((data.getMonth() + 3) / 3), // quarter
    'S': data.getMilliseconds()
  }
  if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var i in args) {
    var n = args[i]
    if (new RegExp('(' + i + ')').test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length)) }
  }
  return format
}
    `)

    const code2 = ref(`
// 引入moment
import moment from 'moment'
// 设置语言返回为中文
moment.locale('zh-cn')

day: moment().format('YYYY/MM/DD'), // 获取当前日期
week: moment().format('dddd'),// 获取今天是星期几
time: moment().format('LTS')  // 获取 时分秒
`)
    return {
      content, example1, example2, timestamp, code1, code2
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
