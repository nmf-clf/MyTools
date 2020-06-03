
let Moudle = require('./002-module');

// console.log(Moudle.name);

let fs = require('fs');

//异步读取
fs.readdir('./',(err,data)=>{
    // console.log('2',err)
    // console.log('2',data)
    if(err){
        console.log('读取失败');
    }else{
        console.log('2',data)
    }
})

// console.log( fs.readdirSync('./11') )

//同步读取
try{
    console.log( fs.readdirSync('./11') )
}catch(err){
    console.info('程序异常',err)
}

//在异步中,会讲一个东西,叫做错误的回调优先
//(在回调函数中,一般第一个参数表示的错误对象,默认为null)

/* 
    1.错误处理: 同步 try catch   异步 回调函数即错误的回调优先
    2.文件夹的操作
    3.curd (create update read delete)
 */

