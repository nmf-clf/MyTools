import React,{ Component } from 'react';
import { Input, Button, List } from 'antd';
import store from './store';
//引入组件
import MyLayout from 'common/layout';
import './index.less';

class Components extends Component{
    constructor(props){
        super(props)
        this.state = store.getState()
        console.log('store里的state::',this.state)
        console.log('store~~~::',store)
        store.subscribe(()=>{ this.setState(store.getState()) })
    }
    handleChange = (e) =>{
        console.log('输入框值::',e.target.value)
        const action = {
            type: 'CHANGE_VALUE',
            payload: e.target.value
        }
        store.dispatch(action)
    }
    handleAdd = () =>{
        const action = {
            type:'ADD_LIST'
        }
        store.dispatch(action)
    }
    handleDelete = (index) =>{
        const action = {
            type: 'Delete_Item',
            payload: index
        }
        store.dispatch(action)
    }
    render(){
        const { value, list } = this.state;
        return(
            <div className='myComponents'>
                <MyLayout>
                    <Input style={{width:'200px'}} onChange={this.handleChange} value={value}/>
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
                    />
                </MyLayout>
            </div>
        )
    }
}

export default Components;