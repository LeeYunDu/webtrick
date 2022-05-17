<template>
  <div class="screen-table-container">
    <div class="screen-table-header">
      <div
        v-for="(item,index) in column"
        :key="index"
        class="header-item"
        :style="setColumnStyle(item)"
      >
        <div class="header-cell">
          <span class="th-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div class="screen-table-main" :style="{'max-height':maxHeight}">
      <!-- 无线滚动 -->
      <template v-if="startRoll">
        <vue-seamless-scroll :data="data" :class-option="option">
          <tableRow v-bind="$attrs" :data="data" :column="column" />
        </vue-seamless-scroll>
      </template>
      <template v-else>
        <tableRow :data="data" v-bind="$attrs" :column="column" />
      </template>

    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import vueSeamlessScroll from 'vue-seamless-scroll/src'
import tableRow from './tableRow.vue'
export default defineComponent({
  name: 'ScreenTable',
  components: {
    vueSeamlessScroll, tableRow
  },
  props: {
    column: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: String,
      default: 'auto'
    },
    startRoll: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const that = reactive({
      option: {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    })

    const setColumnStyle = (item) => {
      return {
        width: item.width,
        flex: item.width === 'auto' ? '1' : `0 0 ${item.width}`
      }
    }
    return {
      ...toRefs(that), setColumnStyle
    }
  }
})
</script>
<style lang="scss">
.screen-table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  .screen-table-header {
    display: flex;
    margin-bottom: 1vh;

    background-size: 100% 100%;
    height: 40px;
    line-height: 40px;
    .header-item {
      text-align: center;
      padding: 0 2px;
      box-sizing: border-box;
      .header-cell{
        min-height: 26px;
        box-sizing: border-box;
      }
      .th-label {
        font-family: SourceHanSansCN-Medium, serif;
        color: #19b1fb;
      }
    }
  }
  .screen-table-main {
    height: calc(100% - 40px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      /* 滚动条整体样式 */
      width: 5px;  /* 高宽分别对应横竖滚动条的尺寸 */
      height: 1px;
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      /* 滚动条里面小方块 */
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #eeeeee;
    }
    &::-webkit-scrollbar-track {
      /* 滚动条里面轨道 */
      border-radius: 10px;
    }
    overflow-y: auto;

  }
}
</style>
