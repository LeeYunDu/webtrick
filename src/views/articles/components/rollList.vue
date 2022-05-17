<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <HighlightCode lang-type="html" :code="code2"></HighlightCode>
    <h5>test-list 样式</h5>
    <HighlightCode lang-type="css" :code="code3"></HighlightCode>
    <h5>test-item 样式</h5>
    <HighlightCode lang-type="css" :code="code4"></HighlightCode>
    <h5>javascript</h5>
    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>

    <HighlightCode lang-type="javascriptString" :code="code5"></HighlightCode>
    <div class="test-list">
      <vue-seamless-scroll :data="testData" :class-option="option">
        <div v-for="(item,index) in testData" :key="index" class="test-item">{{ item.label }}</div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import vueSeamlessScroll from 'vue-seamless-scroll/src'
export default defineComponent({
  name: 'RollList无限滚动列表',
  components: {
    vueSeamlessScroll
  },
  setup() {
    const that = reactive({
      testData: [
        { label: '测试列表1' },
        { label: '测试列表2' },
        { label: '测试列表3' },
        { label: '测试列表4' },
        { label: '测试列表5' },
        { label: '测试列表6' },
        { label: '测试列表7' },
        { label: '测试列表8' }
      ],
      option: {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    })
    const content = ref(`
##  无限滚动列表实例
### 介绍
插件  vue-seamless-scroll 

`)
    const code1 = ref(`
// 安装插件
npm install vue-seamless-scroll
// vue文件引入插件
import vueSeamlessScroll from 'vue-seamless-scroll/src'
`)
    const code2 = ref(`
<div class="test-list">
  <vue-seamless-scroll :data="testData" :class-option="option">
    <div v-for="(item,index) in testData" :key="index" class="test-item">{{ item.label }}</div>
  </vue-seamless-scroll>
</div>
`)
    const code3 = ref({
      height: '300px',
      width: ' 400px',
      overflow: 'hidden',
      padding: '10px',
      'box-sizing': 'border-box',
      border: '1px solid black'
    })
    const code4 = ref({
      height: '50px',
      'border-bottom': '1px solid black',
      'line-height': '50px'
    })

    const code5 = ref(`
const that = reactive({
  testData: [
    { label: '测试列表1' },
    { label: '测试列表2' },
    { label: '测试列表3' },
    { label: '测试列表4' },
    { label: '测试列表5' },
    { label: '测试列表6' },
    { label: '测试列表7' },
    { label: '测试列表8' }
  ],
  option: {
    step: 0.2, // 数值越大速度滚动越快
    limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
    hoverStop: true, // 是否开启鼠标悬停stop
    direction: 1, // 0向下 1向上 2向左 3向右
    openWatch: true, // 开启数据实时监控刷新dom
    singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
    singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
    waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
  }
})
`)
    return {
      ...toRefs(that),
      content, code1, code2, code3, code4, code5
    }
  }
})
</script>
<style lang="scss" scoped>
.test-list {
  height: 300px;
  width: 400px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid black;
  .test-item {
    height: 50px;
    border-bottom: 1px solid black;
    line-height: 50px;
  }
}
</style>
