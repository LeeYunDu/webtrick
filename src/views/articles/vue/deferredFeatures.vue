<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>
    <HighlightCode lang-type="javascriptString" :code="code2"></HighlightCode>
    <HighlightCode lang-type="javascriptString" :code="code3"></HighlightCode>
    <div v-if="defer(1)">
      <example></example>
    </div>
    <div v-if="defer(2)">
      <example v-for="item in 3" :key="item"></example>
    </div>
    <div v-if="defer(4)">
      <el-table
        :data="tableData"
        style="width: 100%;"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import example from '@/views/example/deferredFeatures/index.vue'
import deferred from '@/utils/defer'
export default defineComponent({
  name: 'DeferredFeatures',
  components: {
    example
  },
  mixins: [deferred],
  setup() {
    const content = ref(`
## DeferredFeatures 组件延时分批渲染组件
应用场景:当你有渲染耗时的组件，使用 Deferred 做渐进式渲染是不错的注意，它能避免一次 render 由于 JS 执行时间过长导致渲染卡住的现象。
### 案例说明
***在本次测试中,观察页面右侧滚动条,会有渐进试的变短***
***使用谷歌浏览器开发者模式下的performance进行性能监测***
### 关于 requestAnimationFrame函数
[requestAnimationFrame官方说明](https://javascript.ruanyifeng.com/htmlapi/requestanimationframe.html)
* requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。
* 目的是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。代码中使用这个API，就是告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘。
`)
    const tableData = ref([])
    for (let index = 0; index < 1000; index++) {
      tableData.value.push({
        date: index,
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      })
    }
    const { defer } = deferred()
    const code1 = ref(`
// defer函数
import { ref, onMounted } from 'vue'
export default function(count = 10) {
  const displayPriority = ref(0)

  onMounted(() => {
    runDisplayPriority()
  })

  const runDisplayPriority = () => {
    const step = () => {
      requestAnimationFrame(() => {
        displayPriority.value++
        if (displayPriority.value < count) {
          step()
        }
      })
    }
    step()
  }

  const defer = (priority) => {
    return displayPriority.value >= priority
  }
  return {
    defer
  }
}
`)
    const code2 = ref(`
// vue实例中引入
const { defer } = deferred()
return { defer }
`)
    const code3 = ref(`
// 组件内使用
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <div v-if="defer(1)">
      <example></example>
    </div>
    <div v-if="defer(2)">
      <example v-for="item in 3" :key="item"></example>
    </div>
    <div v-if="defer(4)">
      <el-table
        :data="tableData"
        style="width: 100%;"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
`)
    return {
      content, tableData, defer, code1, code2, code3
    }
  }
})
</script>

