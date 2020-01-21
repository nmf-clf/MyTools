### 使用react所需的依赖包
* 1. 
    安装：npm install react react-dom --save
    导入：import React,{ Component } from 'react'; //具体的组件内使用
        import React from 'react'; //scr/index.js入口文件处使用 
        import ReactDOM from 'react-dom'; //src/index.js入口文件处使用,用来渲染虚拟DOM为真实的DOM节点
    *说明:react是react的核心代码。react的核心思想是虚拟Dom，其实虚拟Dom改变没有那么复杂，简单而言就是一个js的对象来表达一个dom包含的东西*
    *class APP extends Component{} 等价于 class APP extends React.Component{},显而易见,react包保函了生成虚拟dom的函数react.createElement，以及Component这个类，我们自己写的类需要继承这个类，主要是继承一些react的高级方法，而包react-dom的核心功能就是把这些虚拟Dom渲染到文档中变成实际dom，当然了除了渲染这个功能之外还有一些其他的方法，这里就不多说了。*
    *具体的自定义的组件内需要使用Component这个类，而入口文件里只需要使用react包的React，和react-dom包上的ReactDOM方法，在入口处把整个系统应用的组件全部渲染为真实的DOM节点*
    例-@1:
    {
        "tagName": "div",
        "attrs": {
            "styles": {
                "fontSize": "20px"
            }
        },
        "children": [
            {
                "tagName": "span",
                "children": ["hello,world"]
            }
        ]
    }
    *例如:@1就表达了一个div标签里面有一个span标签，标签里面是个文本节点，文字内容就是’hello,world‘*
* 2.  
    安装：npm install react-router-dom --save
    导入：import {
        BrowserRouter as Router,
        Route,
        Link,
        Switch,
        Redirect
    } from 'react-router-dom'; //react路由

* 3. 
    安装：npm install antd --save; 
    导入：import { Button,Input } from 'antd'; //antd组件库

### 使用redux所需的依赖包
* 1.
    安装：npm install redux --save
    导入：import { createStore,applyMiddleware } from 'redux'; 
    //createStore方法创建一个store,用来存储公共数据,const store = createStore(reducer,applyMiddleware(thunk));
    //applyMiddleware方法用来接收各种中间件作为参数,解决一些开发中的问题,提高开发效率
* 2.
    安装：npm install redux-thunk --save
    导入：import thunk from 'react-thunk; //引入redux-thunk中间件用来使store的dispatch可以接收一个函数action
    //redux-thunk用来处理异步请求的中间件,先发送函数action请求数据，其次在数据获取成功后再派送aciton,reducer去处理
* 3.
    安装：npm install redux-logger --save 
    导入：import { createLogger } from 'redux-logger';
    const middleware = [thunk];
    if(xxxx){
        const logger = createLogger({});
        middleware.push(logger)
    }
    const store = createStore(reducer,applyMiddleware(...middleware))

### 使用react-redux所需的依赖包
* 1. 
    安装：npm install react-redux --save
    导入：import { Provider } from 'react-redux'; //在入口处包裹组件，为组件和store建立连接做准备
        import { connect } from 'react-redux;
    'src/index.js'--在入口处使用
    ReactDom.render(
        <Provider> //用react-redux包里的Provider包裹App组件 把store的store的state及方法注入到App所有的子组件上
            <App />
        </Provider>,
        document.getElementById('root')
    )
    'src/pages/tools/index.js'--在组件内使用
    import { connect } from 'react-redux'; //用这个方法可以使组件和store建立连接
    export default connect(null,null)(Tools);
    
    导入：import { combineReducer } from 'redux'; //合并reducer时会用到redux包的combineReducer方法
    import { reducer as toolsReducer } from 'pages/src/tools/store; //起一个别名
    export default combineReducer({
        tools:toolsReducer
    })
### 使用immutable数据类型所需的依赖包(非必需)
* 1.
    安装：npm install immutable --save;
    导入：import { fromJS } from 'immutable'; //使用immutable包的fromJS方法使得store里的state为immutable数据类型
    'src/pages/tools/store/reducer.js'
    import { fromJS } from 'immutable';
    const defaultState = fromJS({
        'value': '123',
        'list': ['1','2','3']
    })
* 2.
    安装：npm install redux-immutable --save;
    导入：import { combineReducer } from 'redux-immutable';
    'src/store/reducer.js'
    import { combineReducer } from 'redux-immutable'; //如果不使用immutable数据类型,就不想要修改这个包名
    //此时引入redux-immutable包的combineReducer方法作用到各个组件的reducer都是immutable数据类型,这个方法和redux的combineReducer的方法同名,因而只需要修改包名
     

 

