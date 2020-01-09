import React,{ Component } from 'react';
import { Tabs, Button, Form, TreeSelect, Row, Col, Input, Table, Switch, InputNumber, Select, Icon } from 'antd';

import MyLayout from 'common/layout';
import { requestJson } from './json';
import { ADDRESS } from './address';

import './index.less';

const { TabPane } = Tabs;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
};
const ALLOW_AGE_UNIT = {
  D: '天',
  A: '岁'
}
class Permission extends Component{
    constructor(props) {
        super(props);
        this.newTabIndex = 1;
        this.state = {
          activeKey: '',
          saveData:{},
          salesRule: [], //规则对象数组
        };
        console.log("json::",requestJson())
      }
      //切换面板的回调
      changeRuleTap = activeKey => {
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
        const { salesRule } = this.state;
        const activeKey = `${this.newTabIndex++}`;
        let newPlans = []; //将新的newPlans赋给salesRule的plans
        //const activeKey = `newTab${this.newTabIndex++}`;
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
      //新增限制条件
    addCondition = (salesRuleIndex,productIndex,categoryIndex) => {
      //console.log('新增嘻嘻嘻',this.state.salesRule)
      //console.log("规则/版本/主附险的index::",salesRuleIndex,productIndex,categoryIndex)
      //this.state.formDataLength.push('1')
      let formData = {
          "minAllowAge": "",  //11,最小投保年龄
          "minAllowAgeUnit": "A",  //"D",最小投保年龄单位
          "maxAllowAge": "", //22,最大投保年龄
          "maxAllowAgeUnit": "A",//"D",最大投保年龄单位
          "GuaranteePeriod": "", //"1",保障期限
          "BillingMode": "", //"1",缴费方式
          "PremiumPaymentPeriod": "", //"1",缴费年限
          "PremiumLimitSwitch": false, //false,保额限定,默认关闭
          "isFixed": "1", //保额类型是否固定,默认固定
          "InsuranceAmount": "" //1122,保额
      } 
      //console.log('====',this.state.salesRule[salesRuleIndex].plans[productIndex].categoryList[categoryIndex])
      //this.state.salesRule[salesRuleIndex].plans[productIndex].categoryList[categoryIndex]['formList'] = [];
      this.state.salesRule[salesRuleIndex].plans[productIndex].categoryList[categoryIndex].formList.push(formData);
      this.setState({
          salesRule:this.state.salesRule
      },()=>{
          this.forceUpdate(); //强制渲染
          console.log("新增时规则数据::",this.state.salesRule)
      })
    }
    //删除规则
    remove = targetKey => {
      console.log("删除规则key::",targetKey)
      console.log("规则data::",this.state.salesRule)
      let { activeKey } = this.state;
      let lastIndex;
      this.state.salesRule.forEach((item, i) => {
        // console.log("=====",item.key,targetKey,i)
        if (item.key == targetKey) {
          lastIndex = i - 1;
        }
      });
      const salesRule = this.state.salesRule.filter(item => item.key !== targetKey);
      if (salesRule.length && activeKey == targetKey) {
        if (lastIndex >= 0) {
          activeKey = salesRule[lastIndex].key;
        } else {
          activeKey = salesRule[0].key;
        }
      }
      console.log("activekey111111111111111:",activeKey)
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
    //修改规则外层数据
    changeSaleRule =(index,name,value)=>{
      let {  salesRule } = this.state;
      salesRule[index].packageName = value;
      this.setState({
        salesRule
      })
    }
    //修改规则表格数据 my
    updateRules(salesRuleIndex,formKey,val,productIndex,categoryIndex,formIndex){
      let { salesRule } = this.state;
      console.log("修改时规则数据::",salesRule)
      console.log("修改时key::",salesRuleIndex,productIndex,categoryIndex,formIndex)
      if (salesRule[salesRuleIndex]) {
          salesRule[salesRuleIndex].plans[productIndex].categoryList[categoryIndex].formList[formIndex][formKey] = val;
      }
      this.setState({
          salesRule: salesRule
      },()=>{
          console.log('修改规则表格数据::',this.state.salesRule)
      });
    }
    //修改state
    changeState = () =>{
      this.setState({
        salesRule:this.state.salesRule
      })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { salesRule,activeKey } = this.state;
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
                        onChange={this.changeRuleTap} //切换面板的回调
                        activeKey={this.state.activeKey} //当前激活 tab 面板的 key (string)
                        type="editable-card" //页签的基本样式，可选 line、card editable-card 类型 
                        onEdit={this.onEdit} //删除操作
                        tabPosition='top' //页签位置
                        onTabClick={(t) => { //Tap被点击的回调
                          console.log('t::',t)
                          //this.setNavCurrent('I', t)
                        }}
                    >
                        {salesRule && salesRule.map((salesRuleItem,salesRuleIndex) => { //遍历规则数组对象
                            let ruleIndex =  salesRuleIndex + 1;
                            let productList = salesRuleItem.plans;
                            console.log(111,salesRuleItem,salesRule,activeKey)
                            return <TabPane tab={`规则`+ruleIndex} key={salesRuleItem.key} >
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
                                                salesRuleItem.saleArea = value.join(',');
                                                  //this.changeCompanyInfo(salesRuleIndex, 'saleArea', value.join(','))
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
                                      {/* {getFieldDecorator('packageName'+ruleIndex, {
                                        //initialValue: salesRuleItem.packageName || ''
                                      })( */}
                                          <Input onChange={(e)=>{
                                             salesRuleItem.packageName = e.target.value;
                                             //this.changeSaleRule(salesRuleIndex,'packageName',e.target.value)
                                          }}
                                          defaultValue={salesRuleItem.packageName || ''}
                                          />
                                      {/* )}  */}
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
                                              let formList = categoryListItem.formList || []; //表格数组数据源
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
                                                          })(
                                                              <Button style={{marginLeft: '12px',display:(categoryListItem.conditionSwitch) ? '' : 'none'}} 
                                                                  onClick={()=>{
                                                                    if(!(categoryListItem['formList'])){
                                                                      categoryListItem['formList'] = [];
                                                                    }
                                                                    this.addCondition(salesRuleIndex,productIndex,categoryIndex)
                                                                  }}
                                                              >新增</Button>
                                                          )}
                                                      </Form.Item>
                                                    </div>
                                                    {/*限定条件框*/}
                                                    {
                                                      formList && formList.map((formListItem,formListIndex)=>{
                                                        let formIndex = formListIndex;
                                                        return <div key={formListIndex}
                                                        style={{background: "rgba(0, 0, 0, 0.04)", padding: "10px 12px",borderBottom:'1px solid #fff'}}
                                                        >
                                                          <label>{`条件${formIndex+1}:`}</label>
                                                          <Button style={{float:"right"}} onClick={()=>{
                                                              console.log('删除条件::',categoryListItem)
                                                              console.log("删除-formList::",formList)
                                                              //formList[formListIndex]
                                                              categoryListItem.formList.splice(formListIndex,1)
                                                              console.log("删除后的规则数据=======",this.state.salesRule)
                                                              this.setState({
                                                                salesRule:salesRule
                                                              },()=>{
                                                                this.forceUpdate(); //强制渲染
                                                              })
                                                              //this.deleteCondition(salesRuleIndex,productIndex,categoryIndex,formIndex)
                                                          }}>删除条件</Button>
                                                          <Form layout='inline'>
                                                            <Row //投保年龄
                                                              >
                                                                <Col>
                                                                  <Form.Item label='投保年龄'>
                                                                    {getFieldDecorator('minAllowAge' + ruleIndex + productIndex + categoryIndex + formIndex, { //投保年龄
                                                                        initialValue: formListItem.minAllowAge || '',
                                                                    })(
                                                                        <InputNumber
                                                                            onChange={(e) => {
                                                                               formListItem.minAllowAge = e;
                                                                                this.setState({
                                                                                  salesRule:salesRule
                                                                                })
                                                                              //this.updateRules(salesRuleIndex,'minAllowAge',e,productIndex,categoryIndex,formIndex)
                                                                            }}
                                                                            style={{ width: '60px', marginRight: '5px' }}
                                                                            min={1}
                                                                            max={365}
                                                                            //defaultValue={formListItem.minAllowAge}
                                                                            //value={formListItem.minAllowAge} 
                                                                        />
                                                                    )} 
                                                                    {getFieldDecorator('minAllowAgeUnit' + ruleIndex + productIndex + categoryIndex +formIndex, {
                                                                        initialValue: formListItem.minAllowAgeUnit || "A",
                                                                    })(
                                                                        <Select
                                                                            style={{ width: '70px' }}
                                                                            onChange={(e) => {
                                                                              //formListItem.minAllowAgeUnit = e;
                                                                              this.updateRules(salesRuleIndex,'minAllowAgeUnit', e,productIndex,categoryIndex,formIndex)
                                                                            }}
                                                                        >
                                                                            {
                                                                                Object.keys(ALLOW_AGE_UNIT).map((k) => {
                                                                                    return <Option key={k} value={k}>{ALLOW_AGE_UNIT[k]}</Option>
                                                                                })
                                                                            }
                                                                        </Select>
                                                                    )}
                                                                    ~
                                                                    {/* {getFieldDecorator('maxAllowAge' + ruleIndex + productIndex + categoryIndex +formIndex, {
                                                                        initialValue: formListItem.maxAllowAge || '',
                                                                    })( */}
                                                                        <InputNumber
                                                                            onChange={(e) => {
                                                                              formListItem.maxAllowAge = e;
                                                                              this.changeState()
                                                                              //this.updateRules(salesRuleIndex,'maxAllowAge', e,productIndex,categoryIndex,formIndex)
                                                                            }}
                                                                            style={{ width: '60px', marginRight: '5px' }}
                                                                            min={1}
                                                                            max={365}
                                                                            value={formListItem.maxAllowAge} 
                                                                        />
                                                                    {/* )} */}
                                                                    {/* {getFieldDecorator('maxAllowAgeUnit' + ruleIndex + productIndex + categoryIndex + formIndex, {
                                                                        initialValue: formListItem.maxAllowAgeUnit || 'A',
                                                                    })( */}
                                                                        <Select
                                                                            style={{ width: '70px' }}
                                                                            onChange={(e) => {
                                                                              //formListItem.maxAllowAgeUnit = e;
                                                                              this.updateRules(salesRuleIndex,'maxAllowAgeUnit', e,productIndex,categoryIndex,formIndex)
                                                                            }}
                                                                        >
                                                                            {
                                                                                Object.keys(ALLOW_AGE_UNIT).map((k) => {
                                                                                    return <Option key={k} value={k}>{ALLOW_AGE_UNIT[k]}</Option>
                                                                                })
                                                                            }
                                                                        </Select>
                                                                    {/* )} */}
                                                                  </Form.Item>
                                                                </Col>
                                                              </Row>
                                                              <Row>
                                                                  <Col xs={24} sm={12} md={12} lg={8}>
                                                                      <Form.Item label='保障期限'>
                                                                          {getFieldDecorator('GuaranteePeriod' + ruleIndex + productIndex + categoryIndex + formIndex, { //保障期限
                                                                              initialValue: formListItem.GuaranteePeriod || '',
                                                                          })(
                                                                              <Select style={{width: "80px"}}
                                                                                  onChange={(e)=>{
                                                                                    formListItem.GuaranteePeriod = e;
                                                                                      //this.updateRules(salesRuleIndex,'GuaranteePeriod',e,productIndex,categoryIndex,formIndex)
                                                                                  }}
                                                                              >
                                                                                  <Option value="1">1年</Option>
                                                                                  <Option value="2">2年</Option>
                                                                                  <Option value="3">3年</Option>
                                                                              </Select>
                                                                          )}
                                                                      </Form.Item>
                                                                  </Col>
                                                                  <Col xs={24} sm={12} md={12} lg={8}>
                                                                      <Form.Item label='缴费方式'>
                                                                          {getFieldDecorator('BillingMode' + ruleIndex + productIndex + categoryIndex + formIndex, { //缴费方式
                                                                              initialValue: formListItem.BillingMode || '',
                                                                          })(
                                                                              <Select style={{width: "80px"}} onChange={(e)=>{
                                                                                formListItem.BillingMode = e;
                                                                                  //this.updateRules(salesRuleIndex,'BillingMode',e,productIndex,categoryIndex,formIndex)
                                                                              }}>
                                                                                  <Option value="1">月</Option>
                                                                                  <Option value="2">季度</Option>
                                                                                  <Option value="3">年</Option>
                                                                              </Select>
                                                                          )}
                                                                      </Form.Item>
                                                                  </Col>
                                                                  <Col xs={24} sm={12} md={12} lg={12}>
                                                                      <Form.Item label='缴费年限'>
                                                                          {getFieldDecorator('PremiumPaymentPeriod' + ruleIndex + productIndex + categoryIndex + formIndex, { //缴费方式
                                                                              initialValue: formListItem.PremiumPaymentPeriod || '',
                                                                          })(
                                                                            <Select style={{width: "80px"}} onChange={(e)=>{
                                                                              formListItem.PremiumPaymentPeriod = e;
                                                                                //this.updateRules(salesRuleIndex,'PremiumPaymentPeriod',e,productIndex,categoryIndex,formIndex)
                                                                            }}>
                                                                                <Option value="1">1年</Option>
                                                                                <Option value="2">10年</Option>
                                                                                <Option value="3">15年</Option>
                                                                                <Option value="4">19年</Option>
                                                                            </Select>
                                                                          )}
                                                                      </Form.Item>
                                                                      <Form.Item>
                                                                          <span>1年、5年、10年、15年、19年 </span>
                                                                      </Form.Item>
                                                                  </Col>
                                                              </Row>
                                                              <Row>
                                                                  <Col xs={24} sm={12} md={12} lg={12}>
                                                                      <Form.Item label='保额限定'>
                                                                          {getFieldDecorator('PremiumLimit' + ruleIndex + productIndex + categoryIndex + formIndex, { //保额限定
                                                                          })(
                                                                              <Switch defaultChecked={formListItem.PremiumLimitSwitch} onChange={(e)=>{ 
                                                                                  formListItem.PremiumLimitSwitch = e;
                                                                                  //this.setState({premiumLimitSwitch:e})
                                                                              }} />
                                                                          )}
                                                                      </Form.Item>
                                                                  </Col>
                                                              </Row>
                                                              {
                                                                  formListItem.PremiumLimitSwitch 
                                                              ? 
                                                              <Row>
                                                                  <Col xs={24}sm={8} md={8} lg={8}>
                                                                      <Form.Item style={{paddingLeft: "64PX"}}>
                                                                          {getFieldDecorator('isFixed' + ruleIndex + productIndex + categoryIndex + formIndex, { //保额类型
                                                                                  initialValue: (formListItem && formListItem.isFixed) || '1',
                                                                              })(
                                                                              <Select style={{width: "80px"}} onChange={(e)=>{
                                                                                  formListItem.isFixed = e;
                                                                                  //this.updateRules(salesRuleIndex,'isFixed',e,productIndex,categoryIndex,formIndex)
                                                                              }}>
                                                                                  <Option value="0">固定</Option>
                                                                                  <Option value="1">公式</Option>
                                                                              </Select>
                                                                          )}
                                                                      </Form.Item>
                                                                  </Col>
                                                                  <Col xs={24} sm={16} md={16} lg={16}>
                                                                      <Form.Item label='保额'>
                                                                          {getFieldDecorator('InsuranceAmount' + ruleIndex + productIndex + categoryIndex + formIndex, { //保额
                                                                                 
                                                                              })(
                                                                                  <Input
                                                                                      className={(formListItem.isFixed == '1') ? "iconShow" : 'iconHide'}
                                                                                      //style={{borderRight:(formListItem.isFixed == '1') ? '' : 'none'}}
                                                                                      onChange={(e)=>{
                                                                                          formListItem.InsuranceAmount = e.target.value;
                                                                                          //this.updateRules(salesRuleIndex,'InsuranceAmount',e.target.value,productIndex,categoryIndex,formIndex)
                                                                                      }} 
                                                                                      addonAfter={<div style={{display:(formListItem.isFixed == '1') ? '' : 'none'}} onClick={() => {
                                                                                        //this.openProduct("InsuranceAmount", "A4")
                                                                                      }}><Icon type="setting" /></div>}
                                                                                  />
                                                                          )}
                                                                      </Form.Item>
                                                                  </Col>
                                                              </Row>
                                                              :
                                                                  null
                                                              }
                                                            </Form>
                                                        </div>
                                                      })
                                                    }
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