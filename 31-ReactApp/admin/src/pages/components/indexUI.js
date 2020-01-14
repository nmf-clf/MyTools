import React,{ Component } from 'react';
import { Input, Button, List } from 'antd';

class ComponentsUI extends Component{
    render(){
        const { value,list } = this.props;
        return(
            <div>
                <Input style={{width:'200px'}} onChange={this.props.handleChange} value={value}/>
                <Button type="primary" style={{}} onClick={this.props.handleAdd}>新增</Button>
                <List
                    style={{width:'200px'}}
                    //header={<div>Header</div>}
                    //footer={<div>Footer</div>}
                    bordered
                    dataSource={list}
                    renderItem={(item,index) => (
                        <List.Item onClick={()=>{
                            this.props.handleDelete(index)
                        }}>
                        {item}
                        </List.Item>
                    )}
                />
            </div>
        )
    }
} 

export default ComponentsUI;
