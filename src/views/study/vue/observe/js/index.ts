
const vm = new Vue({
  el: '#app',
  data() {
    return {
      name: '张三',
      age: '18'
    }
  }
})

console.log(vm)
vm.$data.name = '李四'
