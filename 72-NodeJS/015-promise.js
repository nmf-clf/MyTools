/*
 * @Author: niumengfei
 * @Date: 2020-06-05 14:22:53
 * @LastEditors: niumengfei
 * @LastEditTime: 2020-06-05 15:41:02
 * @Description: file content
 * @FilePath: \MyTools\72-NodeJS\015-promise.js
 */ 
const fs = require('fs');

//文件是否存在
function isFlieExist(){
    return new Promise((resolve,reject)=>{
        fs.access('delete.js',(err)=>{
            if(err){
                //addFile()
                resolve('文件不存在')                
            }else{
                resolve('文件存在')
            }
        })
    })
}
//创建文件 
function addFile(){
    return new Promise((resolve,reject)=>{
        fs.writeFile('delete.js','1233',(err)=>{
            if(err){
                reject('新增文件失败')
            }else{
                console.log('创建文件成功...')
                resolve('新增文件成功')
            }
        })
    })
}
//删除文件
function deleteFile(){
    return new Promise((resolve,reject)=>{
        fs.unlink('delete.js',(err)=>{
            if(err){
                reject('删除失败')
            }else{
                resolve('删除成功')
            }
        })
    })
}

isFlieExist()
.then((msg)=>{
    // console.log('文件不存在--',msg)
    console.log(msg)
    if(msg == '文件不存在'){
        console.log('开始创建文件...')
        return addFile()
    }
})
.then((msg)=>{
    // console.log('文件存在--',msg)
    console.log(msg)
    console.log('开始删除文件...')
    return deleteFile()
})
.then((msg)=>{
    console.log('文件删除--',msg)
})
.catch((err)=>{
    console.log('错误::',err)
})

