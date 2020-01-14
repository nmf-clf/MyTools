import { CHANGE_VALUE, ADD_LIST, DELETE_ITEM, GET_INIT_DATA } from './actionType';
import axios from 'axios';
//import store from './index';
export const changeValueAction  = (payload) =>{
    return {
        type: CHANGE_VALUE,
        payload
    }
}
export const addListAction  = () =>{
    return {
        type: ADD_LIST
    }
}
export const deleteItemAction  = (payload) =>{
    return {
        type: DELETE_ITEM,
        payload
    }
}
export const getInitDataAction2 = (payload) =>{
    return {
        type: GET_INIT_DATA,
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
            const action = getInitDataAction2(res.data)
            dispatch(action)
            //store.dispatch(action)
        })
        .catch((err)=>{
            console.log('error::',err)
        })
    }
}