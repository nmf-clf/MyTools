import React,{ Component } from 'react';
import axios from 'axios'; //axios请求

import './index.less';
//引入组件
import MyLayout from 'common/layout';
import TableData from 'common/tabledata';
const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '是否管理员',
    dataIndex: 'isadmin',
    key: 'isadmin',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '手机',
    dataIndex: 'mobliephone',
    key: 'mobliephone',
  },
];
class User extends Component{
  constructor(props){
    super(props)
    this.state = {
      dataSource:[],
      total:103
    }
  }
  getData(page,pageSize){
		const { dataSource } = this.state;
		const length = dataSource.length;
		let newData = []; 
		if( pageSize >= length ){ 
			newData = dataSource;
			page = 1;
		}else{ 
			const num = pageSize * (page - 1);
			if( num < length ){
				const startIndex = num;
				const endIndex = num + pageSize - 1;
				newData = dataSource.filter((_, index) => index >= startIndex && index <= endIndex);
			}else{
				const size = parseInt(length / pageSize);
				const rest = length % pageSize; 
				if (rest > 0) {
					page = size + 1;
					newData = dataSource.filter((_, index) => index >= (pageSize * size) && index <= length);
				}else if( rest === 0 ){ 
					page = size;
					newData = dataSource.filter((_, index) => index >= (pageSize * (size - 1)) && index <= length);
				}
			}
		}
		this.setState({
			ShowData:newData
		},()=>{
      console.log('拿到了吗::',this.state.ShowData)
    })
	}
  componentDidMount(){
    axios
		.get('http://127.0.0.1:3005/api/getData',{
			params:{}
		})
		.then((res)=>{
			this.setState({
				dataSource:res.data
			},()=>{
				this.getData(1,5)
			})
		})
		.catch((e)=>{
			console.log('err:::',e);
		})
  }
  render(){
    return (
      <div className="User">
          <MyLayout>
            <TableData
              dataSource={this.state.ShowData}
              columns={columns}
              total={this.state.total}
              onChangePage={(page,pageSize)=>{
                this.getData(page,pageSize)
              }}
            />
          </MyLayout>
      </div>
    );
  }
}

export default User;