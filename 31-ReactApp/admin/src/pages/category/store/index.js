import { createStore } from 'redux'; //创建一个 store 用来存储公共数据
//引入 reducer 每个store里面的createStore函数必须引入一个reducer作为参数 否则会报错
import reducer from './reducer';

const store = createStore(reducer);

export default store;