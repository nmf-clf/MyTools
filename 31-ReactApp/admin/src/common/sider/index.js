import React,{ Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.less';

const { Sider } = Layout;

class MySider extends Component{
    constructor(pros){
        super(pros)
        this.state = {
            //selectedKeys:'1'
        }
    }
    componentDidMount(){
        console.log("MySider::",this.props.location)
    }
    render(){
        const { selectedKeys } = this.state;
        console.log(333,selectedKeys)
        return (
            <div className="Sider">
                <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline"  
                        //selectedKeys={[selectedKeys]} 
                        onSelect={(selectedKeys)=>{
                            console.log(111,selectedKeys)
                            this.setState({
                                selectedKeys:selectedKeys.key
                            })
                            console.log(222,selectedKeys)
                        }}
                    >
                        <Menu.Item key="1">
                            <NavLink exact to="/">
                                <Icon type="user" />
                                <span>首页</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to="/user">
                                <Icon type="video-camera" />
                                <span>用户列表</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to="/category">
                                <Icon type="upload" />
                                <span>分类管理</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink to="/product">
                                <Icon type="upload" />
                                <span>商品管理</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <NavLink to="/order">
                                <Icon type="upload" />
                                <span>订单管理</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <NavLink to="/permission">
                                <Icon type="upload" />
                                <span>权限设置</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <NavLink to="/tools">
                                <Icon type="upload" />
                                <span>系统工具</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <NavLink to="/components">
                                <Icon type="upload" />
                                <span>组件管理</span>
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        );
    }
}

export default MySider;