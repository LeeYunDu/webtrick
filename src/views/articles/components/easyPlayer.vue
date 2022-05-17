/**
*作者:李云都
*时间:2021年4月22日9:30:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <HighlightCode lang-type="html" :code="code2"></HighlightCode>
    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>
    <h4>实例</h4>
    <el-form size="mini">
      <el-form-item label="视频流地址">
        <el-input v-model="videoUrl" placeholder="请输入视频流地址" @change="playVideo"></el-input>
      </el-form-item>
    </el-form>
    <v-md-preview :text="content2"></v-md-preview>
    <div id="videobox" class="video-box"></div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import WasmPlayer from '@easydarwin/easywasmplayer'

export default defineComponent({
  name: 'EasyWasmPlayer视频播放器',
  setup(props, ctx) {
    const content = ref(`
## EasyWasmPlayer视频播放器
### 介绍
 [官方地址](https://github.com/tsingsee/EasyPlayer.js/)
应用场景:支持WS-flv、flv、hls，支持H.264、H.265编码格式的视频直播。 
#### 需求案例
支持多个窗口播放视频
播放格式：flv,hls
#### Vue-Cli3.0 环境下安装
* 下载 npm install @easydarwin/easywasmplayer --save
* 拷贝 copy node_modules/@easydarwin/easywasmplayer/libDecoder.wasm 到项目public目录下
`)
    const content2 = ref(`
### 测试地址
连上鹿城VPN后可使用下面测试地址
* flv格式 ws://10.36.246.137:8825/rtp/gb_play_33038300002000000999_33038315001320010530.flv
* hls格式 http://10.36.246.137:8825/rtp/gb_play_33038300002000000999_33038315001320010585/hls.m3u8
::: tip
注意播放器绑定的实例创建问题
如果播放不了,检查一下视频流的地址是http开头还是wx开头,相互替换一下估计可以。
:::
`)
    const videoUrl = ref('')

    const playVideo = (videoUrl) => {
      if (videoUrl) {
        const player = new WasmPlayer(null, 'videobox', () => {}, {
          muted: false
        })
        player.play(videoUrl, 1)
      }
    }
    const code1 = `const playVideo = (videoUrl) => {
  if (videoUrl) {
    const player = new WasmPlayer(null, 'videobox', () => {}, {
      muted: false
    })
    player.play(videoUrl, 1)
  }
}`
    const code2 = `<div id="videobox" class="video-box"></div>`

    setInterval(() => {
      const dom = document.querySelector('video')
      console.log(dom, 'dom')
    }, 1000)
    return { content, videoUrl, playVideo, code1, code2, content2 }
  }
})
</script>
<style lang="scss" scoped>
#videobox {
  outline: 1px solid #eeeeee;
  position: relative;
  min-height: 200px;
  width: 90%;
  margin: 0 auto;
}
</style>
