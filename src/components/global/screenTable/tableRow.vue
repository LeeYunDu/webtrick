<template>
  <div v-for="(item,index) in data" :key="index" class="screen-table-main-row" @click="handleRowClick(item)">
    <div
      v-for="(columnItem,columnIndex) in column"
      :key="columnIndex"
      class="cell"
      :style="setColumnStyle(columnItem)"
    >
      <template v-if="columnItem.render">
        <cell
          :render="columnItem.render"
          :row="item"
          :column="columnItem"
        />
      </template>
      <template v-else-if="columnItem.type==='index'">
        {{ index + 1 }}
      </template>
      <template v-else>
        {{ item[columnItem.prop] }}
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import cell from './cell.vue'

export default defineComponent({
  components: {
    cell
  },
  props: {
    column: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ['handleRowClick'],
  setup(props, ctx) {
    const setColumnStyle = (item) => {
      return {
        width: item.width,
        flex: item.width === 'auto' ? '1' : `0 0 ${item.width}`
      }
    }

    const handleRowClick = (item) => {
      ctx.emit('handleRowClick', item)
    }
    return {
      setColumnStyle, handleRowClick
    }
  }
})
</script>

<style lang='scss' scoped>
.screen-table-main-row {
  // border: 1px solid #104964;
  display: flex;
  // background: rgba($color: #052958, $alpha: 0.2);
  height: 40px;
  line-height: 40px;
  margin-bottom: 2px;
  .cell {
    text-align: center;
    font-family: SourceHanSansCN-Medium, serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0;
    color: #19b1fb;
  }
}
.screen-table-main-row:nth-child(2n){
  background: rgba($color: #1492ff, $alpha: 0.1);
}
</style>
