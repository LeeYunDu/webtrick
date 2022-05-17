<template>
  <div>
    <el-dialog
      v-bind="$attrs"
    >
      <div class="component-list">
        <el-form
          size="mini"
        >
          <el-form-item
            v-for="(component,index) in compunents"
            :key="component.problemId + index + 'dialog'"
          >
            <componentItem :component="component" @chooseAnswer="chooseAnswer" />
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import componentItem from './componentItem.vue'
export default defineComponent({
  components: {
    componentItem
  },
  props: {
    compunents: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {

    }
  }
})
</script>

<style lang='scss' scoped>

</style>
