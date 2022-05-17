/**
*作者:李云都
*时间:2021年4月22日16:30:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <h5>实例</h5>
    <HighlightCode lang-type="javascriptString" :code="code"></HighlightCode>
    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '业务代码',
  sort: 1,
  setup(props) {
    const content = ref(`
## 业务代码
### 介绍
应用场景：分享业务中用到的代码
`)

    const code = `
// 浙政钉环境判断
const verificationEnv = function() {
  let result = false
  // 浙政钉环境userAgent代码
  if (navigator.userAgent.indexOf('DingTalk') > -1 || navigator.userAgent.indexOf('dingtalk') > -1) {
    result = true
  }
  return result
}
`

    const code1 = `
<!-- 浙政钉js -->
浙政钉SDK https://g.alicdn.com/gdt/jsapi/1.9.12/index.js
// 浙政钉视频会议
dd.ready(function() {
  dd.authConfig({
    ticket: data.accessToken,
    jsApiList: ['createVideoMeeting']
  }).then(res => {
    // 创建视频会议：
    dd.createVideoMeeting({
      title: '会议名称', // 会议名称
      calleeStaffIds: [zzdId.data]// 人员列表 传入的是浙政钉人员ID
    }).then(res => {
    }).catch(videoError => {
    })
  }).catch(err => {
  })
})
`
    return {
      content, code, code1
    }
  }
})
</script>

