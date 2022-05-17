/**
*作者:李云都
*时间:2021年4月30日11:02:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>

    <div id="echart-map" ref="echartMap" class="echart-container"></div>
    <HighlightCode lang-type="javascriptString" :code="code"></HighlightCode>

  </div>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, ref, unref } from 'vue'
// import * as echarts from 'echarts/lib/echarts'
// import { GeoComponent } from 'echarts/components'
// echarts.use([GeoComponent])
import * as echarts from 'echarts'
export default defineComponent({
  name: 'EchartMap',
  setup() {
    const content = ref(`## echart geo地图接入 
### 介绍
应用场景: 二维图geo地图展示
实例echart版本5.1
::: tip
最新的 echarts 已经更新到5.0版本,个别图表的属性字段已作出调整.
:::
`)
    // 地图JSON
    const mapData = require('./json/china.json')
    // 注册地图
    echarts.registerMap('china', mapData, {})
    const echartMap = ref<HTMLDivElement|null>(null)
    onMounted(() => {
      if (getCurrentInstance()) {
        var myChart = echarts.init(unref(echartMap) as HTMLDivElement)
        // 线数据
        const lineData = [
          {
            fromName: '北京',
            toName: '浙江',
            coords: [
              [116.468997, 40.256615],
              [120.43414450, 29.177379]
            ]
          },
          {
            fromName: '上海',
            toName: '浙江',
            coords: [
              [121.551976, 31.276053],
              [120.43414450, 29.177379]
            ]
          },
          {
            fromName: '湖南',
            toName: '浙江',
            coords: [
              [111.526162, 27.415356],
              [120.43414450, 29.177379]
            ]
          },
          {
            fromName: '新疆',
            toName: '浙江',
            coords: [
              [87.556551, 42.188608],
              [120.43414450, 29.177379]
            ]
          },
          {
            fromName: '内蒙',
            toName: '浙江',
            coords: [
              [111.614220, 44.923043],
              [120.43414450, 29.177379]
            ]
          }
        ]
        // 模拟点数据
        const addressData = [
          { value: [116.468997, 40.256615] },
          { value: [121.551976, 31.276053] },
          { value: [111.526162, 27.415356] },
          { value: [87.556551, 42.188608] },
          { value: [111.614220, 44.923043] }
        ]
        const option = {
          title: {
            text: '中国地图',
            x: 'center',
            padding: [0, 0, 0, 0]
          },
          geo: {
            show: true,
            map: 'china', // 地图类型 同上注册的地图名称一致
            itemStyle: {
              normal: {
                show: true,
                areaColor: '#0A4F7A', // 地图区域的颜色
                borderColor: '#0CD5DD', // 边界线颜色
                borderWidth: '1' // 边界线的宽度
              },
              emphasis: { // 鼠标移入时区域的样式
                areaColor: '#2AB8FF',
                borderWidth: 0,
                color: 'green'
              }
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff' // 省市区字体颜色
                }
              },
              emphasis: { // 对应的鼠标悬浮效果
                show: true,
                textStyle: {
                  color: '#333' // 鼠标移入对应的省市区字体颜色
                }
              }
            },
            zoom: 1, // 缩放
            roam: false // 是否允许缩放
            // layoutSize: '100%', // 调整地图大小
            // layOutCenter: ['10%', '50%'] // 地图中心
          },
          series: [
            {
              name: 'line',
              type: 'lines',
              coordinateSystem: 'geo', // 该系列使用的坐标系
              zlevel: 1, // 可以随便设置不为0的数字,否则会影响地图样式
              map: 'china',
              data: lineData,
              effect: { // 线特效的配置
                show: true,
                constantSpeed: 30, // 特效图形的移动动画是否是固定速度
                symbol: 'pin', // 特效图形的标记
                symbolSize: 10, // 特效标记的大小
                trailLength: 0.1, // 特效尾迹的长度 [0,1] 值越大尾迹越长
                color: '#e3efff' // 特效标记的颜色
              },
              lineStyle: { // 线条样式
                color: 'blue', // 线条颜色
                width: 1, // 线条宽度
                opacity: 0.5, // 线条透明度
                curveness: 0.5 // 边的曲度 [0,1] 值越大 曲度越大
              }
            },
            {
              name: '地点',
              type: 'effectScatter',
              data: addressData,
              coordinateSystem: 'geo',
              rippleEffect: { // 点位涟漪配置
                color: 'red', // 涟漪颜色
                period: 4, // 动画的周期
                brushType: 'stroke', // 波纹绘制方式 stroke fill
                scale: 4// 动画中波纹的最大缩放比例
              },
              symbolSize: 14, // 标记大小
              showEffectOn: 'render', // 配置何时显示特效,render为渲染完成时
              itemStyle: { // 涟漪原点配置
                normal: {
                  color: 'green' // 涟漪原点颜色
                }
              }
            }
          ]
        }
        // 绘制图表
        myChart.setOption(option)
      }
    })
    const code = `
// 地图JSON
const mapData = require('./json/china.json')
// 注册地图
echarts.registerMap('china', mapData, {})
const echartMap = ref<HTMLDivElement|null>(null)
var myChart = echarts.init(unref(echartMap) as HTMLDivElement)
// 线数据
const lineData = [
  {
    fromName: '北京',
    toName: '浙江',
    coords: [
      [116.468997, 40.256615],
      [120.43414450, 29.177379]
    ]
  },
  {
    fromName: '上海',
    toName: '浙江',
    coords: [
      [121.551976, 31.276053],
      [120.43414450, 29.177379]
    ]
  },
  {
    fromName: '湖南',
    toName: '浙江',
    coords: [
      [111.526162, 27.415356],
      [120.43414450, 29.177379]
    ]
  },
  {
    fromName: '新疆',
    toName: '浙江',
    coords: [
      [87.556551, 42.188608],
      [120.43414450, 29.177379]
    ]
  },
  {
    fromName: '内蒙',
    toName: '浙江',
    coords: [
      [111.614220, 44.923043],
      [120.43414450, 29.177379]
    ]
  }
]
// 模拟点数据
const addressData = [
  { value: [116.468997, 40.256615] },
  { value: [121.551976, 31.276053] },
  { value: [111.526162, 27.415356] },
  { value: [87.556551, 42.188608] },
  { value: [111.614220, 44.923043] }
]
const option = {
  title: {
    text: '中国地图',
    x: 'center',
    padding: [0, 0, 0, 0]
  },
  geo: {
    show: true,
    map: 'china', // 地图类型 同上注册的地图名称一致
    itemStyle: {
      normal: {
        show: true,
        areaColor: '#0A4F7A', // 地图区域的颜色
        borderColor: '#0CD5DD', // 边界线颜色
        borderWidth: '1' // 边界线的宽度
      },
      emphasis: { // 鼠标移入时区域的样式
        areaColor: '#2AB8FF',
        borderWidth: 0,
        color: 'green'
      }
    },
    label: {
      normal: {
        show: false,
        textStyle: {
          color: '#fff' // 省市区字体颜色
        }
      },
      emphasis: { // 对应的鼠标悬浮效果
        show: true,
        textStyle: {
          color: '#333' // 鼠标移入对应的省市区字体颜色
        }
      }
    },
    zoom: 1, // 缩放
    roam: false // 是否允许缩放
    // layoutSize: '100%', // 调整地图大小
    // layOutCenter: ['10%', '50%'] // 地图中心
  },
  series: [
    {
      name: 'line',
      type: 'lines',
      coordinateSystem: 'geo', // 该系列使用的坐标系
      zlevel: 1, // 可以随便设置不为0的数字,否则会影响地图样式
      map: 'china',
      data: lineData,
      effect: { // 线特效的配置
        show: true,
        constantSpeed: 30, // 特效图形的移动动画是否是固定速度
        symbol: 'pin', // 特效图形的标记
        symbolSize: 10, // 特效标记的大小
        trailLength: 0.1, // 特效尾迹的长度 [0,1] 值越大尾迹越长
        color: '#e3efff' // 特效标记的颜色
      },
      lineStyle: { // 线条样式
        color: 'blue', // 线条颜色
        width: 1, // 线条宽度
        opacity: 0.5, // 线条透明度
        curveness: 0.5 // 边的曲度 [0,1] 值越大 曲度越大
      }
    },
    {
      name: '地点',
      type: 'effectScatter',
      data: addressData,
      coordinateSystem: 'geo',
      rippleEffect: { // 点位涟漪配置
        color: 'red', // 涟漪颜色
        period: 4, // 动画的周期
        brushType: 'stroke', // 波纹绘制方式 stroke fill
        scale: 4// 动画中波纹的最大缩放比例
      },
      symbolSize: 14, // 标记大小
      showEffectOn: 'render', // 配置何时显示特效,render为渲染完成时
      itemStyle: { // 涟漪原点配置
        normal: {
          color: 'green' // 涟漪原点颜色
        }
      }
    }
  ]
}
// 绘制图表
myChart.setOption(option)
`
    return {
      echartMap, code, content
    }
  }
})
</script>
<style lang="scss" scoped>
.echart-container {
  width: 100%;
  height: 700px;
}
</style>
