<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <HighlightCode lang-type="javascriptString" :code="fixechart"></HighlightCode>
    <p>示例</p>
    <div id="echart-map" ref="echartMap" class="echart-container"></div>
    <HighlightCode lang-type="javascriptString" :code="code"></HighlightCode>
  </div>
</template>
<script lang="ts">
import { defineComponent, unref, onMounted, ref } from 'vue'
import RUIAN from './json/ruian.json'
import * as echarts from 'echarts'
export default defineComponent({
  name: '瑞安echarts地级市地区',
  setup() {
    const code = ref(`
    import RUIAN from './json/ruian.json'
    // 注册地图
    echarts.registerMap('ruian', RUIAN, {})
    const echartMap = ref<HTMLElement|null>()
    const initEchartMap= () => {
      // 地图模拟数据
      const mapData = [
        {
          name: '安阳街道',
          value: [120.663804, 27.78192, 25]
        },
        {
          name: '玉海街道',
          value: [120.639077, 27.782911, 23]
        },
        {
          name: '锦湖街道',
          value: [120.637194, 27.796037, 5]
        },
        {
          name: '潘岱街道',
          value: [120.599106, 27.841724, 7]
        },
        {
          name: '东山街道',
          value: [120.654047, 27.770901, 23]
        },
        {
          name: '上望街道',
          value: [120.701082, 27.77226, 67]
        },
        {
          name: '莘塍街道',
          value: [120.68578, 27.788238, 98]
        },
        {
          name: '汀田街道',
          value: [120.701647, 27.803604, 85]
        },
        {
          name: '高楼镇',
          value: [120.215486, 27.822637, 5]
        },
        {
          name: '湖岭镇',
          value: [120.471683, 27.955042, 67]
        },
        {
          name: '马屿镇',
          value: [120.44112, 27.757125, 98]
        },
        {
          name: '南滨街道',
          value: [120.621842, 27.712745, 85]
        },
        {
          name: '塘下镇',
          value: [120.265041, 27.890214, 5]
        },
        {
          name: '陶山镇',
          value: [120.50239, 27.849822, 5]
        },
        {
          name: '仙降镇',
          value: [120.550785, 27.791387, 5]
        },
        {
          name: '玉海街道',
          value: [120.550785, 27.791387, 5]
        }
    ]

      // 地图配置项
      const options = {
        backgroundColor: '#010b43',
        top: '-40%',
        bottom: '-40%',
        tooltip: {
          trigger: 'axis'
        },
        geo: {
          type: 'map',
          map: 'ruian',
          'label': {
          // 地图名字
            'normal': {
              'show': true,
              'textStyle': {
                'color': '#fff'
              }
            },
            'emphasis': {
            // 选中后颜色
              'textStyle': {
                'color': '#fff'
              }
            }
          },
          itemStyle: {
          // 地图颜色配置
            normal: {
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(128, 217, 248, 1)',
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: { // 选中地图的颜色
              itemStyle: {
                areaColor: '#FFD181',
                borderColor: '#404a59',
                borderWidth: 1
              }
            }
          }
        },
        series: [
          {
            type: 'map',
            map: 'ruian',
            geoIndex: 0,
            aspectScale: 0.75, // 长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#FFFFFF'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: mapData
          },
          {
            name: 'Top 5',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: [30, 30],
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                },
                formatter(value) {
                  return value.data.value[2]
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#D8BC37' // 标志颜色
              }
            },
            data: mapData,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            zlevel: 1
          }

        ]
      }

       echarts.init(unref(echartMap) as HTMLElement).setOption(options)
    }`)
    const fixechart = `
    function parseGeoJSON(geoJson, nameProperty) {
    decode(geoJson);
    return zrUtil.map(
        zrUtil.filter(geoJson.features, function(featureObj) {
            if (featureObj.geometry.geometries) {
                let geometry = featureObj.geometry.geometries.map(i => {
                    return i.coordinates;
                });
                let { type, properties, ...params } = featureObj;
                return { type, properties, geometry };
            }
            // Output of mapshaper may have geometry null
            return (
                featureObj.geometry &&
                featureObj.properties &&
                featureObj.geometry.coordinates &&
                featureObj.geometry.coordinates.length > 0
            );
        }),
        function(featureObj) {
            var properties = featureObj.properties;
            var geo = featureObj.geometry;
            var coordinates = geo.coordinates;
            var geometries = [];

            if (geo.type === "GeometryCollection") {
                let geometry = {
                    type: "Polygon"
                };
                let coordinatesArr = featureObj.geometry.geometries.map(i => {
                    return i.coordinates;
                });
                geometry.coordinates = coordinatesArr;
                console.log(coordinatesArr, "coordinatesArr");
                coordinatesArr.forEach(i => {
                    geometries.push({
                        type: "polygon",
                        // According to the GeoJSON specification.
                        // First must be exterior, and the rest are all interior(holes).
                        exterior: i[0],
                        interiors: i.slice(1)
                    });
                });
            }
            if (geo.type === "Polygon") {
                console.log("coordinatesPolygon", coordinates);
                geometries.push({
                    type: "polygon",
                    // According to the GeoJSON specification.
                    // First must be exterior, and the rest are all interior(holes).
                    exterior: coordinates[0],
                    interiors: coordinates.slice(1)
                });
            }

    `
    const content = ref(`
## 数据获取
  1. 数据通过BIGEMAP地图下载器拉取 ，含有15个街道以及镇
  2. 通过geojson.io 合并

::: warning
由于生成的地图里有一个区域为两块不连续的地图块，所以生成的geoJson中此区域的geometry.type===GeometryCollection。然而 echarts 中对于此类型没有做处理，需要修改echarts源码

**后台报错：
1.Invalid geoJson format Cannot read property ‘length’ of undefined
2 echarts.min.js:45 Uncaught Error: Invalid geoJson format Cannot read prope**
### 解决方法
修改处：‘echarts\lib\coord\geo\parseGeoJson.js’
parseGeoJSON() 方法修改  请看xi

 
[参考地址](https://blog.csdn.net/xiaoyaoluntian/article/details/114268392)
:::
    `)
    // 注册地图
    echarts.registerMap('ruian', RUIAN, {})
    const echartMap = ref<HTMLElement|null>()
    const initEchartMap = () => {
      // 地图模拟数据
      const mapData = [
        {
          name: '安阳街道',
          value: [120.663804, 27.78192, 25]
        },
        {
          name: '玉海街道',
          value: [120.639077, 27.782911, 23]
        },
        {
          name: '锦湖街道',
          value: [120.637194, 27.796037, 5]
        },
        {
          name: '潘岱街道',
          value: [120.599106, 27.841724, 7]
        },
        {
          name: '东山街道',
          value: [120.654047, 27.770901, 23]
        },
        {
          name: '上望街道',
          value: [120.701082, 27.77226, 67]
        },
        {
          name: '莘塍街道',
          value: [120.68578, 27.788238, 98]
        },
        {
          name: '汀田街道',
          value: [120.701647, 27.803604, 85]
        },
        {
          name: '高楼镇',
          value: [120.215486, 27.822637, 5]
        },
        {
          name: '湖岭镇',
          value: [120.471683, 27.955042, 67]
        },
        {
          name: '马屿镇',
          value: [120.44112, 27.757125, 98]
        },
        {
          name: '南滨街道',
          value: [120.621842, 27.712745, 85]
        },
        {
          name: '塘下镇',
          value: [120.265041, 27.890214, 5]
        },
        {
          name: '陶山镇',
          value: [120.50239, 27.849822, 5]
        },
        {
          name: '仙降镇',
          value: [120.550785, 27.791387, 5]
        },
        {
          name: '玉海街道',
          value: [120.550785, 27.791387, 5]
        }
      ]

      // 地图配置项
      const options = {
        backgroundColor: '#010b43',
        top: '-40%',
        bottom: '-40%',
        tooltip: {
          trigger: 'axis'
        },
        geo: {
          type: 'map',
          map: 'ruian',
          'label': {
          // 地图名字
            'normal': {
              'show': true,
              'textStyle': {
                'color': '#fff'
              }
            },
            'emphasis': {
            // 选中后颜色
              'textStyle': {
                'color': '#fff'
              }
            }
          },
          itemStyle: {
          // 地图颜色配置
            normal: {
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(128, 217, 248, 1)',
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: { // 选中地图的颜色
              itemStyle: {
                areaColor: '#FFD181',
                borderColor: '#404a59',
                borderWidth: 1
              }
            }
          }
        },
        series: [
          {
            type: 'map',
            map: 'ruian',
            geoIndex: 0,
            aspectScale: 0.75, // 长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#FFFFFF'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: mapData
          },
          {
            name: 'Top 5',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: [30, 30],
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                },
                formatter(value) {
                  return value.data.value[2]
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#D8BC37' // 标志颜色
              }
            },
            data: mapData,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            zlevel: 1
          }

        ]
      }

      echarts.init(unref(echartMap) as HTMLElement).setOption(options)
    }
    onMounted(() => {
      try {
        initEchartMap()
      } catch (error) {
        console.log(error)
      }
    })
    return {
      content,
      echartMap,
      code,
      fixechart
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
