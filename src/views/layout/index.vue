<template>
  <div id="app-container">
    <div class="nav-bar-container">
      <navBar></navBar>
    </div>
    <div class="side-bar-container">
      <sideBar></sideBar>
    </div>
    <div class="views-container">
      <!-- <iframe src="https://www.baidu.com/" width="800px" height="800px" frameborder="0"></iframe> -->
      <div class="main">
        <router-view></router-view>
        <div class="page-nav">
          <p>下一页模块配置 - 该功能还未开发 →</p>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from './navBar/index.vue'
import sideBar from './sideBar/index.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    navBar, sideBar
  }
})
</script>
<style lang="scss" scoped>
$navBarHegiht:60px;
#app-container {
  display: flex;
  flex-wrap: wrap;
  padding-top: $navBarHegiht;
  .nav-bar-container {
    height: $navBarHegiht;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    box-sizing: border-box;
    border-bottom: 1px solid #eaecef;
  }
  .side-bar-container {
    width: 300px;
    position: fixed;
    top: $navBarHegiht;
    height: calc(100vh - 60px);
    left: 0;
    overflow-y: auto;
  }
  .views-container {
    width: calc(100% - 300px);
    margin-left: auto;
    .main {
      max-width: 900px;
      margin: 0 auto;
      box-sizing: border-box;
      .page-nav {
        padding-top: 1rem;
        margin: 0 auto;
        text-align: right;
        color: #3eaf7c;
        font-size: 14px;
        cursor: pointer;
        p {
          min-height: 2rem;
          margin-top: 0;
          border-top: 1px solid #eaecef;
          padding-top: 1rem;
          overflow: auto;
        }
      }
    }
  }
}
</style>
