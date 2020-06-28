/*
 * @Author: niumengfei
 * @Date: 2020-06-04 14:38:39
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-05 11:19:31
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\003-router\router\foodRouter.js
 */ 
const express = require('express');
const Router = express.Router;

const router = Router();

router.get('/add',(req,res)=>{
    res.send('food-add')
})

router.get('/del',(req,res)=>{
    res.send('food-del')
})

module.exports = router;