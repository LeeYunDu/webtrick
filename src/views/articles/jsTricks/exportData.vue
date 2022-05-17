/**
*作者:李云都
*时间:2021年4月22日16:30:05
*/
<template>
  <div>
    <v-md-preview :text="content"></v-md-preview>
    <el-form inline size="mini">
      <el-form-item label="文件格式类型">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=""> <el-button size="mini" @click="downFile">下载</el-button> </el-form-item>
    </el-form>
    <HighlightCode lang-type="javascriptString" :code="code"></HighlightCode>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '纯前端导出数据',
  setup(props) {
    const content = ref(`
## 纯前端导出数据
### 介绍
应用场景：将对象转化成json文件,测试过支持txt/doc格式,其他格式自行实践
分享一个纯前端收藏夹应用场景：以JSON文件格式存储一些网址。数据缓存在localStorage里,后续的新增/删除的操作不影响。
如果换电脑后,直接将localStorage的数据通过下述方法导出成JSON文件,然后在新电脑上导入。
* 将数据转成类文件对象,通过Url.createObjectURL()创建一个url对象
* 创建 a 标签模拟下载
* 通过URL.revokeObjectURL() 释放创建的Url对象
* 支持自定义文件名称
`)
    const options = [{
      value: 'txt',
      label: 'txt'
    }, {
      value: 'doc',
      label: 'doc'
    }, {
      value: 'json',
      label: 'json'
    }]
    const value = ref('')
    const data = ref('')
    const downFile = () => {
      if (value.value) {
        const aTag = document.createElement('a')
        const obj = {
          name: 'LeeYunDu',
          age: 10086
        }
        const blob = new Blob([JSON.stringify(obj)])
        aTag.download = `fileName.${value.value}`
        aTag.href = URL.createObjectURL(blob)
        aTag.click()
        URL.revokeObjectURL(blob)
      }
    }
    const code = `const downFile = () => {
      const aTag = document.createElement('a')
      const obj = {
        name: 'LeeYunDu',
        age: 10086
      }
      const blob = new Blob([JSON.stringify(obj)])
      aTag.download = 'fileName.json'
      aTag.href = URL.createObjectURL(blob)
      aTag.click()
      URL.revokeObjectURL(blob)
    }
`
    return {
      content, options, value, data, downFile, code
    }
  }
})
</script>

