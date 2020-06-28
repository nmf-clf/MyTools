/*
 * @Author: niumengfei
 * @Date: 2020-06-08 15:38:09
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-08 17:33:00
 */ 
//引入mongoose 
const mongoose = require('mongoose');

//创建Schema对象
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        require: true
    },
    passWord:{
        type: String,
        require: true
    },
    sex:{
        type: Number,
        default: 0, //0未知 1男 2女
    }
})

//将Schema对象 转换为 数据模型
const UserModel = mongoose.model('users',userSchema)

//导出数据模型
module.exports = UserModel;

