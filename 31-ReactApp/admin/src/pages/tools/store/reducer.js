import { fromJS } from 'immutable';
import * as types from './actionType.js';

const defaultState = fromJS({
    value:'',
    list:[]
})

export default (state=defaultState,action) => { //ES6语法 初始化时如果有state传state,如果没有state传defaultState
    console.log('tools-action::',action)
     //获取初始化数据
     if(action.type === types.GET_INIT_DATA){
        console.log('666666::',state,action.payload)
        return state.merge({
            'value': action.payload.value,
            'list': action.payload.list
        })
        /* const newState = JSON.parse(JSON.stringify(state))
        newState.list = action.payload.list;
        newState.value = action.payload.value;
        return newState; */
    }
    if(action.type === types.CHANGE_VALUE){
        return state.set('value',action.payload)
        /* //深copy，将修改前的state深copy一份 ,object转json  json再转object
        const newState = JSON.parse(JSON.stringify(state))
        //将新的value值赋给新的state的value值
        //此处return出去的newState值 会作为最终return出去的state值
        newState.value = action.payload;
        return newState; */
    }
    if(action.type === types.ADD_LIST){
        const newList = [...state.get('list',action.payload),state.get('value')]
        return state.merge({
            value:'',
            list:newList
        });
        /* const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(state.value)
        newState.value = ''
        console.log('components-newState::',newState)
        return newState; */
    }
    if(action.type === types.DELETE_ITEM){
        const newList = [...state.get('list')];
		newList.splice(action.payload,1);
		return state.set('list',newList);
        /* const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.payload,1)
        return newState; */
    }
    console.log('components-state::',state)
    //如果没有触发action 则返回默认值 否则进入if语句 返回newState 作为state值 给store 最终渲染到页面
    return state;
}