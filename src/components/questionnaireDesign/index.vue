<template>
  <div class="form-design-container">
    <component-panel ref="componentPanel" />
    <component-preview ref="ComponentPreview" />
    <component-config-panel ref="ComponentConfigPanel" />
  </div>
</template>

<script lang='ts'>
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, toRefs } from 'vue'
import ComponentConfigPanel from './components/componentConfigPanel.vue'
import componentPanel from './components/componentPanel.vue'
import ComponentPreview from './components/componentPreview.vue'
import { getTestArticleTopicApi } from '@/api/wisdomArticleLibrary'
export default defineComponent({
  components: { componentPanel, ComponentPreview, ComponentConfigPanel },
  setup() {
    const that = reactive({

      isEdit: false, // 文章编辑
      editInfo: {}
    }as any)
    const refs = reactive({
      componentPanel: null,
      ComponentPreview: null,
      ComponentConfigPanel: null
    } as any)

    const getFormData = async() => {
      const verify = verifyData()
      if (verify) {
        const data = {
          testTitle: refs.ComponentPreview.testPaper.title,
          topics: refs.ComponentPreview.componentInContainer,
          testConfig: refs.ComponentConfigPanel.getData()
        }
        const deepData = JSON.parse(JSON.stringify(data))
        deepData.topics.forEach(element => {
          if (element.icon === 'multipleChoice' && Array.isArray(element.correctAnswer)) {
            element.correctAnswer = element.correctAnswer.join(',')
          }
        })
        return deepData
      }
    }

    // 表单校验
    const verifyData = () => {
      if (refs.ComponentPreview.testPaper.title === '') {
        ElMessage.error('请输入问卷标题')
        return false
      }
      if (refs.ComponentPreview.componentInContainer.length === 0) {
        ElMessage.error('请添加问卷问题')
        return false
      }
      return true
    }

    const setFormData = (data) => {
      console.log(data, 'data')
      getTestArticleTopicApi({ id: data.id }).then(res => {
        refs.ComponentPreview.setData(res.data)
        refs.ComponentConfigPanel.setData(res.data)
        that.editInfo = res.data
        that.isEdit = true
      })
    }
    return {
      ...toRefs(that), ...toRefs(refs), getFormData, verifyData, setFormData
    }
  }
})
</script>

<style lang='scss' scoped>
.form-design-container{
  display: flex;
  height: 100%;
}
</style>
