/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-markdown'{
  import { PluginFunction, Component, ComputedGetter, WritableComputedOptions, MethodOptions } from 'vue'
  class VueMarkdown {
    static install: PluginFunction<never>
    static VueMarkdown: Component<any, any, any, Record<string, ComputedGetter<any>|WritableComputedOptions<any>>, MethodOptions>
  }
  export default VueMarkdown
}
