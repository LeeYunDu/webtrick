<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      title="图表配置"
      :destroy-on-close="true"
    >
      <el-button @click="download">下载配置</el-button>
      <HighlightCode lang-type="javascriptString" :code="code" />
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    const download = () => {
      const aTag = document.createElement('a')
      const blob = new Blob([props.code])
      aTag.download = `config.txt`
      aTag.href = URL.createObjectURL(blob)
      aTag.click()
      // URL.revokeObjectURL(blob)
    }
    const copy = () => {

    }
    return {
      copy, download
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
