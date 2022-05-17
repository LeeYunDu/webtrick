<template>
  <div>
    <div class="option-label">问卷计分规则</div>
    <div class="score-panel">
      <div class="score-option">
        <div class="option-name">单选题:</div>
        <div>
          <div class="flex-align">
            <span class="score-tip">每题正确得</span>
            <el-input
              v-model.number="testScoreConfig.unitermingScore"
              size="mini"
              style="width:50px;margin:0 8px;"
              type="text"
            /> 分</div>
        </div>
      </div>
      <div class="score-option">
        <div class="option-name">判断题:</div>
        <div>
          <div class="flex-align">
            <span class="score-tip">每题正确得</span>
            <el-input
              v-model.number="testScoreConfig.multipleChoiceScore"
              size="mini"
              style="width:50px;margin:0 8px;"
              type="text"
            /> 分</div>
        </div>
      </div>
      <div class="score-option">
        <div class="option-name">多选题:</div>
        <div>
          <div class="flex-align">
            <span class="score-tip">全部选中得</span>
            <el-input
              v-model.number="testScoreConfig.judgeScore.allRight"
              size="mini"
              style="width:50px;margin:0 8px;"
              type="text"
            /> 分</div>
          <div class="flex-align">
            <span class="score-tip">部分选中得</span>
            <el-input
              v-model.number="testScoreConfig.judgeScore.portion"
              size="mini"
              style="width:50px;margin:0 8px;"
              type="text"
            /> 分</div>
          <div class="flex-align">
            <span class="score-tip">选中错误得</span>
            <el-input
              v-model.number="testScoreConfig.judgeScore.chooseError"
              size="mini"
              style="width:50px;margin:0 8px;"
              type="text"
            /> 分</div>
        </div>
      </div>
    </div>
    <div class="test-panel">
      <div class="test-time">当前问卷总分:<span class="test-score">{{ testScore }}</span>分 </div>
      <div class="test-time">问卷限制时间:
        <el-input
          v-model.number="testScoreConfig.testTime"
          size="mini"
          style="width:80px;margin:0 8px;"
          type="text"
        /> 分
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, inject, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  setup(props, ctx) {
    const eventBus:any = inject('eventBus')
    eventBus.on('changeComponentContainer', (value) => {
      questionList.value = value
    })
    const that = reactive({
      testScoreConfig: {
        unitermingScore: 0,
        multipleChoiceScore: 0,
        judgeScore: {
          allRight: 0,
          portion: 0,
          chooseError: 0
        },
        testTime: 60
      }

    } as any)
    const questionList:any = ref([]) // 问题集合
    // 计算试卷分数
    const testScore = computed(() => {
      let score = 0
      const scoreMap = {
        uniterming: that.testScoreConfig.unitermingScore,
        multipleChoice: that.testScoreConfig.multipleChoiceScore,
        judge: that.testScoreConfig.judgeScore.allRight
      }
      questionList.value.forEach(element => {
        score += scoreMap[element.icon]
      })

      return score
    })

    const setData = (data) => {
      data.testConfig.judgeScore = JSON.parse(data.testConfig.judgeScore)
      that.testScoreConfig = data.testConfig
      // that.testScoreConfig.unitermingScore = data.testConfig.unitermingScore
      // that.testScoreConfig.multipleChoiceScore = data.testConfig.multipleChoiceScore
      // that.testScoreConfig.judgeScore = JSON.parse(data.testConfig.judgeScore)
    }
    return {
      ...toRefs(that),
      testScore,
      setData
    }
  }
})
</script>

<style lang='scss' scoped>
.score-panel{
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}
.option-label{
  font-size: 14px;
  color: #333;
  margin: 4px 0;
}
.score-option{
  display: flex;
  margin-bottom: 8px;
  .option-name{
    margin-right: 10px;
    color: #333;
    position: relative;
    top: 2px;
  }
}
.flex-align{
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #999;
  .score-tip{
    display: inline-block;
    width: 80px;
  }
  ::v-deep .el-input__inner {
    font-size: 18px;
    font-weight: 600;
    color: #19b1fb;
    &::-webkit-input-placeholder {
      color: #19b1fb;
    }
  }
}
.flex-align{
  margin-bottom: 8px;
}
.test-time{
  font-size: 18px;
  margin-top: 10px;
  color: #333;
  ::v-deep .el-input__inner {
    font-size: 18px;
    font-weight: 600;
    color: #19b1fb;
    &::-webkit-input-placeholder {
      color: #19b1fb;
    }
  }
}
.test-score{
  color: #5372e7;
  margin: 0 6px;
  font-size: 18px;
  font-weight: 600;
}
</style>
