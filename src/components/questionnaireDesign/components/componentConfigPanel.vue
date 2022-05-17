<template>
  <div class="component-config-panel">
    <el-tabs v-model="activeName">
      <el-tab-pane label="选项配置" name="optionConfig">
        <optionConfig />
      </el-tab-pane>
      <el-tab-pane label="问卷设置" name="questionnaireConfig">
        <test-config ref="testConfig" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import optionConfig from './optionConfig.vue'
import TestConfig from './testConfig.vue'
export default defineComponent({
  components: {
    optionConfig,
    TestConfig
  },
  setup() {
    const that = reactive({
      activeName: 'optionConfig'

    })
    const refs = reactive({
      testConfig: null
    } as any)

    const getData = () => {
      const data = JSON.parse(JSON.stringify(refs.testConfig.testScoreConfig))
      data.judgeScore = JSON.stringify(data.judgeScore)
      data.testAllScore = refs.testConfig.testScore
      console.log(data, 'data')

      return data
      // return {
      //   unitermingScore: refs.testConfig.unitermingScore,
      //   multipleChoiceScore: refs.testConfig.multipleChoiceScore,
      //   judgeScore: JSON.stringify(refs.testConfig.judgeScore), // 根据后端要求转移成字符串,便于后端储存
      //   testTime: refs.testConfig.testTime

      // }
    }

    const setData = (data) => {
      refs.testConfig.setData(data)
    }
    return {
      ...toRefs(that),
      ...toRefs(refs),
      getData,
      setData
    }
  }
})
</script>

<style lang='scss' scoped>
.component-config-panel{
  height: 100%;
  width: 350px;
  border: 1px solid #eee;
  padding: 12px;
  box-sizing: border-box;
}
</style>
