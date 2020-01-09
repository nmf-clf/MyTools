# redux流程:
    1.Component(组件)：想要改变公共数据的state或者状态,只能通过dispatch派发action把type(类型)和payload(将要改变的值)传给store;
    (dispatch方法是store上的API)(首先,组件会通过store.getState()先获取初始公共数据)
    2.Store：接收以后不会去处理数据,store只是一个存储公共数据的容器;
    因而逻辑处理需要reducer去完成,所以store会将 组件通过dispatch派送过来的action 转交给reducer;
    3.Reducer：reducer是一个纯函数,它拿到action之后,会根据action的type去判断action的类型从而对应的处理数据变化的逻辑,
    并且生成新的state返回给store,
    (由于store初始化的时候必须有一个初始值,因此在reducer.js文件里需要const一个defaultState,初始化时如果有state则为state，如果没有则为defaultState)
    最后,组件会通过 store上的订阅方法 拿到 更新后的数据,最终渲染到界面
## 1.基本使用
npm install --save redux
**store/index.js(Store存储数据的文件)**
import { createStore } from 'redux'; //创建一个 store 用来存储公共数据
//引入 reducer 每个store里面的createStore函数必须引入一个reducer作为参数 否则会报错
import reducer from './reducer';
const store = createStore(reducer);
export default store;
**index.js(Component组件所在的文件)**
import store from './store/index.js'; //引入store文件夹下的store,本质是引入了store上的API,通过API发送action和获取数据
store.getState() //获取store的数据,是一个对象{},一旦组件使用了redux,则必须先获取初始数据
store.dispatch(action) //派发action,是一个对象 {}
store.subscribe(()=>{ this.setState(store.getState()) }) //订阅通知,只要action成功发送引起store里的state发生改变就执行subscribe里的函数从而及时获取新的数据
**store/reducer.js(Reudcer处理逻辑所在的文件)**
const defaultState = {
    x1: 'x1',
    x2:['x22','x222']
} 
无需引入文件,本质是一个纯函数 
1.给定固定的输入就会有固定的输出, 并且不能改变参数(因此需要深copy)
2.reducer负责处理逻辑 但不改变数据,改变数据由store负责
3.action的type在整个应用中唯一
export default (state=defaultState,action) => { 纯函数中不能有不固定的值
    //通过比较action.type 对应的处理逻辑
    if(action.type === 'add_ddd'){
        const newState = JSON.parse(JSON.stringify(state)); //深cody复制一份新的state
        newState.xxx = action.payload;
        return newState;
    }
    //初始时会走下面,如果有action派送,则进入if语句 返回newState
    return state;
}
## 2.补充说明及优化
整个应用只有一个store
为了方便管理action的创建和类型 可以新增两个文件actionTypes.js 和 actionCreator.js
一个负责定义action的类型
一个负责创建action
**'./store/actionTypes.js'**
export const CHANGE_VALUE = 'change_value';
**'./store/actionCreator.js'**
import { CHANGE_VALUE } from './actionTypes.js';
export const changeValueAction = (payload) =>{
    return {
        type: CHANGE_VALUE,
        payload
    }
}
**组件下index.js**
import { changeValueAction } from './store/actionCreator.js';
handleChange = (e) =>{
    const action = changeValueAction(e.target.value);
    store.dispatch(action);
}
## 3.UI组件和容器组件
以上的组件下index.js可以拆分为 UI组件(显示界面) 和 容器组件(负责处理逻辑)
**UI组件**
//如果只有一个render 也成为无状态UI组件
import React,{ Component } from 'react';
//1.写法1
class AppUI extends Component{
    render(){
        return(
            <div value={this.props.value}></div>
        )
    }
}
export default AppUI;
//2.写法2 无状态UI组件可以不继承 Component ,直接就是一个函数返回一个UI组件
const APPUI = (props) =>{ //props相当于 继承Component的组件的this.props
    return( //直接return即可,因为APPUI本身就是一个方法,再加上一个render不需要
        <div value={props.value}></div>
    )
}
export default AppUI;
## 4.redux-thunk中间件的使用
npm install redux-thunk --save
如若不使用redux-thunk,dispatch(action)只能接收action的类型为对象,
redux-thunk中间件可以加强dispatch,使其接收一个函数,进而处理异步操作,如ajax请求
**store/index.js**
import { createStore,applyMiddleware  } from 'redux'; //创建一个 store 用来存储公共数据
import thunk from 'redux-thunk';
import reducer from './store/reducer.js';
//createStore函数中添加处理异步action的中间件,否则只支持dispatch(对象) 如下
const store = createStore(reducer,applyMiddleware(thunk)); 
**组件的index.js**
-------old---------->
componentDidMount(){ //此时不需要使用中间件,因为dispatch接收的是对象
    axios
    .get('http://127.0.0.1:3001')
    .then((data)=>{
        const action = loadInitDataAction(data.data)
        store.dispatch(action)
    })
    .catch((err)=>{
        console.log(err)
    })
}
-------new---------->
componentDidMount(){ //此时需要使用中间件,使得dispatch可以接收一个函数
    const action = getInitDataAction();  //此时action是一个函数 ()=>{},把这个函数再dispatch() 传给store
    store.dispatch(action); //此时store.dispatch()接收了一个函数作为参数,store接收之后不能直接给reducer去处理
    //在这里dispatch接受了一个函数，实际上store只能接受一个对象,这时store会自动执行下这个action函数
}
**./store/actionCreator.js**
-------old---------->
export const loadInitDataAction = (payload) =>{ //此时不需要使用中间件
    return {
        type: INIT_DATA,
        payload
    }
}
-------new---------->
const loadInitDataAction = (payload) =>{ 
    return{
        type: INIT_DATA,
        payload
    }
}
export const getInitDataAction = () =>{
    return (dispatch) =>{ //**至于dispatch是如何传进来的,还不清楚**
        axios
        .get('https://127.0.0.1.30001')
        .then((data)=>{ 
            //在这里异步请求到数据之后,才是真正创建action派送给store,store再转交给reducer进行处理从而返回结果
            //本质为异步操作至少要送出两个Action：
            //1.用户触发第一个Action,这个跟同步操作一样,没有问题(第一个action主要是获取数据)
            //2.如何才能在操作结束时,系统自动送出第二个Action呢？(第二个action才是把数据派送给store,store再传给reducer,         reducer处理之后再返回给store)
            const action = loadInitDataAction(data.data)
            dispatch(action)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}