<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      :custom-class="customClass"
      :width="dialogWidth"
      :destroy-on-close="true"
    >
      <div class="custom-dialog-container" :style="dialogContainerStyle">
        <slot></slot>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
</script>
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
