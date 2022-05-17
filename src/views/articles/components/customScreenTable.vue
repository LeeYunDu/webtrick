<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>

    <screenTable :column="tableColumn" :data="tableData" max-height="150px" />

    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>

  </div>
</template>

<script>
import { ElButton } from 'element-plus'
import { defineComponent, reactive, toRefs, ref } from 'vue'

export default defineComponent({
  name: 'CustomScreenTable',
  setup() {
    const that = reactive({
      tableColumn: [
        { label: '排名', width: 'auto', type: 'index' },
        { label: '部门名称', prop: 'deptName', width: 'auto' },
        { label: '场景数', prop: 'number', width: 'auto' },
        { label: '指标数', prop: 'indicator', width: 'auto' },
        { label: '活跃度', prop: 'liveness', width: 'auto', render: (h, params) => {
          return h('div', { style: { color: 'red' }}, params.row.liveness)
        } },
        { label: '操作', prop: 'indicator', width: 'auto', render: (h, params) => {
          const temp = []
          temp.push(h(ElButton, {
            type: 'success',
            size: 'mini',
            onClick: () => {
              alert('按钮点击事件')
            }

          }, 'render按钮'))
          return h('div', temp)
        } }
      ],
      tableData: [
        { deptName: '市文旅局', number: '10', indicator: 64, liveness: '190' },
        { deptName: '市文旅局', number: '20', indicator: 64, liveness: '190' },
        { deptName: '市文旅局', number: '30', indicator: 64, liveness: '190' },
        { deptName: '市文旅局', number: '40', indicator: 64, liveness: '190' }
      ]
    })

    const content = ref(`
## 大屏自定义样式表格
### 介绍
应用场景:可视化大屏表格展示数据
组件地址:/components/global/screenTable
复制到项目中引用即可
#### 功能
方便修改源码样式
支持render形式写法自定义单元格
支持内容无线滚动
`)
    const codes = reactive({
      code1: `

// template 使用
<screenTable :column="tableColumn" :data="tableData" max-height="150px" />

// 测试数据
tableColumn: [
  { label: '排名', width: 'auto', type: 'index' },
  { label: '部门名称', prop: 'deptName', width: 'auto' },
  { label: '场景数', prop: 'number', width: 'auto' },
  { label: '指标数', prop: 'indicator', width: 'auto' },
  { label: '活跃度', prop: 'liveness', width: 'auto', render: (h, params) => {
    return h('div', { style: { color: 'red' }}, params.row.liveness)
  } },
  { label: '操作', prop: 'indicator', width: 'auto', render: (h, params) => {
    const temp = []
    temp.push(h(ElButton, {
      type: 'success',
      size: 'mini',
      onClick: () => {
        alert('按钮点击事件')
      }

    }, 'render按钮'))
    return h('div', temp)
  } }
],
tableData: [
  { deptName: '市文旅局', number: '10', indicator: 64, liveness: '190' },
  { deptName: '市文旅局', number: '20', indicator: 64, liveness: '190' },
  { deptName: '市文旅局', number: '30', indicator: 64, liveness: '190' },
  { deptName: '市文旅局', number: '40', indicator: 64, liveness: '190' }
]
`
    })
    return {
      ...toRefs(that), content,
      ...toRefs(codes)
    }
  }
})
</script>

<style>

</style>
