/*
 * @Author: niumengfei
 * @Date: 2020-06-04 14:37:26
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-05 11:20:05
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\003-router\server.js
 */ 
/*
 * @Author: niumengfei
 * @Date: 2020-06-03 16:28:18
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-04 13:07:13
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\002-express\002-server.js
 */ 
const express = require('express');
const path = require('path');
//实例化
const app = express();
const port = 3001

let userRouter = require('./router/userRouter')
let foodRouter = require('./router/foodRouter')

app.use('/user',userRouter)
app.use('/food',foodRouter)

//监听 端口 开启服务器
app.listen(port, () => { 
    console.log(`app is running at port:${port}`)
})