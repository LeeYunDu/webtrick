
<template>
  <div>
    <customTable></customTable>
    5555555555
    <div class="container">

      <v-md-preview :text="text" height="400px"></v-md-preview>
    </div>
    111
    <HighlightCode lang-type="scss" :code="style"></HighlightCode>
    111
    <div class="language-css extra-class">
      <pre class="language-css"><code
      ref="flexContainer"
      /></pre>
    </div>
    <div class="language-html extra-class">
      <pre class="language-html"><code
      ref="htmlContainer"
      /></pre>
    </div>
    <div class="language-javascript extra-class">
      <pre class="language-javascript"><code
      ref="javascriptContainer"
      /></pre>
    </div>
  </div>
</template>

<script lang="ts">
// import VueMarkdown from 'vue-markdown'
import { defineComponent, onMounted, ref, unref } from 'vue'
import Prism from 'prismjs'

export default defineComponent({
  setup() {
    const text = ref(`
::: tip
  你可以点击 toolbar 中的 tip 来快速插入
:::
### 测试
::: warning
  这是一段警告33
:::

::: danger
  这是一个危险警告
:::

::: details
  这是一个详情块，在 IE / Edge 中不生效
:::

::: tip 自定义标题
  你也可以自定义块中的标题
:::

::: danger STOP
  危险区域，禁止通行
:::
# test
`)

    const flexContainer = ref<HTMLDivElement|null>(null)
    const htmlContainer = ref<HTMLDivElement|null>(null)
    const javascriptContainer = ref<HTMLDivElement|null>(null)
    const style = {
      width: '100px',
      height: '100px'
    }
    const str = `
    function eee() {
      console.log(1)
    }`
    const styleToString = (style:any) => {
      let styleStr = ''
      for (const key in style) {
        styleStr += `${key}: ${style[key]};\n`
      }
      return styleStr
    }

    onMounted(() => {
      console.log(Prism, 'Prism')

      unref(flexContainer)!.innerHTML = Prism.highlight(styleToString(style), Prism.languages.css, 'css')
      unref(htmlContainer)!.innerHTML = Prism.highlight('<div>123</div>', Prism.languages.html, 'html')
      unref(javascriptContainer)!.innerHTML = Prism.highlight(styleToString.toString(), Prism.languages.javascript, 'javascript')
    })
    return { text, flexContainer, htmlContainer, javascriptContainer, style }
  }
})
</script>
<style lang="scss" scoped>
  .container {
    width: 500px;
  }
</style>
