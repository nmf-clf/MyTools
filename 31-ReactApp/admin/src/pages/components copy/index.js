import React,{ Component } from 'react';
import store from './store';
import axios from 'axios';
import { changeValueAction,addListAction,deleteItemAction,getInitDataAction } from './store/actionCreator';
//引入组件
import MyLayout from 'common/layout';
import ComponentsUI from './indexUI';
import './index.less';

class Components extends Component{
    constructor(props){
        super(props)
        this.state = store.getState()
        console.log('store里的state::',this.state)
        console.log('store~~~::',store)
        store.subscribe(()=>{ this.setState(store.getState()) })
    }
    componentDidMount(){
        // axios
        // .get('http://127.0.0.1:3005/api/getData')
        // .then((res)=>{
        //     console.log('demo-res::',res)
        //     const action = getInitDataAction(res.data)
        //     store.dispatch(action)
        // })
        // .catch((err)=>{
        //     console.log('error::',err)
        // })
        //getInitDataAction()
        const action = getInitDataAction();
        store.dispatch(action)
        // store.dispatch((dispatch)=>{
        //     console.log('dispatch??????',dispatch)
        // })
    }
    handleChange = (e) =>{
        console.log('输入框值::',e.target.value)
        /* const action = {
            type: CHANGE_VALUE,
            payload: e.target.value
        } */
        const action = changeValueAction(e.target.value)
        //store.dispatch(action)
        store.dispatch((dispatch)=>{
            dispatch(action)
        })
    }
    handleAdd = () =>{
        // const action = {
        //     type: ADD_LIST
        // }
        const action = addListAction()
        store.dispatch(action)
    }
    handleDelete = (index) =>{
        // const action = {
        //     type: DELETE_ITEM,
        //     payload: index
        // }
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
    render(){
        const { value, list } = this.state;
        return(
            <div className='myComponents'>
                <MyLayout>
                    <ComponentsUI 
                        value={value}
                        list={list}
                        handleChange={this.handleChange}
                        handleAdd={this.handleAdd}
                        handleDelete={this.handleDelete}
                    />
                    {/* <Input style={{width:'200px'}} onChange={this.handleChange} value={value}/>
                    <Button type="primary" style={{}} onClick={this.handleAdd}>新增</Button>
                    <List
                        style={{width:'200px'}}
                        //header={<div>Header</div>}
                        //footer={<div>Footer</div>}
                        bordered
                        dataSource={list}
                        renderItem={(item,index) => (
                            <List.Item onClick={()=>{
                                this.handleDelete(index)
                            }}>
                            {item}
                            </List.Item>
                        )}
                    /> */}
                </MyLayout>
            </div>
        )
    }
}

export default Components;