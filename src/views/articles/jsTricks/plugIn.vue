<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <HighlightCode lang-type="javascriptString" :code="code1"></HighlightCode>
    <v-md-preview :text="content2"></v-md-preview>

  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '异步引入外部插件',
  setup() {
    const content = ref(`
## 异步引入外部插件
### 介绍
应用场景：之前通过在index.html的插件可以通过改方式引入,避免插件实例出现undefined的情况
`)
    const content2 = ref(`
::: tip
:::
`)

    const code1 = ref(`
function plugIn() {
  return new Promise((resolve, reject) => {
    let load = false
    // 如果已加载直接返回
    if (typeof Cesium !== 'undefined') {
      resolve(Cesium)
      return true
    }
    // 异步加载回调处理
    window.onload = () => {
      load = true
      resolve(Cesium)
    }

    // 注入script脚本
    const script = document.createElement('script')
    script.src = 'https://cesium.com/downloads/cesiumjs/releases/1.82/Build/Cesium/Cesium.js'
    script.doneState = { loaded: true, complete: true }
    const css = document.createElement('link')
    css.href = 'https://cesium.com/downloads/cesiumjs/releases/1.82/Build/Cesium/Widgets/widgets.css'
    css.rel = 'stylesheet'
    document.body.appendChild(script)
    document.head.appendChild(css)
    // 避免未触发window.onload方法
    setTimeout(() => {
      if (!load) {
        if (Cesium) {
          resolve(Cesium)
        }
      }
    }, 10000)
    script.onload = () => {
      console.log('script onload')
      load = true
      resolve(Cesium)
    }
  })
}
    `)
    return {
      content, code1, content2
    }
  }
})
</script>

