/**
*作者:李云都
*时间:2021年4月21日21:30:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <h5>姓名脱敏</h5>
    <p>规则:2个字脱敏最后一个字，3个字脱敏中间一个字，大于3个字第一个和大于第4个字符</p>
    <ul>
      <li>输入张三,结果 张*</li>
      <li>输入张全蛋,结果 张*蛋</li>
      <li>输入张三李四,结果 张**四</li>
    </ul>
    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>
    <h5>手机脱敏</h5>
    <p>规则: 11位手机号中间四位脱敏显示</p>
    <HighlightCode lang-type="javascriptString" :code="code2"></HighlightCode>
    <h5>身份证号脱敏</h5>
    <p>规则: 年月日脱敏</p>
    <HighlightCode lang-type="javascriptString" :code="code3"></HighlightCode>

  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '脱敏',
  author: '李云都',
  setup() {
    const content = ref(`
## 脱敏
### 介绍
应用场景：手机号脱敏、姓名脱敏、身份证号脱敏
`)
    // 姓名脱敏
    const setNameDesensitization = (value) => {
      let result = ''
      if (value.length === 2) {
        result = value.substring(0, 1) + '*' // 截取name 字符串截取第一个字符，
      } else if (value.length === 3) {
        result = value.substring(0, 1) + '*' + value.substring(2, 3)// 截取第一个和第三个字符
      } else if (value.length > 3) {
        result = value.substring(0, 1) + '*' + '*' + value.substring(3, value.length)// 截取第一个和大于第4个字符
      }
      return result
    }
    const code1 = ref(`
// 姓名脱敏
const setNameDesensitization = (value) => {
  let result = ''
  if (value.length === 2) {
    result = value.substring(0, 1) + '*' // 截取name 字符串截取第一个字符，
  } else if (value.length === 3) {
    result = value.substring(0, 1) + '*' + value.substring(2, 3)// 截取第一个和第三个字符
  } else if (value.length > 3) {
    result = value.substring(0, 1) + '*' + '*' + value.substring(3, value.length)// 截取第一个和大于第4个字符
  }
  return result
}
`)
    // 手机号脱敏
    const setPhoneDesensitization = (value) => {
      if (value != null && value !== undefined) {
        var pat = /(\d{3})\d*(\d{4})/
        return String(value).replace(pat, '$1****$2')
      } else {
        return ''
      }
    }

    const code2 = ref(`
// 手机号脱敏
const setPhoneDesensitization = (value) => {
  if (value != null && value !== undefined) {
    var pat = /(\d{3})\d*(\d{4})/
    return String(value).replace(pat, '$1****$2')
  } else {
    return ''
  }
}
    `)
    // 身份证号码脱敏
    const setIDCarderDesensitization = (value) => {
      if (value != null && value !== undefined) {
        var pat = /^(.{6})(?:\d+)(.{4})$/
        return String(value).replace(pat, '$1****$2')
      } else {
        return ''
      }
    }
    const code3 = ref(`
// 身份证号码脱敏
const setIDCarderDesensitization = (value) => {
  if (value != null && value !== undefined) {
    var pat = /^(.{6})(?:\d+)(.{4})$/
    return String(value).replace(pat, '$1****$2')
  } else {
    return ''
  }
}
`)
    return {
      content, setNameDesensitization, setPhoneDesensitization, setIDCarderDesensitization,
      code1, code2,
      code3
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
