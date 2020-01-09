import React,{ Component } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

import './index.less';
//引入组件
import MyLayout from 'common/layout';
import EditableTable from './renderTable';

class Order extends Component{
  constructor(props){
    super(props)
    this.state = {
      dataSource:[
        {
          key: '1',
          name: '1111',
          age: 11,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '2222',
          age: 22,
          address: '西湖区湖底公园1号',
        },
        {
          key: '3',
          name: '3333',
          age: 33,
          address: '西湖区湖底公园1号',
        },
        {
          key: '4',
          name: '4444',
          age: 44,
          address: '西湖区湖底公园1号',
        }
      ]
    }
  }
  getColumns = () =>{
    const _this = this;
    return [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        dataIndex:'operation',
        key:'operation',
        render:(text,record,index)=>{
          console.log('record::',text,record,index)
          return <div>
              <a onClick={()=>{
                this.deleteTable(record,index)
              }}>删除</a>
          </div>
        }
      }
    ]
  }
  componentDidMount(){
    console.log("Order::",this.props.location)
  }

  getReadyData = (values) =>{
    console.log('getReadyData',values)
    const planData = this.renderPlanTable.getData();
    console.log("planData::",planData)
  }
  deleteTable = (record,index) =>{
    const { dataSource } = this.state;
    //console.log(11111,record,index)
    //console.log('key===::',record.key)
    //dataSource.splice(index,1)
    //console.log('splice后数据::',dataSource)
    //const newDataSource = dataSource.splice(index,1)
    //console.log("newDataSource::",newDataSource)
    const newDataSource = this.state.dataSource.filter(item => item.key !== record.key);
    this.setState({
      dataSource: newDataSource
    },()=>{
      console.log("删除后的数据::",dataSource)
      this.forceUpdate()
    })
  }
  // deleteTable(){
  //   console.log(2222)
  // }
  render(){
    const { dataSource } = this.state;
    return (
      <div className="Order">
          <MyLayout>
            <Button
                onClick={()=>{
                  this.props.form.validateFields((errors, values) => {
                    console.log('values::',values)
                    this.getReadyData(values)
                  })
                }}
              >获取数据</Button>
            <EditableTable 
              intl={this.props.intl}
              //form={this.props.form}
              ref={(ref => this.renderPlanTable = ref)}
            />
            <Table 
              dataSource={dataSource}
              columns={this.getColumns()}
              pagination={false}
            />
          </MyLayout>
      </div>
    );
  }
}

export default Form.create()(Order);