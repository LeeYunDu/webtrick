<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <h5>实例</h5>
    <div class="count-list">
      <div v-for="(item,index) in countList" :key="index" class="count-item">
        <div class="count-label">{{ item.label }}</div>
        <div class="count-value"> <span :id="'count' + index" /> <span class="value-unit">{{ item.unit }}</span> </div>
      </div>
    </div>
    <h5>代码</h5>

    <HighlightCode lang-type="javascriptString" :code="code2"></HighlightCode>

  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { CountUp } from 'countup.js'

export default defineComponent({
  name: '数字变化动态效果',
  setup() {
    const content = ref(`
## 数字变化动态效果
### 介绍
应用场景：大屏端数字动态变化效果
需要安装依赖 **countup.js**

`)
    const code1 = ref({
      'display': 'inline-block',
      'font-size': '18px',
      'background-image': 'linear-gradient(90deg, #19b1fb, red)',
      '-webkit-background-clip': 'text',
      'color': 'transparent'
    })
    const that = reactive({
      countList: [
        { label: '应用数量', value: '1502', type: 'app' },
        { label: '数据归集量', value: '133.62', type: 'count', unit: '亿' },
        { label: '每日调用量', value: '5350900', type: 'api' },
        { label: '接入监控数', value: '154231', type: 'camera' },
        { label: '上架组件数', value: '75', type: 'count2' },
        { label: '应用数量', value: '1502', type: 'app' },
        { label: '应用数量2', value: '1502', type: 'app' }
      ]
    })

    function countUp() {
      // 数字变动
      that.countList.forEach((e, index) => {
        // new CountUp 参数为 DOM元素ID值 和 需要变化的值
        var numAnim = new CountUp('count' + index, e.value)
        numAnim.start()
      })
    }
    const code2 = ref(`
// 安装依赖
npm install countup.js
// 引入依赖
import { CountUp } from 'countup.js'


// template
<div class="count-list">
  <div v-for="(item,index) in countList" :key="index" class="count-item">
    <div class="count-label">{{ item.label }}</div>
    <div class="count-value"> <span :id="'count' + index" /> <span class="value-unit">{{ item.unit }}</span> </div>
  </div>
</div>

// JavaScript
function countUp() {
  // 数字变动
  that.countList.forEach((e, index) => {
    // new CountUp 参数为 DOM元素ID值 和 需要变化的值
    var numAnim = new CountUp('count' + index, e.value)
    numAnim.start()
  })
}
`)
    onMounted(countUp)
    return {
      ...toRefs(that),
      code1, content, countUp, code2
    }
  }
})
</script>
<style lang="scss" scoped>

.count-list{
  display: flex;
  justify-content: space-around;
  margin: 2vh 0;
  .count-item{
    text-align: center;
    .count-bg{
      margin: 0 auto;
      width: 60px;
      height: 71px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .count-label{
      font-family: SourceHanSansCN-Medium,serif;
      color: #666;
    }
    .count-value{
      font-family: DIN-Bold,serif;
      color: #3196fa;
      font-size: 18px;

      .value-unit{
        font-family: SourceHanSansCN-Regular;
        font-size: 14px;
        font-weight: bold;
        color: #3196fa;
      }
    }
  }
}
</style>
