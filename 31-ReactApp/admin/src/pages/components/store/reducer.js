const defaultState = {
    value:'demo',
    list:[]
}

export default (state=defaultState,action) => { //ES6语法 初始化时如果有state传state,如果没有state传defaultState
    console.log('components-action::',action)
    if(action.type === 'CHANGE_VALUE'){
        //深copy，将修改前的state深copy一份 ,object转json  json再转object
        const newState = JSON.parse(JSON.stringify(state))
        //将新的value值赋给新的state的value值
        //此处return出去的newState值 会作为最终return出去的state值
        newState.value = action.payload;
        return newState;
    }
    if(action.type === 'ADD_LIST'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(state.value)
        newState.value = ''
        console.log('components-newState::',newState)
        return newState;
    }
    if(action.type === 'Delete_Item'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.payload,1)
        return newState;
    }
    console.log('components-state::',state)
    //如果没有触发action 则返回默认值 否则进入if语句 返回newState 作为state值 给store 最终渲染到页面
    return state;
}