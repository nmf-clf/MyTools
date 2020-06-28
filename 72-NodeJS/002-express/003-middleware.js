/*
 * @Author: niumengfei
 * @Date: 2020-06-05 09:56:11
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-05 10:00:13
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\002-express\003-middleware.js
 */ 
const express = require('express')
//实例化
const app = express();
const port = 3001

//局部中间件 
app.get('/user/login',(req,res,next)=>{ //拦截器
    const { token } = req.query;
    if(token){
        next()
    }else{
        res.send('缺少token')
    }
},(req,res)=>{
    res.send('哈哈哈')
})

app.get('/user/login2',(req,res)=>{
    res.send('哈哈哈2')
})

// app.get(pathname,fun,fun)
 
//监听 端口 开启服务器
app.listen(port, () => { 
    console.log(`app is running at port:${port}`)
})