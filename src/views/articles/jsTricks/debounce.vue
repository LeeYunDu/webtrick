/**
*作者:李云都
*时间:2021年4月21日21:30:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <h4>实例</h4>
    <el-button @click="rightNow">第一次立即执行</el-button>
    <el-button @click="waitTime">间隔后执行</el-button>
    <h4>代码</h4>
    <HighlightCode lang-type="javascriptString" :code="code2"></HighlightCode>
    <v-md-preview :text="tip"></v-md-preview>

    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>
  </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '防抖',
  author: '李云都',
  setup() {
    const content = ref(`
## 防抖
### 介绍
应用场景: 指触发事件后，在 n 秒内函数只能执行一次，如果触发事件后在 n 秒内又触发了事件，则会重新计算函数延执行时间。
举个栗子，坐电梯的时候，如果电梯检测到有人进来（触发事件），就会多等待 10 秒，此时如果又有人进来（10秒之内重复触发事件），那么电梯就会再多等待 10 秒。在上述例子中，电梯在检测到有人进入 10 秒钟之后，才会关闭电梯门开始运行，因此，“函数防抖”的关键在于，在 一个事件 发生 一定时间 之后，才执行 特定动作。
`)
    const tip = ref(`
::: danger setup编译问题
  避免使用箭头函数,编译过后,可能存在作用域混乱的问题
  实际上debounce函数接收第三个参数immediate,默认值为false  
  编译过后才出现以下函数
  vue3 在setup中 this的指向实际是undefined
:::
`)

    const rightNow = () => {
      debounce(log, 1000, true)('传入的参数1', '传入的参数2')
    }
    const log = (msg, msg2 = '不传参数') => {
      ElMessage.info(msg2)
    }
    const waitTime = () => {
      debounce(log, 1000)()
    }
    /**
     * fn 执行的方法
     * delay 执行间隔
     * immediate 是否立即执行
     */
    function debounce(fn, delay, immediate = false) {
      return function() {
        const time = delay

        const _arguments = arguments

        if (immediate && fn.id === undefined) {
          fn.apply(this, _arguments)
          fn.id = new Date().getTime()
        } else {
          if (fn.id) {
            clearTimeout(fn.id)
          }
          fn.id = setTimeout(function() {
            fn.apply(this, _arguments)
          }, time)
        }
      }
    }
    const code1 = ref(`
/**
  * fn 执行的方法
  * delay 执行间隔
  * immediate 是否立即执行
  */
function debounce(fn, delay, immediate = false) {
  return function() {
    const time = delay

    const _arguments = arguments

    if (immediate && fn.id === undefined) {
      fn.apply(this, _arguments)
      fn.id = new Date().getTime()
    } else {
      if (fn.id) {
        clearTimeout(fn.id)
      }
      fn.id = setTimeout(function() {
        fn.apply(this, _arguments)
      }, time)
    }
  }
}
    `)
    const code2 = ref(`
const rightNow = () => {
  debounce(log, 1000, true)('传入的参数1', '传入的参数2')
}
const log = (msg, msg2 = '不传参数') => {
  ElMessage.info(msg2)
}
const waitTime = () => {
  debounce(log, 1000)()
}
    `)

    return {
      content, debounce, rightNow, waitTime, tip, code1, code2
    }
  }
})
</script>

