/**
*作者:李云都
*时间:2021年4月21日21:30:05
*/
<template>
  <div>

    <!-- <v-md-preview :text="content"></v-md-preview> -->
    <!-- <h4>实例</h4>
    <el-button @click="rightNow">第一次立即执行</el-button>
    <el-button @click="waitTime">间隔后执行</el-button>
    <h4>代码</h4>
    <HighlightCode lang-type="javascript" :code="rightNow"></HighlightCode>
    <HighlightCode lang-type="javascript" :code="waitTime"></HighlightCode>
    <v-md-preview :text="tip"></v-md-preview>

    <HighlightCode lang-type="javascript" :code="debounce"></HighlightCode> -->
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default {
  // name: '节流',
  created() {

  },
  mounted() {

  },
  methods: {

    debounce(fn, delay) {
      return function() {
        const time = delay
        console.log(arguments.length, 'arguments')
        console.log(arguments[0], 'arguments0')
        console.log(arguments[1], 'arguments1')
        console.log(this, 'this')
        if (fn.id) {
          clearTimeout(fn.id)
        }
        fn.id = setTimeout(() => {
          fn.call(this, arguments)
        }, time)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
