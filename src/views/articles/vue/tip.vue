<template>
  <div>
    <h3>ref的循环赋值</h3>
    <HighlightCode lang-type="html" :code="code2" />
    <HighlightCode lang-type="javascriptString" :code="code1" />
    <h3>动态引入组件方式 - 字符串传参拼接地址 </h3>
    <HighlightCode lang-type="javascriptString" :code="code3" />
    <h3>表单input - 双向绑定限制只能输入数字 </h3>
    <HighlightCode lang-type="html" :code="code4" />
    <h3>vue3 - eventbus,请搜索依赖 mitt</h3>
    <h3>vue3 - 在mian.ts的app下通过project挂载全局方法/变量,组件内用inject接收</h3>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Vue3开发小技能',
  setup() {
    const code1 = ref(`
setup() {
  // 单个赋值
  const testDom = ref<HTMLDivElement|null>(null)
  // 循环获取
  const refs = ref([])
  const setRef = (el) => {
    refs.value.push(el)
  }
  return {testDom,refs,setRef}
}
`)
    const code2 = ref(`<template>
  <div>
    // 单个获取
    <div ref="testDom"></div>
    // 循环赋值
    <div v-for="item in 5" :ref="setRef" :key="item">{{ item }}</div>
  </div>
</template>
`)
    const code3 = ref(`export const getParentLayout = (path?: string) => {
  return () =>
    new Promise((resolve) => {
      const compoment = require('@/组件模块地址/子组件地址.vue')
      resolve(compoment)
    })
}
`)
    const code4 = ref(`
<el-input v-model.number="ruleForm.name" min="0" type="number" placeholder="请输入频率" />
`)
    return {
      code1, code2, code3, code4
    }
  }
})
</script>

