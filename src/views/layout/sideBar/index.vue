<template>
  <div class="side-bar-box">
    <div class="side-nav-list">
      <div v-for="(nav,index) in nav" :key="index" class="side-nav-list-item">
        <div class="nav-title">{{ nav.name }}</div>
        <div class="side-bar-item-box" :style="{'max-height':nav.children.length * 30 + 'px'}">
          <sideBarItem v-for="(navItem,navIndex) in nav.children" :key="navIndex" :nav-info="navItem"></sideBarItem>
        </div>

      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import sideBarItem from './sideBarItem.vue'
export default defineComponent({
  components: {
    sideBarItem
  },
  setup() {
    const store = useStore()
    const nav = store.getters.router

    return { nav }
  }
})
</script>
<style lang="scss" scoped>
.side-bar-box {
  height: 100%;
  box-sizing: border-box;
  padding-top: 1.5rem;
  border-right: 1px solid #eaecef;
  background: white;
  overflow-y: auto;
  .side-nav-list {
    .side-nav-list-item {
      text-align: left;
      padding: 0.35rem 1rem 0.35rem 1.25rem;
      border-left: 0.25rem solid transparent;
      box-sizing: border-box;
      .nav-title {
        color: #2c3e50;
        font-size: 1.1em;
        line-height: 1.7;
        font-weight: 700;
      }
    }
  }
}
</style>
