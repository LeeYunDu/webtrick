<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <pieAnimation></pieAnimation>

  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import pieAnimation from './components/pieAnimation/index.vue'

export default defineComponent({
  name: 'EchartInstance',
  components: {
    pieAnimation
  },
  setup() {
    const content = ref(`
## echart 图表案例
### 介绍
应用场景: 不想写重复的可视化代码,将平时写过的图表案例慢慢累积起来。后续应用做最小的调整就好
每个图表可点击下载配置JSON文件
::: tip echart版本提示
**图表案例基于5.0以上版本echart,因为5.0以上 有些配置字段改变了,版本过低可能导致渲染失败**
**该页面组件实例都是以组件形式展示,需要使用请直接复制组件即可**
::: 
`)

    return {
      content
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
