/*
 * @Author: niumengfei
 * @Date: 2020-06-08 15:32:13
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-08 17:35:11
 */ 
//引入mongoose
const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true,useUnifiedTopology:true});

//返回连接状态
const db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connect is ok...')
});

