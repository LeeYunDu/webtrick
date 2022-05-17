# WebTricks



#### CSS加载SCSS全局变量、混合样式

##### 1、跟目录中创建vue.config.js文件

##### 2、添加以下字段配置

```javascript
css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '~@/styles/variable.scss';
          @import '~@/styles/mixins.scss';
        `
      }
    }
  }
```



#### CSS eslint保存自动格式化

##### 1、全局安装css格式化插件

```
npm i stylelint stylelint-config-standard -g
```

##### 2、在根目录添加.stylelintrc.js 文件

##### 3、Vscode插件中要安装stylelint

#### 自定义全局公共组件

##### 1、global 文件下创建组件名文件夹

##### 2、组件文件夹创建文件

index.ts

```javascript
import customTable from './index.vue'

export default customTable

```

index.vue

传统vue文件,但是必须要添加name字段

##### 3、在'@/components'文件下创建index.ts文件

index.ts

```typescript
// 自动加载 global 目录下的 .ts 结尾的文件
const globalComponents:any = {}
const componentsContext = require.context('./global', true, /\.ts$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  /**
  * 兼容 import export 和 require module.export 两种规范
  */
  const ctrl = componentConfig.default || componentConfig
  globalComponents[ctrl.name] = ctrl
})
export default  globalComponents


```

##### 4、mian.ts 调用

```typescript
/**
 * 自定义全局公共组件
 */
import globalComponents from  '@/components' 
for (const key in globalComponents) {
  if (Object.prototype.hasOwnProperty.call(globalComponents, key)) {
    const element = globalComponents[key];
    console.log(key,element)
    app.component(key, element)
  }
}
```

