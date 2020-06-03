/*
 * @Author: niumengfei
 * @Date: 2020-06-02 15:39:20
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-02 16:22:04
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\008-email.js
 */ 
"use strict";
const nodemailer = require("nodemailer");

// 创建发送邮箱的对象-create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.qq.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '870424431.qq.com', // generated ethereal user  
        pass: "aicwiwpxkzjpbcif", // generated ethereal password
    }
});

// 创建发送邮件的主体-send mail with defined transport object
let mailObj = {
    from: '"Fred Foo 👻" <870424431.qq.com>', // sender address
    to: "870424431.qq.com", // list of receivers
    subject: "百度集团", // Subject line
    text: "您的验证码是475023,有效期5分钟", // plain text body
    // html: "<b>Hello world?</b>", // html body
};

//发送邮件
transporter.sendMail(mailObj,(err,data)=>{
    if(err){
        console.log('err::',err)
    }else{
        console.log('success::',data)
    }
})


