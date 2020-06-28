/*
 * @Author: niumengfei
 * @Date: 2020-06-08 15:47:49
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-17 11:40:30
 */ 
//引入模块
const Router = require('express').Router;
const UserModel = require('../db/userSchema');

const router = Router();

let result = {}

//用户注册
/**
 * @api {post} /user/regist regist
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription 用户注册
 * 
 * @apiParam {String} userName 注册者用户名(必填).
 * @apiParam {String} passWord  注册者用户密码(必填).
 * @apiParam {Number=0,1,2} [sex]  注册者性别(非必填). 
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "userName": "niumengfei", //仅支持中英文(包含大小写)、不包含特殊字符
 *       "passWord": "8888888", //6-16位 数字、字母(大小写)、特殊字符不包括下划线、空格等
 *       "sex": 1 //0:默认 | 1:男 | 2:女
 *     }
 */
router.post('/regist',(req,res)=>{
    let {userName,passWord} = req.body;
    
    if(!userName || !passWord) return res.send('参数错误');
    UserModel.findOne({userName})
    .then((data)=>{
        if(data){
            result.code = 0001
            result.msg = '此账号已注册' 
            res.send(result)
            throw new Error('error')
        }else{
            return UserModel.insertMany({userName,passWord})
            // new UserModel({
            //     userName: userName,
            //     passWord: passWord,
            // })
            // .save((err,newUser)=>{
            //     if(!err){
            //         res.send('注册成功')
            //     }else{
            //         res.send('注册失败')
            //     }
            // })
        }
    })
    .then((data)=>{
        result.code = 0000
        result.msg = '注册成功'
        res.send(result)
    })
    .catch((err)=>{
        console.info('1111111111')
        // res.send('注册失败',err)
    })
})

//用户登录
/**
 * @api {post} /user/login login
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription 用户登录
 * 
 * @apiParam {String} userName 登录者用户名(必填).
 * @apiParam {String} passWord  登录者用户密码(必填).
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "userName": "nmf",
 *       "passWord": "123", 
 *     }
 */
router.post('/login',(req,res)=>{
    let { userName,passWord } = req.body;
    if(!userName || !passWord) return res.send('参数错误');
    //先查询账号是否存在，其次验证密码是否正确
    UserModel.findOne({userName})
    .then((data)=>{
        if(!data){
            result.code = 0001
            result.msg = '用户名不存在!'
            res.send(result)
        }else{
            return UserModel.findOne({userName,passWord})
        }
    })
    .then((data)=>{ 
        if(!data){
            result.code = 0001
            result.msg = '密码错误!'
            res.send(result)
        }else{
            result.code = 0000
            result.msg = '登录成功'
            res.send(result)
        }
    })
    .catch((err)=>{
        res.send(err)
    })
})


module.exports = router;