
class Observer {
  constructor(data) {
    this.data = data
    this.walk(data)
  }

  // [核心方法] 将对象转换为响应式对象,并为每个key值 设置 getter 和 setter方法
  walk(data) {
    if (typeof data !== 'object') return data
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  // [核心方法] 实现数据劫持
  defineReactive(obj, key, value) {
    this.walk(value)
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addObserver(Dep.target)

        return value
      },
      set(newValue) {
        if (value === newValue) return
        // [核心代码] 如果新的值是对象的话 则继续调用walk转换为响应式对象
        if (typeof newValue === 'object') this.walk(newValue)
        value = newValue
        dep.notify()
      }
    })
  }
}
