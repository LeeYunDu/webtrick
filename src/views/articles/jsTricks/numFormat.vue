/**
*作者:李云都
*时间:2021年4月22日16:30:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <h5>实例</h5>
    {{ numFormat(123456789) }};
    <HighlightCode lang-type="javascriptString" :code="code"></HighlightCode>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '千位分隔符',
  setup(props) {
    const content = ref(`
## 千位分隔符
### 介绍
应用场景：大屏展示,一些数值需要逗号隔开
`)

    function numFormat(value, type) {
      try {
        // 转换成数字类型才能调用toLocaleString
        const num = Number(value)
        let result
        switch (type) {
          case 'money':
            result = num.toLocaleString('zh', { style: 'currency', currency: 'cny' })
            break
          default:
            result = (num).toLocaleString()
        }
        return result
      } catch (error) {
        return ''
      }
    }
    const code = `
  function numFormat(value, type) {
      try {
        // 转换成数字类型才能调用toLocaleString
        const num = Number(value)
        let result
        switch (type) {
          case 'money':
            result = num.toLocaleString('zh', { style: 'currency', currency: 'cny' })
            break
          default:
            result = (num).toLocaleString()
        }
        return result
      } catch (error) {
        return ''
      }
    }
`
    return {
      content, code, numFormat
    }
  }
})
</script>

