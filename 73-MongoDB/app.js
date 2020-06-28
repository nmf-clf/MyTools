/*
 * @Author: niumengfei
 * @Date: 2020-06-05 16:55:59
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-08 14:07:47
 * @Description: file content
 * @FilePath: \MyTools\73-MongoDB\app.js
 */
//引入模块 
const express = require('express')
const mongoose = require('mongoose')

//1-1.连接数据库
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true,useUnifiedTopology:true })
//1-2.创建一个和集合相关的schema对象 类似表头

//1-3.获取对象
const userSchema = new mongoose.Schema({
    userName: {type: String,require: true},
    passWord: {type: String,require: true},
    sex: {type: Number,default: 0}, //0未知 1男 2女
})
//1-4.将schema对象转化为数据模型
const User = mongoose.model('user', userSchema);
//1-5.操作数据库
// User.insertMany({userName:'nmf',passWord:'777',sex: 1},(err,docs)=>{ 
//     if(err){ 
//         console.log('插入失败 ',err)
//     }else{
//         console.log('插入成功::',docs)
//     }
// })

// User.find({userName:'nmf'},(err,docs)=>{
//     if(err){
//         console.log('查询失败 ',err)
//     }else{
//         console.log('查询成功 ',docs)
//     }
// })

// User.remove({sex:1},(err,docs)=>{
//     if(err){
//         console.log('删除失败 ',err)
//     }else{
//         console.log('删除成功 ',docs)
//     }
// })

User.findOneAndUpdate({sex:2},{userName:'ym'},(err,docs)=>{
    if(err){
        console.log('更新失败 ',err)
    }else{
        console.log('更新成功 ',docs)
    }
})


//2.初始化app实例
const app = express()
const port = 3000

//3.配置路由
app.use('/user/login',(req,res)=>{
    res.send('嘿嘿嘿')
})

//监听端口
app.listen(port,()=>{
    console.log('app is running at port:3000...')
})