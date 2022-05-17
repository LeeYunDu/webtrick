<template>
  <div class="side-bar-item" :class="[routerName===navInfo.name?'side-bar-item-active':'']">
    <span @click="toRouter">{{ navInfo.name }}</span>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, PropType, unref } from 'vue'
import { article } from '@/interface/articleConfig'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: '导航栏选项',
  props: {
    navInfo: {
      default: () => {},
      type: Object as PropType<article>
    }
  },
  setup(props, ctx) {
    const router = useRouter()
    const route = useRoute()
    const routerName = computed(() => { return route.name })
    const toRouter = () => {
      unref(router).push({ name: props.navInfo.name })
    }

    return {
      toRouter, routerName
    }
  }
})
</script>
<style lang="scss" scoped>
.side-bar-item {
  padding: 0 16px 0 20px;
  box-sizing: border-box;
  cursor: pointer;
}
.side-bar-item-active {
  color: #42b983;
  font-weight: bold;
}
</style>
