<template>
  <div>
    <h3>学习</h3>
    <ul>
      <li>2021-11-09 学习 Vue响应式原理</li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { useObserver, objectDefineProperty } from './vue/observe/observe'
export default defineComponent({
  setup() {
    // Vue响应式原理
    useObserver()
    objectDefineProperty()
    return {

    }
  }
})
</script>

<style lang='scss' scoped>

</style>
