<template>
  <div>
    <div class="echart-box">
      <div ref="networkSecurity" class="echart-container" />
      <div class="circle-border">
        <div class="border" />

      </div>
      <div class="count-info">
        <span>总数</span>
        <div class="value">{{ number }}</div>
      </div>
    </div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="template">
          <HighlightCode lang-type="html" :code="code2"></HighlightCode>
        </el-tab-pane>
        <el-tab-pane label="script">
          <HighlightCode lang-type="javascriptString" :code="code3"></HighlightCode>
        </el-tab-pane>
        <el-tab-pane label="style">
          <HighlightCode lang-type="html" :code="code4"></HighlightCode>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, ref } from '@vue/runtime-dom'
import * as echarts from 'echarts'
export default defineComponent({
  setup() {
    const that = reactive({
      number: 0
    })
    const refs = reactive({
      networkSecurity: null
    })
    onMounted(() => {
      const option = {
        backgroundColor: '#021035',

        color: ['#d40000', '#ff6b00', '#facc14', '#1492ff', '#5627ff', '#b622e0'],
        tooltip: {
          // trigger: 'item'
        },
        legend: {
          top: '50%',
          right: '2%',
          bottom: '0%',
          orient: 'vertical',
          textStyle: {
            color: '#fff',
            rich: {
              a: {
                fontSize: 14,
                padding: [0, 0, 0, 0]
              },
              b: {
                fontSize: 14,
                padding: [0, 0, 0, 0],
                color: '#ffffff'
              }
            }
          },
          formatter: function(name, b) {
            var arr = [
              '{a|' + name + '}',
              '{b|' + '   ' + 28 + '个}'
            ]
            return arr.join(' ')
          }
        },
        grid: {
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        series: [
          {
            name: '办事渠道分类',
            type: 'pie',
            radius: ['48%', '65%'],
            center: ['25%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: '#020e33',
              borderWidth: 6
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 23, name: '已失陷' },
              { value: 59, name: '高危' },
              { value: 32, name: '中危' },
              { value: 396, name: '其他' }

            ]
          }
        ]

      }
      echarts.init(refs.networkSecurity).setOption(option)
    })

    const code2 = ref(`
<div class="echart-box">
  <div ref="networkSecurity" class="echart-container" />
  <div class="circle-border">
    <div class="border" />

  </div>
  <div class="count-info">
    <span>总数</span>
    <div class="value">{{ number }}</div>
  </div>
</div>
    `)
    const code3 = ref(`
import * as echarts from 'echarts'

const that = reactive({
      number: 0
    })
    const refs = reactive({
      networkSecurity: null
    })
    onMounted(() => {
      const option = {
        backgroundColor: '#021035',

        color: ['#d40000', '#ff6b00', '#facc14', '#1492ff', '#5627ff', '#b622e0'],
        tooltip: {
          // trigger: 'item'
        },
        legend: {
          top: '50%',
          right: '2%',
          bottom: '0%',
          orient: 'vertical',
          textStyle: {
            color: '#fff',
            rich: {
              a: {
                fontSize: 14,
                padding: [0, 0, 0, 0]
              },
              b: {
                fontSize: 14,
                padding: [0, 0, 0, 0],
                color: '#ffffff'
              }
            }
          },
          formatter: function(name, b) {
            var arr = [
              '{a|' + name + '}',
              '{b|' + '   ' + 28 + '个}'
            ]
            return arr.join(' ')
          }
        },
        grid: {
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        series: [
          {
            name: '办事渠道分类',
            type: 'pie',
            radius: ['48%', '65%'],
            center: ['25%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: '#020e33',
              borderWidth: 6
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 23, name: '已失陷' },
              { value: 59, name: '高危' },
              { value: 32, name: '中危' },
              { value: 396, name: '其他' }

            ]
          }
        ]

      }
      echarts.init(refs.networkSecurity).setOption(option)
    })

    `)

    const code4 = ref(`
.echart-box {
  height: 250px;
  overflow: hidden;
  position: relative;
  top: -2vh;
  .echart-container {
    height: 100%;
    position: relative;
    top: 20px;
  }
  .circle-border {
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -40%);
    width: 207px;
    height: 205px;
    background: url('data:image/png;base64,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');
    padding: 15px;
    box-sizing: border-box;
    animation: turn 5s linear infinite;
    .border {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #00e1f7;
      box-shadow: 0 0 10px #00e1f7;
    }
  }
  .count-info {
    position: absolute;
    color: white;
    text-align: center;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -30%);
    z-index: 10;
    border: 2px dashed #01cbd3;
    border-radius: 50%;
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    span {
      font-size: 14px;
    }
    .value {
      font-size: 24px;
    }
  }
}

@keyframes turn {
  0% {
    transform: translate(-50%, -40%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -40%) rotate(360deg);
  }
}
    `)

    return {
      ...toRefs(refs), ...toRefs(that), code2, code3, code4
    }
  }
})
</script>

<style lang='scss' scoped>
.echart-box {
  height: 250px;
  overflow: hidden;
  position: relative;
  top: -2vh;
  .echart-container {
    height: 100%;
    position: relative;
    top: 20px;
  }
  .circle-border {
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -40%);
    width: 207px;
    height: 205px;
    background: url('data:image/png;base64,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');
    padding: 15px;
    box-sizing: border-box;
    animation: turn 5s linear infinite;
    .border {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #00e1f7;
      box-shadow: 0 0 10px #00e1f7;
    }
  }
  .count-info {
    position: absolute;
    color: white;
    text-align: center;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -30%);
    z-index: 10;
    border: 2px dashed #01cbd3;
    border-radius: 50%;
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    span {
      font-size: 14px;
    }
    .value {
      font-size: 24px;
    }
  }
}

@keyframes turn {
  0% {
    transform: translate(-50%, -40%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -40%) rotate(360deg);
  }
}

</style>
