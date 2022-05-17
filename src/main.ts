import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)

/**
 * 引入element
 */

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
app.use(ElementPlus, { locale })

/**
 * 代码高亮显示
 * v-md-editor组件应用
 * prism应用
 */
// import VueMarkdownEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
// 引入模块样式
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
// 直接按需引入 prism 的语言包即可，此处以 json 为例
import 'prismjs/components/prism-json'
// 有8个主题颜色样式文件 solarizedlight/coy/funky/okaidia/tomorrow/twilight
import 'prismjs/themes/prism-tomorrow.css'
import Prism from 'prismjs'
Prism.highlightAll()

VMdPreview.use(vuepressTheme, {
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  }
})
app.use(VMdPreview)
/**
 * 自定义全局公共组件
 */
import globalComponents from '@/components'
for (const key in globalComponents) {
  if (Object.prototype.hasOwnProperty.call(globalComponents, key)) {
    const element = globalComponents[key]
    app.component(key, element)
  }
}

app.mount('#app')
