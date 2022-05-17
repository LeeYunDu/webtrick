<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <div>
      <h5>源数据</h5>
      姓名:{{ orign.name }};年龄:{{ orign.age }}
      <h5>引用数据案例1</h5>
      <el-button type="primary" size="mini" @click="change1">修改引用数据</el-button>
      姓名:{{ edit1.name }};年龄:{{ edit1.age }}
      <h5>引用数据案例2</h5>
      <HighlightCode lang-type="javascriptString" :code="code2"></HighlightCode>

      <el-button type="primary" size="mini" @click="change2">修改引用数据</el-button>
      姓名:{{ edit2.name }};年龄:{{ edit2.age }}
      <h5>引用数据案例3</h5>
      <p>递归对象,复制一个出来</p>
      <el-button type="primary" size="mini" @click="change3">修改引用数据</el-button>
      姓名:{{ edit3.name }};年龄:{{ edit3.age }}
      <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '深拷贝',
  setup() {
    const content = ref(`
## 深拷贝
应用场景: 引用对象后进行修改操作,避免污染原对象
`)
    const orign = ref({
      name: '张三',
      age: 15
    })
    const edit1 = orign
    const change1 = () => {
      edit1.value.name = '张三修改1'
      edit1.value.age = 10
    }
    const edit2 = ref(JSON.parse(JSON.stringify(orign.value)))
    const change2 = () => {
      edit2.value.name = '张三修改2'
      edit2.value.age = 20
    }
    const edit3 = ref(deepCopy(orign.value))
    const change3 = () => {
      edit3.value.name = '张三修改3'
      edit3.value.age = 30
    }
    function deepCopy(obj):any {
      var result = Array.isArray(obj) ? [] : {}
      for (var key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            result[key] = deepCopy(obj[key]) // 递归复制
          } else {
            result[key] = obj[key]
          }
        }
      }
      return result
    }
    const code1 = `function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]) // 递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

`
    const code2 = `const newObj = JSON.parse(JSON.stringify(OldObj))`
    return {
      content, orign, edit1, change1, edit2, change2, deepCopy, code1, code2, change3, edit3
    }
  }
})
</script>

