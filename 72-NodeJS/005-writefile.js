/*
 * @Author: niumengfei
 * @Date: 2020-05-09 22:54:13
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-05-14 18:04:04
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\005-writefile.js
 */
let fs = require('fs');

//新增文件 也叫作覆盖写入
fs.writeFile('dirtree.js','',(err)=>{
    if(err){
        console.log('新增文件失败',err)
    }else{
        console.log('新增文件成功')
    }
})

//修改文件 如果文件不存在，则会先创建一个文件 累加写入
// fs.appendFile('name.txt','嘿嘿2',(err)=>{
//     if(err){
//         console.log('修改文件内容失败',err)
//     }else{
//         console.log('修改文件成功')
//     }
// })

//读取文件
// fs.readFile('name.txt','utf-8',(err,msg)=>{
//     if(err){
//         console.log('文件读取失败',err)
//     }else{
//         console.log('文件读取成功',msg)
//         // console.log('文件读取成功',msg.toString('utf-8'))
//     }
// })

//删除文件 先删除后读取?
// fs.unlink('name1.txt',(err)=>{
//     if(err){
//         console.log('文件删除失败',err)
//     }else{
//         console.log('文件删除成功')
//     }
// })




