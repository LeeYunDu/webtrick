<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <v-md-preview :text="content2"></v-md-preview>

  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '前言',
  sort: 1,
  setup() {
    const content = ref(`## 介绍
WebTricks 是 一个集成前端工程师工作可能使用到的技巧的库。
里面将会分享项目应用中,所使用的技术。
[公司git地址](http://192.168.2.61/lyd19961024/web-tricks)
`)
    const content2 = ref(`## 优秀网站分享
### 工具类
* [在线excel转JSON](https://www.bejson.com/json/col2json/)
* [图片转64位 互相转化](http://tool.chinaz.com/tools/imgtobase/)
* [PS切图工具](https://www.fancynode.com.cn/pxcook )
* [Responsively 帮你查看多种设备下的网站效果；](https://www.fancynode.com.cn/pxcook )
### 博客文章类
* [揭秘Vue.js九个性能优化技巧-文章](https://juejin.cn/post/6922641008106668045)
* [揭秘Vue.js九个性能优化技巧-演示地址](https://vue-9-perf-secrets.netlify.app/bench/functional)
### 说明类
* [stylelint规则配置说明](https://cloud.tencent.com/developer/section/1489630)
### 前端精选网站
* [CSS Scan 收集了超多 box-shadow 效果网站；](https://getcssscan.com/css-box-shadow-examples)
* [1loc 是一个聚合解决方案网站，帮你解决 JS 编程中经常遇到的各类问题](https://getcssscan.com/css-box-shadow-examples)
* [Omatsuri 设计师工具集合网站，例如使用CSS创建三角形、创建网站光标显示样式、HTML符号等](https://getcssscan.com/css-box-shadow-examples)

`)
    return { content, content2 }
  }
})
</script>

