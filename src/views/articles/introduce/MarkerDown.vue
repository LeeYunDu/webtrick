
/**
*作者:李云都
*时间:2021年4月30日11:02:05
*/
<template>
  <div>

    <div class="container">
      <h6>h6标签</h6>
      <v-md-preview :text="text"></v-md-preview>
    </div>
    <HighlightCode lang-type="css" :code="style"></HighlightCode>
    <v-md-preview :text="test2" height="400px"></v-md-preview>
    <div class="language-css extra-class">
      <pre class="language-css"><code
      ref="flexContainer"
      /></pre>
    </div>
    <div class="language-html extra-class">
      <pre class="language-html"><code
      ref="htmlContainer"
      /></pre>
    </div>
    <div class="language-javascript extra-class">
      <pre class="language-javascript"><code
      ref="javascriptContainer"
      /></pre>
    </div>
  </div>
</template>

<script lang="ts">
// import VueMarkdown from 'vue-markdown'
import { defineComponent, onMounted, ref, unref } from 'vue'
import Prism from 'prismjs'

export default defineComponent({
  name: 'MarkerDown使用介绍',
  hidden: false,
  author: '李云都',
  setup() {
    const test2 = ref(`
  |  表头   | 表头  |
  |  ----  | ----  |
  | 单元格  | 单元格 |
  | 单元格  | 单元格 |
`)
    const text = ref(`
## 标题


# 标题1
## 标题2
### 标题3
#### 标题4
##### 标题5
###### 标题6

标题显示为#号,一号标题一个#号,依次增加一个#号,增加一个等级,一共有6个等级  
标题二有下划线

## 段落

Markdown 段落没有特殊的格式,**直接编写文字就好**,段落的换行是使用两个以上空格加上回车。  
段落的换行为两个空格加一个回车键  
当然也可以在段落后面使用一个空行来表示重新开始一个段落。

*斜体文本*
**粗体文本**
***粗斜体文本***

## 表格的格式

|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |

## 列表展示

Markdown 支持有序列表和无序列表  
无序列表使用星号(*)、加号(+)或是减号(-)作为列表标记，这些标记后面要添加一个空格，然后再填写内容：  

* 第一项
    列表嵌套只需在子列表中的选项前面添加四个空格即可
* 第二项
* 第三项

## 嵌套模式

> 第一层
  第一层内容
> > 第二层
> > > 第三层

## 图片格式 

可以直接是html标签 src链接

<img src="http://static.runoob.com/images/runoob-logo.png" width="50%">


## 提示信息

::: tip
  你可以点击 toolbar 中的 tip 来快速插入
:::

::: warning
  这是一段警告33
:::

::: danger
  这是一个危险警告
:::

::: details
  这是一个详情块，在 IE / Edge 中不生效
:::

::: tip 自定义标题
  你也可以自定义块中的标题
:::

::: danger STOP
  危险区域，禁止通行
:::
`)

    const flexContainer = ref<HTMLDivElement|null>(null)
    console.log('flexContainer: ', flexContainer)
    const htmlContainer = ref<HTMLDivElement|null>(null)
    const javascriptContainer = ref<HTMLDivElement|null>(null)
    const style = {
      width: '100px',
      height: '100px'
    }

    const styleToString = (style:any) => {
      let styleStr = ''
      for (const key in style) {
        styleStr += `${key}: ${style[key]};\n`
      }
      return styleStr
    }
    const html = `<div>123</div>
<div>123</div>
<div>123</div>
<div>123</div>
`

    onMounted(() => {
      Prism.highlightAll()

      unref(flexContainer)!.innerHTML = Prism.highlight(styleToString(style), Prism.languages.css, 'css')
      unref(htmlContainer)!.innerHTML = Prism.highlight(html, Prism.languages.html, 'html')
      unref(javascriptContainer)!.innerHTML = Prism.highlight(styleToString.toString(), Prism.languages.javascript, 'javascript')
    })
    return { text, flexContainer, htmlContainer, javascriptContainer, style, test2 }
  }
})
</script>
<style lang="scss" scoped>
  .container {
    width: 500px;
    text-align: left;
  }
</style>
