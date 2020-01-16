import * as types from './actionType.js';
import axios from 'axios';
//import store from './index';
export const changeValueAction  = (payload) =>{
    return {
        type: types.CHANGE_VALUE,
        payload
    }
}
export const addListAction  = () =>{
    return {
        type: types.ADD_LIST
    }
}
export const deleteItemAction  = (payload) =>{
    return {
        type: types.DELETE_ITEM,
        payload
    }
}
export const createGetInitDataAction = (payload) =>{
    return {
        type: types.GET_INIT_DATA,
        payload
    }
}
export const getInitDataAction = () =>{
    console.log('111111')
    return (dispatch) =>{
        axios
        .get('http://127.0.0.1:3005/api/getData')
        .then((res)=>{
            console.log('demo-res::',res)
            const action = createGetInitDataAction(res.data)
            dispatch(action)
            //store.dispatch(action)
        })
        .catch((err)=>{
            console.log('error::',err)
        })
    }
}