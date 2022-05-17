<template>
  <div class="component-panel">
    <div class="component-type-list">
      <div v-for="item in componentOptions" :key="item.tId" class="component-type-item">
        <div class="component-type-title">{{ item.type }}</div>
        <div class="component-children-list">
          <div
            v-for="(children,index) in item.children"
            :key="children.problemId"
            class="component-children-item"
            draggable="true"
            @dragstart="dragstart(children,index)"
            @dragend="handleDragend"
          >
            <!-- <img class="component-icon" :src="setCompomentIcon(children.icon)" alt=""> -->
            <div class="component-label">{{ children.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject, ref } from 'vue'
import { ComponentType } from '../types/index'
export default defineComponent({
  setup() {
    const componentOptions = ref<Array<ComponentType>>([
      {
        type: '题目类型',
        tId: 'topic',
        children: [
          { label: '单项选择', problemId: 'unitermingTopic', icon: 'uniterming', options: [{ answerId: new Date().getTime(), answerContent: '选项一', chooseCount: 0 }], questionName: '单项选择', correctAnswer: '', chooseAnswer: '' },
          { label: '多项选择', problemId: 'multipleChoiceTopic', icon: 'multipleChoice', options: [{ answerId: new Date().getTime(), answerContent: '选项一', chooseCount: 0 }], questionName: '多项选择', correctAnswer: [], chooseAnswer: '' },
          { label: '判断题', problemId: 'judgeTopic', icon: 'judge', options: [{ answerId: new Date().getTime(), answerContent: '是', chooseCount: 0 }], questionName: '判断题', correctAnswer: '', chooseAnswer: '' }
        ]
      }
    ])

    // 获取组件icon
    const setCompomentIcon = (path) => {
      try {
        return require(`@/components/questionnaireDesign/images/icon-${path}.png`)
      } catch (error) {
        return ''
      }
    }

    /**
     * 被拖拽元素事件
     * dragstart 在元素开始被拖动时触发
     * dragend 在拖动操作完成时触发
     * drag 在元素被拖动时触发
     */

    const eventBus:any = inject('eventBus')

    // 开始拖拽
    const dragstart = (item, index:number) => {
      // 默认第一个选项为正确答案
      if (['uniterming', 'judge'].includes(item.icon)) {
        item.correctAnswer = item.options[0].answerId
      } else {
        item.correctAnswer = [item.options[0].answerId]
      }

      // 发射 选中的
      eventBus.emit('dragstart', { item, index })
    }
    // 拖拽经过
    const handleDragover = (index) => {
    }
    // 拖拽结束
    const handleDragend = () => {
    }
    return {
      componentOptions,
      setCompomentIcon,
      dragstart, handleDragover, handleDragend
    }
  }
})
</script>

<style lang='scss' scoped>
.component-panel{
  width: 250px;
  border: 1px solid #eee;
  padding: 12px;
  box-sizing: border-box;
  .component-type-list{

    .component-type-item{
      .component-type-title{
        font-size: 14px;
        color: #333;
        margin-bottom: 12px;
      }
      .component-children-list{
        .component-children-item{
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          font-size: 12px;
          color: #999;
          background: rgb(244, 246, 252);
          cursor: pointer;
          .component-icon{
            margin-right: 6px;
            width: 24px;
            height: 24px;
          }
          .component-label{
            min-width: 60px;
          }
        }
      }
    }
  }
}
</style>
