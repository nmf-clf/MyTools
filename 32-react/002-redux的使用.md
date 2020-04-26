# redux流程:
    1.Component(组件)：想要改变公共数据的state或者状态,只能通过dispatch派发action把type(类型)和payload(将要改变的值)传给store;
    (dispatch方法是store上的API)
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
*npm install redux-thunk --save*
如若不使用redux-thunk,dispatch(action)只能接收action的类型为对象,
redux-thunk中间件可以加强dispatch,使其接收一个函数,进而处理异步操作,如ajax请求
实质上是对dispatch方法的一个封装。之前action是一个对象，现在action可以是一个函数，
如果传递过来的是一个对象，dispatch会将这个对象直接传给store。但是如果传过来一个函数，它会让函数先执行，执行完，需要调用store才会去调用。dispatch会根据不同的参数执行不同的事情
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
    **类似于 store.dispatch((dispatch)=>{}) 会把store.dispatch自身传进去**
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
    return (dispatch) =>{ //**dispatch是如何传进来的**
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
## 5.redux-logger中间件的使用
*npm i --save redux-logger*
import { createStore,applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
const middleware = [thunk];
if(process.env. != 'production'){
    const logger =NODE_ENV createLogger({
        // ...options
    });
    middleware.push(logger)
}
const store = createStore(reducer,applyMiddleware(...middleware));
## 6.react-redux使用
*npm install react-redux --save*
任何框架都有可能用到redux思想
react-redux:将公共数据store 传入Provider包裹的最外层组件 进而使得Provider下的所有子组件都可以使用store的数据
如何使用 需要 用到 react-redux 里的 connect 建立子组件和大store
**入口文件index.js**
用Provider 包裹 写入store={store}
import { Provider } from 'react-redux';
import store from './store/index.js'
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
2.子组件APP和store建立连接 
import { connect } from 'react-redux';
//connect 是让 指定的组件 和 store 联系起来
export default connect(mapStateToProps,mapDispatchToProps)(APP); //connect接收2个参数后返回的又是一个函数(方法)
//这个函数又接收一个参数 就是APP组件 
//也就是说 把子组件APP传入到了 connect方法的返回值里 UI组件就变成了容器组件 进而就可以处理数据、处理逻辑
**如何变成容器组件-connect的使用**
mapStateToProps和mapDispatchToProps都只能返回一个对象
//1.store里面的state映射到组件的props上
const mapStateToProps = (state) =>{
    return{
        value: state.value 
    }
}
//2.把方法映射到组件的props上
const mapDispatchToProps = (dispatch) =>{
    return{
        handleChange:(e)=>{
            const action = changeValueAction();
            dispatch(action);
        }
    }
}
//connect会把根store的state和dispatch方法作为两个函数参数的入参;
//connect() 的返回值 依旧是 一个方法， 因此可以将APP作为入参 目的是 包裹子组件 如:connect(null.null)(APP),从而
使得connect的两个函数参数的返回值分别传给包裹的子组件的APP上的props;
export default connect((state)=>{return{}},(dispatch)=>{return{}})(APP); 
## 7.合并Reducer及优化
**根store/reducer.js**
import { combineReducers } from 'redux';

import { reducer as toolsReducer } from 'pages/tools/store';

export default combineReducers({
    tools:toolsReducer
})
**组件index.js**
const mapStateToProps = (state) =>{
    return{
        value: state.tools.value 
    }
}

## 8.总结 ##
# 8.1-全局观(入口文件/根组件App/根store/合并reducer)#
**1----src/index.js**
    *首先:入口文件src/index.js文件渲染根组件,根组件引入子组件，从而达到从入口文件渲染到整个系统的所有组件的目的*
    *其次:为了使用react-redux,需要使用react-redux依赖包的<Provider />组件*
    *使用<Provider />组件 包裹<APP />组件,目的如下*
*demo↓*
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
ReactDOM.render(
    <Provider store={store}> *使用Provider组件可以把store上的数据传到App组装件*
        <App />
    </Provider>,
    document.getElementById('root'));
**2----src/APP.js** 
    *项目入口文件渲染的根组件,里面有N个子组件及其对应的路由*
    *入口文件先进入这个文件,然后紧接着渲染<App />组件*
    *至于store的作用在下面详细阐述*
*demo↓*
import React,{ Component } from 'react';
import { BrowserRouter as Router,Route,Link,Switch,Redirect } from 'react-router-dom';
import './App.less';
//引入组件
import Home from 'pages/home';
import Tools from 'pages/tools';
class App extends Component{
  render(){
    return (
        <Router forceRefresh={false}> //Router里面只能有一个子元素
            <div className="App">
                <Switch>
                    <Route exact path="/" component={ Home } />	
                    <Route path="/tools" component={ Tools } />
                </Switch>	
            </div>	
        </Router>
    );
  }
}
export default App;
**3----src/store** 
    *使用react-redux的目的是复杂应用项目公共数据共通*
    *将公共数据都存储在一个store下,最终使所有子组件可以使用props接收公共数据*
    *3.1--src/store/index.js* 
        *store是整个项目的公共数据"仓库 "*
        *第一步:引入createStore方法/首先要引入ruedx依赖包上的{createStore}方法,用来创建一个store,存储公共数据*
        *第二步:创建store/const store = CreateStore(reducer),此时需要把reducer传入*
        *说明1:createStore(参数1,参数2)方法接收的第一个参数必须是reducer,第二个参数为中间件*
        *说明2:其中reducer是负责处理组件向store发送action后的逻辑*
        *reducer是一个纯函数,接收两个参数,参数1state和参数2action*
        *因为store必须有一个初始值,所以参数1写为(state=defaultState,action)*
        *这个defaultState虽然写在reducer文件里,但是它是在reducer纯函数之外定义的,因此它依旧属于store*
        *此时可以理解createStore(reducer,中间件),第一个参数把reducer纯函数引入的同时*
        *createStore方法就已经把接收的action和defaultState都传给了reducer*
        *最终reducer根据store传给它的action去判断相应的逻辑*
        *因此reducer只需要被引入,同时由store传参*
        *由于项目复杂,与跟store/index.js 同级的store/reducer.js文件此刻为一个合并后的reducer,在下文解释*
        *store的参数1state初始值由store创建,而参数2action则来源于组件派送的action,在下文详细阐述*
    import { createStore,applyMiddleware } from 'redux'; //创建一个 store 用来存储公共数据
    import thunk from 'redux-thunk'; //redux-thunk中间件 可以支持store.dispatch()接收函数action
    import { createLogger } from 'redux-logger';//redux-logger中间件 可以实时监控触发action时action的变化及其携带的信息
    import reducer from './reducer.js'; //reducer是一个纯函数
    const middleware = [thunk];
    if(process.env.NODE_ENV != 'production'){
        const logger = createLogger({})
        middleware.push(logger)
    }
    const store = createStore(reducer,applyMiddleware(...middleware)); //生成的store是一个对象,上边有许多API
    export default store; //因此 导出去的也是一个对象,上边有一些API,进而让组件使用store上的方法派送,订阅,更新等
    *3.2--src/store/reducer.js*
        *由于复杂应用项目的子组件有N个,而每个组件的reducer仅仅对应当前组件需要处理的逻辑*
        *因而需要一个方法去把所有子组件的reducer合并在一起,再转交给store*
        *每个具体的reducer及其处理逻辑依旧在具体的组件下的store/reducer.js文件下*
        *每个具体的reducer会被导入到此时这个总的reducer里面进行合并*
        *合并后为一个对象单独导出,store去接收,接收后再由createStore()方法把action传给reducer*
        *因而本质上store不会去使用reducer,只是把reducer纯函数导入,将store接收的action转交给reducer去处理*
    import { combineReducers } from 'redux';
    import { reducer as toolsReducer }  from 'pages/tools/store';
    export default combineReducers({
        tools:toolsReducer
    })
    *总结:合并后的reducer相当于哪个具体的reducer里面有数据就在state对象下面加了一个属性*
    *例如:把tools的reducer合并后，整个Store里面的state对象{}下面就会有一个属性state{tool:{}}*
# 8.2.局部观/子组件篇(组件index.js/store目录(index.js/actionCreactor.js/actionType.js/reducer.js)) #
**1----index.js(组件)**
    *组件(index.js)是子组件:获取公共数据渲染界面/发送action改变数据再次渲染界面*
    *由于使用了react-redux,子组件需要从store里面拿数据,通过connect()方法*
    *详细:使用react-redux依赖包的connect方法包裹子组件*
    *connect(mapStateToprops,mapDispatchToProps)(Tools)方法接收两个参数*
    *connect方法接收2个函数作为参数,同时会把两个函数的返回值state对象和方法对象通过props注入子组件,子组件用props接收*
    *由于connect()的方法也返回一个函数,因此需要connect(Tools)包裹组件等价于把组件传入了connect()返回值函数里*
    *此时connect()方法还可以将Store里的公共数据传给传给它的两个函数参数的入参*
    *注意1:connect()方法的第一个参数默认可以接收store的公共数据state作为mapStateToProps()函数的入参*
    *注意2:connect()方法的第二个参数默认可以接收store的dispatch方法作为mapDispatchToProps()函数的入参*
    *总结1::子组件通过react-redux的connect方法和Store建立连接,渲染界面的时候会通过connect方法拿到公共数据*
    *如何拿到数据,则是通过connect(函数参数1,函数参数2)(组件)这一行*
        *1.把Store的state公共数据对象作为参数传给函数参数1,此时函数参数1的返回值state对象会注入到子组件的props上*
        *2.把Store的dispatch方法作为参数传给函数参数2,此时函数参数2的返回值方法对象也会注入到子组件的props上*
    *同时每一个完整的redux流程都是从子组件触发,如下:子组件通过connect建立连接后拿到store的dispatch方法派送一个action*
    *如何派送action则是接下来需要理解的*
    import { connect } from 'react-redux';
    import { actionCreator } from './store'; //导入创建的action
    class Tools extends Component{
        render(){
            return()
        }
    }
    const mapStateToProps = (state) =>{
        return{
            value:state.tools.value,
        }
    }
    const mapDispatchToProps = (dispatch) =>{
        return{
            handleChange:(e)=>{
                const action = actionCreator.changeValueAction(e)
                dispatch(action)
            }
        } 
    }
    export default connect(mapStateToProps,mapDispatchToProps)(Tools);
    *总结2:子组件会通过props上的方法把nextState值通过创建好的action派送dispatch给Store*
**2----子组件的store/actionCreator.js(创建action)**
    *由于子组件想要改变公共数据的state只能触发action派送给store,store转交给reducer去处理,reducer再把处理后的结果返回给store,store最后传给子组件*
    *因此，此时需要一个actionCreator统一管理action的创建*
    *由于每一个最终转交给reducer的action都是一个对象{}，(主要注意的是函数action是不能直接交由reducer处理的，因为reducer只能处理对象action)，每个action里面都有type作为reducer处理对应逻辑的标识，因此或将action的type通过单独的文件统一管理起来，通常命名为actionType.js与actionCreator同级*
    import * as types from 'actionType.js'; //引入类型
    export const changeValueAction = () =>{
        return {
            type:types.CHANGE_VALUE
        }
    }
    export const addListAction = (payload) =>{
        return {
            type:types.ADD_LIST
            payload
        }
    }
    *总结:actionCreactor.js文件只有导入actionType,有且只有导出给组件index.js使用*
**3----子组件的store/actionType.js(创建action的type)**
    *action的type只需要被引用，因此本文件只需导出即可*
    *注意:为了避免项目足够复杂所引起的type重复,因此建议给定义的type字符串加个'组件名/'作为前缀,如下*
    *另外,此创建action的type的文件属于每个组件内部使用，即子组件触发action时，actionCreator文件内需要创建action时会用到，因而这个文件只会被导入一次*
    *总结:actionType.js文件本身没有导入，只有导出；且只会被当前组件下的store/actionCreactor.js文件导入*
    export const CHANGE_VALUE = 'tools/change_value'
    export const ...........................
**4----子组件的store/reducer.js**
    *每个具体的reducer都是一个纯函数*
    *单个reducer只有被合并的时候用到,合并的目的是为了便于管理，合并后的reducer会作为createStore的第一个参数，而createStore方法会把store从组件接收到的action作为参数传给合并后的reducer，进而等价于传给了合并前的单个reducer*
    *reducer只有接收到store给的action才会去根据相应的aciton.type做逻辑处理,处理完毕会返回给Store处理后的state，Store更新state之后通过组件connect()方法和组件建立了连接,进而把数据传给组件*
**5----子组件的store/index.js**
    *store/index.js文件仅仅是把需要导出的文件导出*
    *即导入reducer给src/store/reducer.js用来合并，导入actionCreator给子组件index.js用来派送action*
    import reducer from './reducer.js';
    import * as actionCreator from './actionCreator.js'
    export { reducer,actionCreator }
## 9.immutable ##
1    *npm install immutable --save*
2    *npm install redux-immutable --save*
    import { fromJS } from 'immutable'; //改变的是store的state数据类型、子组件下的reducer
    fromJS.get('key');
    fromJS.set('key',payload)
    *组件index.js*
    state.tools.get('value');
    *store/reducer.js*
    import { combineReducers } from 'redux-immutable'; //改变的是??
    
## 10.回顾 ##
*   **整个应用只会创建一次store，createStore()也只会绑定一次reducer**
    **关于connect的使用目前见过有两种情况**
    *export default connect(mapStateToProps,mapDispatchToProps)(Tools)*
    *第一种*
    //此时引入的actionCreator是一个Module对象，对象里为所有创建并导出的aciton
    import { actionCreator } from './store/actionCreator.js';
    const mapStateToProps = (state) =>{
        return{
            value:state.tools.value,
            list:state.tools.list
        }
    }
    const mapDispatchToProps = (dispatch) =>{
        return{
            changeValue:(e)=>{
                const action = actionCreator.changeValueAction(e);
                dispatch(action)
            }
        }
    }
    export default connect(mapStateToProps,mapDispatchToProps)(Tools)
    等价于
    export default connect((state)=>{
        return{
            value:state.tools.value
            //此时，由于使用了combineReducer()方法，store的state下就会生成对应的组件对应的reducer
        }
    },(dispatch)=>{
        return{
            changeValue:(e)=>{
                const action = actionCreator.changeValueAction(e);
                dispatch(action);
                //首先会创建一个aciton(action是一个对象)
                //然后通过connect方法派送action给store
                //由于使用了connect()方法，第二个函数参数默认接收store上的dispatch方法作为参数
                //函数参数返回一个对象，因而本质上connect方法的两个参数都是对象，
                //因为connect()方法返回值又是一个函数，因而可以将组件作为参数
                //目的是将connect()方法的两个对象参数state和函数方法传递到组件的props上,如何做到的还不清楚
            }
        }
    })
    *第二种*
    import * as action from './store/actionCreator.js';
    export default connect((state)=>{
        return{
            tools: state.tools.
        }
    },action)(Tools);
    action的本质是 (dispatch)=>{},还是一个函数入参
    等价于
    export default connect(null,(dispatch)=>{
        return (dispatch) =>{
            try(xxx){
                let result = await Network.postNetwork(reqParam.url, reqParam.data);
                if(xxx){

                }
            }
        }
    })
    组件内使用
    this.props.tableData(url,()=>{

    })
    ./store/actionCreator.js内使用
    export const tableData = (reqParam,callBack) =>{
        return{
            try{
                let result = await Network.postNetwork(reqParam.url, reqParam.data);
                if(result )
            }
        }
    }
    *二者的区别::*
    第一种const mapDispatchToProps = (Dispatch) =>{
        return{
            函数名:函数体
        }
    }
    本质上是把返回的函数作为connect(null,mapDispatchToProps)(Tools)方法的参数
    第二种 
    connect(null,action)(Tools)
    本质上这个action就是直接引入的一个函数，返回值是一个函数，因此作为了函数入参,可以接收dispatch方法
    等价于
    connect(null,(dispatch)=>{
        return{
            const action = xxx;
            dispatch(action)
        }
    })
    *connect(null,mapDispatchToProps)方法的实质其实是接收了两个()=>{},接收的是函数本身而不是返回值,而第一种方法mapDispatchToProps是一个函数,作用到函数体内 才会把返回值 包含函数的对象 进行处理 从而把返回值(包含函数方法的对象）一一映射到组件的props上，而第二种方法参数2 action本身就是一堆函数对象，直接就能作用到组件的props上*



