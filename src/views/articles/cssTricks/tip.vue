<template>
  <div>
    <h5>文字渐变叠加</h5>
    <div class="code1">文字渐变叠加</div>
    <HighlightCode lang-type="css" :code="code1" />
    <h5>CSS样式重置</h5>
    <HighlightCode lang-type="javascriptString" :code="code2" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Css开发小技能',
  setup() {
    const code1 = ref({
      'display': 'inline-block',
      'font-size': '18px',
      'background-image': 'linear-gradient(90deg, #19b1fb, red)',
      '-webkit-background-clip': 'text',
      'color': 'transparent'
    })

    const code2 = ref(`

*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}
html, body {
  height: 100%;
}
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
#root, #__next {
  isolation: isolate;
}
`)
    return {
      code1, code2
    }
  }
})
</script>
<style lang="scss" scoped>
.code1 {
  display: inline-block;
  font-size: 18px;
  background-image: linear-gradient(45deg, #19b1fb, red);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
