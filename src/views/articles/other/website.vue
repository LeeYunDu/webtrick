<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>

  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '优秀网址分享',
  setup() {
    const content = ref(`## 优秀网站分享
### 开发类
* [animate.css](https://animate.style/)
* [阿里矢量图标库](https://www.iconfont.cn/)
### 工具类
* [在线excel转JSON](https://www.bejson.com/json/col2json/)
* [图片转64位 互相转化](http://tool.chinaz.com/tools/imgtobase/)
* [切图工具](https://www.fancynode.com.cn/pxcook )
* [echart图表库](https://www.makeapie.com/explore.html)
### 博客文章类
* [揭秘Vue.js九个性能优化技巧-文章](https://juejin.cn/post/6922641008106668045)
* [揭秘Vue.js九个性能优化技巧-演示地址](https://vue-9-perf-secrets.netlify.app/bench/functional)
* [前端精读](https://github.com/ascoders/weekly?utm_source=gold_browser_extension)
* [系统架构的一些原则](https://coolshell.cn/articles/21672.html)
### 说明类
* [stylelint规则配置说明](https://cloud.tencent.com/developer/section/1489630)
### 可视化
* [mapBox配置](https://account.mapbox.com/)
* [cesium中文文档](http://cesium.xin/cesium/cn/Documentation1.62/)
`)
    return {
      content
    }
  }
})
</script>

