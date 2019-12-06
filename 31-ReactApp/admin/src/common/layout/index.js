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
    }
    gettoggle = (collapsed) =>{
        this.setState({
            collapsed
        })
    }
    render(){
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