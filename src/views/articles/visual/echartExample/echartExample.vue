<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <div class="echartGather">
      <div v-for="(item,index) in echartGather" :key="index" class="echart-item">
        <div class="echart-box">
          <div :id="item.ref" :ref="setRef" class="echart-container"></div>
          <div class="echart-title">{{ item.title }} <span class="look-code" @click="lookConfig(item)">查看配置</span> </div>
          <div class="echart-content">{{ item.content }}</div>
        </div>
      </div>
    </div>
    <configDialog v-model="showConfigDialog" :code="code" />
  </div>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

import { getOption } from './option'
import { getAnnotation } from './annotation'
import configDialog from './configDialog.vue'
export default defineComponent({
  name: 'EchartExample',
  components: {
    configDialog
  },
  setup() {
    const content = ref(`
## echart 图表案例
### 介绍
应用场景: 不想写重复的可视化代码,将平时写过的图表案例慢慢累积起来。后续应用做最小的调整就好
每个图表可点击下载配置JSON文件
::: tip echart版本提示
**图表案例基于5.0以上版本echart,因为5.0以上 有些配置字段改变了,版本过低可能导致渲染失败**
::: 
`)
    const echartGather = ref([
      { title: '圆环进度条+文字', echartType: 'progressBar', content: '圆环进度条+文字，优先采用该写法去实现', ref: 'circleFont' },
      { title: '仪表盘基础', echartType: 'instrumentPanel', content: '仪表盘基础版本', ref: 'instrumentPanel' },
      { title: '折线图', echartType: 'line', content: '折线图-线阴影-X轴-Y轴文字配置', ref: 'lineShadow' },
      { title: '环形图', echartType: 'pie', content: '折线图-中间文字配置 + 图例位子调整说明', ref: 'pieFont' },
      { title: '饼图-图例文字配置-图例文字样式说明', echartType: 'pieLegend', content: '饼图-图例文字配置-图例文字样式说明', ref: 'pieLegend' },
      { title: '柱状图', echartType: 'bar', content: '柱状图上添加自定义图片', ref: 'barTopImg' },
      { title: '立体柱状图', echartType: 'bar', content: '立体柱状图', ref: 'threeBar' },
      { title: '象柱状图应用', echartType: 'pictorialBar', content: '象柱状图应用', ref: 'pictorialBar' },
      { title: '折线图-自定义symbol', echartType: 'line', content: '折线图-自定义symbol', ref: 'medical' },
      { title: '饼图-指示线文字-背景图', echartType: 'pie', content: '饼图', ref: 'pieFont2' },
      { title: '折线-面积阴影-自定义tooplit样式', echartType: 'line', content: '折线-面积阴影-自定义tooplit样式', ref: 'lineArea' },
      { title: '柱状图-方块-自定义颜色', echartType: 'bar', content: '柱状图-方块-自定义颜色', ref: 'barDiamond' },
      { title: '水球图 - 带自定义图片背景', echartType: 'waterPolo ', content: '水球图 - 带自定义图片背景', ref: 'waterPolo' },
      { title: '半圆进度条-带圆点-自定义颜色', echartType: 'progressBar ', content: '半圆进度条-带圆点-自定义颜色', ref: 'circleProgress' }
    ])
    const echartDoms = ref<Array<HTMLDivElement>>([])
    const echartRefs = ref({})
    const setRef = (el) => {
      echartDoms.value.push(el)
    }
    // 查看配置
    const showConfigDialog = ref(false)
    const code = ref('' || {})
    const lookConfig = (item) => {
      let config = '' || {}
      // 先去查看有没有注释版本
      config = getAnnotation(item.ref)
      // 没有的话 再去获取option的配置对象
      if (!config) {
        config = getOption(item.ref)
      }
      showConfigDialog.value = true
      code.value = config
    }
    onMounted(() => {
      echartDoms.value.forEach(element => {
        echartRefs[element.id] = echarts.init(element)
        const option = (getOption(element.id) as any)()
        echartRefs[element.id].setOption(option)
      })
    })
    return {
      content, echartGather, setRef, echartRefs, showConfigDialog, lookConfig, code
    }
  }
})
</script>
<style lang="scss" scoped>
.echartGather {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .echart-item {
    flex: 0 0  calc(50% - 5px);
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);
    margin-bottom: 10px;
    .echart-box {
      position: relative;
      padding-bottom: 10px;
      border: 1px solid #eeeeee;
      .echart-container {
        height: 250px;
      }
    }
    .echart-title {
      color: #333333;
      font-weight: 600;
      display: flex;
      .look-code {
        margin-left: auto;
        font-size: 12px;
        color: #666666;
        cursor: pointer;
      }
    }
    .echart-content {
      font-size: 14px;
      color: #999999;
    }
    .echart-title,
    .echart-content {
      padding: 5px  20px;
      box-sizing: border-box;
    }
  }
}
</style>
