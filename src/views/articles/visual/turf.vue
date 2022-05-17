/**
*作者:李云都
*时间:2021年4月30日11:02:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>

  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Turf地理空间分析库',
  setup() {
    const content = ref(`
## Turf.js
### 介绍
应用场景:地理空间分析库，处理各种地图算法
[官方地址](https://turfjs.fenxianglu.cn/category/#cdn%E5%BC%95%E5%85%A5)
#### 功能支持
* 计算多边形中心点
`)
    return {
      content
    }
  }
})
</script>

