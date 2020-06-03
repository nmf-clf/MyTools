/*
 * @Author: niumengfei
 * @Date: 2020-06-02 16:27:02
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-02 17:11:29
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\009-email copy.js
 */ 
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '870424431.qq.com', // generated ethereal user  
        pass: "aicwiwpxkzjpbcif", // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <870424431.qq.com>', // sender address
    to: "870424431.qq.com", // list of receivers
    subject: "百度集团", // Subject line
    text: "您的验证码是475023,有效期5分钟", // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);