let fs = require('fs');

// fs.mkdir('./test/01t',(err)=>{
//     if(err){
//         console.log('增加失败',err);
//     }else{
//         console.log('增加成功')
//     }
// })

// fs.rename('./002-modules.js','./002-module.js',(err)=>{
//     if(err){
//         console.log('修改失败',err)
//     }else{
//         console.log('修改成功')
//     }
// })

fs.rmdir('./test',(err)=>{
    if(err){
        console.log('删除失败',err)
    }else{
        console.log('删除成功')
    }
})
