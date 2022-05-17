<template>
  <div class="group">
    <div v-for="item in 1000" :key="item" class="item">
      {{ item }}
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  .group {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    .item {
      width: 20px;
      height: 20px;
      overflow: hidden;
      outline: 1px solid #056abc;
      box-shadow: 2px 2px 2px greenyellow;
    }
  }
</style>
