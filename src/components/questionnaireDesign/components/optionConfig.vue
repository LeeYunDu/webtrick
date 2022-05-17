<template>
  <div v-if="hasChooseComponent">
    <div class="option-label">问题描述</div>
    <div> <el-input v-model="componentConfig.questionName" size="mini" type="text" /> </div>
    <div class="option-label">选项配置</div>
    <div
      class="option-list"
    >
      <template v-if="['unitermingTopic','judgeTopic'].includes(componentConfig.problemId)">
        <el-radio-group v-model="componentConfig.correctAnswer">
          <div
            v-for="(item,index) in componentConfig.options"
            :key="item.answerId"
            :class="['option-item',componentConfig.correctAnswer===item.answerId?'right-answer':'']"
            @drop.prevent="handleDrop"
            @dragover.prevent="handleDragover(item,index)"
          >
            <el-radio :label="item.answerId">
              <el-input v-model="item.answerContent" size="mini" type="text" />
            </el-radio>
            <div>
              <img
                class="option-icon"
                src="../images/option-position.png"
                alt=""
                @dragstart="handleDragstart(item,index)"
              >
              <img class="option-icon" src="../images/option-delete-active.png" alt="" @click="handleOptionDelete(index)">
            </div>
          </div>
        </el-radio-group>
      </template>
      <template v-if="componentConfig.problemId==='multipleChoiceTopic'">
        <el-checkbox-group v-model="componentConfig.correctAnswer">
          <div
            v-for="(item,index) in componentConfig.options"
            :key="item.answerId"
            :class="['option-item',componentConfig.correctAnswer.includes(item.answerId)?'right-answer':'']"
            @drop.prevent="handleDrop"
            @dragover.prevent="handleDragover(item,index)"
          >
            <el-checkbox :label="item.answerId">
              <el-input v-model="item.answerContent" size="mini" type="text" />
            </el-checkbox>
            <img
              class="option-icon"
              draggable="true"
              src="../images/option-position.png"
              alt=""
              @dragstart="handleDragstart(item,index)"
            >
            <img class="option-icon" src="../images/option-delete-active.png" alt="" @click="handleOptionDelete(index)">
          </div>
        </el-checkbox-group>
      </template>

    </div>
    <div> <el-button type="text" @click="handleAddOption">添加选项</el-button> </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject, reactive, toRefs } from 'vue'
import { TestComponentOption } from '../types/index'
export default defineComponent({
  setup() {
    const that = reactive({

      hasChooseComponent: false,
      // 问题配置
      componentConfig: {
        questionName: '',
        correctAnswer: '', // 正确答案
        options: []
      },
      // 问题选项拖拽功能
      oldItemIndex: -1,
      newItemIndex: -1,
      changeItem: {}
    } as any)

    const eventBus:any = inject('eventBus')
    eventBus.on('componentClick', (component:TestComponentOption) => {
      that.componentConfig = component
      // 如果未设置正确选项,则默认第一个选项为正确答案
      if (that.componentConfig.correctAnswer === '' && that.componentConfig.options.length > 0) {
        // 多选 答案的数据格式为 Array[string] 单选/判断 为 string
        if (that.componentConfig.problemId === 'multipleChoiceTopic') {
          that.componentConfig.correctAnswer = [that.componentConfig.options[0].answerId]
        } else {
          that.componentConfig.correctAnswer = that.componentConfig.options[0].answerId
        }
      }
      // 显示配置面板
      that.hasChooseComponent = true
    })
    // 添加选项
    const handleAddOption = () => {
      that.componentConfig.options.push({
        answerId: new Date().getTime(),
        answerContent: '',
        chooseCount: 0
      })
    }
    // 删除选项
    const handleOptionDelete = (index) => {
      that.componentConfig.options.splice(index, 1)
    }

    // 开始拖拽
    const handleDragstart = (item, index) => {
      that.oldItemIndex = index
      that.changeItem = JSON.parse(JSON.stringify(item))
    }
    // 停止拖拽时触发
    const handleDrop = () => {
      // 如果位置没有发生改变 什么也不做
      if (that.newItemIndex === that.oldItemIndex) {
        return
      }
      // 如果位置发生了改变,逻辑与预览组件相同
      if (that.newItemIndex > -1) {
        that.componentConfig.options.splice(that.oldItemIndex, 1)
        if (that.newItemIndex === 0 || that.oldItemIndex > that.newItemIndex) {
          that.newItemIndex++
        }
        that.componentConfig.options.splice(that.newItemIndex, 0, that.changeItem)
      }
      that.newItemIndex = -1
      that.oldItemIndex = -1
    }
    const handleDragover = (item, index) => {
      that.newItemIndex = index
    }
    return {
      ...toRefs(that), handleAddOption, handleOptionDelete, handleDrop, handleDragover, handleDragstart
    }
  }
})
</script>

<style lang='scss' scoped>
.option-label{
  font-size: 14px;
  color: #333;
  margin: 4px 0;
}
.option-item{
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  position: relative;
  .option-icon{
    width: 24px;
    height: 24px;
    margin-left: 10px;
    cursor: pointer;
  }
}
.right-answer{
  padding-bottom: 20px;
  &::after{
    content: '此为该题的正确答案';
    position: absolute;
    bottom: -10px;
    color: #ee1242;
    font-size: 12px;
    line-height: 2;
    margin: 0 0 0 28px;
  }
}
</style>
