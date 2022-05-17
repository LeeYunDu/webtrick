
// 定义观察目标接口
interface Isubject {
  addObserver: (observer) => void,
  removeObserver:(observer) => void;
  notify: () => void
}

// 定义观察者接口
interface IObserver {
  update:()=>void
}

// 实现被观察者类

class Subject implements Isubject {
 private observers:IObserver[] = []

 public addObserver(observer:IObserver):void {
   this.observers.push(observer)
 }
 public removeObserver(observer:IObserver):void {
   const idx = this.observers.indexOf(observer)
   if (idx > -1) this.observers.slice(idx, 1)
 }
 public notify():void{
   this.observers.forEach(observer => {
     observer.update()
   })
 }
}

// 实现观察者类
class Observer implements IObserver {
  private name
  constructor(name:string) {
    this.name = name
  }
  update():void{
    console.log(`${this.name} 被通知到了`)
  }
}

export function useObserver() {
  const subject:Isubject = new Subject()
  const observer1:IObserver = new Observer('张三')
  const observer2:IObserver = new Observer('李四 ')
  subject.addObserver(observer1)
  subject.addObserver(observer2)
  subject.notify()
}

/**
 * 关于 Object.defineProperty
 * Object.defineProperty(obj, prop, descriptor)
 * 该方法会在原对象上新定义一个属性或者修改原有属性
 * obj 对象、prop 属性名称 、 descriptior 属性描述符（configurable、enumerable（可枚举值）、value（属性值）、writable（是否读写）、get、set）
 * 通过 get 和 set 的方法可以将对象变成响应式对象
 *
 */

export function objectDefineProperty() {
  const person = {
    age: 18,
    name: '张三'
  }
  Object.defineProperty(person, 'age', {
    get() {
      console.log('get')
      return '李四'
    },
    set() {
      console.log('set')
    }
  })
  console.log(person.age)
  person.age = 123
}

