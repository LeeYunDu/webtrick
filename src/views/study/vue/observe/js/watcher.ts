
// 实现被观察者类
class Dep {
  static target
  constructor() {
    this.subs = []
  }
  addObserver(watcher) {
    this.subs.push(watcher)
  }
  removeObserver(watcher) {
    const idx = this.subs.indexOf(watcher)
    if (idx > -1) this.subs.slice(idx, 1)
  }
  notify() {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

// 实现观察者类
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb

    Dep.target = this

    this.oldValue = this.vm.$data[key]

    Dep.target = null
  }

  update() {
    console.log('数据更新')
    const oldValue = this.oldValue
    const newValue = this.vm.$data[this.key]
    if (oldValue !== newValue) { // 比较新旧值,发生变化才执行回调
      this.cb(newValue, oldValue)
    }
  }
}
