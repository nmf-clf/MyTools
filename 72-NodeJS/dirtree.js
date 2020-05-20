/*
 * @Author: niumengfei
 * @Date: 2020-05-09 23:13:05
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-05-14 19:05:37
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\dirtree.js
 */
const fs = require('fs');
const path = require('path');

//获取当前有没有传入目标路径
var target = path.join(__dirname,process.argv[2] || './');

console.log(target)














// fs.readdir('./',(err,dirs)=>{
//     if(err){
//         console.log('目标不是文件夹',err)
//     }else{
//         console.log('读取文件夹成功',dirs)
//         for(let i=0; i<dirs.length; i++){
//             console.log(dirs[i])
//         }
//     }
// })

// fs.stat('./',(err,stats)=>{
//     if(err){ //大概率路径错误
//         console.log('出错啦>_<...',err)
//     }else{
//         if(stats.isDirectory()){ //如果是文件夹
//             console.log('is dir')
//             fs.readdir('./',(err2,data)=>{
//                 if(err2){
//                     console.log('读取文件夹错误',err)
//                 }else{
//                     // console.log('读取文件夹成功',data)
//                     data && data.map(item=>{
//                         console.log(item)
//                     })
//                 }
//             })
//         }else{
//             console.log('is file')
//         }
//     }
// })