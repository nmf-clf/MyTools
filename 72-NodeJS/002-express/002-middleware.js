/*
 * @Author: niumengfei
 * @Date: 2020-06-03 16:28:18
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-05 09:40:03
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\002-express\002-server.js
 */ 
const express = require('express')
//实例化
const app = express();
const port = 3001

app.use('/',(req,res,next)=>{ //拦截器
    const { token } = req.query;
    if(token){
        next()
    }else{
        res.send('缺少token')
    }
})

app.get('/user/login',(req,res)=>{
    console.log('2',req.query)
    res.send('哈哈哈')
})

 
//监听 端口 开启服务器
app.listen(port, () => { 
    console.log(`app is running at port:${port}`)
})