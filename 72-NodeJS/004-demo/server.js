/*
 * @Author: niumengfei
 * @Date: 2020-06-08 15:25:45
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-17 11:35:02
 */ 
//引入模块
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/connect'); //连接数据库

//初始化app实例
const app = express();
const port = 3000;

//添加处理post请求的中间件
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

//处理路由
app.use('/user',require('./router/login'))
app.use('/food',require('./router/food'))


//监听端口
app.listen(port,()=>{
    console.log(`server is now running at port:${port}`)
})