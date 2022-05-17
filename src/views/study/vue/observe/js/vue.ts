class Vue {
  constructor(options = {}) {
    this.$el = options.el
    this.$data = options.data()
    console.log(this.$data)

    this.$methods = options.methods
  }
}

Object.defineProperty(window, 'Vue', Vue)
