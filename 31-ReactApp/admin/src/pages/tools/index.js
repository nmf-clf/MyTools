import React,{ Component } from 'react';
import { Input, Button, List } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import axios from 'axios';
//引入组件
import MyLayout from 'common/layout';
import './index.less';

class Tools extends Component{
    constructor(props){
        super(props);
        console.log('this指向::',this,props)
        this.state= {

        }
        this.obj1 = {
            'A':'嘿嘿',
            'B':'哈哈'
        }
        Object.keys(this.obj1).map((item,index)=>{
            console.log("item??::",item,this.obj1[item])
            return <p>1</p>
        })
        console.log('props::',this.props)
    }
    componentDidMount(){
        this.props.getInitData()
    }
    demo1(){

    }
    static demo2(){

    }
    render(){
        console.log('this指向2::',this)
        return(
            <div className='myComponents'>
                <MyLayout>
                    <Input style={{width:'200px'}} 
                        value={this.props.value} 
                        onChange={(e)=>{
                            e.persist() //持久化
                            console.log('eeee',e,e.target.value)
                            this.props.handleChange(e.target.value)
                        }}
                    />
                    <Button type="primary" onClick={this.props.handleAdd}>新增</Button>
                    <List
                        style={{width:'200px'}}
                        bordered
                        dataSource={this.props.list}
                        renderItem={(item,index) => (
                            <List.Item onClick={()=>{
                                this.props.handleDelete(index)
                            }}>
                            {item}
                            </List.Item>
                        )}
                    />
                </MyLayout>
            </div>
        )
    }
    // handleChange = (e) =>{
    //     console.log('ee22222::',e,e.target.value)
    // }
}
console.log('NMF2::',actionCreator,actionCreator.getInitDataAction())
//1.store里面的state映射到组件的props上
const mapStateToProps = (state) =>{
    console.log('嘿嘿嘿state::',state,state.get('tools').value)
    return{
        value:state.get('tools').get('value'),
        list:state.get('tools').get('list')
    }
}
//2.把方法映射到组件的props上
const mapDispatchToProps = (dispatch) =>{
    return{
        handleChange:(e)=>{
            console.log('e22222',e)
            const action = actionCreator.changeValueAction(e)
            dispatch(action)
        },
        handleAdd:()=>{
            console.log('sssssssssssssss')
            const action = actionCreator.addListAction()
            dispatch(action)
        },
        handleDelete:(index)=>{
            const action = actionCreator.deleteItemAction(index);
            dispatch(action)
        },
        getInitData:()=>{
            // const action = (dispatch2) =>{
            //     axios
            //     .get('http://127.0.0.1:3005/api/getData')
            //     .then((res)=>{
            //         console.log('demo-res::',res)
            //         const action2 = {
            //             type: 'tools/get_init_data',
            //             payload: res.data
            //         }
            //         dispatch2(action2)
            //         //store.dispatch(action)
            //     })
            //     .catch((err)=>{
            //         console.log('error::',err)
            //     })
            // }
            // dispatch(action)
            const action = actionCreator.getInitDataAction();
            dispatch(action)
        }
    } 
}
console.log('action???',mapDispatchToProps())

//connect 是让 指定的组件 和 store 联系起来(相当于最下面的,只是把函数剥离了出来)
//connect接收2个参数后返回的又是一个函数(方法)
//也就是说 把子组件APP传入到了 connect方法的返回值里 UI组件就变成了容器组件 进而就可以处理数据、处理逻辑
//export default Tools;
export default connect(mapStateToProps,mapDispatchToProps)(Tools);
// export default connect(
//     (state)=>{
//         return{
//             value:state.value
//         }
//     },
//     (dispatch)=>{}
// )(Tools);