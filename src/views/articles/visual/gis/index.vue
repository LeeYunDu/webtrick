/*
*说明: gis
*创建者: 卢泓豪
*日期: 2022-01-10
*/
<template>
  <div class="gis_container">
    <div class="gis_echarts">
      <div ref="gis" class="echart_box" />
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, onUnmounted, ref } from 'vue'
import { getGisOption } from './json/echartOption'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
export default defineComponent({
  name: 'Echart叠加阴影地图',

  setup() {
    const refs = reactive({
      gis: null
    })
    const store = useStore()
    const echartsList = {}
    const areaName = {
      '鹿城': { name: '鹿城区', color: '' },
      '瓯海': { name: '瓯海区', color: '' },
      '龙湾': { name: '龙湾区', color: '' },
      '永嘉': { name: '永嘉县', color: '' },
      '龙港': { name: '龙港市', color: '' },
      '乐清': { name: '乐清市', color: '' },
      '瑞安': { name: '瑞安市', color: '' },
      '平阳': { name: '平阳县', color: '' },
      '苍南': { name: '苍南县', color: '' },
      '洞头': { name: '洞头区', color: '' },
      '文成': { name: '文成县', color: '' },
      '泰顺': { name: '泰顺县', color: '' }
    }
    const flag = ref(false)
    for (const key in areaName) {
      areaName[key].color = new Image()
      areaName[key].color.src = require(`@/assets/visual/${areaName[key].name}.png`)
    }
    const initGis = (checkedList) => {
      if (!flag.value) {
        const testData = require('./json/data.json')
        echartsList['gis'] && echartsList['gis'].clear()
        echartsList['gis'] && echartsList['gis'].off('click')
        const produceData = testData.data.map(val => {
          const sum = 0
          let selected = false

          // 默认高亮
          if (store.getters.areaCode == val.areaCode) {
            selected = true
          }
          return { name: areaName[val.areaName].name, value: sum, areaCode: val.areaCode, color: areaName[val.areaName].color, selected }
        })
        const option = getGisOption({ data: produceData })
        echartsList['gis'] = echarts.init(refs.gis)
        echartsList['gis'].setOption(option)
        echartsList['gis'].on('click', function(params) {
          echartsList['gis'].resize()
          flag.value = true
        })
      } else {
        flag.value = false
      }
    }
    const resizeTheChart = () => {
      for (const key in echartsList) {
        echartsList[key].resize()
      }
    }
    onMounted(() => {
      initGis()
      window.addEventListener('resize', resizeTheChart)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resizeTheChart)
    })
    return {
      ...toRefs(refs),
      initGis,
      flag
    }
  }
})
</script>
<style lang='scss' scoped>
.gis_container{

  width: 100%;
  height: 100%;
  z-index: 2;

  .gis_echarts{
    position: absolute;
    width: 70%;
    top: 1rem;
    bottom: 0.3rem;
    left: 50%;
    transform: translateX(-50%);
     background: url('~@/assets/visual/gis_bg.png') no-repeat;
  background-color: #000;
  background-size: 100% 100%;
    .echart_box{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
