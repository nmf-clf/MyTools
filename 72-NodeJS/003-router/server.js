/*
 * @Author: niumengfei
 * @Date: 2020-06-04 14:37:26
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-04 17:22:43
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

console.log(__dirname)
console.log(path.join())

 
//监听 端口 开启服务器
app.listen(port, () => { 
    console.log(`app is running at port:${port}`)
})