import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    RefreshControl,
    TextInput,
    Dimensions,
    BackHandler,
    TouchableHighlight,
    Easing,
    Animated
} from 'react-native';
//引入组件基类
import BaseComponent from '../../../platform/component/baseComponent/BaseComponent';
//引入redux关联组件
import { connect } from 'react-redux';
//引入操作Action
import * as ProjectApplyActions from './redux/ProjectApplyActions';
//引入页面样式
import styles from "./ProjectApply_css";
//引入标题栏
import NavigationBar from '../../../platform/component/navigationBar/NavigationBar';
//引用数据存储组件
import Preference from 'react-native-preference';
//引入FlatList组件
import RefreshListView, { RefreshState } from '../../../platform/component/autoflatlist/RefreshListView'
//引入模拟数据源
import { listDataCopy } from './data';
import { isNull } from '../../../platform/utils/Valiformdata';
import SideMenu from './SideMenu';

const { width, height } = Dimensions.get('window');
//列表数据
let listData = [];
class PorjectApply extends BaseComponent {
   
    constructor(props) {
        super(props);
        this.state = {
            attendanceUserName: '', //搜索框内容

            dataList: [],
            page: 1,
            refreshState: RefreshState.Idle,

            //动画相关
            xValue: new Animated.Value(0), //创建动画初始值 水平位移
            opacityValue: new Animated.Value(0), //创建动画初始值 透明度
            isOpen: false, //是否显示侧边栏
        }
        
        console.info('Main-constructor',this.state,this.state.xValue._value)
    }
    componentWillMount() {
        console.info('Main-componentWillMount.............',listData)
    }
    componentDidMount() {

        console.info('Main-componentDidMount.............',listData)
        this.onHeaderRefresh();
        
    }
    onHeaderRefresh = () =>{
        this.setState({ refreshState: RefreshState.HeaderRefreshing, page: 1 }, () => {
            this.setState({
                dataList: listDataCopy,
                refreshState: false,
            })
        })
    }
    onFooterRefresh = () => {
        this.setState({ refreshState: RefreshState.FooterRefreshing }, () => {
            // this.setState({
            //     refreshState: newList.length < 15 ? RefreshState.NoMoreData : RefreshState.Idle
            // })
        })
    }
    /**
     * 界面卸载
     */
    componentWillUnmount() {
      
        console.info('Main-componentWillUnmount.............',listData)
        
    }

    //返回键设置
    leftClick() {
        NAVIGATION.goBack(null)
    }
   
    /**
     * 此函数用于为给定的item生成一个不重复的key
     */
    _keyExtractor = (item, index) => index;
   
    //刷新界面页面
    render() {
        const { dataList } = this.state;
        console.info('Main-render..........',this.state,dataList)

        return (
            <View style={styles.container}>
                <NavigationBar rightText={'新增'} rightClick={() => {this.toProjectApplyAddView()}} leftClick={() => this.leftClick()}>{'立项申请书'}</NavigationBar>
                {/* 搜索框 */}
                {this.createSearchInputView()}
                {/* 查询条件视图 */}
                {this.createSearchOptionsView()}
               
                {/* 创建列表视图 */}
                
                <RefreshListView
                    data={this.state.dataList}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItem}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                    footerEmptyDataComponent={this.createEmptyView()}
                /> 
            </View>
        );
    }
    //----------------------------------列表视图相关-------------------------------------------->
    //列表行渲染
    renderItem({ item, index }) {
        return (
            <TouchableOpacity  style={styles.listItemView} key={index}
                onPress={() => {
                    //跳转到详情页面
                    NAVIGATION.navigate(global.PROJECTAPPLYDETAIL,item);
                }
            }>
                <View style={styles.itemTopView}>
                    <Text style={styles.itemTopText}>{item.projectName}</Text>
                    <Text style={styles.itemTopText}>{item.status}</Text>
                </View>
                <View style={styles.itemContentView}>
                    <View style={styles.itemContentLeftView}>
                        <Text style={styles.itemContentText}>{'对口客户：' + item.shortName}</Text>
                        <Text style={styles.itemContentText}>{'项目负责人：' + item.projectManagerName}</Text>
                        <Text style={styles.itemContentText}>{'所属部门：' + item.centerName}</Text>
                    </View>
                    <View style={styles.itemContentRightView}>

                    </View>
                </View>
                {/* <View style={{width:width,height:1,backgroundColor:'#D6D6D6'}}></View> */}
            </TouchableOpacity>
        );
    }
    //创建空列表提示
    createEmptyView() {
        return (
            <View style={styles.noDataView}>
                <Image
                    style={styles.noDataImage}
                    source={require('../../images/list_nodata.png')} />
                <Text style={styles.noDataText}>亲，暂时没有数据！</Text>
            </View>
        )
    }
    //绘制列表的分割线
    renderItemSeparator() {
        return (<View style={styles.separatorStyle}></View>)
    }
    //----------------------------------搜索视图相关-------------------------------------------->
    //创建搜索框视图
    createSearchInputView = () => {
        return (
            <View style={styles.searchView}>
                <View style={styles.searchInputView}>
                    <TextInput
                        style={[styles.searchInputText, { textAlign: 'left' }]}
                        placeholder={'查询申请人姓名'}
                        returnKeyType='search' 
                        underlineColorAndroid='transparent'  //去掉Android输入框线条
                        value={this.state.attendanceUserName}
                        onChangeText={(text) => this.updateInputValue(text)}
                        multiline={false}//多行输入
                        blurOnSubmit={true} //如果为true，文本框会在提交的时候失焦,同时触发onSubmitEditing事件
                        onSubmitEditing={()=>{
                           
                        }}
                    >
                    </TextInput>
                </View>
                <TouchableOpacity
                    style={styles.headerTopRightTouch}
                    key={'88'}
                    onPress={() => {
                        //打开搜索筛选视图
                        this.openSearchViewClick();
                    }}
                >
                    <Image
                        source={require('../../images/noFiltrate.png')}
                        style={styles.arrowImg0} />
                </TouchableOpacity>
            </View>
        )
    }
    //改变输入框事件
    updateInputValue = (text) =>{
        this.setState({
            attendanceUserName: text
        },()=>{
            //this.props.changeAttendanceUserName(text)
        })
    }
    //点击搜索按钮-跳转到搜索条件设置页面
    openSearchViewClick = () => {
        console.info('打开筛选框::',this.state.isOpen)
        this.setState({
            isOpen: true,
        },()=>{
            //this.rollShow(); //执行 卷入卷出动画
            this.sideMenuRef.rollShow();
        })
    }
    //创建开始动画
   /*  rollShow = () =>{
        //1.重置要变化的值
        this.state.xValue.setValue(0)
        this.state.opacityValue.setValue(0)
        //2.调用动画库
        Animated.parallel([
            Animated.timing( //spring timing
                this.state.xValue,
                {
                    toValue: 1, 
                    duration: 150,
                    easing: Easing.linear
                }
            ),
            Animated.timing( //spring timing
                this.state.opacityValue,
                {
                    toValue: 1, 
                    duration: 0,
                    easing: Easing.linear
                }
            )
        ]).start()     
        //3.调用start()
        
        //调用Animated.timing,并驱动this.state.xValue的值以Easing.linear的方式在4000ms内从0变为1
        //Animated.timing需要2个参数,一个要变化的值(即this.state.xValue)和一个可配置对象
        //这个可配置对象有4个属性:toValue(终值)、duration(一次动画的持续时间)、easing(缓存函数)和delay(延迟执行的时间)
    } */
    //创建结束动画
    /* rollHide = () =>{
        console.info('结束动画')
        Animated.parallel([
            Animated.timing( 
                this.state.xValue,
                {
                    toValue: 0, 
                    duration: 150,
                    easing: Easing.linear
                }
            ),
            Animated.timing( 
                this.state.opacityValue,
                {
                    toValue: 0, 
                    duration: 150,
                    easing: Easing.linear
                }
            )
        ]).start()  

        setTimeout(() =>{
            this.setState({isOpen: false})
        },150);  
    } */
    //创建筛选条件视图
    createSearchOptionsView = () => {
        console.info('=================',this.state)
        return (
            <SideMenu 
                ref={(ref)=>{this.sideMenuRef = ref}} //ref映射 调用rollShow方法
                isOpen={this.state.isOpen} //侧边栏打开/关闭
                
            >
            </SideMenu>
        ) 
        // if(this.state.isOpen){
        //     const horMove = this.state.xValue.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: [300, 0]
        //     })
        //     const opaMove = this.state.opacityValue.interpolate({
        //         inputRange: [0 , 1],
        //         outputRange: [0, 0.8]
        //     })
        //     return(
        //     <View style={styles.searchOptionsView}>
        //         <Animated.View style={[styles.mask,{
        //             opacity: opaMove
        //         }]}>
        //             <TouchableOpacity style={styles.maskTouch}
        //                 onPress={()=>{ 
        //                     this.rollHide();
        //                 }}>
        //             </TouchableOpacity>
        //         </Animated.View>
        //         <Animated.View style={[styles.tip,{
        //             transform: [{  
        //                 translateX: horMove
        //             }]
        //         }]}>
        //         </Animated.View>
        //     </View>
        //     )
        // }
        // return null;
    }
    //----------------------------------跳转相关-------------------------------------------->
    toProjectApplyAddView = () =>{
        NAVIGATION.navigate(global.PROJECTAPPLYADD,{ reload:()=>{
            
        }});
    }

}

//把Reducer和Action与页面组件关联起来
export default connect((state) => {
    const { PorjectApplyReducer } = state;
    return {
        PorjectApplyReducer
    }
}, ProjectApplyActions)(PorjectApply)