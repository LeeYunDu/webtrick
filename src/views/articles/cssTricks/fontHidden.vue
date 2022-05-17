<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <h4>代码</h4>
    <HighlightCode lang-type="css" :code="style" />
    <v-md-preview :text="tip"></v-md-preview>

    <h5>正常展示</h5>
    <div>
      {{ testContnet }}
    </div>
    <h5>只显示一行</h5>
    <div class="font-overflow-1">
      {{ testContnet }}
    </div>
    <h5>只显示两行</h5>
    <div class="font-overflow-2">
      {{ testContnet }}
    </div>
    <h5>只显示三行</h5>
    <div class="font-overflow-3">
      {{ testContnet }}
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '文字超出省略',
  setup() {
    const content = ref(`
## 文字超出省略
### 介绍
应用场景: 列表的信息简介,超出以...的显示隐藏
`)
    const style = ref({
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      'overflow': 'hidden',
      '-webkit-line-clamp': 1
    })
    const tip = ref(`
::: tip
主要靠    **-webkit-line-clamp** 来控制行数
`)
    const testContnet = ref('埃隆·马斯克（Elon Musk），1971年6月28日出生于南非的行政首都比勒陀利亚，[1]拥有加拿大和美国双重国籍，企业家、工程师、慈善家，现担任太空探索技术公司（SpaceX）CEO兼CTO、特斯拉公司CEO兼产品架构师、太阳城公司（SolarCity）董事会主席。')
    return {
      testContnet, content, style, tip
    }
  }
})
</script>
<style lang="scss" scoped>
/* 文字溢出 */
.font-overflow-1,
.font-overflow-2,
.font-overflow-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.font-overflow-1 { -webkit-line-clamp: 1; }
.font-overflow-2 { -webkit-line-clamp: 2; }
.font-overflow-3 { -webkit-line-clamp: 3; }
</style>
