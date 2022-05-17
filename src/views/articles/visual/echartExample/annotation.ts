export function getAnnotation(name:string):string {
  const annotation = {
    instrumentPanel: `
{
  series: [{
    type: 'gauge',// 仪表盘类型
    center: ['50%', '60%'],// 图形位置调整
    startAngle: 180, // 仪表盘圆弧度 [0-360]
    endAngle: 0, // 仪表盘圆弧结束的度数
    min: 0, // 仪表盘 刻度最小值
    max: 100,// 仪表盘 刻度最大值
    splitNumber: 4,// 仪表盘 刻度显示的个数 n+1
    itemStyle: {
      // 仪表盘进度条的颜色配置
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(255,39,23,1)'
      },
      {
        offset: 0.5,
        color: 'rgba(255,241,1,1)'
      }, {
        offset: 1,
        color: 'rgba(41,191,42,.5)'
      }])
    },
    progress: {
      show: true,// 是否显示仪表盘进度条
      width: 6// 仪表盘进度条宽度
    },

    pointer: {
      show:true,
      icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',// 仪表盘刻度指向icon （支持svg/base64位(未测试)）
      length: '12%',
      width: 20,
      offsetCenter: [0, '-60%'],// 距离圆心点位的偏移量
      itemStyle: {
          color: 'auto'
      }
    },
    axisLine: {
      show:true,
      // 仪表盘进度条背景配置
      lineStyle: {
          width: 6,
          color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2']
          ]
      }
    },
    axisTick: {
      // 仪表盘精确刻度
      show: true,
      distance: -15,// 基于仪表盘进度条的偏移量
      splitNumber: 5,// 每个进度下的精确刻度个数
      lineStyle: {
        width: 2,
        color: '#999'
      }
    },
    splitLine: {
      // 仪表盘刻度配置
      distance: 0, // 偏移
      show: true,
      length: 0, // 长度
      lineStyle: {
        width: 3,
        color: '#999'
      }
    },
    axisLabel: {
      // 仪表盘刻度名称配置
      distance: -25,
      color: '#999',
      fontSize: 14
    },
    anchor: {
      // 锚点
      show: false
    },
    title: {
      // 仪表盘标题配置
      show: true,
      offsetCenter: [0, '-40%'], // 偏移量
      fontSize: 14,
      color:'#464646',
    },
    detail: {
      // 仪表盘数值配置
      valueAnimation: true, // 数值加载动画
      width: '60%',
      lineHeight: 40,
      height: 15,
      borderRadius: 8,
      offsetCenter: [0, '-15%'],
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bolder',
      formatter: '{value} ',
      color: '#00b12d'
    },
    data: [{
      value: 30,name:'仪表盘基础配置'
    }]
  }
  ]
}
`,
    lineShadow: `
{
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: '#f2f3f5',
        width: 0,
        type: 'solid'
      }
    },
    axisLabel: { // x轴文字的配置
      show: true,
      textStyle: {
        color: '#666666'
      }
    }
  },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '3%',
    containLabel: true
  },
  yAxis: {
    type: 'value',
    axisLabel: { // x轴文字的配置
      show: true,
      textStyle: {
        color: '#666666'
      }
    }
  },
  legend: {
    data: ['发热门诊量'],
    padding: [30, 0]
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      name: '发热门诊量',
      type: 'line',
      smooth: true,
      symbolSize: 0,
      symbol: 'circle',
      lineStyle: {
        width: 3,
        color: '#429dfa',
        shadowColor: 'rgba(20,146,255,0.45)',
        shadowBlur: 10,
        shadowOffsetY: 12
      }
    }
  ]
}
    `,
    pieFont: `
{
  grid: {
    left: '3%',
    right: '3%',
    bottom: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    left: 'center', // 值 left center right
    icon: 'circle', // 字段控制形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
    itemWidth: 8, // 设置宽度
    itemHeight: 8, // 设置高度
    itemGap: 15, // 设置间距
    y: 'bottom', // top/center/bottom
    x: 'center'// top/center/bottom
  },
  graphic: [
    { // 环形图中间添加文字 可以通过 /n 换行
      type: 'text', // 通过不同top值可以设置上下显示
      left: 'center',
      top: '25%',
      style: {
        text: '1322',
        textAlign: 'center',
        fill: '#1492ff', // 文字的颜色
        width: 30,
        height: 30,
        fontSize: 24,
        fontFamily: 'Microsoft YaHei'
      }
    },
    { // 环形图中间添加文字 可以通过 /n 换行
      type: 'text', // 通过不同top值可以设置上下显示
      left: 'center',
      top: '37%',
      style: {
        text: '合同总量',
        textAlign: 'center',
        fill: '#666666', // 文字的颜色
        width: 30,
        height: 30,
        fontSize: 14,
        fontFamily: 'Microsoft YaHei'
      }
    }
  ],

  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '35%'], // 饼图位置
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: { // hover显示的文字
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' }
      ]
    }
  ]
}
`,
    pieLegend: `
{
  tooltip: {
    trigger: 'item'
  },
  title: {
    text: ['{a|32}', '{b|总任务数}'].join('\n'),
    textAlign: 'center',
    left: '30%',
    top: '40%',
    textStyle: {
      rich: {
        a: {
          color: '#2399ff',
          fontSize: 36
        },
        b: {
          color: '#000',
          fontSize: 16,
          lineHeight: 18
        }
      }
    }
  },
  legend: [{
    top: '55%',
    right: '2%',
    itemWidth: 27,
    itemHeight: 16,
    data: [
      {
        name: '已完成',
        icon: 'circle'
      }

    ],
    textStyle: {
      rich: {
        a: {
          fontSize: 14,
          padding: [0, 0, 0, 0]
        },
        b: {
          fontSize: 14,
          padding: [0, 0, 0, 0],
          color: '#2fc25b'
        }
      }
    },
    formatter: function(name) {
      var arr = [
        '{a|' + name + '}',
        '{b|' + '          ' + 3 + '项}'
      ]
      return arr.join(' ')
    }
  }, {
    top: '65%',
    right: '2%',
    itemWidth: 27,
    itemHeight: 16,
    textStyle: {
      rich: {
        a: {
          fontSize: 14,
          padding: [0, 0, 0, 0]
        },
        b: {
          fontSize: 14,
          padding: [0, 0, 0, 0],
          color: '#ef4864'
        }
      }
    },
    formatter: function(name) {
      var arr = [
        '{a|' + name + '}',
        '{b|' + '          ' + 1 + '项}'
      ]
      return arr.join(' ')
    },
    data: [{
      name: '待验收',
      icon: 'circle'
    }
    ]
  }, {
    top: '75%',
    right: '0%',

    itemWidth: 27,
    itemHeight: 16,
    textStyle: {
      rich: {
        a: {
          fontSize: 14,
          padding: [0, 0, 0, 0]
        },
        b: {
          fontSize: 14,
          padding: [0, 0, 0, 0],
          color: '#3196fa'
        }
      }
    },
    formatter: function(name) {
      var arr = [
        '{a|' + name + '}',
        '{b|' + '   ' + 28 + '项}'
      ]
      return arr.join(' ')
    },
    data: [{
      name: '按时序推荐',
      icon: 'circle'
    }]
  }],
  series: [
    {
      center: ['31%', '50%'],
      name: '访问来源',
      type: 'pie',
      radius: ['45%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 3, name: '已完成', itemStyle: { color: '#2fc25b' }},
        { value: 1, name: '待验收', itemStyle: { color: '#ef4864' }},
        { value: 28, name: '按时序推荐', itemStyle: { color: '#3196fa' }}
      ]
    }
  ]
}
`,
    barTopImg: `
    {
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '20%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        formatter: function(params) {
          return params[0].name + ': ' + params[0].value
        }
      },
      xAxis: {
        data: ['客船（鳌江）', '客船（瑞安）', '转运中巴', '归港渔船'],
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: '#455e61',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: { // x轴文字的配置
          show: true,
          textStyle: {
            color: '#ffffff'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#bcc1c2', fontSize: 14 },
        splitLine: {
          lineStyle: { color: '#335054', type: 'dashed' }
        },

        interval: 25
      },
      series: [
        {
          name: 'hill',
          type: 'bar',
          barCategoryGap: '10%',
          barWidth: 24,

          data: [
            {
              value: 18,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#27b6ff'
                  },
                  {
                    offset: 1,
                    color: 'rgba(39,181,254,0)'
                  }])

                }
              }
            },
            {
              value: 12,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#a86cad'
                  },
                  {
                    offset: 1,
                    color: 'rgba(168,108,173,0)'
                  }])

                }
              }
            },
            {
              value: 100,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#e5d321'
                  },
                  {
                    offset: 1,
                    color: 'rgba(229,211,33,0)'
                  }])

                }
              }
            },
            {
              value: 60,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#0bc5cd'
                  },
                  {
                    offset: 1,
                    color: 'rgba(11,197,205,0)'
                  }])

                }
              }
            }
          ],
          z: 10
        },
        {
          name: 'glyph',
          type: 'pictorialBar',
          barGap: '-100%',
          symbolPosition: 'end',
          symbolSize: [24, 22],
          symbolOffset: [0, '-100%'],
          data: [{
            value: 18,
            symbol: 'image://图片64位地址'
          }, {
            value: 12,
            symbol: 'image://图片64位地址'

          }, {
            value: 100,
            symbol:'image://图片64位地址'

          }, {
            value: 60,
            symbol: 'image://图片64位地址'

          }]
        }]
    }
`,
    pictorialBar: `
    {
      tooltip: {
        trigger: 'axis' // 显示 2个图像信息
      },
      grid: { top: 45, bottom: 45 },
      xAxis: {
        type: 'category',
        data: ['1-3月', '1-6月', '1-9月', '1-12月'],
        axisLabel: { color: '#fff', interval: 0
          // formatter: (param) => {
          //   if (param.length > 4) {
          //     return param.slice(0, 4) + '...'
          //   } else {
          //     return param
          //   }
          // }
        },
        axisLine: { show: false, lineStyle: { color: '#fff' }},
        axisTick: { 'show': false }
      },
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            interval: 2,
            color: 'rgba(0,0,0,0)',
            formatter: '{value}'
          },
          splitLine: { show: false },
          axisTick: { 'show': false },
          axisLine: { show: false, lineStyle: { color: '#fff' }}
        },
        {
          type: 'value',
          axisLabel: { show: false, color: '#fff', formatter: '{value}' },
          splitLine: { show: false },
          axisLine: { show: false, lineStyle: { color: '#fff' }},
          axisTick: { 'show': false }
        }],
      series: [
        {
          name: '消费总额(万元)',
          type: 'pictorialBar',
          symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAABrCAYAAABpNJKqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMDMzYjYxMi1hNjk1LWE3NDItODczOS1lMTVmNmNhMjIyZmMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEE3QzU3MDgyNTdFMTFFQkE2M0Y4RENFRUM2OTA0MTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEE3QzU3MDcyNTdFMTFFQkE2M0Y4RENFRUM2OTA0MTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MWIxOWU5ODUtNjdlNy05YjQ4LThmMTUtYjAyNjFlZWJmMDJjIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ODAyNGQ4NzItNjI1Yy0yMDQwLTk0NGItM2JhN2QxMWUyYjU5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+BeHsjQAAAfRJREFUeNrsWT1LA0EQnZk7O7+CSCABQRDs1J9gaSCCjZW9BAW19GeoIIiFYGGVxiJg419IwMKQIo02KhIQDYKnZh2TCGe8a8LuXO7cgWGPbYY3+/bt21tUJfgVuOhleahyjoKmcO/gmgLmj3QWAQWvmXVninrQrPGQB42ROqG6e48j5CsyycO+ziJOA2qpY5oD5Pb55g85JzS27C274aQRv1EAUBfNCg+rOtGMFak6dIsp6BZCaHrj/FnjTOsqQi9Qn865M9DyMY9zT2cRjvfMltNhrY9q7uyBu8C4rnRV8Ty4oDrstlvm30vDNzivc20+nuGyiervplUIWkNxuzBABlzQXOiHZcYRtYskCpEKKwRxbh2KtS559BYhA4W0Lt70lmJdtKIqpgxy9CYD9A4kg+Y6CsIkyAAiFEMktkbRsg4toj6P8thKECZSVNEiGmjPgBS1U40tGayBtLfyiOgtQgZJZcAAVbW38gG7tlDSTH6w1pmIQDKQgQ2LEohCT1iSorf96dSvU7Wi+k89gxS90bogS2/5a0viHqrss04MTlj7n0HvPpJ6bYm3yZe6tmCyEKHQGllR1S+qQlp3KtG6B84dCXNSqCzjk2nPUKzk8dz0GjU4N80ayE7rtss5fDTNulJ5Cc+M0rtF8MlkKPTOfwkwADTFg9WTW/LyAAAAAElFTkSuQmCC',
          data: [2235571.4, 0, 0, 0],
          yAxisIndex: '1',
          barWidth: '30',
          barGap: 0.3,
          label: { color: '#fff' },
          itemStyle: { normal: { label: { show: true, color: '#fff', position: 'top' }}}
        },
        {
          name: '增长率(%)',
          type: 'line',							// 线形图
          yAxisIndex: '0',
          symbol: 'circle',
          symbolSize: 10,
          symbolStyle: {
            color: '#fff'
          },
          itemStyle: {
            normal: { color: '#ffb400', label: { show: true, color: '#fff' }, lineStyle: { color: '#ffb400' }},
            emphasis: {
              color: '#ffb400',
              borderColor: '#ffb400',
              borderWidth: 1
            }
          },
          data: [14.83, 0, 0, 0]
        }
      ]
    }
`,
    circleFont: `
{
  color: ['blue'], // 圆环进度条颜色
  series: [{
    type: 'gauge',
    startAngle: 90,
    endAngle: -270,
    pointer: {
      show: false
    },
    progress: {
      show: true,
      overlap: false,
      roundCap: false,
      clip: false,
      itemStyle: {
        borderWidth: 1,
        borderColor: '#4bf3f9' // 圆环进度条边框颜色
      }
    },
    axisLine: {

      lineStyle: {
        width: 10,
        color: [
          [1, 'red']// 圆环底色
        ]
      }
    },
    splitLine: {
      show: false,
      distance: 0,
      length: 5
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      distance: 25
    },
    data: [{
      value: 98, // 圆环数值
      name: '自动化率', // 圆环文字
      title: {
        offsetCenter: ['0%', '30%'],
        color: 'red',
        fontSize: 16
      },
      detail: {
        offsetCenter: ['0%', '-20%'], // 偏移
        fontSize: 20,
        color: 'red'
      }
    }
    ],
    title: {
      fontSize: 18
    },
    detail: {
      fontSize: 18,
      color: '#fff',
      borderColor: 'auto',
      borderWidth: 0,
      formatter: '{value}%'
    }
  }]
}
`,
    threeBar: `
{

  title: {
    text: '地区各宗教团体教职人员数 ',
    textStyle: {
      color: '#fff',
      fontSize: 14
    },
    top: 0
  },
  grid: {
    top: '20%',
    bottom: '0%',
    left: '0%',
    right: '0%',
    containLabel: true
  },
  backgroundColor: '#021035',
  tooltip: {},
  xAxis: {
    show: true,
    type: 'category',
    data: ['佛教', '道教', '天主教', '基督教'],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: { color: '#fff', interval: 0, rotate: 0, fontSize: 13, margin: 40 },
    z: 50
  },
  yAxis: {
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  series: [{
    type: 'pictorialBar',
    symbolSize: [30, 15],
    symbolOffset: [0, -10],
    z: 15,
    data: [{
      value: 90,
      symbolPosition: 'end'
    }, {
      value: 111,
      symbolPosition: 'end',
      label: { color: '#fff' }
    }, {
      value: 3,
      symbolPosition: 'end',
      label: { color: '#fff' }
    }, {
      value: 124,
      symbolPosition: 'end'
    }],
    label: { color: '#fff' },
    itemStyle: { normal: { color: '#14b1eb', label: { show: true, color: '#fff', position: 'top' }}}
  }, {

    type: 'pictorialBar',
    symbolSize: [30, 15],
    symbolOffset: [0, 10],
    z: 12,
    itemStyle: {
      normal: {
        color: '#14b1eb'
      }
    },
    data: [90, 111, 3, 124]
  }, {

    type: 'pictorialBar',
    symbolSize: [40, 25],
    symbolOffset: [0, 18],
    z: 11,
    itemStyle: {
      normal: {
        color: 'transparent',
        borderColor: '#14b1eb',
        borderWidth: 5
      }
    },
    data: [90, 111, 3, 124]
  }, {

    type: 'pictorialBar',
    symbolSize: [50, 30],
    symbolOffset: [0, 22],
    z: 10,
    itemStyle: {
      normal: {
        color: 'transparent',
        borderColor: '#14b1eb',
        borderType: 'dashed',
        borderWidth: 5
      }
    },
    data: [90, 111, 3, 124]
  }, {
    type: 'bar',
    itemStyle: {
      normal: {
        color: '#14b1eb',
        opacity: 0.7
      }
    },
    silent: true,
    barWidth: 30,
    barGap: '-100%', // Make series be overlap
    data: [90, 111, 3, 124]
  }]

}
`,
    medical: `
{
  title: {
    text: '定点医院数量及分布',
    textStyle: {
      color: '#fff',
      fontSize: 14
    },
    top: 5
  },
  grid: {
    top: '20%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    containLabel: true
  },
  color: ['#44f0e9', '#00ffff'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  xAxis: [
    {
      type: 'category',
      data: ['鹿城区', '瓯海区', '龙湾区', '洞头区', '乐清市'],
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: { color: '#fff', interval: 0, rotate: 0, fontSize: 12 }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: { show: true, color: '#fff', formatter: '{value}' },
      splitLine: { show: true, lineStyle: { color: '#003132' }},
      axisTick: { show: true, lineStyle: { color: '#00f4fa' }, inside: true },
      axisLine: { show: false, lineStyle: { color: '#fff' }}
    },
    {
      type: 'value',
      axisLabel: { show: true, color: '#fff', formatter: '{value}' },
      splitLine: { show: true, lineStyle: { color: '#003132' }},
      axisTick: { show: true, lineStyle: { color: '#00f4fa' }, inside: true },
      axisLine: { show: false, lineStyle: { color: '#fff' }}
    }
  ],
  series: [

    {
      name: '社保费',
      yAxisIndex: 0,
      data: [10, 30, 30, 20, 20],
      symbol: 'image://' + 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAABIUlEQVQokY3SPyjnYRgA8M/pV1eoq5PJLosBGa4MSFEMomwykRQ33C10mSQGBquJksWknE0mXXfdcD8Wg+kSySIpiz996/nq26/3V97lrfd5Pu/7vO/zfmg8GpYYDZjFKFpTCTWJtUZs4xsucfpeOI5HfMFANVyELfiJOazhLNaTuAgnosyvOEEflqvhEpqivA6M4D8msY76yFsIfIBjdGfwB6YxFLt2YaWA5nGNDQziBeWs1P1IKOM5yqmteIu8JR+xi6sMHmIK55Fwhx484CJiM2jHDm7RX4qdNvEZf9CJX+jN7hKx5jjpKV5cqVDOasw5/o1/qIvPkLVqEfeVMIU/YQs3GMtRClbiPfzFUrTpbaRgEWcf4nsqoRrMcVsygldNqEFrrBqPWQAAAABJRU5ErkJggg==',
      symbolSize: 14,
      lineStyle: {
        color: '#15be50',
        width: 3
      },
      type: 'line'

    }

  ]

}
`,
    pieFont2: `
    {
      grid: {
        left: '0%',
        right: '0%',
        top: '15%',
        bottom: '5%',
        containLabel: true
      },
      legend: {
        data: ['临时核酸检测点', '隔离点', '封控区域'],
        x: 'right',
        itemWidth: 20,
        itemHeight: 10,
        textStyle: {
          fontSize: 12,
          color: '#ffffff'
        },
        top: '15px'
      },
      graphic: [
        {
          type: 'image', // 图形元素类型
          id: 'logo', // 更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。
          left: '20%',
          top: '25%', // 根据父元素进行定位 （居中）
          z: 0, // 层叠
          bounding: 'all', // 决定此图形元素在定位时，对自身的包围盒计算方式
          style: {
            image: 'data:image/png;base64,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', // 这里一定要注意、注意，必须是https开头的图片路径地址
            width: 201,
            height: 201
          }
        }
      ],
      series: [
        {
          name: '数据',
          type: 'pie',
          radius: ['40%', '55%'],
          center: ['45%', '60%'], // 饼图位置
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outside',
                color: '#ddd',
                formatter: function(params) {
                  const vMap = {
                    '临时核酸检测点': 'v1',
                    '隔离点': 'v2',
                    '封控区域': 'v3'
                  }
                  const unitMap = {
                    '临时核酸检测点': 'u1',
                    '隔离点': 'u2',
                    '封控区域': 'u3'
                  }
                  if (params.name !== '') {
                    return '{label' + '|' + params.name + '}' + '\n' + '\n' + '{' + vMap[params.name] + '|' + params.value + '}' + '{' + unitMap[params.name] + '|个}'
                  } else {
                    return ''
                  }
                },
                rich: {
                  label: { color: '#FFFFFF', fontSize: 14, fontWeight: 600 },
                  v1: { color: '#ffbb00', fontSize: 24, fontWeight: 600 },
                  v2: { color: '#00ffb4', fontSize: 24, fontWeight: 600 },
                  v3: { color: '#19b1fb', fontSize: 24, fontWeight: 600 },
                  u1: { color: '#ffbb00', fontSize: 14, fontWeight: 600 },
                  u2: { color: '#00ffb4', fontSize: 14, fontWeight: 600 },
                  u3: { color: '#19b1fb', fontSize: 14, fontWeight: 600 }
                }
              },
              labelLine: {
                length: 10,
                length2: 20,
                show: true,
                color: '#00ffff'
              }
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '临时核酸检测点', itemStyle: { color: '#ffbb00' }},
            { value: 735, name: '隔离点', itemStyle: { color: '#00ffb4' }},
            { value: 580, name: '封控区域', itemStyle: { color: '#19b1fb' }}
          ]
        }
      ]
    }
`,
    lineArea: `
    {
      color: ['#ffd847'],
      // 提示框
      tooltip: {
        trigger: 'axis',
        position: 'top',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        shadowBlur: null,
        backgroundColor: null,
        borderColor: null,
        borderRadius: 0,
        borderWidth: 0,
        formatter: function(p) {
          var text = '<div class='custom-tooltip'>p[0].value</div>'
          return text
        }
      },
      /** 区域位置*/
      grid: {
        left: '0%',
        right: '0%',
        top: '15%',
        bottom: '5%',
        containLabel: true
      },
      legend: {
        data: ['人数'],
        x: 'right',
        itemWidth: 20,
        itemHeight: 10,
        textStyle: {
          fontSize: 12,
          color: '#ffffff'
        },
        top: '15px'
      },
      // X轴
      xAxis: {
        data: ['12.15', '12.16', '12.17', '12.18', '12.19', '12.20', '12.21'],
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#87929f'
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 10,
          fontSize: 12,
          interval: 0,
          color: '#ffffff'
        }
      },
      yAxis: {
        name: '(单位:人)',
        nameTextStyle: {
          color: '#ffffff',
          nameLocation: 'start'
        },
        show: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#075858'
          }
        },
        axisLabel: {
          color: '#FFFFFF',
          fontSize: 12
        }
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          name: '人数',
          type: 'line',
          smooth: true,
          symbolSize: 12,
          showSymbol: false,
          symbol: 'image://' + 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAABMUlEQVQokX2SPUsDQRCGn91LIBx4noI5EUS08ANERMTGLghi408QCwsrK/+BnWAX/AeClSKIgijYmsJO1MI0aiTY+BH00ORW5tyDgN691e7OPDPvsKOMMVj5wBIwC/TYtybwCBwDe/ZOAg0BZaBIui6BNSAUyAF2gcH9B+Nv30XB/YcpSC1HY6a7VGN9RD9N+OoTOAA2BCoBm6d107FcaQ1H5m+nfleFF3POFdACFjQwLoGzuvH+A0TS+bBmPEBcjQrkSqDRjG2m6uXb5GzM01mJaRJIBsTNqSgr0csrmSc2JdC1nEpF9ZoGBAW+FvviuBS+FegcqM33qvetSV0dcFWo1W9yXmNmutVbecqpWv4EeE4+d8x+bmeGwxtgVey1r1EArLStkfRL1ugI2JFtAPgBVKdlVcmCsPEAAAAASUVORK5CYII=',
          lineStyle: {
            width: 3,
            color: '#429dfa'
          },
          // 区域填充样式
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(58,132,255, 0.5)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(58,132,255, 0)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
`,
    barDiamond: `
    const manNumber = [32, 58, 64, 64]
    const xData = ['隔离人数(境内)', '新增人数(境内)', '隔离人数(境外)', '隔离人数(境外)']

    const dom = 600
    const barWidth = dom / 20
    const manColors:any = []
    for (let i = 0; i < 10; i++) {
      manColors.push({
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: '#ffd849' // 最左边
          },
          {
            offset: 0.5,
            color: '#cc9f06' // 左边的右边 颜色
          },
          {
            offset: 0.5,
            color: '#ffd741' // 右边的左边 颜色
          },
          {
            offset: 1,
            color: '#ffbb00'
          }
        ]
      })
    }
    const option = {
      color: ['#ffd847'],
      // 提示框
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      /** 区域位置*/
      grid: {
        left: '0%',
        right: '0%',
        top: '15%',
        bottom: '5%',
        containLabel: true
      },
      legend: {
        data: ['人数'],
        x: 'right',
        itemWidth: 20,
        itemHeight: 10,
        textStyle: {
          fontSize: 12,
          color: '#ffffff'
        },
        top: '15px'
      },
      // X轴
      xAxis: {
        data: xData,
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#87929f'
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 10,
          fontSize: 12,
          interval: 0,
          color: '#ffffff'
        }
      },
      yAxis: {
        name: '(单位:人)',
        nameTextStyle: {
          color: '#ffffff',
          nameLocation: 'start'
        },
        show: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#075858'
          }
        },
        axisLabel: {
          color: '#FFFFFF',
          fontSize: 12
        }
      },
      series: [
        {
          name: '人数',
          type: 'bar',
          barWidth: barWidth,
          itemStyle: {
            normal: {
              color: function(params) {
                return manColors[params.dataIndex % 7]
              }
            }
          },
          data: manNumber

        },
        {
          z: 2,
          type: 'pictorialBar',
          data: manNumber,
          symbol: 'diamond',
          symbolOffset: ['0%', '50%'],
          symbolSize: [barWidth, barWidth * 0.5],
          itemStyle: {
            normal: {
              color: function(params) {
                return manColors[params.dataIndex % 7]
              }
            }
          }
        },
        {
          z: 3,
          type: 'pictorialBar',
          symbolPosition: 'end',
          data: manNumber,
          symbol: 'diamond',
          symbolOffset: ['0%', '-50%'],
          symbolSize: [barWidth, barWidth * 0.5],
          itemStyle: {
            normal: {
              borderWidth: 0,
              color: function(params) {
                return manColors[params.dataIndex % 7].colorStops[0].color
              }
            }
          }
        }
      ]
    }

    return option
`,
    waterPolo: `
{
  backgroundColor: '#0e2642',
  polar: {
    radius: ['81%', '79%'],
    center: ['50%', '50%']
  },
  angleAxis: {
    max: 100,
    clockwise: false,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  radiusAxis: {
    type: 'category',
    show: true,
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  graphic: [
    {
      type: 'image', // 图形元素类型
      id: 'logo', // 更新或删除图形元素时指定更新哪个图形元素，如果不需要用可以忽略。
      right: 'center',
      top: 'center', // 根据父元素进行定位 （居中）
      z: 0, // 层叠
      bounding: 'all', // 决定此图形元素在定位时，对自身的包围盒计算方式
      style: {
        image: 'data:image/png;base64,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', // 这里一定要注意、注意，必须是https开头的图片路径地址
        width: 127,
        height: 126
      }
    }
  ],
  series: [
    {
      type: 'liquidFill',
      radius: '75%',
      z: 1,
      center: ['50%', '50%'],
      color: '#ffffff',
      data: [
        {
          value: 0.5,
          direction: 'left',
          itemStyle: {
            normal: { // 正常样式
              color: '#199772',
              opacity: 0.3
            }
          }
        },
        {
          value: 0.45,

          itemStyle: {
            normal: { // 正常样式
              color: '#199772',
              opacity: 0.6
            }
          }
        }
      ],
      backgroundStyle: {
        borderWidth: 1,
        color: 'none'
      },
      label: {
        show: false
      },
      outline: {
        show: true,
        itemStyle: {
          borderWidth: 0
        },
        borderDistance: 0
      }
    }

  ]
}
`,
    circleProgress: `
{
  backgroundColor: '#0e2642',
  angleAxis: {
    show: false,
    max: (100 * 360) / 180, // -45度到225度，二者偏移值是270度除360度
    type: 'value',
    startAngle: 180, // 极坐标初始角度
    splitLine: {
      show: false
    }
  },
  grid: {
    left: '0',
    right: '0',
    bottom: '0',
    containLabel: true
  },
  barMaxWidth: 10, // 圆环宽度
  radiusAxis: {
    show: false,
    type: 'category'
  },
  // 圆环位置和大小
  polar: {
    center: ['35%', '35%'],
    radius: '120%'
  },
  series: [
    {
      type: 'bar',
      stack: '测试',
      data: [
        {
          // 上层圆环，显示数据
          value: 100,
          name: 'sdfasdf',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(5,30,75,0.5)'
              },
              {
                offset: 1,
                color: 'rgba(36,131,255,1)'
              }
            ])
          }
        }
      ],
      barGap: '-100%', // 柱间距离,上下两层圆环重合
      coordinateSystem: 'polar',
      roundCap: true, // 顶端圆角从 v4.5.0 开始支持
      z: 2 // 圆环层级，同zindex
      //       detail: {
      //     valueAnimation: true,
      //     fontSize: 25,
      //     fontWeight: '400',
      //     color: 'rgb(51,51,51)',
      //     offsetCenter: [0, '40%'],
      // },
    },
    {
      // 下层圆环，显示最大值
      type: 'bar',
      data: [
        {
          value: 100,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(2,28,57,0)'
              },
              {
                offset: 1,
                color: 'rgba(2,28,72,1)'
              }
            ])
          }
        }
      ],
      barGap: '-100%',
      coordinateSystem: 'polar',
      roundCap: true,

      z: 1
    },
    {
      stack: '测试',
      type: 'bar',
      data: [0.01],
      showBackground: false,
      coordinateSystem: 'polar',
      roundCap: true,
      barWidth: 10,
      itemStyle: {
        color: 'rgba(36, 231, 255,1)',
        borderColor: 'rgba(36, 231, 255,1)',
        borderWidth: 6,
        shadowColor: 'rgba(36, 231, 255,1)',
        shadowBlur: 8,
        shadowOffsetY: 2
      }
    },
    {
      name: '外部刻度',
      type: 'gauge',
      center: ['35%', '45%'],
      radius: '70%',
      min: 0, // 最小刻度
      max: 100, // 最大刻度
      splitNumber: 1, // 刻度数量
      startAngle: 180,
      endAngle: 0,

      axisLine: {
        show: false,
        // 仪表盘刻度线
        lineStyle: {
          width: 1,
          color: [[1, '#FFFFFF']]
        }
      },
      axisLabel: {
        show: true,
        // 仪表盘刻度名称配置
        distance: -15,
        color: '#ffffff',
        fontSize: 12
      },
      // 刻度标签。
      axisTick: {
        show: false

      }, // 刻度样式
      splitLine: {
        show: false

      }, // 分隔线样式
      detail: {
        show: false

      },
      pointer: {
        show: false
      },
      title: {
        show: true,
        offsetCenter: [0, '-40%'],
        textStyle: {
          fontSize: 18,
          color: '#fff',
          fontWeight: 600
        }
      },
      data: [
        {
          value: 100,
          name: 100 + '%'
        }
      ]
    }
  ]
}
`

  }
  return annotation[name]
}
