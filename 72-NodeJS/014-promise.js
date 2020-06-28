/*
 * @Author: niumengfei
 * @Date: 2020-06-05 14:22:53
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-05 14:50:44
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\014-promise.js
 */ 
const fs = require('fs');

//删除文件 1.判断文件是否存在 2.如果存在才可以删除
fs.access('delete.js',(err)=>{
    if(err){
        console.log('读取失败::',err)
    }else{
        fs.unlink('delete.js',(err)=>{
            if(err){
                console.log('删除失败::',err)
            }else{
                console.log('删除成功')
            }
        })
    }
})

