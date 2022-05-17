<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>

  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VueVideoPlay',
  setup() {
    const content = ref(`
## vueVideoPlay视频播放器
### 介绍
 [教学地址](https://www.cnblogs.com/loveyaru/p/11452656.html)
解决 前端 播放 rtmp 格式的视频流插件
#### 功能支持
* 支持rtmp格式播放
`)
    return { content }
  }
})
</script>
<style lang="">

</style>
