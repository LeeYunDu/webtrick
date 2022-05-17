
import * as echarts from 'echarts'
import WZ from './wz.json'
import gis_bg from '@/assets/screenLayout/gis_bg.png'
echarts.registerMap('温州', WZ)
// rem转px
function setRem(size) {
  // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  // 比如传的是16那么在1920的情况下大小就是16
  return htmlWidth / 1920 * size
}

var geoCoordMap = {
  '鹿城区': [120.484867, 28.15909],
  '瓯海区': [120.651248, 27.975983],
  '龙港市': [120.583193, 27.58028],
  '龙湾区': [120.867869, 27.909288],
  '永嘉县': [120.66681, 28.429418],
  '乐清市': [120.993218, 28.260655],
  '瑞安市': [120.393587, 27.884367],
  '平阳县': [120.289649, 27.641973],
  '苍南县': [120.485951, 27.352617],
  '洞头区': [121.101237, 27.902644],
  '文成县': [120.026781, 27.880728],
  '泰顺县': [119.821936, 27.457831]
}
var convertData = function(data) {
  var res:any = []
  var iconIndex = 1
  const maxNum = Math.max.apply(Math, data.map(item => { return item.value }))
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name]
    // let heigh = 30
    // if (data[i].value && data[i].value != 0) {
    //   heigh = 70 * (data[i].value / maxNum)
    // }
    // if (heigh < 30) {
    //   heigh = 30
    // }
    if (geoCoord) {
      let valuee = geoCoord.concat(data[i].value)
      if (data[i].value2) {
        valuee = geoCoord.concat(data[i].value + ' | ' + data[i].value2 + '%')
      }
      res.push({
        name: data[i].name,
        value: valuee,
        symbolSize: [setRem(40), setRem(40)],
        symbol: 'image://' + require('@/assets/visual/icon_echarts.png'),
        // symbolKeepAspect:true,
        itemStyle: {
          opacity: 1
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#00fcff',
              fontSize: setRem(18)
            },
            align: 'center',
            borderWidth: 1,
            offset: [0, setRem(40)],
            formatter(value) {
              const values = String(value.data.value[2])
              const content = `{a|${values}}\n{b|${value.data.name}}`
              return content
            },
            rich: {
              a: {
                color: '#00fcff',
                fontSize: setRem(18),
                fontWeight: 'bold'
              },
              b: {
                color: '#fff',
                fontSize: setRem(18)
              }
            }
          }
        }
      })
    }
  }
  return res
}

// 核酸采集情况
export function getGisOption(produceData?) {
  const option = {
    // visualMap: {
    //   pieces: [{
    //     gt: 2000,
    //     label: '> 2000 人',
    //     color: 'rgba(0,27,72,0.3)'
    //   }, {
    //     gte: 0,
    //     lte: 1000,
    //     label: '0 - 1000 人',
    //     color: 'rgba(3,46,108,0.8)'
    //   }, {
    //     gt: 1000,
    //     lte: 2000,
    //     label: '1000 - 2000 人',
    //     color: 'rgba(1,79,187,0.3)'
    //   }],
    //   show: false
    // },
    geo: [
      {
        map: '温州',
        roam: false,
        zoom: 1.1,
        top: setRem(100),
        // top: 'center',
        left: 'center',
        label: {
          normal: {
            show: false,
            // position: [20, 10],
            // lineHeight:200,
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        selectedMode: false,
        select: {
          label: {
            show: false
          },
          itemStyle: {
            areaColor: '#389BB7'
          }
        },
        regions: mapData(produceData.data),
        itemStyle: {
          normal: {
            borderColor: '#1fe8ff',
            borderWidth: setRem(2),
            shadowColor: '#19b1fb',
            // shadowColor: 'rgba(255, 255, 255, 1)',
            // shadowOffsetX: -2,
            // shadowOffsetY: 2,
            shadowBlur: setRem(12)
          },

          emphasis: {
            areaColor: '#389BB7'
          }
        },
        zlevel: 10
      },
      // 第一层
      {
        map: '温州',
        roam: false,
        zoom: 1.1,
        top: setRem(105),
        itemStyle: {
          borderColor: '#314d7b',
          borderWidth: setRem(2),
          areaColor: '#213449'
        // shadowColor: '#FFF',
        // shadowOffsetY: 12,
        // shadowBlur: 0
        // opacity: 0.1
        },
        silent: true,
        zlevel: 9
      },
      // 第二层
      {
        map: '温州',
        roam: false,
        zoom: 1.1,
        top: setRem(110),
        itemStyle: {
          borderColor: '#314d7b',
          borderWidth: setRem(2),
          areaColor: '#213449'
        // shadowColor: '#FFF',
        // shadowOffsetY: 12,
        // shadowBlur: 0
        // opacity: 0.1
        },
        silent: true,
        zlevel: 8
      },
      // 第三层+蓝内阴影
      {
        map: '温州',
        roam: false,
        zoom: 1.1,
        top: setRem(115),
        itemStyle: {
          borderColor: '#314d7b',
          borderWidth: setRem(2),
          areaColor: '#213449',
          shadowColor: '#0A2646',
          shadowOffsetY: setRem(6),
          shadowBlur: 0
        // opacity: 0.1
        },
        silent: true,
        zlevel: 7
      },
      // 白外阴影
      {
        map: '温州',
        roam: false,
        zoom: 1.1,
        top: setRem(115),
        itemStyle: {
          areaColor: 'rgba(0,0,0,0)',
          shadowColor: '#fff',
          shadowOffsetY: setRem(10),
          shadowBlur: 4
        // opacity: 0.1
        },
        silent: true,
        zlevel: 4
      }
    ],
    series: [
      {
        name: '地图填充',
        type: 'map',
        map: '温州',
        geoIndex: 0,
        data: produceData.data
      },
      {
        name: '柱状图',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: [50, 50],
        silent: true, // 不响应鼠标事件
        data: convertData(produceData.data),
        zlevel: 20
      }
    ]
  }

  return option
}
// 设置地图data
var mapData = function(data) {
  var res:any = []

  for (var i = 0; i < data.length; i++) {
    res.push({
      name: data[i].name,
      itemStyle: {
        color: {
          image: data[i].color, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
          repeat: `repeat` // 是否平铺，可以是 'repeat-x', 'repeat-y', 'no-repeat'
        }
      }
    })
  }
  return res
}
