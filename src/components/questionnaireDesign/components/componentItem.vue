<template>
  <div>
    <template v-if="['unitermingTopic','multipleChoiceTopic','judgeTopic'].includes(component.problemId)">
      <div class="question-name">{{ component.questionName }}</div>
      <template v-if="['unitermingTopic','judgeTopic'].includes(component.problemId)">
        <el-radio-group v-model="chooseAnswer">
          <div v-for="(item) in component.options" :key="item.answerId" class="option-item">
            <el-radio :label="item.answerId">{{ item.answerContent }}</el-radio>
          </div>
        </el-radio-group>
      </template>
      <template v-if="component.problemId==='multipleChoiceTopic'">
        <el-checkbox-group v-model="chooseAnswer">
          <div v-for="(item) in component.options" :key="item.answerId" class="option-item">
            <el-checkbox :label="item.answerId">{{ item.answerContent }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </template>

    </template>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
  props: {
    component: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: -1
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const that = reactive({
      chooseAnswer: props.component.problemId === 'multipleChoiceTopic' ? [] : '' // 选中的答案
    })
    // 选中答案
    watch(() => that.chooseAnswer, (value) => {
      // 多项的时候需要将数组转化为字符串
      ctx.emit('chooseAnswer', { value: props.component.problemId === 'multipleChoiceTopic' ? value.join(',') : value, index: props.index })
    })
    return {
      ...toRefs(that)
    }
  }
})
</script>

<style lang='scss' scoped>
.test-topic-content{

}
.option-item{
  margin-bottom: 6px;
}
</style>
