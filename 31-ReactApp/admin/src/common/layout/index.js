/*
 * @Author: niumengfei
 * @Date: 2020-01-20 17:09:41
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-05-25 16:19:50
 * @Description: file content
 * @FilePath: \MyTools\31-ReactApp\admin\src\common\layout\index.js
 */ 
import React,{ Component } from 'react';
import { Layout } from 'antd';
import './index.less';
//引入公共组件
import MyHeader from 'common/header';
import MySider from 'common/sider';
const { Content } = Layout;

class MyLayout extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
        console.info('SideMenu-constructor...',this.state,this.props)
    }
    componentDidMount(){
        console.info('SideMenu-componentDidMount...',this.state,this.props)
    }
    
    componentWillReceiveProps(nextProps){
        console.info('SideMenu-componentWillReceiveProps...',this.state,this.props)
    }
    gettoggle = (collapsed) =>{
        this.setState({
            collapsed
        })
    }
    render(){
        console.log('this.props.children...',this.props.children)
        console.info('render...',this.state,this.props)
        return (
            <div className="Layout">
                <Layout>
                    <MySider 
                        collapsed={this.state.collapsed}
                    />
                    <Layout>
                        <MyHeader 
                            gettoggle={this.gettoggle}
                        />
                        <Layout>
                            <Content
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    background: '#fff',
                                    minHeight: 280,
                                }}
                            >
                               {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default MyLayout;