<template>
  <div class="component-preview-container">
    <div class="test-paper-title">
      <div style="flex:1;">
        <el-input v-model="testPaper.title" size="mini" type="text" placeholder="请输入试卷名称" />
      </div>
      <div class="unit-box">
        <div class="unit-item" @click="handleClear">
          <Delete style="width: 1em; height: 1em; margin-right: 8px;" />
          <span class="unit-label">清空</span>
        </div>
        <div class="unit-item" @click="showComponentDialog=true">
          <View style="width: 1em; height: 1em; margin-right: 8px;" />
          <span class="unit-label">预览</span>
        </div>
      </div>
    </div>
    <div class="drag-contaienr">
      <div
        class="drag-panel"
        @dragover.prevent="handleDragover"
        @drop.prevent="handleDropDown"
      >
        <div class="component-list">
          <el-form
            size="mini"
          >
            <el-form-item
              v-for="(component,index) in componentInContainer"
              :key="component.problemId + index"
              :class="[overIndex===index?'set-line':'','component-item']"
              draggable="true"
              @dragstart="dragstart(component,index)"
              @dragover.prevent="handleDropDragoverInComponent(index)"
              @dragleave.prevent="handleDropDragleaveInComponent"
              @click="handleComponentClick(component,index)"
            >
              <componentItem :component="component" @chooseAnswer="chooseAnswer" />
              <!-- 拖拽组件、删除组件、复制组件,只有组件被选中才会显示 -->
              <template v-if="checkedIndex===index">
                <div class="component-drag"><img class="component-icon" src="../images/icon-drag.png" alt=""></div>
                <div class="component-group">
                  <img class="component-icon" src="../images/icon-copy.png" alt="" @click="handleComponentCopy(component,index)">
                  <img class="component-icon" src="../images/icon-delete.png" alt="" @click="handleComponentDelete(index)">
                </div>
              </template>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <preview-dialog
      v-model="showComponentDialog"
      :compunents="componentInContainer"
      title="预览"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject, reactive, ref, toRefs, watch } from 'vue'
import PreviewDialog from './previewDialog.vue'
import componentItem from './componentItem.vue'
import { Delete, View } from '@element-plus/icons'
export default defineComponent({
  components: {
    componentItem,
    PreviewDialog,
    Delete, View
  },
  setup() {
    const testPaper = ref({
      title: ''

    })
    const that = reactive({
      chooseComponent: {}, // 获取到拖拽的组件
      dragstartStatus: false,
      componentInContainer: [], // 容器中的组件

      checkedComponent: {}, // 当前鼠标选中的组件
      checkedIndex: -1, // 当前鼠标选中组件的下标

      overIndex: -1, // 拖拽经过的组件下标,添加的时候往这下标前添加一个组件

      showComponentDialog: false

    } as any)

    const eventBus:any = inject('eventBus')
    /**
     * 拖拽释放区事件
     * dragenter 当被拖动元素进入到释放区所占据的屏幕空间时触发
     * dragover 当被拖动元素在释放区内移动时触发
     * dragleave 当被拖动元素没有放下就离开释放区时触发
     * drop 当被拖动元素在释放区里放下时触发
     */
    eventBus.on('dragstart', (val) => {
      // 获取当前拖拽的组件
      that.chooseComponent = val
    })
    // 组件开始拖拽,记录选中的组件
    const dragstart = (item, index) => {
      that.chooseComponent = { item, index }

      that.dragstartStatus = true
    }
    // 预览面板 - 拖拽经过 没用但必须有
    const handleDragover = (el) => {
      // el 是容器
    }

    /**
     * 当拖拽的元素在此放下时
     * 往展示的数组里push被拖拽的组件类型
     */
    const handleDropDown = (el) => {
      // 组件被放下后,往容器里添加该组件,如果有特定位置overIndex 则放在下面
      // 如果是预览组件内的拖动,调整完位置后需要删除原有位置的元素
      if (that.dragstartStatus) {
        that.componentInContainer.splice(that.chooseComponent.index, 1)
        that.dragstartStatus = false
      }
      if (that.overIndex > -1) {
        // 计算实际添加该添加位置的下标
        if (that.overIndex === 0 || that.chooseComponent.index > that.overIndex) {
          that.overIndex++
        }

        that.componentInContainer.splice(that.overIndex, 0, that.chooseComponent.item)
        that.overIndex = -1
      } else {
        that.componentInContainer.push(that.chooseComponent.item)
      }
      // 清除选中的组件
      that.chooseComponent = {}
    }

    // 在组件中经过,存储经过的下标
    const handleDropDragoverInComponent = (index) => {
      that.overIndex = index
    }

    // 在组件中离开,清除下标
    const handleDropDragleaveInComponent = () => {
      that.overIndex = -1
    }

    // 组件点击事件,存储被点击的组件信息
    const handleComponentClick = (item, index) => {
      that.checkedComponent = item
      that.checkedIndex = index
      eventBus.emit('componentClick', item)
    }

    // 组件复制
    const handleComponentCopy = (item, index) => {
      that.componentInContainer.splice(index, 0, JSON.parse(JSON.stringify(item)))
    }

    // 组件删除
    const handleComponentDelete = (index) => {
      that.componentInContainer.splice(index, 1)
    }

    // 选中的正确答案
    const chooseAnswer = (data) => {
      that.componentInContainer[data.index].chooseAnswer = data.value
    }

    // 容器内组件发生变化,需要抛出组件列表,用于试卷的分数统计
    watch(() => that.componentInContainer, (value) => {
      eventBus.emit('changeComponentContainer', value)
    }, { deep: true })

    // 清除
    const handleClear = () => {
      that.componentInContainer = []
    }

    // 编辑
    const setData = (data) => {
      that.componentInContainer = data.topics
      testPaper.value.title = data.testTitle
    }
    return {
      ...toRefs(that),
      testPaper, handleDragover, handleDropDown, handleComponentClick,
      dragstart,
      handleDropDragoverInComponent, handleDropDragleaveInComponent, handleComponentCopy, handleComponentDelete,
      chooseAnswer, handleClear, setData
    }
  }
})
</script>

<style lang='scss' scoped>
.component-preview-container{
  border: 1px solid #eee;
  flex: 1;
  margin: 0 10px;

  box-sizing: border-box;
}
.test-paper-title{
  color: #333;
  text-align: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  box-sizing: border-box;
  padding: 12px 10px 12px 10px;

}
.unit-box{
  color: #5372e7;
  font-size: 14px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  .unit-item{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .unit-item+.unit-item{
    margin-left: 10px;
  }

}
.drag-contaienr{
  background: rgb(250, 250, 250);
  height: calc(100% - 53px);
  padding: 12px;
  box-sizing: border-box;
  .drag-panel{
    background: white;
    border: 2px dashed #eee;
    height: 100%;
    overflow: scroll;
  }
}
.component-item{
  padding: 10px;
  padding-left: 30px;
  margin: 2px;
  border: 1px solid #eee;
  box-sizing: border-box;
  position: relative;
  ::v-deep .el-form-item__content{
    position: initial;
  }
  // 添加遮罩层,防止在预览的时候可以点击组件内容
  &::after{
    position: absolute;
    left: 0;right: 0;top: 0;bottom: 0;
    content: '';
    z-index: 10;
  }
  &:hover{
    background: red;
    border: 1px solid #5372e7;
    background: #ecf5ff;
  }

  // 拖拽物件
  .component-icon{
    width: 16px;
    height: 16px;
    cursor: pointer;
    position: relative;
    z-index: 12;
  }
  .component-drag{
    position: absolute;
    left: 0;
    top: 0;
    background: #5372e7;
    width: 24px;
    height: 24px;
    text-align: center;
  }
  .component-group{
    background: #5372e7;
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    bottom: 0;
    padding: 6px;
    .component-icon{
      margin: 0 4px;
    }
  }
}
.set-line{
  border-bottom: 2px solid red;
}
</style>
