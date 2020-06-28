/*
 * @Author: niumengfei
 * @Date: 2020-06-08 15:38:09
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-17 13:53:52
 */ 
//引入mongoose 
const mongoose = require('mongoose');

//创建Schema对象
const foodSchema = new mongoose.Schema({
    foodName:{
        type: String,
        require: true
    },
    foodType:{
        type: String,
        require: true //1:主食 2:凉菜 3:热菜 4:汤类 
    },
    foodDescript:{
        type: String,
        require: true
    },
    // foodImg:{
    //     type: String,
    // }
})

//将Schema对象 转换为 数据模型
const foodModel = mongoose.model('foods',foodSchema)

//导出数据模型
module.exports = foodModel;

