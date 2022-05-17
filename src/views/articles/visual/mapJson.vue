/**
*作者:李云都
*时间:2021年4月30日11:02:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <iframe src="https://datav.aliyun.com/tools/atlas" height="1000" width="100%" frameborder="0"></iframe>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '地图选择器',
  setup() {
    const content = ref(`
## 地图选择器
### 介绍
查询中国城市地图Geo数据,导出为JSON文件。
[官方地址](https://datav.aliyun.com/tools/atlas/#&lat=30.37018632615852&lng=106.68898666525287&zoom=3.5)
#### 功能支持
* 支持API访问
* 可导出数据为JSON格式
* 精确到区级
* 长期更新
* 基于高德地图
`)
    return {
      content
    }
  }
})
</script>

