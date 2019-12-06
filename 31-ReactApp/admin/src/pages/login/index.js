import React,{ Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less';

class NormalLoginForm extends Component{
    constructor(pros){
        super(pros)
        this.state = {
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h3 className="title">Fairy Tail</h3>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住我</Checkbox>)}
                            <a className="login-form-forgot" href="">
                            忘记密码?
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                            {/* <div style={{float:'right'}}> Or <a href="" > 注册</a></div> */}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;