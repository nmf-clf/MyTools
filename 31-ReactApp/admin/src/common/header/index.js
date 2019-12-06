import React,{ Component } from 'react';
import { Layout, Icon } from 'antd';
import './index.less';

const { Header } = Layout;

class MyHeader extends Component{
  constructor(pros){
    super(pros)
    this.state = {
      collapsed: false
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    },()=>{
        this.props.gettoggle(this.state.collapsed)
    });
  };
  render(){
    return (
      <div className="Header">
        <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
            />
        </Header>
      </div>
    );
  }
}

export default MyHeader;