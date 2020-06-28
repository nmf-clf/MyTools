/*
 * @Author: niumengfei
 * @Date: 2020-06-08 15:47:49
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-18 14:12:50
 */ 
//引入模块
const Router = require('express').Router;
const foodModel = require('../db/foodSchema');

const router = Router();

let result = {}

//添加food
router.post('/addfood',(req,res)=>{
    let { foodName,foodType,foodDescript } = req.body;
    if(!foodName || !foodType || !foodDescript) res.send({code:0001,msg:'参数错误!'})
    foodModel.insertMany({foodName,foodType,foodDescript})  
    .then((data)=>{
        result.code = 0000
        result.msg = '新增成功'
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
})
//查询列表
router.post('/getfoodList',(req,res)=>{
    let { pageIndex=1,pageSize=3,foodType } = req.body;
    pageIndex = Number(pageIndex)
    pageSize = Number(pageSize)
    console.log(pageIndex,pageSize,foodType)
    if(!pageIndex || !pageSize) res.send({code:0001,msg:'参数错误!'})
    foodModel.find({foodType})
    .limit(pageSize) //Number(pageSize)
    .skip( (pageIndex-1)*pageSize ) //Number((pageIndex-1)*pageSize) 
    .then((data)=>{
        result.code = 0000
        result.msg = '查询成功'
        result.list = data
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
})
//删除
router.post('/deletefood',(req,res)=>{
    let { id } = req.body;
    if(!id) res.send({code:0001,msg:'参数错误!'})
    foodModel.deleteOne({_id:id})
    .then((data)=>{ 
        console.log(data)
        res.send({
            code: 0000,
            msg: '删除成功'
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})
//修改
router.post('/updatefood',(req,res)=>{
    let { id,foodDescript } = req.body;
    console.log(foodDescript)
    if(!id) res.send({code:0001,msg:'参数错误!'})
    foodModel.findOneAndUpdate({_id:id},{foodDescript})
    .then((data)=>{ 
        console.log(data)
        res.send({
            code: 0000,
            msg: '修改成功'
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})






module.exports = router;