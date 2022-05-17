<template>
  <div id="pagination-box" class="pagination-box">
    <el-pagination
      background
      layout="prev, pager, next"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.pagination-box {
  padding: 0;
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
