<template>
  <div>
    <signature></signature>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import signature from '@/components/signature/index.vue'
export default defineComponent({
  name: '手写签批',
  components: {
    signature
  },
  setup() {

  }
})
</script>

<style lang='scss' scoped>

</style>
