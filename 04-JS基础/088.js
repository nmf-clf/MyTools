import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
    TextInput,
    RefreshControl,
    Dimensions
} from 'react-native';
//引入第三方库
// import DeviceInfo from 'react-native-device-info'
//引入redux关联组件
import { connect } from 'react-redux';
//布局组件
import CellView from '../../components/cellView/CellView';
// 引入样式文件
import styles from './CheckIn_css'
//引入标题栏
import NavigationBar from '../../../platform/component/navigationBar/NavigationBar';
//引入组件基类
import BaseComponent from "../../../platform/component/baseComponent/BaseComponent";
//引入原生调用API对象
import * as ReactNativeApi from '../../../platform/ReactNativeApi';
// 引入actions
import * as CheckActions from './redux/CheckActions'
// 引入Geolocation地图API操作
//引用数据存储组件
import Preference from "react-native-preference";

import RootSiblings from 'react-native-root-siblings'
import CheckResult from './checkResult'
import { isNull } from '../../../platform/utils/Valiformdata';
//计算两点之间的距离
import { GetDistance } from '../../../platform/utils/getCheckMeter'
import { compose } from 'redux';
//引入标签页组件
import { Tabs } from 'antd-mobile';
//获取安卓设备号
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

const correctCheckInPosition = require('../../images/correctPosition.png')
const errorCheckInPosition = require('../../images/errorPosition.png')

Text.defaultProps.allowFontScaling = false;

let modal = null

const veryDay = 'thatVeryDay_'

// const title = 'Tabs';

class CheckIn extends BaseComponent {
    constructor(props) {
        super(props)
        this.currentDay = this.getAppointStyleDate('_')
        this.state = {
            userInfo: '',//用户存储的数据
            thatVeryDay: [],//时间格式
            deviceId: '',//手机的唯一标示
            mydistances: null,//计算距离(自己计算机的距离)
            site: '',//指定考勤打卡的位置信息
            distance: '',//后台获取的指定的距离
            listData: Preference.get(USERINFO).attendanceList || [],//今日考勤历史明细
            isDaCards: true,// 声明是的打卡
            isSIM: '',//手机SIM卡处理
            isPrisonBreak: '',//手机越狱处理
            addressSn: '',//设备的唯一标识
            // km:false //千米单位
            //2020/3/24-在家打卡新增
            localAdress: '', //定位当前所在位置
            typeIndex: 0, //打卡类型-index
            lon2: '', //经度
            lat2: '', //纬度
            homeAttendanceAuth: Preference.get(USERINFO).homeAttendanceAuth || '', //是否有在家打卡权限
        }
        console.info(this.currentDay);
        this.timer = setInterval(this.updateLocation.bind(this), 3000);
        this.__mounted = true;
        // console.info('初始化获取指定位置地点::',Preference.get(USERINFO))
        
    }

    cbs = (getSIM) => {
        const SIM = JSON.parse(getSIM)
        console.info(SIM);
        console.info('time', new Date)
        console.info(SIM.responseBody.simStr);
        this.setState({
            isSIM: SIM.responseBody.simStr//设置SIM卡判断
        })
    }

    DeviceInfos = (getUUIDs) => {
        const deviceIds = JSON.parse(getUUIDs)
        console.info('设备号======', JSON.stringify(deviceIds));
        this.isIOS ?
            this.setState({
                deviceId: deviceIds.responseBody.getUUID//设置设备的唯一表识别
            })
            :
            this.setState({
                //deviceId: deviceIds.responseBody.deiviceId//设置设备的唯一表识别
                deviceId: DeviceInfo.getUniqueID()//设置设备的唯一表识别
            })
        console.info(this.state.deviceId);
    }

    prisonBreak = (getPrisonBreak) => {
        const kkis = JSON.parse(getPrisonBreak)
        console.info(kkis);
        this.setState({
            isPrisonBreak: kkis.responseBody.isPrisonBreak//设置手机越狱权限
        })
    }

    //获取设备的UUID
    getUUIDs() {
        //引入原生的框架
        console.info('getUUID', new Date)
        ReactNativeApi.DeviceUtilsModule.getEquipmentUUIDs(this.DeviceInfos);
    }

    //获取SIM卡相关信息的方法
    getSIM() {
        //引入原生的框架
        console.info('getSIMStr', new Date)
        ReactNativeApi.DeviceUtilsModule.getSIMStr(this.cbs);
    }
    //获取手机是否越狱的权限
    getPrisonBreak() {
        //引入原生的框架
        ReactNativeApi.DeviceUtilsModule.isPrisonBreak(this.prisonBreak);
    }
    //用户手机定位(加上定时器操作)
    updateLocation() {

        const { addressTraceList } = this.state.userInfo;

        console.info(addressTraceList);
        if (!Array.isArray(addressTraceList) || addressTraceList.length < 1) {
            return;
        }

        const cb = (locateStr) => {
            if (this.__mounted === false || isNull(locateStr)) {
                return;
            }
            const locate = JSON.parse(locateStr);
            console.info('API定位的地理位置信息::',locate);
            if (locate.responseBody.stauts == '0') {
                this.setState({
                    mydistances: null,
                });
                return;
            }
            //计算距离
            let mydistancess = null;
            let sites = '';
            let serverDistance = '';
            let addressSn = '';
            //初始化符合条件的距离数组
            let distanceArr = [];

            for (let i = 0; i < addressTraceList.length; i++) {
                const distancess = GetDistance( //计算两点之间的距离
                    addressTraceList[i].longitude, //经度
                    addressTraceList[i].latitude, //纬度
                    locate.responseBody.longitude, //31.237498 121.660920
                    locate.responseBody.latitude, //31.237822 0000 121.6605 000000
                );
                // console.info('每次遍历的距离数值:===============?::',distancess)
                sites = addressTraceList[i].address; //后台指定的考勤地点
                serverDistance = addressTraceList[i].distance;//后台指定考勤距离
                addressSn = addressTraceList[i].addressSn; //后台指定的考勤编号
                if (distancess <= serverDistance) {
                    distanceArr.push({
                        sites: sites, //后台指定的考勤地点
                        serverDistance: serverDistance,//后台指定考勤距离
                        addressSn: addressSn, //后台指定的考勤编号
                        distancess: distancess,
                    })
                }
            }
            console.info('distanceArr数组::',distanceArr)
            //初始化定义最小
            let minDistance = distanceArr && distanceArr.length > 0 ? distanceArr[0].distancess : null; //模拟数组第一个对象的距离为最小距离
            let minServerDistance = distanceArr && distanceArr.length > 0 ? distanceArr[0].serverDistance : null;
            let minAddressSn = distanceArr && distanceArr.length > 0 ? distanceArr[0].addressSn : null;
            let minSites = distanceArr && distanceArr.length > 0 ? distanceArr[0].sites : null;
            // console.info('模拟的最小值111111',minDistance)
            distanceArr && distanceArr.map((item,index)=>{
                let curDistance = item.distancess;
                let curServerDistance = item.serverDistance;
                let curAddressSn = item.addressSn;
                let curSites = item.sites;
                //curDistance < minDistance ? minDistance = curDistance : null
                // console.info('===================111',item,curDistance)
                if(curDistance < minDistance){
                    minDistance = curDistance //距离
                    minServerDistance = curServerDistance//指定距离
                    minAddressSn = curAddressSn//地点编号
                    minSites = curSites//地址
                }
                mydistancess = minDistance //赋值 计算距离
                serverDistance = minServerDistance
                addressSn = minAddressSn
                sites = minSites
            })
            //如果没有满足打卡条件，寻找最近打卡点，计算距离最近打卡点距离
            if (mydistancess == null &&  distanceArr.length < 1 ) {
                for (let i = 0; i < addressTraceList.length; i++) {
                    //计算两点之间的距离
                    const distancess = GetDistance(
                        addressTraceList[i].latitude,
                        addressTraceList[i].longitude,
                        locate.responseBody.latitude,
                        locate.responseBody.longitude,
                    );

                    if (mydistancess == null) {
                        addressSn = addressTraceList[i].addressSn;
                        mydistancess = distancess;
                        sites = addressTraceList[i].address;
                        serverDistance = addressTraceList[i].distance//后台指定考勤距离
                    } else {
                        if (distancess < mydistancess) {
                            mydistancess = distancess;
                            sites = addressTraceList[i].address;
                            serverDistance = addressTraceList[i].distance//后台指定考勤距离
                            addressSn = addressTraceList[i].addressSn;
                        }
                    }
                }
            }

            //赋值操作(遍历出的结果)
            this.setState({
                //现场打卡
                mydistances: mydistancess, 
                site: sites, 
                distance: serverDistance,
                addressSn: addressSn,
                //在家打卡
                localAdress: locate.responseBody.address, //获取定位用户当前的地名
                lon2: locate.responseBody.longitude, //经度
                lat2: locate.responseBody.latitude, //纬度
            },()=>{
                console.info('每次更新的state::',this.state)
            });
            console.info(this.state.mydistances);
        }
        console.info('fire getlocation')
        //引入原生的框架
        ReactNativeApi.MapUtilsModule.getLocation(cb);
    }


    componentDidMount() {
        //获取手机越狱的方法
        this.getPrisonBreak();
        //去掉用获取SIM卡的方法
        this.getSIM();
        //获取设备唯一标识
        this.getUUIDs();
        //接口调用
        this.addAddresGetUsrInfo();
    }
    async addAddresGetUsrInfo() {
        const userInfo = await this.props.getUserInfoAttendance();
        // console.info('组件内用户信息接口返回的数据::',userInfo);
        const thatVeryDay = Preference.get(veryDay + this.currentDay) || []
        this.setState({
            userInfo,
            thatVeryDay
        }, () => {
            // console.info('用户信息接口返回值::',this.state.userInfo)
            this.updateLocation();
        })
    }
    componentWillUnmount() {
        this.__mounted = false;
        clearInterval(this.timer);
    }
    //界面渲染
    render() {
        //调用存储的数据进行显示
        const { userInfo, mydistances, site, distance, deviceId } = this.state
        console.info(deviceId);
        const tabs = [
            { title: '现场办公打卡' },
            { title: '在家办公打卡' },
          ];
        return (
            <View>
                <NavigationBar rightImage={require('../../images/statis.png')} rightClick={() => this.goToDetail()} leftClick={() => this.leftClick()}>考勤打卡</NavigationBar>
                <View style={styles.markTop}>
                    <View style={styles.personInfo}>
                        <View style={styles.infoLeft}>
                            <Image style={styles.avatar}
                                source={userInfo ? { uri: global.baseUrl + userInfo.headPhoto } : require("../../images/headerImage.jpg")}
                            />
                            <View style={styles.description}>
                                <Text style={styles.name}>{userInfo && userInfo.name || ''}</Text>
                                <Text style={styles.position}>{userInfo && userInfo.deptName2 || ''}</Text>
                            </View>
                        </View>
                        <Text style={styles.nowTime}>{this.getAppointStyleDate('.')}</Text>
                    </View>
                    {/* 创建中部内容区域 */}
                    <View style={{height: isIOS ? px2dp(900) : autoHeight(330)}}>
                        <Tabs tabs={tabs} 
                            //tabBarActiveTextColor={this.state.typeIndex == 0 ? '#128ff0' : '#69C85C'}
                            onChange={(tab, index) => { 
                                console.info('onChange', index, tab);
                                this.setState({
                                    typeIndex: index
                                }) 
                            }}
                        >
                            <View style={styles.checkContent}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => this.checkCard(userInfo.phoneAttendanceAuth,0)}>
                                    {this.AttendanceCardingStyle(mydistances, distance, deviceId, 0)}
                                </TouchableOpacity>
                                {this.getPosition(site, mydistances, distance, deviceId, 0)}
                                <Text style={[styles.positionTxt, styles.postColor]}>指定考勤位置：{site}</Text>

                                <Text style={[styles.positionTxt, styles.postColor]}>我的位置距离考勤位置 {mydistances > 1000 ? ((mydistances / 1000).toFixed(2)) : mydistances}
                                    {mydistances > 1000 ? <Text style={[styles.positionTxt, styles.postColor]}>公里</Text>
                                        : <Text style={[styles.positionTxt, styles.postColor]}>米</Text>}
                                </Text>
                            </View>
                            <View style={styles.checkContent}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => this.checkCard(userInfo.phoneAttendanceAuth,1)}>
                                    {this.AttendanceCardingStyle(mydistances, distance, deviceId, 1)}
                                </TouchableOpacity>
                                {this.getPosition(site, mydistances, distance, deviceId, 1)}
                                <Text style={[styles.positionTxt, styles.postColor,{width: width * 0.8,textAlign:'center'}]}>当前位置:{this.state.localAdress}</Text>
                            </View>
                        </Tabs>
                    </View>
                    {/* <View style={styles.checkContent}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.checkCard(userInfo.phoneAttendanceAuth)}>
                            {this.AttendanceCardingStyle(mydistances, distance, deviceId)}
                        </TouchableOpacity>
                        {this.getPosition(site, mydistances, distance, deviceId)}
                        <Text style={[styles.positionTxt, styles.postColor]}>指定考勤位置：{site}</Text>

                        <Text style={[styles.positionTxt, styles.postColor]}>我的位置距离考勤位置 {mydistances > 1000 ? ((mydistances / 1000).toFixed(2)) : mydistances}
                            {mydistances > 1000 ? <Text style={[styles.positionTxt, styles.postColor]}>公里</Text>
                                : <Text style={[styles.positionTxt, styles.postColor]}>米</Text>}
                        </Text>
                    </View> */}
                    <View style={styles.daysListBox}>
                        <Text style={styles.daysList}>今日考勤明细</Text>
                    </View>
                    <ScrollView style={styles.checkDateList}>
                        {this.state.listData.map(data => (
                            <View key={`${data.id}`} showsHorizontalScrollIndicator={false} >
                                <View style={styles.daysCheckIn}>
                                    <Text style={styles.daysTime}>{data.ee_No}</Text>
                                    <Text style={styles.daysTime}>{userInfo.name}</Text>
                                    <Text style={styles.daysTime}>{data.checkTime.split(' ')[0]}</Text>
                                    <Text style={styles.daysTime}>{data.checkTime.split(' ')[1]}</Text>
                                    <Text style={styles.daysTime}>{data.source ? '在家' : '现场'}</Text>
                                </View>
                                {/* <View style={styles.wrapperStyle}>
                                    <View style={styles.lineStyle} />
                                    <View style={styles.lineMask} />
                                </View> */}
                            </View>
                        ))}
                        <View style={styles.bottomBox}></View>
                    </ScrollView>
                </View>
                {this.mapMarkList()}
            </View>
        )
    }
    //考勤打卡1 在家打卡2
    AttendanceCardingStyle(mydistances, distance, deviceId, num) {
        if(num == 0){
            if ( mydistances != 0 && isNull(mydistances) ) {
                return (
                    <View style={styles.checkInUnlocated}>
                        <Text style={styles.checkTxt}>定位中...</Text>
                        <Text style={styles.checkHour}>{this.getHour()}</Text>
                    </View>
                )
            } else if (mydistances > distance) {
                return (
                    <View style={styles.checkInUnlocated}>
                        <Text style={styles.checkTxt}>超出范围</Text>
                        <Text style={styles.checkHour}>{this.getHour()}</Text>
                    </View>
                )
    
            } else if (0 <= mydistances && mydistances <= distance ) { //0 <= mydistances && mydistances <=distance
                return (
                    <View style={styles.checkIn}>
                        <Text style={styles.checkTxt}>现场办公打卡</Text>
                        <Text style={styles.checkHour}>{this.getHour()}</Text>
                    </View>
                )
            }
        }else if( num == 1){
            if(this.state.localAdress == ''){
                return(
                    <View style={styles.checkInUnlocated}>
                        <Text style={styles.checkTxt}>定位中...</Text>
                        <Text style={styles.checkHour}>{this.getHour()}</Text>
                    </View>
                )
            }else{
                return(
                    <View style={[styles.checkIn,{backgroundColor:'#69C85C'}]}>
                        <Text style={styles.checkTxt}>在家办公打卡</Text>
                        <Text style={[styles.checkHour,{color:'white'}]}>{this.getHour()}</Text>
                    </View>
                )
            }
        }

    }
  
    //获取当前打卡的时间
    getHour() {
        let str = ''
        const date = new Date()
        str += this.formatTime(date.getHours())
        str += ':'
        str += this.formatTime(date.getMinutes())
        return str
    }
    //手机定位考勤打卡的范围(样式)
    getPosition(site, mydistances, distance,deviceId, num) {
        console.info('6666666666666666666',mydistances,distance)
        if(num == 0){
            if ( isNull(mydistances) && mydistances != 0) {
                return (
                    <View style={styles.positionDesp}>
                        <Image source={errorCheckInPosition} style={styles.postionImage} />
                        <Text style={styles.positionTxt}>正在获取当前位置,请稍等...</Text>
                    </View>
                )
            } else if (mydistances > distance) {
                return (
                    <View style={styles.positionDesp}>
                        <Image source={errorCheckInPosition} style={styles.postionImage} />
                        <Text style={styles.positionTxt}>当前位置不在考勤范围内</Text>
                    </View>
                )
    
            } else if (0 <= mydistances && mydistances <= distance) {
                return (
                    <View style={styles.positionDesp}>
                        <Image source={correctCheckInPosition} style={styles.postionImage} />
                        <Text style={styles.positionTxt}>已经进入考勤范围</Text>
                    </View>
                )
            }
        }else if(num == 1){
            if (this.state.localAdress == '') {
                return (
                    <View style={styles.positionDesp}>
                        <Image source={errorCheckInPosition} style={styles.postionImage} />
                        <Text style={styles.positionTxt}>正在获取当前位置,请稍等...</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.positionDesp}>
                        <Image source={correctCheckInPosition} style={styles.postionImage} />
                        <Text style={styles.positionTxt}>定位成功</Text>
                    </View>
                )
            }
        }
        
    }
    formatTime(time) {
        let ret = ''
        if (time <= 9) {
            ret = '0' + time
        } else {
            ret = time
        }
        return ret
    }

    mapMarkList() {
        const { thatVeryDay } = this.state
        return (<ScrollView style={styles.markBottom}>
            {
                isNull(thatVeryDay) ? null : thatVeryDay.map((item, index) => {
                    return (<View key={index} style={[styles.markItem, index === 0 ? styles.firstMargin : null]}>
                        <View style={styles.itemLeft}>
                            <View style={styles.markCircle}></View>
                            <View style={styles.markLine}></View>
                        </View>
                        <View style={styles.markRight}>
                            <Text style={styles.markTime}>打卡时间{`09:56`}</Text>
                            <View style={styles.markPosition}>
                                <Image style={styles.markIcon} />
                                <Text style={styles.markPositionText}>{item.location}</Text>
                            </View>
                        </View>
                    </View>)
                })
            }
        </ScrollView>)
    }

    goToDetail() {
        NAVIGATION.navigate(global.CHECKlIST);
    }

    leftClick() {
        this.backCloseModal()
        NAVIGATION.goBack(null)
    }

    backCloseModal() {
        if (modal) {
            modal.destroy();
            modal = null;
        }
    }

    openModal() {
        if (modal) {
            modal.destroy();
            modal = null;
        } else {
            modal = new RootSiblings(<CheckResult callBack={() => this.backCloseModal()} />)
        }
    }

    //点击打卡事件处理
    checkCard(hasJustify,num) {
        const { userInfo, deviceId, mydistances, site, distance, addressSn, localAdress,homeAttendanceAuth } = this.state
        console.info(userInfo, '123',hasJustify)
        console.info(deviceId);
        console.log(JSON.stringify(this.props))
        if (!hasJustify) {
            return
        }
        if( num == 0){ //项目现场-考勤打卡
            if (mydistances == '') {//不能点击
                RootToast.show('不在考勤范围内，不能打卡！');
            } else if (mydistances > distance) {//不能点击
                RootToast.show('不在考勤范围内，不能打卡！');
            } else if (0 <= mydistances <= distance) {
                if (!isNull(userInfo.deviceId)) {
                    if (this.state.isDaCards == true) {
                        if (userInfo.deviceId != deviceId) {//需要提示,联系管理员 解绑
                            console.info('不进入打卡')
                            Alert.alert('温馨提示', '请使用绑定手机打卡,如需更换请联系', [
                                { text: '确认' },
                            ]);
                            return;//返回首页
                        } else {
                            //确定是否打卡
                            this.isCards(mydistances, userInfo, deviceId, distance, addressSn);
                        }
                    } else {
                        RootToast.show('请不要重复打卡')
                    }
                } else {
                    if (this.state.isDaCards == true) {
                        //提示他是否要绑定该手机进行考勤打卡(确定和取消)
                        console.info('进入打卡2')
                        Alert.alert('温馨提示', '是否绑定该手机(每个用户只能绑定一个手机)', [
                            { text: '取消' },
                            {
                                text: '确认',
                                onPress: () => {
                                    //确定是否打卡
                                    this.isCards(mydistances, userInfo, deviceId, distance, addressSn);
                                },
                            },
                        ]);
                    } else {
                        RootToast.show('请不要重复打卡')
                    }
    
                }
            }
        }else if( num == 1 ){ //在家办公-考勤打卡
            if(localAdress == ''){
                RootToast.show('请确认是否开启定位权限！');
            }else if(homeAttendanceAuth == '0'){ //没有在家打卡权限
                RootToast.show('没有在家打卡权限！')
            }else{
                if (this.state.isDaCards == true) {
                    let nullStr = '(null)';
                    let params = {
                        employeeNo: userInfo.eeNo,
                        longitude: this.state.lon2,
                        latitude: this.state.lat2,
                        site: localAdress && localAdress.split(nullStr)[0],
                    }
                    this.props.submitHomeCheck(params,(data)=>{
                        //data数据需要做显示
                        console.info(data);
                        if (!isNull(data)) {
                            //只能在页面打一次，重进该页面isDaCards为true；
                            this.setState({
                                isDaCards: false
                            })
                            Alert.alert('温馨提示', '打卡成功(在家)', [
                                {
                                    text: '确认',
                                    onPress: () => {
                                        //显示今日打卡的明细
                                        this.checkInData(data.responseBodyJson);
                                    },
                                },
                            ]);
                        }
                    })
                } else {
                    RootToast.show('请不要重复打卡')
                }
            }
        }
        
    }
    //是否打卡提示
    isCards(mydistances, userInfo, deviceId, distance, addressSn) {

        //判断是否插入SIM卡 
        if (this.state.isPrisonBreak == '1') {//手机越狱权限判断
            RootToast.show('手机被越狱,不能打卡')
        } else {
            ReactNativeApi.DeviceUtilsModule.getSIMStr(
                (getSIM) => {
                    const SIM = JSON.parse(getSIM)
                    console.info(SIM);
                    console.info('time', new Date)
                    console.info(SIM.responseBody.simStr);
                    if (SIM.responseBody.simStr == '0') {//判断SIM卡的方法
                        RootToast.show('未安装SIM卡,请插入SIM卡')
                    } else {
                        //调用打卡接口
                        this.submitCheckNetWork(userInfo, deviceId, addressSn);
                    }
                }
            );
        }
    }
    //打卡接口调用
    submitCheckNetWork(userInfo, deviceId, addressSn) {
        let _this = this
        const params = {
            employeeNo: userInfo.eeNo,
            deviceId,
            addressSn: addressSn
            //  userInfo.addressTraceList[0].addressSn
        }
        console.info(params);
        this.props.submitCheck(params, (data) => {
            //data数据需要做显示
            console.info(data);
            if (!isNull(data)) {
                //缓存覆盖东西
                const safeUserIf = Preference.get(USERINFO);
                Preference.set(USERINFO, {
                    ...safeUserIf,
                    deviceId
                });
                //只能在页面打一次，重进该页面isDaCards为true；
                _this.setState({
                    isDaCards: false
                })
                Alert.alert('温馨提示', '打卡成功(项目现场)', [
                    {
                        text: '确认',
                        onPress: () => {


                            //显示今日打卡的明细
                            this.checkInData(data.responseBodyJson);
                        },
                    },
                ]);
            }

        })
    }

    //显示今日打卡的明细
    checkInData(data) {
        const listData = [data, ...this.state.listData];
        this.setState({
            listData,
        });

        const userInfo = Preference.get(USERINFO);
        Preference.set(USERINFO, {
            ...userInfo, // JS对象解构
            attendanceList: listData
        });
    }

    // 获取指定格式的日期
    getAppointStyleDate(style, date) {
        if (isNull(style)) {
            style = '-'
        }
        if (isNull(date)) {
            date = new Date()
        }
        const year = date.getFullYear()
        const month = this.formatTime(date.getMonth() + 1)
        const day = this.formatTime(date.getDate())

        return year + style + month + style + day
    }
}

//把Reducer和Action与页面组件关联起来
export default connect(
    state => {
        const { CheckReducer } = state;
        return {
            CheckReducer
        };
    },
    CheckActions
)(CheckIn);

//之前的方案 找到符合条件的即 跳出循环
// for (let i = 0; i < addressTraceList.length; i++) {
//     //计算两点之间的距离
//     const distancess = GetDistance(
//         addressTraceList[i].latitude,
//         addressTraceList[i].longitude,
//         locate.responseBody.latitude,
//         locate.responseBody.longitude,
//     );
        
//     sites = addressTraceList[i].address;
//     serverDistance = addressTraceList[i].distance//后台指定考勤距离
//     addressSn = addressTraceList[i].addressSn;
//     //只要满足定位打卡距离小于设置距离，就可以打卡,结束循环
//     if (distancess < serverDistance) {
//         mydistancess = distancess;
//         break;
//     }
// }