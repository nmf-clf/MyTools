import React,{ Component } from 'react';
import { Input, Button, List } from 'antd';

import './index.less';
import store from './store';
//引入组件
import MyLayout from 'common/layout';


class Category extends Component{
  constructor(props){
    super(props)
    /* this.state = {
      value:'xxxxxxx'
    } */
    //利用store上的getState函数获取到公共数据的初始值/默认值
    this.state = store.getState();
    console.log("store::",store)
    //在构造函数里开启订阅通知 subscribe函数接收一个函数
    //最简单的方法就是在订阅函数的接收的函数里面去setState值,获取到的就是最新的值
    store.subscribe(()=>{
      this.setState(store.getState())
    })
  }
  componentDidMount(){
    console.log("Category::",this.props.location)
  }
  handleChange = (e) => {
    console.log('打印的e::',e.target.value)
    const action = {
      type:'CHANGE_VALUE',
      payload:e.target.value
    }
    //利用store上的dispatch方法 将封装好的action发送给store，store再转交给reducer
    store.dispatch(action);
  }
  handleAdd = () => {
    const action = {
      type:'ADD_ITEM'
    }
    store.dispatch(action)
  }
  handleDelete = (index) => {
    console.log('嘿嘿::',this,index)
    const action = {
      type:'DELETE_ITEM',
      payload:index
    }
    store.dispatch(action)
  }
  render(){
    const btn1 = (<Button type="primary" onClick={this.handleAdd}>增加</Button>)
    return (
      <div className="Category">
          <MyLayout>
            <Input 
              placeholder="Basic usage" 
              style={{'width':'300px'}}
              value={this.state.value}
              onChange={this.handleChange}
              addonAfter={btn1}
            />
            <Button type="primary" onClick={this.handleAdd}>增加</Button>
            <List
              style={{'width':'300px','marginTop':'10px'}}
              bordered
              dataSource={this.state.list}
              renderItem={(item,index) => ( //不明白为何不能使用箭头函数
                <List.Item onClick={this.handleDelete.bind(this,index)}>
                  {item}
                </List.Item>
              )}
            />
          </MyLayout>
      </div>
    );
  }
}

export default Category;