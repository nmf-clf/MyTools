import React,{ Component } from 'react';
import { Tabs, Button, Form, TreeSelect, Row, Col, Input, Table, Switch} from 'antd';

import MyLayout from 'common/layout';
import { requestJson } from './json';
import { ADDRESS } from './address';

import './index.less';

const { TabPane } = Tabs;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
};
class Permission extends Component{
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        this.state = {
          activeKey: '',
          saveData:{},
          salesRule: [], //规则对象数组
        };
        console.log("json::",requestJson())
      }
      //切换面板的回调
      onChange = activeKey => {
        console.log("onChange-activeKey::",activeKey)
        this.setState({ activeKey });
      };
      //新增和删除页签的回调，在 type="editable-card" 时有效
      onEdit = (targetKey, action) => {
        console.log('onEdit-targetKey::',targetKey)
        console.log('onEdit-action::',action)
        this[action](targetKey); //执行删除函数
      };
      //复制规则数据
      copySaleRules = () =>{
        const plans = requestJson().data.requestPackageRuleVoList[0].productList;
        console.log("复制规则数据::",plans)
        this.addSaleRule(plans)
      }
      //构造新增规则数据
      addSaleRule = (plans) => {
        console.log("构造新增规则接收的数据::",plans)
        let newPlans = []; //将新的newPlans赋给salesRule的plans
        const { salesRule } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        plans && plans.map((planItem,planIndex)=>{ //计划组合层
          let newPlanItem = {}; //构造newPlanItem  push 到 newPlans里
          newPlanItem.planAbbreviation = planItem.planAbbreviation; //复制计划别名
          newPlanItem.categoryList = planItem && planItem.categoryList.map((categoryItem,categoryIndex)=>{ //计划别名-版本层
            return { //将主险/附加险相关数据 作为新的对象 返回给 版本(基础/钻石版) 的数组里
              category:categoryItem.category,
              productCode:categoryItem.productCode,
              productName:categoryItem.productName,
              conditionSwitch: categoryItem.conditionSwitch || false
            }
          })
          newPlans.push(newPlanItem) //此时应该有一个字段和一个对象
        })
        salesRule.push({
            saleArea: "220000",
            packageName: '组合嘿嘿嘿',
            plans:newPlans,
            key: activeKey
        })
        this.setState({
          salesRule,
          activeKey
        },()=>{
          console.log("新增后salesRule::",this.state.salesRule)
        })
      };
      
      //删除规则
      remove = targetKey => {
        console.log("remove-targetKey::",targetKey)
        let { activeKey } = this.state;
        let lastIndex;
        this.state.salesRule.forEach((item, i) => {
          console.log("=====",item.key,targetKey,i)
          if (item.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const salesRule = this.state.salesRule.filter(item => item.key !== targetKey);
        if (salesRule.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = salesRule[lastIndex].key;
          } else {
            activeKey = salesRule[0].key;
          }
        }
        this.setState({ salesRule, activeKey });
      };
    componentDidMount(){
        //console.log("Permission::",this.props.location)
    }
    //保存数据
    saveData = () =>{
      let { saveData } = this.state;
      saveData['requestPackageRuleVoList'] = this.state.salesRule;
      console.log("Taps数据::",this.state.saveData)
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { salesRule } = this.state;
        const columnsSecond = [{
            align: 'center',
            title: "产品代码",
            dataIndex: 'productCode',
            key: 'productCode'
        },{
            align: 'center',
            title: "产品名称",
            dataIndex: 'productName',
            key: 'productName'
        }];
        return(
            <div className='Permission'>
                <MyLayout>
                    <div style={{ marginBottom: 16 }}>
                        <Button style={{marginRight:'30px'}} onClick={this.copySaleRules}>新增规则</Button>
                        <Button onClick={this.saveData}>获取数据</Button>
                    </div>
                    <Tabs
                        hideAdd //是否隐藏加号图标，在 type="editable-card" 时有效
                        onChange={this.onChange} //切换面板的回调
                        activeKey={this.state.activeKey} //当前激活 tab 面板的 key (string)
                        type="editable-card" //页签的基本样式，可选 line、card editable-card 类型 
                        onEdit={this.onEdit}
                        tabPosition='top' //页签位置
                    >
                        {salesRule && salesRule.map((salesRuleItem,salesRuleIndex) => { //遍历规则数组对象
                            let ruleIndex =  salesRuleIndex + 1;
                            let productList = salesRuleItem.plans;
                            console.log(111,salesRuleItem,productList)
                            return <TabPane tab={`规则`+ruleIndex} key={salesRuleItem.key}>
                              <Form className='mySaleRules' {...formItemLayout}>
                                <Row //xs={24} sm={24} md={24} lg={24}
                                >
                                  <Col>
                                    <Form.Item label='适用机构'>
                                      {getFieldDecorator('saleArea'+ruleIndex, {
                                        initialValue: salesRuleItem.saleArea || ''
                                      })(
                                          <TreeSelect
                                              //style={{ width: '200px' }}
                                              allowClear
                                              treeNodeFilterProp='title'
                                              treeCheckable='true'
                                              showCheckedStrategy='SHOW_PARENT'
                                              dropdownStyle={{
                                                  maxHeight: 400,
                                                  overflow: 'auto'
                                              }}
                                              placeholder="请选择"
                                              treeData={ADDRESS}
                                              onChange={(value, label, extra) => {
                                                  //this.changeCompanyInfo(saleRuleKey, 'saleArea', value.join(','))
                                              }}
                                          />
                                      )}
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Row //xs={24} sm={24} md={24} lg={24}
                                >
                                  <Col>
                                    <Form.Item label='组合名称'>
                                      {getFieldDecorator('packageName'+ruleIndex, {
                                        initialValue: salesRuleItem.packageName || ''
                                      })(
                                          <Input onChange={(e)=>{
                                            salesRuleItem.packageName = e.target.value;
                                            //this.changeSaleRule(salesRuleIndex,'packageName',e.target,value)
                                          }}/>
                                      )}
                                    </Form.Item>
                                  </Col>
                                </Row>
                                {console.log("????",productList)}
                                {
                                  productList && productList.map((productListItem,productListIndex)=>{ //遍历计划别名组合数组对象
                                    console.log("productList::",productList)
                                    let productIndex = productListIndex; //基础版or钻石版index
                                    let categoryList = productListItem.categoryList; //主险/附加险数组
                                    return (
                                      <div key={productIndex} style={{marginLeft:'30px'}}>
                                          <span style={{fontSize:'14px'}}>{productListItem.planAbbreviation}</span>
                                          {
                                            categoryList && categoryList.map((categoryListItem,categoryListIndex)=>{//遍历主附险数组对象
                                              let categoryIndex = categoryListIndex; //主附险产品index
                                              let dataSourceSecond = []; //表格数据数组
                                              dataSourceSecond.push(categoryListItem);
                                              return <div key={categoryListIndex} className='myCategoryList'>
                                                    <span style={{fontWeight:'bold ',fontSize:'16px'}}>{categoryListItem.category}</span>
                                                    <Table 
                                                      style={{width: "60%", minWidth: "300px"}} 
                                                      bordered 
                                                      columns={columnsSecond} 
                                                      dataSource={dataSourceSecond} 
                                                      pagination={false}
                                                    />
                                                    <div style={{margin: "12px 0"}}>
                                                      <Form.Item>
                                                          <label>限定条件:</label>
                                                          {getFieldDecorator('isCondition' + ruleIndex + productIndex + categoryIndex, { //条件限制
                                                              //initialValue: codeData && codeData.productInsureVo.minAllowAge,
                                                          })(
                                                              <Switch style={{marginLeft: "12px"}} defaultChecked={categoryListItem.conditionSwitch}
                                                                      onChange={(e)=>{
                                                                          categoryListItem.conditionSwitch = e;
                                                                          if(e == false){
                                                                              categoryListItem.formList = []
                                                                          }
                                                                      }}
                                                              />
                                                          )}
                                                          {getFieldDecorator('isAdd' + ruleIndex + productIndex + categoryIndex, { //新增按钮
                                                              //initialValue: codeData && codeData.productInsureVo.minAllowAge,
                                                          })(
                                                              <Button style={{marginLeft: '12px',display:(categoryListItem.conditionSwitch) ? '' : 'none'}} 
                                                                  onClick={()=>{this.addCondition(salesRuleIndex,productIndex,categoryIndex)}}
                                                              >新增</Button>
                                                          )}
                                                      </Form.Item>
                                                    </div>
                                              </div>
                                            })
                                          }
                                      </div>
                                    )
                                  })
                                }
                              </Form>
                            </TabPane>
                          })}
                    </Tabs>  
                </MyLayout>
            </div>
        )
    }
}

export default Form.create()(Permission);