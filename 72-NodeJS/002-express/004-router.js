/*
 * @Author: niumengfei
 * @Date: 2020-06-05 10:23:56
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-05 10:42:55
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\002-express\004-router.js
 */ 
const express = require('express');
const path = require('path');
//实例化app
const app  = express();
const port = 3000;

console.log('1::',path.join(__dirname,'./out'));

//配置静态资源
app.use(express.static(path.join(__dirname,'./out')))

//监听
app.listen(port,()=>{
    console.log(`app is running at port:3000...`)
})
