//store里面的state需要有一个初始值
const defaultState = {
    value:"1234",
    list:['aaa11','bbb22']
}

//reducer 是一个 函数
export default (state=defaultState,action) => { //ES6语法 初始化时如果有state则为state，如果没有则为defaultState
    console.log('action::',action)
    //在reducer里面接收到了组件里改变的值(组件通过store的dispatch方法发送一个action给store，store再转交于此)
    //于是，我们可以在reducer里面做逻辑处理
    //先比较aciton，再把旧值深copy一份，然后return出去
    if(action.type == 'CHANGE_VALUE'){
        //深copy，将修改前的state深copy一份
        const newState = JSON.parse(JSON.stringify(state));
        //将新的value值赋给新的state的value值
        newState.value = action.payload;
        //此处return出去的newState值 会作为最终return出去的state值，不太理解
        return newState; 
    }
    if(action.type == 'ADD_ITEM'){
        const newState = JSON.parse(JSON.stringify(state));
        //此时把state里面的value赋给 新增的list，因为点击新增前已经改变了输入框的值
        //newState.list = state.value; //错误的写法 应该用push 把输入框的数据 push到新数组里
        newState.list.push(state.value)
        newState.value = ''
        return newState;
    }
    if(action.type == 'DELETE_ITEM'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.payload,1);
        return newState;
    }



    //return 出去之后 仅仅是reducer做了逻辑处理，新值返回出去了，但是还需要组件再去用store上边的方法订阅一下，
    //即当公共数据在使用的组件里变化了，reducer处理完毕，把新值返回给组件
    return state;
}