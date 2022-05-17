/**
*作者:李云都
*时间:2021年4月30日11:02:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <div id="videobox" ref="videobox" class="video-box"></div>
    <h4>流媒体播放</h4>
    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>
    <h4>自定义video元素</h4>
    <HighlightCode lang-type="javascriptString" :code="code2"></HighlightCode>

  </div>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, ref, unref } from 'vue'
import NPlayer from 'nplayer'
import Hls from 'hls.js'
export default defineComponent({
  name: 'Nplayer视频播放器',
  setup() {
    const player = new NPlayer({
      poster: 'https://camo.githubusercontent.com/9dc29b67b014909713c12a3cf0f5ca82a306e0af3a5f20602c85c0a1de1c2f88/68747470733a2f2f7777772e7365656b6c6f676f2e6e65742f77702d636f6e74656e742f75706c6f6164732f323031342f31322f747769747465722d6c6f676f2d766563746f722d646f776e6c6f61642e6a7067'
    })
    const hls = new Hls()
    hls.attachMedia(player.video)
    hls.on(Hls.Events.MEDIA_ATTACHED, function() {
      hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
    })
    const videobox = ref<HTMLDivElement|null>(null)
    if (getCurrentInstance()) {
      onMounted(() => {
        player.mount(unref(videobox)as HTMLDivElement)
      })
    }
    const content = ref(`
## NPPlayer视频播放器
### 介绍
 [官方地址](https://nplayer.js.org/)
NPlayer 是由 Typescript 加 Sass 编写，无任何第三方运行时依赖，Gzip 大小只有 21KB，兼容 IE11，支持 SSR。该播放器高度可定制，所有图标、按钮、色彩等都可以替换，并且提供了 内置组件 方便二次开发。它还拥有插件系统，弹幕功能 就是使用插件形式提供。该播放器可以接入任何 流媒体，如 hls、dash 和 flv 等。
#### 功能支持
* 支持流媒体
  需要安装 hls.js依赖  [官方地址](https://github.com/video-dev/hls.js)
* 支持快进/后退
* 支持倍速播放
* 支持弹幕
* 给视频添加海报
`)
    const code1 = ref(`// 引入依赖
import NPlayer from 'nplayer'
import Hls from 'hls.js'

// 实例创建
const player = new NPlayer()
const hls = new Hls()
hls.attachMedia(player.video)
hls.on(Hls.Events.MEDIA_ATTACHED, function() {
  hls.loadSource('流媒体地址')
})
const videobox = ref<HTMLDivElement|null>(null)
if (getCurrentInstance()) {
  onMounted(() => {
    player.mount(unref(videobox))
  })
}
`)
    const code2 = ref(`const video = document.createElement('video')
const player = new Player({ video })
player.mount(document.body)
`)
    return { videobox, content, code1, code2 }
  }
})
</script>
<style lang="scss" scoped>
.video-box {
  width: 300px;
  height: 300px;
  outline: 1px solid red;
  margin: 10px;
}
</style>
