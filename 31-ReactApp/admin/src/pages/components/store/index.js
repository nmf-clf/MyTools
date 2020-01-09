import { createStore } from 'redux'; //创建一个 store 用来存储公共数据
//引入 reducer 每个store里面的createStore函数必须引入一个reducer作为参数 否则会报错
import reducer from './reducer'; //reducer是一个纯函数

const store = createStore(reducer); //生成的store是一个对象,上边有许多API
console.log("store里的store::",store)
export default store; //因此 导出去的也是一个对象,上边有一些API,进而让组件使用store上的方法派送,订阅,更新等