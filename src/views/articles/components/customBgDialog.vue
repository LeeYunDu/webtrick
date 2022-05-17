/**
*作者:李云都
*时间:2021年4月30日11:02:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>

    <el-button @click="showDialog = true">点击打开 Dialog</el-button>

    <CustomDialog
      v-model="showDialog"
      class-name="custom-class-name"
      bg-img-url="/dia_bg.png"
      :before-close="handleClose"
      @opened="opened"
    >
      简单的自定义背景弹窗
    </CustomDialog>
    <h5>调用</h5>
    <HighlightCode lang-type="html" :code="code1"></HighlightCode>
    <h5>组件源码</h5>
    <el-tabs type="border-card">
      <el-tab-pane label="template">
        <HighlightCode lang-type="html" :code="code2"></HighlightCode>
      </el-tab-pane>
      <el-tab-pane label="script">
        <HighlightCode lang-type="javascriptString" :code="code3"></HighlightCode>
      </el-tab-pane>
      <el-tab-pane label="style">
        <HighlightCode lang-type="html" :code="code4"></HighlightCode>
      </el-tab-pane>
    </el-tabs>
    <v-md-preview :text="content2"></v-md-preview>

  </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '自定义图片背景的弹窗',
  setup() {
    const content = ref(`
## 自定义图片背景的弹窗
### 介绍
对**element-plus**下的el-dialog二次封装;
应用场景:为了解决一些可视化大屏项目,各类背景图片不一样的弹窗,进行快速开发。
#### 功能支持
* 支持http/https/64位编码/本地图片地址(**需定义基础路径**) 格式的图片
* 根据图片大小,自动定义弹窗的高度跟宽度
* 支持element-plus组件的所有参数字段、事件 [官方地址](https://element-plus.gitee.io/#/zh-CN/component/dialog)
* 只有1个插槽,内容自定义

::: warning
***该组件是基于element-plus进行开发！！！***
element 下 dialog 的显示绑定字段是 visible
element-plus 下 dialog 的显示绑定字段是 value
如要使用element,替换下 **将v-model="showDialog" 替换成 :visible='showDialog'**
:::
`)
    const showDialog = ref(false)
    const handleClose = () => {
      ElMessage.success('弹窗关闭!')
      showDialog.value = false
    }
    const opened = () => { alert('element-plus 弹窗窗口打开后触发的函数') }
    const code1 = ref(`<div>
  <el-button @click="showDialog = true">点击打开 Dialog</el-button>
  <CustomDialog
    v-model="showDialog"
    class-name="custom-class-name"
    bg-img-url="/dia_bg.png"
    :before-close="handleClose"
  >
    简单的自定义背景弹窗
  </CustomDialog>
</div>
`)
    const code2 = ref(`// template
<div>
  <el-dialog
    v-bind="$attrs"
    :custom-class="customClass"
    :width="dialogWidth"
  >
    <div class="custom-dialog-container" :style="dialogContainerStyle">
      <slot></slot>
    </div>
  </el-dialog>
</div>
`)
    const code3 = ref(`// script
import { computed, defineComponent, ref, unref, watch } from 'vue'
export default defineComponent({
  name: 'CustomDialog',
  props: {
    // 自定义类名
    className: {
      type: String,
      default: ''
    },
    // 背景图片地址
    bgImgUrl: {
      type: String,
      default: ''
    },
    // 背景是否重复
    bgRepeat: {
      type: String,
      default: 'no-repeat'
    }

  },
  setup(props, ctx) {
    // 再次定义类名
    const customClass = computed(() => { return 'custom-clear-dialog  ' + props.className })
    // 弹窗宽度
    const dialogWidth = ref('auto')
    // 弹窗盒子样式
    const dialogContainerStyle = ref({
      width: 'auto',
      height: 'auto',
      'background-image': 'none',
      'background-repeat': props.bgRepeat
    })
    watch(() => props.bgImgUrl, (val) => {
      if (val) {
        try {
          // 获取背景图片
          let img = ref(null)
          // 判断是否为外部链接图片,更改图片加载方式
          if (props.bgImgUrl.indexOf('https://') > -1 || props.bgImgUrl.indexOf('http://') > -1 || props.bgImgUrl.indexOf('data:image/') > -1) {
            img = props.bgImgUrl
          } else {
            img = require('@/assets/images' + props.bgImgUrl)
          }
          const image = new Image()
          image.src = img
          image.onload = () => {
            unref(dialogContainerStyle).width = image.width + 'px'
            unref(dialogContainerStyle).height = image.height + 'px'
            unref(dialogContainerStyle)['background-image'] = 'url(' + img + ')'
            dialogWidth.value = image.width + 'px'
          }
        } catch (error) {
          console.error('获取背景图片失败,请检查路径')
        }
      }
    }, { immediate: true })

    return {
      customClass, dialogWidth, dialogContainerStyle
    }
  }
})
`)
    const code4 = ref(`//style
<style lang="scss">
// 清除element-dialog不用的节点
.custom-clear-dialog {
  background: none;
  box-shadow: none;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>
<style lang='scss' scoped>
.custom-dialog-container {
  box-sizing: border-box;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
`)
    const content2 = ref(`
  ## 组件字段说明

  |  参数   | 说明  | 类型| 可选值| 默认值|
  |  ----  | ----  |----  |----  |----  |
  | className  | 自定义dialog类名 |string |——|—— |
  | bgImgUrl  | 背景图片地址(支持http/https/base64/本地地址) |string |—— |—— |
  | bgRepeat  | 背景图片地址是否重复 |string |css属性 |no-repeat |
`)
    return {
      showDialog, handleClose, opened,
      content, content2, code1, code2, code3, code4
    }
  }
})
</script>

