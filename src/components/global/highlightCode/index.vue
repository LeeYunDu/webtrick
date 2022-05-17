/**
*作者:李云都
*时间:2021年4月19日21:55:33
*/
<template>
  <div>
    <template v-if="langType==='css'">
      <div>
        <div class="language-css extra-class">
          <pre class="language-css"><code
      id="code-container"
      ref="container"
          /></pre>
        </div>
      </div>
    </template>
    <template v-if="['javascript','javascriptString'].includes(langType)">
      <div>
        <div class="language-javascript extra-class">
          <pre class="language-javascript"><code
      id="code-container"
      ref="container"
          /></pre>
        </div>
      </div>
    </template>
    <template v-if="langType==='html'">
      <div>
        <div class="language-html extra-class">
          <pre class="language-html"><code
      id="code-container"
      ref="container"
          /></pre>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, ref, unref } from 'vue'
import Prism from 'prismjs'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'HighlightCode',
  props: {
    /**
     * css / javascript / javascriptString / html
     * javascriptString 是因为setup中写函数会被再次编译，导致看不懂
     */
    langType: {
      type: String,
      default: ''
    },
    code: {
      type: Object || String || Function,
      default: () => {}
    }
  },
  setup(props, ctx) {
    const styleToString = (style:Object):string => {
      let styleStr = ''
      for (const key in style) {
        styleStr += `${key}: ${style[key]};\n`
      }
      return styleStr
    }
    /**
     * 检查数据类型 跟数据格式是否对应
     */
    const checkLangType = ():boolean => {
      const type = typeof props.code
      const checkMap = {
        css: { type: 'object', error: '类型为css的代码块格式错误' },
        html: { type: 'string', error: '类型为html的代码块格式错误' },
        javascript: { type: 'function', error: '类型为javascript的代码块格式错误' },
        javascriptString: { type: 'string', error: '类型为javascriptString的代码块格式应为字符串' }
      }
      if (checkMap[props.langType].type === type) {
        return true
      } else {
        ElMessage.error(checkMap[props.langType].error)
        return false
      }
    }
    const handleCode = () => {
      // 数据类型验证通过,数据处理
      if (checkLangType()) {
        switch (props.langType) {
          case 'css':
              unref(container)!.innerHTML = Prism.highlight(styleToString(props.code), Prism.languages.css, 'css')
            break
          case 'javascript':
              unref(container)!.innerHTML = Prism.highlight(props.code.toString(), Prism.languages.javascript, 'javascript')
            break
          case 'javascriptString':
              unref(container)!.innerHTML = Prism.highlight(props.code, Prism.languages.javascript, 'javascript')
            break
          case 'html':
              unref(container)!.innerHTML = Prism.highlight(props.code, Prism.languages.html, 'html')
            break
        }
      }
    }
    const container = ref<HTMLDivElement|null>(null)
    if (getCurrentInstance()) {
      onMounted(() => {
        handleCode()
      })
    }
    return {
      container
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
