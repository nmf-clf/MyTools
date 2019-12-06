import React,{ Component } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

import './index.less';
//引入组件
import MyLayout from 'common/layout';
import PlanTable from './planTable';

//父组件
class Product extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  componentDidMount(){
    console.log("Product::",this.props.location)
  }
  getReadyData = (values) =>{
    console.log('getReadyData',values)
    const planData = this.renderPlanTable.getData();
    console.log("planData::",planData)
  }
 
  render(){
    return (
      <div className="Product">
          <MyLayout>
            <PlanTable 
              intl={this.props.intl}
              //form={this.props.form}
              ref={(ref => this.renderPlanTable = ref)}
            />
            <Button
              onClick={()=>{
                this.props.form.validateFields((errors, values) => {
                  console.log('values::',values)
                  this.getReadyData(values)
                })
              }}
            >获取数据</Button>
          </MyLayout>
      </div>
    );
  }
}

export default Form.create()(Product);