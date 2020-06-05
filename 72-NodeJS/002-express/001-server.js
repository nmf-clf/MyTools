/*
 * @Author: niumengfei
 * @Date: 2020-06-03 16:28:18
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-04 11:49:37
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\002-express\001-server.js
 */ 
const express = require('express')
const bodyParser = require('body-parser')
//实例化
const app = express();
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/user/login', (req, res) => {
    console.log(req.query)
    res.send('Hello World!')
})

app.post('/user/reg',(req,res) => {
    console.log(req.body)
    res.send('嘿嘿')
})
 
//监听 端口 开启服务器
app.listen(port, () => { 
    console.log(`app is running at port:${port}`)
})