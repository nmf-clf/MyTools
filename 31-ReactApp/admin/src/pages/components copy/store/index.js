import { createStore,applyMiddleware } from 'redux'; //创建一个 store 用来存储公共数据
import thunk from 'redux-thunk'; //redux-thunk中间件 可以支持store.dispatch()接收函数action
import { createLogger } from 'redux-logger';//redux-logger中间件 可以实时监控触发action时action的变化及其携带的信息
//引入 reducer 每个store里面的createStore函数必须引入一个reducer作为参数 否则会报错
import reducer from './reducer'; //reducer是一个纯函数

const middleware = [thunk];

if(process.env.NODE_ENV != 'production'){
    const logger = createLogger({})
    middleware.push(logger)
}

const store = createStore(reducer,applyMiddleware(...middleware)); //生成的store是一个对象,上边有许多API
console.log("store里的store::",store)
export default store; //因此 导出去的也是一个对象,上边有一些API,进而让组件使用store上的方法派送,订阅,更新等