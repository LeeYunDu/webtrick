/**
*作者:李云都
*时间:2021年4月30日11:02:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <!-- <div id="videoElement" ref="videoElement" class="video-box"></div> -->
    <video id="videoElement" name="videoElement" class="centeredVideo" controls autoplay width="1024" height="576">
      Your browser is too old which doesn't support HTML5 video.
    </video>
    <h4>流媒体播放</h4>
    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>

  </div>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, ref, unref } from 'vue'
import flvjs from 'flv.js'
export default defineComponent({
  name: 'Flv',
  setup() {
    const videoElement = ref<HTMLDivElement|null>(null)
    console.log('videoElement: ', videoElement)

    onMounted(() => {
      var videoElement = document.getElementById('videoElement')

      var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'https://ygk.lgswzfw.gov.cn:8825/rtp/gb_play_33038300002000000999_33038315001320010576.flv'
        // url: 'http://10.36.246.137:8825/rtp/gb_play_33038300002000000999_33038315001320010308.flv'
      })
      flvPlayer.attachMediaElement((videoElement as HTMLMediaElement))
      flvPlayer.load()
      flvPlayer.play()
    })

    const content = ref(`
## flv.js  
### 介绍
#### 功能支持
* 支持播放flv格式的视频流
`)
    const code1 = ref(`// 引入依赖
import flvjs from 'flv.js'


var videoElement = document.getElementById('videoElement')

var flvPlayer = flvjs.createPlayer({
  type: 'flv',
  url: 'https://ygk.lgswzfw.gov.cn:8825/rtp/gb_play_33038300002000000999_33038315001320010576.flv'
  // url: 'http://10.36.246.137:8825/rtp/gb_play_33038300002000000999_33038315001320010308.flv'
})
flvPlayer.attachMediaElement((videoElement as HTMLMediaElement))
flvPlayer.load()
flvPlayer.play()
`)

    return { videoElement, content, code1 }
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
