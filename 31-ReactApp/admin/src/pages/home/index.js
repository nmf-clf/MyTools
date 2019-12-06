import React,{ Component } from 'react';
import { Card } from 'antd';

import './index.less';
//引入组件
import MyLayout from 'common/layout';

class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      usernum:200,
      ordernum:201,
      productnum:202
    }
  }
  componentDidMount(){
    console.log("Home::",this.props.location)
  }
  render(){
    return (
      <div className="Home">
          <MyLayout>
            <Card title="用户数" extra={<a href="#">More</a>} style={{ width: 300 }}>
              <p>{this.state.usernum}</p>
            </Card>
            <Card title="订单数" extra={<a href="#">More</a>} style={{ width: 300 }}>
              <p>{this.state.ordernum}</p>
            </Card>
            <Card title="商品数" extra={<a href="#">More</a>} style={{ width: 300 }}>
              <p>{this.state.productnum}</p>
            </Card>
          </MyLayout>
      </div>
    );
  }
}

export default Home;