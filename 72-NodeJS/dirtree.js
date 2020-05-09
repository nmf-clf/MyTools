let fs = require('fs');

// fs.readdir('./',(err,data)=>{
//     if(err){
//         console.log('读取文件夹失败',err)
//     }else{
//         console.log('读取文件夹成功',data)
//     }
// })

fs.stat('./',(err,stats)=>{
    if(err){
        console.log('出错啦>_<...',err)
    }else{
        if(stats.isDirectory){
            fs.readdir('./',(err2,data)=>{
                if(err2){
                    console.log('读取文件夹错误',err)
                }else{
                    // console.log('读取文件夹成功',data)
                    data && data.map(item=>{
                        console.log('item',item)
                    })
                }
            })
        }
    }
})